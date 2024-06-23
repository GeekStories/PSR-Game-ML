import tw from "tailwind-styled-components";

import paper from "images/paper.png";
import rock from "images/rock.png";
import scissors from "images/scissors.png";
import unknown from "images/unknown.png";

const Action = tw.img`self-center`;

function SelectedGesture({playerAction}) {
    switch (playerAction) {
      case "PAPER":
        return <Action src={paper} alt="PAPER" width="64px" />;
      case "SCISSORS":
        return <Action src={scissors} alt="SCISSORS" width="64px" />;
      case "ROCK":
        return <Action src={rock} alt="ROCK" width="64px" />;
      default:
        return <Action src={unknown} alt="NO MOVE" width="64px" />;
    }
  }

  export default SelectedGesture;