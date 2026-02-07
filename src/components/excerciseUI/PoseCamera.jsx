// src/components/excerciseUI/PoseCamera.jsx

import { useEffect, useRef } from "react";
import { initPoseDetector } from "../../mediapipe/initPoseDetector";

export default function PoseCamera({ onResults }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const onResultsRef = useRef(onResults);

  useEffect(() => {
    onResultsRef.current = onResults;
  }, [onResults]);

  useEffect(() => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // ✅ เต็มจอแนวตั้ง
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const detector = initPoseDetector(videoRef.current, (results) => {
      if (!results?.poseLandmarks) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ============================
      // ✅ COVER MODE (เต็มจอแบบ TikTok)
      // ============================
      const imgW = results.image.width;
      const imgH = results.image.height;

      const canvasW = canvas.width;
      const canvasH = canvas.height;

      const scale = Math.max(canvasW / imgW, canvasH / imgH);

      const drawW = imgW * scale;
      const drawH = imgH * scale;

      const offsetX = (canvasW - drawW) / 2;
      const offsetY = (canvasH - drawH) / 2;

      ctx.drawImage(results.image, offsetX, offsetY, drawW, drawH);

      // ============================
      // 🟠 Draw Landmarks
      // ============================
      ctx.save();
      ctx.fillStyle = "orange";

      results.poseLandmarks.forEach((lm, index) => {
        if (index <= 10) return;

        const x = offsetX + lm.x * drawW;
        const y = offsetY + lm.y * drawH;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      onResultsRef.current?.(results);
    });

    return () => detector.stop();
  }, []);

  return (
    <div
      className="
        fixed inset-0 bg-black
        z-[10]
        pointer-events-none
      "
    >
      {/* video hidden */}
      <video ref={videoRef} className="hidden" />

      {/* canvas full screen */}
      <canvas
        ref={canvasRef}
        className="
          w-full h-full
          scale-x-[-1]
          pointer-events-none
        "
      />
    </div>
  );
}
