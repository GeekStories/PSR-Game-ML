import App from "./App";
import React from "react";
import * as useCountdown from "react-countdown-hook";
import { render } from "@testing-library/react";
import * as gameLogic from "component/game/gamelogic";
import gestureConstants from "gestures/gestureConstants";
import useGesture from "hooks/useGesture";
import * as Webcam from "react-webcam";
import "@tensorflow/tfjs-backend-cpu";
import getImageCanvas from "testData/canvasHelper";

jest.mock("react-countdown-hook");
jest.mock("react-webcam");
jest.mock("hooks/useGesture");

let generateComputerGestureSpy;
let ascertainVictorSpy;

beforeEach(() => {
  generateComputerGestureSpy = jest.spyOn(gameLogic, "generateComputerGesture");
  ascertainVictorSpy = jest.spyOn(gameLogic, "ascertainVictor");
});

test.skip("Should Render without error", () => {
  render(<App />);
});

test.skip("Should not run the game when the timer is not 0", async (done) => {
  useCountdown.mockImplementation((initialTime, interval) => [
    3000,
    {
      start: jest.fn().mockImplementation(() => {
        console.log("start the timer");
      }),
      reset: jest.fn(),
    },
  ]);
  render(<App />);
  expect(generateComputerGestureSpy).not.toHaveBeenCalled();
  done();
});

test.skip("should play a game on timer finish", async (done) => {
  await mockWebcam();
  useGesture.mockImplementation(() => jest.fn(() => gestureConstants.ROCK));
  const detectGesture = useGesture();
  triggerTimer();
  generateComputerGestureSpy.mockImplementation(() => gestureConstants.ROCK);
  render(<App />);
  expect(generateComputerGestureSpy).toHaveBeenCalled();
  expect(ascertainVictorSpy).toHaveBeenCalledWith(
    gestureConstants.ROCK,
    gestureConstants.ROCK
  );
  done();
});

const triggerTimer = () => {
  useCountdown.mockImplementation((initialTime, interval) => [
    0,
    {
      start: jest.fn().mockImplementation(() => {
        console.log("start the timer");
      }),
      reset: jest.fn(),
    },
  ]);
};

const mockWebcam = async () => {
  const ctx = await getImageCanvas();
  Webcam.mockImplementation(() => {
    React.forwardRef((props, refProp) => {
      const [canvas, setCanvas] = React.useState();
      let ref = refProp;
      ref.current = {};
      ref.current.getCanvas = () => ctx;
      const onUserMedia = jest.fn();
      const onUserMediaError = jest.fn();
      return null;
    });
  });
};
