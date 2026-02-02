import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { useEffect, useRef } from "react";

export default function PoseCamera({ onResults }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
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

    pose.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.poseLandmarks) {
        // ✅ เรียกจาก window
        window.drawConnectors(
          ctx,
          results.poseLandmarks,
          Pose.POSE_CONNECTIONS,
          { color: "#00FF00", lineWidth: 4 }
        );

        window.drawLandmarks(
          ctx,
          results.poseLandmarks,
          { color: "#FF0000", lineWidth: 2 }
        );
      }

      onResults?.(results);
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();
  }, []);

  return (
    <div className="relative w-[640px] h-[480px]">
      <video ref={videoRef} className="hidden" />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="rounded-xl border border-neutral-700"
      />
    </div>
  );
}
