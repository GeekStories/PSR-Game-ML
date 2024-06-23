import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

import tw from "tailwind-styled-components";

const Results = tw.div`w-full md:text-2xl font-bold text-gray-500 text-center`;
const Winner = tw.p`uppercase text-yellow-600 bg-black`;

const GameResult = ({ result }) => {
  return (
    <Results>
      <Winner>
        {`Last Round Winner: ${result || ""}`}
        <FontAwesomeIcon icon={faTrophy} />
      </Winner>
    </Results>
  );
};

export default GameResult;
