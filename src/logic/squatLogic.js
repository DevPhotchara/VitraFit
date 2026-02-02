import { calculateAngle } from "../utils/angle";

let stage = "up"; // up | down

export function checkSquatRep(landmarks) {
  const hip = landmarks[23];   // left hip
  const knee = landmarks[25]; // left knee
  const ankle = landmarks[27];

  const kneeAngle = calculateAngle(hip, knee, ankle);

  // 🔽 Squat ลง
  if (kneeAngle < 100 && stage === "up") {
    stage = "down";
    return { status: "almost", rep: false };
  }

  // 🔼 กลับมายืน = 1 rep
  if (kneeAngle > 160 && stage === "down") {
    stage = "up";
    return { status: "correct", rep: true };
  }

  if (kneeAngle < 120) {
    return { status: "almost", rep: false };
  }

  return { status: "wrong", rep: false };
}
