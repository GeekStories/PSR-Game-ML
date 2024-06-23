import { renderHook } from "@testing-library/react-hooks";
import gestureConstants from "../gestures/gestureConstants";
import getImageCanvas from "../testData/canvasHelper";
import useGesture from "./useGesture";
import * as handpose from "@tensorflow-models/handpose";
import mockTestHandposeGestures from "../gestures/testdata/handpose/testHandposeGestures";

jest.mock("@tensorflow-models/handpose");

test("it runs without error", () => {
  const { result } = renderHook(() => useGesture());
});

test("GIVEN handpose sees a rock, WHEN detectGesture is called, THEN it will return rock", async () => {
  handpose.load.mockResolvedValue({
    estimateHands: () => Promise.resolve([mockTestHandposeGestures.ROCK]),
  });

  const canvas = await getImageCanvas();
  const { result: detectGesture, waitForNextUpdate } = renderHook(() =>
    useGesture()
  );
  await waitForNextUpdate();
  const actual = await detectGesture.current(canvas);
  const expected = gestureConstants.ROCK;
  expect(actual).toBe(expected);
});

test("GIVEN handpose sees paper, WHEN detectGesture is called, THEN it will return paper", async () => {
  handpose.load.mockResolvedValue({
    estimateHands: () => Promise.resolve([mockTestHandposeGestures.PAPER]),
  });

  const canvas = await getImageCanvas();
  const { result: detectGesture, waitForNextUpdate } = renderHook(() =>
    useGesture()
  );
  await waitForNextUpdate();
  const actual = await detectGesture.current(canvas);
  const expected = gestureConstants.PAPER;
  expect(actual).toBe(expected);
});

test("GIVEN handpose sees scissors, WHEN detectGesture is called, THEN it will return scissors", async () => {
  handpose.load.mockResolvedValue({
    estimateHands: () => Promise.resolve([mockTestHandposeGestures.SCISSORS]),
  });

  const canvas = await getImageCanvas();
  const { result: detectGesture, waitForNextUpdate } = renderHook(() =>
    useGesture()
  );
  await waitForNextUpdate();
  const actual = await detectGesture.current(canvas);
  const expected = gestureConstants.SCISSORS;
  expect(actual).toBe(expected);
});

test("GIVEN an image of nothing, WHEN detectGesture is called, THEN it will detect nothing", async () => {
  handpose.load.mockResolvedValue({
    estimateHands: () => Promise.resolve(),
  });

  const canvas = await getImageCanvas();
  const { result: detectGesture, waitForNextUpdate } = renderHook(() =>
    useGesture()
  );
  await waitForNextUpdate();
  const actual = await detectGesture.current(canvas);
  expect(actual).toBeNull();
});
