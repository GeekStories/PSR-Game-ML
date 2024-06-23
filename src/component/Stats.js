import tw from "tailwind-styled-components";

const GameStats = tw.div`flex-col gap-2 text-center text-4xl`;
const Stat = tw.div`${(p) => (p.$human ? "text-green-600" : "text-red-600")}`;

// write a component that takes in game statistics and displays the score for computer and player.
const Stats = ({ stats }) => {
  return (
    <GameStats>
      <Stat $human>Player: {stats.player}</Stat>
      <Stat>Computer: {stats.computer}</Stat>
    </GameStats>
  );
};

export default Stats;
