import { ascertainVictor, generateComputerGesture } from "./gamelogic";
import winnerOptions from "./gameConstants";
import gestureConstants from "../../gestures/gestureConstants";

test.each`
  playerGesture                | computerGesture              | victor
  ${gestureConstants.ROCK}     | ${gestureConstants.SCISSORS} | ${winnerOptions.PLAYER}
  ${gestureConstants.PAPER}    | ${gestureConstants.ROCK}     | ${winnerOptions.PLAYER}
  ${gestureConstants.SCISSORS} | ${gestureConstants.PAPER}    | ${winnerOptions.PLAYER}
  ${gestureConstants.ROCK}     | ${gestureConstants.PAPER}    | ${winnerOptions.COMPUTER}
  ${gestureConstants.PAPER}    | ${gestureConstants.SCISSORS} | ${winnerOptions.COMPUTER}
  ${gestureConstants.SCISSORS} | ${gestureConstants.ROCK}     | ${winnerOptions.COMPUTER}
  ${gestureConstants.ROCK}     | ${gestureConstants.ROCK}     | ${winnerOptions.DRAW}
  ${gestureConstants.PAPER}    | ${gestureConstants.PAPER}    | ${winnerOptions.DRAW}
  ${gestureConstants.SCISSORS} | ${gestureConstants.SCISSORS} | ${winnerOptions.DRAW}
`(
  "GIVEN player plays $playerGesture AND computer plays $computerGesture, THEN victor should be $victor",
  ({ playerGesture, computerGesture, victor }) => {
    // act
    const actual = ascertainVictor(playerGesture, computerGesture);
    // assert
    expect(actual).toBe(victor);
  }
);

test("WHEN generateComputerGesture is called, THEN it should return rock, paper, or scissors", () => {
  // this is a nondeterministic function.  Consider running a few times for good measure.
  // arrange
  const validValues = Object.values(gestureConstants);

  // act
  const actual = generateComputerGesture();

  // assert
  expect(validValues).toContain(actual);
});
