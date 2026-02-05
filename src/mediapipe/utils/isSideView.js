export function isSideView(landmarks) {
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];

  if (!leftShoulder || !rightShoulder) return false;

  // ระยะห่างแนวนอนของหัวไหล่
  const shoulderWidth = Math.abs(leftShoulder.x - rightShoulder.x);

  // ถ้าหันข้างจริง should be small
  return shoulderWidth < 0.12;
}
