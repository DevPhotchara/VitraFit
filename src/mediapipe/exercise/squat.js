import { calculateAngle } from "../utils/calculateAngle";

/* ============================
   ✅ Detect Front Leg Only
============================ */
function getFrontLeg(landmarks) {
  const left = {
    hip: landmarks[23],
    knee: landmarks[25],
    ankle: landmarks[27],
  };

  const right = {
    hip: landmarks[24],
    knee: landmarks[26],
    ankle: landmarks[28],
  };

  if (
    !left.hip || !left.knee || !left.ankle ||
    !right.hip || !right.knee || !right.ankle
  )
    return null;

  return left.knee.visibility > right.knee.visibility
    ? { side: "left", ...left }
    : { side: "right", ...right };
}

/* ============================
   ✅ Main Squat Analyzer
============================ */
export function analyzeSquat(landmarks, state) {
  const leg = getFrontLeg(landmarks);
  if (!leg) return state;

  const { hip, knee, ankle, side } = leg;
  const rawAngle = calculateAngle(hip, knee, ankle);

  let {
    stage = "up",
    reps = 0,
    smoothAngle = null,

    lastDownTime = 0,
    lastRepTime = 0,

    minAngle = 999,
    shallowCount = 0,

    kneeMissingFrames = 0,
    formError = null,
  } = state;

  const now = Date.now();

  /* ============================
     ✅ Smooth Filter (1.5m Stable)
  ============================ */
  const alpha = 0.15;
  smoothAngle =
    smoothAngle === null
      ? rawAngle
      : smoothAngle * (1 - alpha) + rawAngle * alpha;

  /* ============================
     ✅ Thresholds (1.5m Mode)
  ============================ */
  const DOWN_ANGLE = 110;
  const UP_ANGLE = 155;

  const HOLD_TIME = 200;
  const COOLDOWN = 500;

  /* ============================
     ✅ Visibility Soft Warning
  ============================ */
  if (knee.visibility < 0.3) kneeMissingFrames++;
  else kneeMissingFrames = 0;

  if (kneeMissingFrames > 20) {
    formError = "หันข้างให้ชัดขึ้นนิดนึง 👀";
  }

  /* ============================
     ✅ Stage Logic
  ============================ */

  // ลง
  if (smoothAngle < DOWN_ANGLE && stage === "up") {
    stage = "down";
    lastDownTime = now;

    minAngle = 999;
    formError = null;
  }

  // Track deepest squat
  if (stage === "down") {
    minAngle = Math.min(minAngle, smoothAngle);
  }

  // ขึ้น → นับ rep เสมอ
  if (
    smoothAngle > UP_ANGLE &&
    stage === "down" &&
    now - lastDownTime > HOLD_TIME &&
    now - lastRepTime > COOLDOWN
  ) {
    stage = "up";
    reps += 1;
    lastRepTime = now;

    /* ============================
       ✅ Feedback System (No Spam)
    ============================ */

    // ลักไก่ชัดเจน
    if (minAngle > 165) shallowCount++;
    else shallowCount = 0;

    // เตือนเฉพาะลักไก่ติดกัน 2 reps
    if (shallowCount >= 2) {
      formError = "ลักไก่แล้วนะ 😏 ลงลึกอีกหน่อย!";
    }

    // ชมเฉพาะลึกมากจริง ๆ
    else if (minAngle < 120) {
      formError = "สวยมาก! 🔥";
    }

    // ปกติ = เงียบ
    else {
      formError = null;
    }
  }

  /* ============================
     ✅ Return State
  ============================ */
  return {
    reps,
    stage,

    rawAngle,
    smoothAngle,

    activeSide: side,
    kneeVisibility: knee.visibility,

    formError,

    minAngle,
    shallowCount,
    kneeMissingFrames,

    lastDownTime,
    lastRepTime,
  };
}
