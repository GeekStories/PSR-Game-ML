import tw from "tailwind-styled-components";

import paper from "images/paper.png";
import rock from "images/rock.png";
import scissors from "images/scissors.png";
import unknown from "images/unknown.png";

const Main = tw.div`p-2 mx-auto w-full text-center`;
const ListBody = tw.div`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5`;
const ResultsList = tw.ol`flex flex-col items-center`;
const ResultItem = tw.li`flex justifty-center items-center gap-2 border-r-2 border-b-2 border-black p-2`;
const PlayerMoveWrapper = tw.span`${(p) =>
  p.$winner === "PLAYER"
    ? "border-2 border-green-700"
    : p.$winner === "DRAW"
    ? "border-gray-700"
    : "border-red-700"} border-2`;
const ComputerMoveWrapper = tw.span`${(p) =>
  p.$winner === "COMPUTER"
    ? "border-2 border-green-700"
    : p.$winner === "DRAW"
    ? "border-gray-700"
    : "border-red-700"} border-2`;

function GameHistory({ history = [] }) {
  return (
    <Main>
      <ResultsList>
        <span>Game | Player Move | Computer Move</span>
        <ListBody>
          {history.map((game, idx) => {
            let playerImage = MoveImage(game.playerMove);
            let computerImage = MoveImage(game.computerMove);

            return (
              <ResultItem>
                {history.length - idx}:{" "}
                <PlayerMoveWrapper $winner={game.winner}>
                  {playerImage}
                </PlayerMoveWrapper>{" "}
                vs{" "}
                <ComputerMoveWrapper $winner={game.winner}>
                  {computerImage}
                </ComputerMoveWrapper>
              </ResultItem>
            );
          })}
        </ListBody>
      </ResultsList>
    </Main>
  );
}

function MoveImage(move) {
  switch (move) {
    case "PAPER":
      return <img src={paper} alt="PAPER" width="64px" />;
    case "SCISSORS":
      return <img src={scissors} alt="SCISSORS" width="64px" />;
    case "ROCK":
      return <img src={rock} alt="ROCK" width="64px" />;
    default:
      return <img src={unknown} alt="NO MOVE" width="64px" />;
  }
}

export default GameHistory;
