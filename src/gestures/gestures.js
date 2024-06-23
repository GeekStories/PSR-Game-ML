// In this file, define and export the RPS gestures
import { GestureDescription, Finger, FingerCurl } from "fingerpose";
import GestureConstants from "./gestureConstants";

const RockGesture = new GestureDescription(GestureConstants.ROCK);
// all fingers are curled
RockGesture.addCurl(Finger.Index, FingerCurl.FullCurl);
RockGesture.addCurl(Finger.Middle, FingerCurl.FullCurl);
RockGesture.addCurl(Finger.Ring, FingerCurl.FullCurl);
RockGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl);

const PaperGesture = new GestureDescription(GestureConstants.PAPER);
// all fingers are stretched out
PaperGesture.addCurl(Finger.Index, FingerCurl.NoCurl);
PaperGesture.addCurl(Finger.Middle, FingerCurl.NoCurl);
PaperGesture.addCurl(Finger.Ring, FingerCurl.NoCurl);
PaperGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl);
PaperGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl);

const ScissorsGesture = new GestureDescription(GestureConstants.SCISSORS);
// index and middle finger: stretched out
ScissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl);
ScissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl);

// ring: curled
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl);
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl);

// pinky: curled
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl);
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl);

const gestures = { RockGesture, PaperGesture, ScissorsGesture };
export default gestures;
