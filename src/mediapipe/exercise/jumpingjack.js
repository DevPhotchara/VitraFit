export function analyzeJumpingJack(landmarks, state) {

  const leftWrist = landmarks[15];
  const rightWrist = landmarks[16];
  const leftAnkle = landmarks[27];
  const rightAnkle = landmarks[28];
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];

  // Calculate shoulder width
  const shoulderWidth = leftShoulder && rightShoulder ? Math.abs(leftShoulder.x - rightShoulder.x) : null;

  if (!leftWrist || !rightWrist || !leftAnkle || !rightAnkle)
    return state;

  let { stage, reps, lastRepTime } = state;
  const now = Date.now();

  /* ============================
     ✅ Thresholds (ปรับให้ realistic)
  ============================ */

  // มือสูงกว่าศีรษะ (ค่า y ต่ำ = สูง)
  const HANDS_UP_Y = 0.32;


  // เท้าแยกออก (ค่า x distance)
  // If shoulderWidth is available, use dynamic threshold, else fallback to default
  const FEET_APART_X = shoulderWidth ? shoulderWidth * 1.8 : 0.30;

  // กันนับรัว (ms)
  const COOLDOWN = 600;

  /* ============================
     ✅ Detect Conditions
  ============================ */

  const handsUp =
    leftWrist.y < HANDS_UP_Y &&
    rightWrist.y < HANDS_UP_Y;

  const feetApart =
    Math.abs(leftAnkle.x - rightAnkle.x) > FEET_APART_X;

  /* ============================
     ✅ Stage Logic
  ============================ */

  // Default stage
  if (!stage) stage = "down";

  // DOWN Position (พร้อมเริ่ม rep ใหม่)
  if (!handsUp && !feetApart && stage === "up") {
    stage = "down";
  }

  // UP Position → Count Rep
  if (
    handsUp &&
    feetApart &&
    stage === "down" &&
    now - (lastRepTime || 0) > COOLDOWN
  ) {
    stage = "up";
    reps += 1;
    lastRepTime = now;
  }

  /* ============================
     ✅ Return State + Debug
  ============================ */

  return {
    reps,
    stage,
    lastRepTime,

    // Debug Info
    handsUp,
    feetApart,
    cooldownReady: now - (lastRepTime || 0) > COOLDOWN,
  };
}
