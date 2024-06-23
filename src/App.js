import { useState, useEffect, useRef } from "react";
import useCountDown from "react-countdown-hook";
import tw from "tailwind-styled-components";
import useGesture from "hooks/useGesture";
import Webcam from "react-webcam";

import {
  ascertainVictor,
  generateComputerGesture,
} from "component/game/gamelogic";
import History from "component/GameHistory/GameHistory";
import GameResult from "component/gameResult/GameResult";
import winnerOptions from "component/game/gameConstants";
import Actions from "component/Actions/Actions";
import SelectedGesture from "component/Actions/SelectedGesture";
import Countdown from "component/Countdown";
import Stats from "component/Stats";

const Main = tw.div`flex flex-col gap-2 w-screen`;
const Settings = tw.div`p-2 w-full`;
const GameView = tw.div`flex flex-col mx-auto items-center`;
const ResetScore = tw.button``;
const CameraOptionWrapper = tw.div``;
const CameraToggleLabel = tw.label`text-blue-900 text-2xl mr-2`;
const ExtraInfo = tw.div`flex gap-4 items-center justify-center`;

function App() {
  const [useCamera, setUseCamera] = useState(true);
  const [cameraReady, setCameraReady] = useState(true);

  const [playerAction, setPlayerAction] = useState(null);
  const [stats, setStats] = useState({ player: 0, computer: 0 });
  const [gameHistory, setGameHistory] = useState([]);
  const [previousWinner, setPreviousWinner] = useState(null);

  const initialTime = 5000;
  const interval = 1000;
  const [timeLeft, { start: startTimer, reset: resetTimer }] = useCountDown(
    initialTime,
    interval
  );

  const detectGesture = useGesture();
  const handleCameraReady = (media) => setCameraReady(true);
  let webcamRef = useRef(null);

  function handleMediaError(err) {
    console.log("CAMERA ERROR");
    console.log(err);
    setCameraReady(false);
    setUseCamera(false);
  }

  function UpdateStats(victor) {
    if (victor === winnerOptions.PLAYER) {
      setStats((current) => {
        return { ...current, player: current.player + 1 };
      });
    } else if (victor === winnerOptions.COMPUTER) {
      setStats((current) => {
        return { ...current, computer: current.computer + 1 };
      });
    }

    setPlayerAction(null);
  }

  useEffect(() => {
    function PlayGame() {
      const computerGesture = generateComputerGesture();
      const victor = ascertainVictor(playerAction, computerGesture);

      UpdateStats(victor);
      setPreviousWinner(victor);

      setGameHistory([
        {
          playerMove: playerAction,
          computerMove: computerGesture,
          winner: victor,
        },
        ...gameHistory,
      ]);

      resetTimer();
      startTimer();
    }

    async function handleGetPlayerMove() {
      let playerGesture;
      playerGesture = await detectGesture(webcamRef.current.getCanvas());

      if (!playerGesture || playerGesture.length === 0) {
        setPlayerAction(null);
        return;
      }

      setPlayerAction(playerGesture);
    }

    if (useCamera && cameraReady) handleGetPlayerMove();
    if (timeLeft <= 0) {
      if (!playerAction) {
        resetTimer();
        startTimer();
        return;
      }

      PlayGame();
    }
  }, [
    timeLeft,
    cameraReady,
    playerAction,
    resetTimer,
    startTimer,
    useCamera,
    detectGesture,
    gameHistory,
  ]);

  const videoConstraints = {
    facingMode: "user"
  };
  

  return (
    <Main>
      <Settings>
        <CameraOptionWrapper>
          <CameraToggleLabel>use camera?</CameraToggleLabel>
          <input
            type="checkbox"
            checked={useCamera}
            onChange={(e) => setUseCamera(e.target.checked)}
          />
        </CameraOptionWrapper>
        <ResetScore onClick={() => window.location.reload(true)}>
          Reset Score
        </ResetScore>
      </Settings>

      <GameView $useCamera={useCamera}>
        {useCamera ? (
          <Webcam
            onUserMedia={(media) => handleCameraReady(media)}
            onUserMediaError={(err) => handleMediaError(err)}
            ref={webcamRef}
            audio={false}
            videoConstraints={videoConstraints}
            className="mx-auto p-2"
          />
        ) : (
          <Actions
            setPlayerAction={setPlayerAction}
            selectedButton={playerAction}
          />
        )}
        <Countdown timeRemaining={timeLeft / 1000} />
      </GameView>
      <ExtraInfo>
        <SelectedGesture playerAction={playerAction} />
        <Stats stats={stats} />
      </ExtraInfo>
      <GameResult result={previousWinner} />
      <History history={gameHistory} />
    </Main>
  );
}
export default App;
