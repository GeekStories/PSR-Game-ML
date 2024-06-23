import classifyGestures from "./gestureClassifier";
import testHandposeGestures from "./testdata/handpose/testHandposeGestures";
import CustomGestures from "./gestureConstants";

// arrange
test.each`
  handposeGesture                  | classification
  ${testHandposeGestures.ROCK}     | ${CustomGestures.ROCK}
  ${testHandposeGestures.PAPER}    | ${CustomGestures.PAPER}
  ${testHandposeGestures.SCISSORS} | ${CustomGestures.SCISSORS}
`(
  "GIVEN handpose landmarks for a  $classification, WHEN classifyGestures is called, it will return classifications for $classification",
  ({ handposeGesture, classification }) => {
    // act
    const actual = classifyGestures(handposeGesture.landmarks);

    // assert
    expect(actual?.gestures).toBeDefined();
    expect(actual?.poseData).toBeDefined();
    expect(actual.gestures[0].name).toBe(classification);
  }
);
