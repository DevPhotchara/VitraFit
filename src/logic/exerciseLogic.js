export function checkExercise(exerciseName, landmarks) {
  if (!landmarks) return false;

  switch (exerciseName) {
    case "Squat + Knee to Elbow Crunch":
      return squatKneeCrunch(landmarks);

    case "Ghost Rope":
      return ghostRope(landmarks);

    default:
      return false;
  }
}

/* ----------------- LOGIC ----------------- */

function squatKneeCrunch(lm) {
  const leftKnee = lm[25];
  const leftElbow = lm[13];
  const leftHip = lm[23];

  const kneeNearElbow =
    Math.abs(leftKnee.y - leftElbow.y) < 0.08;

  const squat =
    leftHip.y > 0.55;

  return kneeNearElbow && squat;
}

function ghostRope(lm) {
  const leftWrist = lm[15];
  const rightWrist = lm[16];

  const handsMoving =
    Math.abs(leftWrist.y - rightWrist.y) > 0.02;

  return handsMoving;
}
