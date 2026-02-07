import { useState, useEffect, useRef } from "react";
import { usePoseDetector } from "../mediapipe/usePoseDetector";
import { useParams, useNavigate } from "react-router-dom";
import { workoutClasses } from "../data/workouts";

import Header from "../components/excerciseUI/Header";
import ProgressBar from "../components/excerciseUI/ProgressBar";
import VideoPlayer from "../components/excerciseUI/PoseCamera";
import TimerCircle from "../components/excerciseUI/TimerVertical";
import ControlButtons from "../components/excerciseUI/ControlButtons";
import ExerciseInfo from "../components/excerciseUI/ExerciseInfo";
import CompletionScreen from "../components/excerciseUI/CompletionScreen";
import RepCounterOverlay from "../components/excerciseUI/RepCounterOverlay";


import SideViewOverlay from "../components/excerciseUI/SideViewOverlay";
import FormErrorOverlay from "../components/excerciseUI/FormErrorOverlay";

/* ============================
   DEBUG Overlay (Dev Only)
============================ */
function DebugOverlay({ debugInfo }) {
  if (!debugInfo) return null;

  return (
    <div className="fixed top-12 right-3 z-[5000] rounded-xl bg-black/70 px-4 py-3 text-sm text-white shadow-lg">
      <b className="text-orange-400">DEBUG</b>
      {Object.entries(debugInfo).map(([k, v]) => (
        <div key={k}>
          <b>{k}:</b>{" "}
          {typeof v === "object" ? JSON.stringify(v) : String(v)}
        </div>
      ))}
    </div>
  );
}

export default function WorkoutTrainer() {
  const { id, sessionIndex } = useParams();
  const navigate = useNavigate();

  const workout = workoutClasses.find((w) => w.id === id);
  const session = workout?.sessions?.[sessionIndex];

  if (!workout || !session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>ไม่พบข้อมูลการออกกำลังกาย</p>
      </div>
    );
  }

  const totalExercises = session.exercises.length;

  /* ============================
     STATE
  ============================ */
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [showOverlay, setShowOverlay] = useState(true);

  // ✅ Debug Toggle
  const [showDebug, setShowDebug] = useState(false);

  const exercise = session.exercises[currentExercise];
  const isRepExercise = !exercise?.duration;

  const [timeLeft, setTimeLeft] = useState(exercise.duration ?? 10);

  const progress = ((currentExercise + 1) / totalExercises) * 100;

  /* ============================
     Pose Detector Hook
  ============================ */
  const {
    reps,
    debugInfo,
    handleLandmarks,
    adjustReps,
    resetReps,
    ready,
  } = usePoseDetector(exercise);

  /* ============================
     กัน nextExercise ซ้ำ
  ============================ */
  const movedRef = useRef(false);

  /* ============================
     NEXT Exercise
  ============================ */
  const nextExercise = () => {
    if (movedRef.current) return;
    movedRef.current = true;

    if (currentExercise < totalExercises - 1) {
      const next = currentExercise + 1;

      setCurrentExercise(next);
      setTimeLeft(session.exercises[next].duration ?? 10);
      setIsPlaying(true);

      setTimeout(() => {
        movedRef.current = false;
      }, 500);
    }
  };

  /* ============================
     PREV Exercise
  ============================ */
  const prevExercise = () => {
    if (currentExercise > 0) {
      const prev = currentExercise - 1;

      setCurrentExercise(prev);
      setTimeLeft(session.exercises[prev].duration ?? 10);
      setIsPlaying(true);
    }
  };

  /* ============================
     TIMER (เฉพาะ Plank)
  ============================ */
  useEffect(() => {
    if (!isPlaying) return;
    if (isRepExercise) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          setTimeout(() => nextExercise(), 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentExercise]);

  /* ============================
     AUTO NEXT (Reps)
  ============================ */
  useEffect(() => {
    if (!isRepExercise) return;
    if (!exercise.reps) return;

    if (reps >= exercise.reps) {
      setTimeout(() => nextExercise(), 700);
    }
  }, [reps]);

  /* ============================
     FINISH SCREEN
  ============================ */
  const isLastExercise = currentExercise === totalExercises - 1;

  const finished =
    (!isRepExercise && timeLeft === 0) ||
    (isRepExercise && reps >= (exercise.reps ?? 0));

  if (isLastExercise && finished) {
    return (
      <CompletionScreen
        session={session}
        totalExercises={totalExercises}
        onBack={() => navigate(-1)}
      />
    );
  }

  /* ============================
     UI Render
  ============================ */
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header session={session} onBack={() => navigate(-1)} />

      <ProgressBar progress={progress} />

      {/* 📷 Camera */}
      <VideoPlayer
        isPlaying={isPlaying}
        onResults={(results) => {
          if (results?.poseLandmarks && isRepExercise && isPlaying) {
            handleLandmarks(results.poseLandmarks);
          }
        }}
      />

      {/* ✅ Overlay: Squat ต้องหันข้าง */}
    {exercise.key === "squat" && !ready && (
      <SideViewOverlay />
    )}

      {/* ⏱ Timer */}
      {!isRepExercise && (
        <TimerCircle
          timeLeft={timeLeft}
          duration={exercise.duration ?? 10}
          onReset={() => setTimeLeft(exercise.duration ?? 10)}
        />
      )}


      {/* 🔥 Rep Counter HUD */}
      {isRepExercise && (
        <>
          <FormErrorOverlay message={debugInfo?.formError} />
          <RepCounterOverlay
            reps={reps}
            targetReps={exercise.reps ?? 15}
            onAdjust={(val) => {
              if (val === "reset") resetReps();
              else adjustReps(val);
            }}
          />
        </>
      )}

      <ExerciseInfo
        exercise={exercise}
        currentIndex={currentExercise + 1}
        totalExercises={totalExercises}
      />

      <ControlButtons
        isPlaying={isPlaying}
        onPause={() => setIsPlaying(false)}
        onResume={() => setIsPlaying(true)}
        onNext={nextExercise}
        onPrev={prevExercise}
        showNext={currentExercise < totalExercises - 1}
        showPrev={currentExercise > 0}
      />

      {/* 🐞 DEBUG Button Top Right */}
      <button
        onClick={() => setShowDebug((prev) => !prev)}
        className="fixed top-3 right-3 z-[6000]
                   text-xs font-bold tracking-wide
                   px-3 py-1 rounded-lg
                   border border-orange-400/30
                   bg-black/40
                   transition
                   hover:text-orange-300
                   text-orange-400"
      >
        DEBUG
      </button>

      {/* ✅ Debug Overlay (Show only when enabled) */}
      {showDebug && <DebugOverlay debugInfo={debugInfo} />}
    </div>
  );
}
