import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { useEffect, useRef } from "react";

export default function PoseCamera({ onResults }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let camera;

    const pose = new Pose({
      locateFile: file =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(results => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // sync canvas size กับจอ
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // วาดภาพกล้อง
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.poseLandmarks) {
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

    camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 1280,
      height: 720,
    });

    camera.start();

    return () => {
      camera?.stop();
      pose.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      <video ref={videoRef} className="hidden" />
      <canvas
        ref={canvasRef}
        className="
          w-full h-full
          object-cover
          scale-x-[-1]
        "
      />
    </div>
  );
}