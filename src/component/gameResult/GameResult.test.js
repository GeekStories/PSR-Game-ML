import GameResult from "./GameResult";
import { render } from "@testing-library/react";
import gestureConstants from "gestures/gestureConstants";
import gameConstants from "component/game/gameConstants";

test.skip("WHEN the Result Component is rendered, THEN it will display the gestures and victor", () => {
  const mockResults = {
    playerGesture: gestureConstants.ROCK,
    computerGesture: gestureConstants.SCISSORS,
    victor: gameConstants.PLAYER,
  };
  const { getByText } = render(<GameResult result={mockResults} />);
  expect(
    getByText(mockResults.playerGesture, { exact: false })
  ).toBeInTheDocument();
  expect(
    getByText(mockResults.computerGesture, { exact: false })
  ).toBeInTheDocument();
  expect(getByText(mockResults.victor, { exact: false })).toBeInTheDocument();
});
