export function analyzeSquat(landmarks, state) {
  const hip = landmarks[24];
  const knee = landmarks[26];
  const ankle = landmarks[28];

  if (!hip || !knee || !ankle) return state;

  const kneeAngle = calculateAngle(hip, knee, ankle);

  let { stage, reps } = state;

  const DOWN_ANGLE = 95;   // ย่อลงลึกพอ
  const UP_ANGLE = 165;    // ยืนตรงจริง
  const BUFFER = 5;        // กันมุมสั่น

  if (kneeAngle < DOWN_ANGLE - BUFFER && stage === "up") {
    stage = "down";
  }

  if (kneeAngle > UP_ANGLE + BUFFER && stage === "down") {
    stage = "up";
    reps += 1;
  }ฟ

  return { stage, reps, kneeAngle };
}