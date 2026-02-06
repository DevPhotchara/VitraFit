import { useEffect, useRef } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";

export default function PoseCamera({
  onResults,
  isPlaying,
  cameraId, // ✅ รับ deviceId จาก parent
}) {
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const poseRef = useRef(null);

  /* ===============================
     ✅ Init Pose Detector
  =============================== */
  useEffect(() => {
    if (!videoRef.current) return;

    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    pose.onResults(onResults);

    poseRef.current = pose;

    return () => {
      pose.close();
    };
  }, []);

  /* ===============================
     ✅ Start Camera (with deviceId)
  =============================== */
  useEffect(() => {
    if (!videoRef.current) return;
    if (!poseRef.current) return;

    async function startCamera() {
      // stop old camera first
      if (cameraRef.current) {
        cameraRef.current.stop();
      }

      console.log("🎥 Starting camera with ID:", cameraId);

      cameraRef.current = new Camera(videoRef.current, {
        onFrame: async () => {
          if (poseRef.current && isPlaying) {
            await poseRef.current.send({
              image: videoRef.current,
            });
          }
        },

        width: 1280,
        height: 720,

        // ✅ Use selected camera
        deviceId: cameraId ? cameraId : undefined,
      });

      cameraRef.current.start();
    }

    startCamera();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, [cameraId]); // ✅ restart when camera changes

  /* ===============================
     UI Render
  =============================== */
  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover scale-x-[-1]"
      />
    </div>
  );
}
