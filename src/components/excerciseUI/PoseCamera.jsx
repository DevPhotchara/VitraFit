import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { useEffect, useRef } from "react";

export default function PoseCamera({ onResults }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let camera;

    // ============================
    // ✅ Setup Mediapipe Pose
    // ============================
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    // ============================
    // ✅ Results Callback
    // ============================
    pose.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Sync canvas กับหน้าจอจริง
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ============================
      // 📷 Draw Camera Fullscreen
      // ============================
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      // ============================
      // 🟠 Body Dots Only (No Face)
      // ============================
      if (results.poseLandmarks) {
        ctx.save();

        results.poseLandmarks.forEach((lm, index) => {
          // ❌ Skip Face Landmarks (0–10)
          if (index <= 10) return;

          const x = lm.x * canvas.width;
          const y = lm.y * canvas.height;

          // Draw Dot
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);

          // 🔥 Neon Orange Glow
          ctx.fillStyle = "rgba(255, 140, 0, 0.85)";
          ctx.shadowColor = "#ff5100";
          ctx.shadowBlur = 25;

          ctx.fill();
        });

        ctx.restore();
      }

      // ส่ง results กลับไปใช้ต่อ (เช่น นับ squat)
      onResults?.(results);
    });

    // ============================
    // ✅ Start Camera
    // ============================
    camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 1280,
      height: 720,
    });

    camera.start();

    // ============================
    // Cleanup
    // ============================
    return () => {
      camera?.stop();
      pose.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      {/* video hidden (ใช้แค่ input ให้ mediapipe) */}
      <video ref={videoRef} className="hidden" />

      {/* canvas overlay */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover scale-x-[-1]"
      />
    </div>
  );
}