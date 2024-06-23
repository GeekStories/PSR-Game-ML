import tw from "tailwind-styled-components";

import paper from "images/paper.png";
import rock from "images/rock.png";
import scissors from "images/scissors.png";

const Controls = tw.div`flex gap-2`;
const Button = tw.button`${(p) =>
  p.$selected ? "border-red-500" : "border-black"} border-2 p-4 text-lg md:p-8`;

const Actions = ({ setPlayerAction, selectedButton }) => {
  return (
    <Controls>
      <Button
        $selected={selectedButton === "PAPER"}
        onClick={() => setPlayerAction("PAPER")}
      >
        <img src={paper} alt="PAPER" width="64px" />
      </Button>
      <Button
        $selected={selectedButton === "SCISSORS"}
        onClick={() => setPlayerAction("SCISSORS")}
      >
        <img src={scissors} alt="SCISSORS" width="64px" />
      </Button>
      <Button
        $selected={selectedButton === "ROCK"}
        onClick={() => setPlayerAction("ROCK")}
      >
        <img src={rock} alt="ROCK" width="64px" />
      </Button>
    </Controls>
  );
};

export default Actions;
