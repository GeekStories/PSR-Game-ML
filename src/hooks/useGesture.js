import { useRef, useEffect, useState } from "react";
import classifyGestures from "../gestures/gestureClassifier";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";

const useGesture = () => {
  const handPoseModelRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // on component load, instantiate the handpose model and begin the timer.  Don't forget it's asynchronous!
    const setup = async () => {
      if (!handPoseModelRef.current) {
        handPoseModelRef.current = await handpose.load();

        setReady(true); // currently this is the only way to get react hooks testing lib to know when ready.
      }
    };
    setup();
    return setReady(false);
  }, []);

  const detectGesture = async (canvas) => {
    if (!handPoseModelRef.current || !canvas) {
      return;
    }

    const landmarks = await getHandposeLandmarks(canvas, handpose);
    if(!landmarks || landmarks.length === 0) return null;

    const gestures = classifyGestures(landmarks[0]?.landmarks);
    return gestures?.gestures[0]?.name || [];
  };

  return detectGesture;
};

const getHandposeLandmarks = async (screenshot, handposeModel) => {
  const model = await handposeModel.load();
  const predictions = await model.estimateHands(screenshot, true);
  return predictions;
};

export default useGesture;
