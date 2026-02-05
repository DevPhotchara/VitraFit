// src/mediapipe/initPoseDetector.js

import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";

export function initPoseDetector(videoEl, onResults) {
  let lastTime = 0;

  // ============================
  // ✅ Setup Pose Model
  // ============================
  const pose = new Pose({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
  });

  pose.setOptions({
    modelComplexity: 1, // 🔥 เบาสุด ลื่นสุด
    smoothLandmarks: true,

    minDetectionConfidence: 0.75,
    minTrackingConfidence: 0.75,
  });

  // ============================
  // ✅ Results Callback (FPS Limit)
  // ============================
  pose.onResults((results) => {
    const now = performance.now();

    // 🔥 จำกัด FPS ประมาณ 20fps กันกระตุก
    if (now - lastTime < 50) return;
    lastTime = now;

    onResults(results);
  });

  // ============================
  // ✅ Camera Setup
  // ============================
  const camera = new Camera(videoEl, {
    onFrame: async () => {
      if (videoEl.readyState >= 2) {
        await pose.send({ image: videoEl });
      }
    },

    width: 960,
    height: 540,
  });

  camera.start();

  // ============================
  // ✅ Return Controller
  // ============================
  return {
    pose,
    camera,

    stop: () => {
      camera.stop();
      pose.close();
    },
  };
}