// https://www.npmjs.com/package/fingerpose
// there are examples of the rock paper scissors gestures here.

import fp from "fingerpose";
import gestures from "./gestures";

const knownGestures = [
  gestures.PaperGesture,
  gestures.RockGesture,
  gestures.ScissorsGesture,
];

const classifyGestures = (handposeLandmarks, confidenceThreshold = 8.5) => {
  const GE = new fp.GestureEstimator(knownGestures);
  let estimations;
  if (handposeLandmarks.length > 0) {
    estimations = GE.estimate(handposeLandmarks, confidenceThreshold);
  } else return {};

  return estimations;
};

export default classifyGestures;
