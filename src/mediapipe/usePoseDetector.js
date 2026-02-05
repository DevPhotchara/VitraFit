
import { useEffect, useRef, useState } from "react";
import { isSideView } from "./utils/isSideView";

import { analyzeSquat } from "./exercise/squat";
import { analyzeLunge } from "./exercise/lunge";
import { analyzeJumpingJack } from "./exercise/jumpingjack";



/* ============================
   ✅ Only 3 Exercises Now
============================ */
const analyzers = {
  squat: analyzeSquat,
  lunge: analyzeLunge,
  jumpingjack: analyzeJumpingJack,
};

/* ============================
   ✅ Main Hook
============================ */
export function usePoseDetector(exercise, onFinish) {
    const [ready, setReady] = useState(false);
  const [state, setState] = useState({
    reps: 0,
    stage: "up",

    smoothAngle: null,
    lastDownTime: 0,
    lastRepTime: 0,

    debug: {},
  });

  // ✅ กัน finish ถูกเรียกซ้ำ
  const finishedRef = useRef(false);

  /* ============================
     ✅ Reset เมื่อเปลี่ยนท่า
  ============================ */
  useEffect(() => {
    setState({
      reps: 0,
      stage: "up",
      smoothAngle: null,
      lastDownTime: 0,
      lastRepTime: 0,
      debug: {},
    });

    finishedRef.current = false;
  }, [exercise?.key]);

  /* ============================
     ✅ Handle Pose Landmarks
  ============================ */
  function handleLandmarks(landmarks) {

    if (!exercise?.key) return;

    // ✅ Squat ต้องหันข้างก่อนเริ่มนับ
    if (exercise.key === "squat") {
      const ok = isSideView(landmarks);
      setReady(ok);
      if (!ok) return; // ❌ ยังไม่เริ่มนับ
    } else {
      setReady(true); // ท่าอื่นพร้อมเสมอ
    }

    const analyzer = analyzers[exercise.key];
    if (!analyzer) return;

    setState((prev) => {
      const newState = analyzer(landmarks, prev);

      // ✅ Debug Overlay Info (Safe)
      newState.debug = {
        reps: newState.reps,
        stage: newState.stage,
        rawAngle: newState.rawAngle ?? null,
        smoothAngle: newState.smoothAngle ?? null,
        formError: newState.formError,
        isValid: newState.isValid,
      };

      // ✅ Auto Finish (เรียกครั้งเดียว)
      if (
        exercise.reps &&
        newState.reps >= exercise.reps &&
        !finishedRef.current
      ) {
        finishedRef.current = true;
        onFinish?.();
      }

      return newState;
    });
  }

  /* ============================
     ✅ Manual Adjust Buttons
  ============================ */
  function adjustReps(amount) {
    setState((prev) => ({
      ...prev,
      reps: Math.max(prev.reps + amount, 0),
    }));
  }

  function resetReps() {
    setState((prev) => ({
      ...prev,
      reps: 0,
      stage: "up",
    }));
  }

  /* ============================
     ✅ Export
  ============================ */
  return {
    reps: state.reps,
    stage: state.stage,
    debugInfo: state.debug,
    ready,
    handleLandmarks,
    adjustReps,
    resetReps,
  };
}
