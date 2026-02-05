import { calculateAngle } from "../utils/calculateAngle";

export function analyzeLunge(landmarks, state) {
  // ============================
  // ✅ Left Leg Landmarks
  // ============================
  const leftHip = landmarks[23];
  const leftKnee = landmarks[25];
  const leftAnkle = landmarks[27];

  // ============================
  // ✅ Right Leg Landmarks
  // ============================
  const rightHip = landmarks[24];
  const rightKnee = landmarks[26];
  const rightAnkle = landmarks[28];

  if (
    !leftHip || !leftKnee || !leftAnkle ||
    !rightHip || !rightKnee || !rightAnkle
  ) {
    return state;
  }

  // ============================
  // ✅ Calculate Both Knee Angles
  // ============================
  const leftAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
  const rightAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

  // ============================
  // ✅ Use Active Leg (Lower Angle)
  // ============================
  const rawAngle = Math.min(leftAngle, rightAngle);

  const activeLeg = leftAngle < rightAngle ? "left" : "right";

  let {
    stage,
    reps,
    smoothAngle,
    lastDownTime,
    lastRepTime,
  } = state;

  const now = Date.now();

  // ============================
  // ✅ Smooth Filter (EMA)
  // ============================
  const alpha = 0.25;

  smoothAngle =
    smoothAngle === null
      ? rawAngle
      : smoothAngle * (1 - alpha) + rawAngle * alpha;

  // ============================
  // ✅ Thresholds
  // ============================
  const DOWN_ANGLE = 95;
  const UP_ANGLE = 165;

  const HOLD_TIME = 250;
  const COOLDOWN = 600;

  // ============================
  // ✅ Stage Transition Logic
  // ============================

  // Down Position
  if (smoothAngle < DOWN_ANGLE && stage === "up") {
    stage = "down";
    lastDownTime = now;
  }

  // Up Position → Count Rep
  if (
    smoothAngle > UP_ANGLE &&
    stage === "down" &&
    now - lastDownTime > HOLD_TIME &&
    now - (lastRepTime || 0) > COOLDOWN
  ) {
    stage = "up";
    reps += 1;
    lastRepTime = now;
  }

  // ============================
  // ✅ Return Updated State
  // ============================
  return {
    reps,
    stage,

    // Debug Info
    rawAngle,
    smoothAngle,
    leftAngle,
    rightAngle,
    activeLeg,

    lastDownTime,
    lastRepTime,
  };
}
