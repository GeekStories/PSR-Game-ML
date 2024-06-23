const ascertainVictor = (playerGesture, computerGesture) => {
  if (playerGesture == computerGesture) return "DRAW";

  switch (playerGesture) {
    case "PAPER":
      if (computerGesture === "ROCK") return "PLAYER";
      else return "COMPUTER";
    case "SCISSORS":
      if (computerGesture === "PAPER") return "PLAYER";
      else return "COMPUTER";
    case "ROCK":
      if (computerGesture === "SCISSORS") return "PLAYER";
      else return "COMPUTER";
  }
};

const options = ["ROCK", "PAPER", "SCISSORS"];
const generateComputerGesture = () => {
  return options[Math.floor(Math.random() * options.length)];
};

export { ascertainVictor, generateComputerGesture };
