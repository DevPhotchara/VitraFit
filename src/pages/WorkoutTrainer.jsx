import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { workoutClasses } from "../data/workouts/test.js";
import PoseCamera from "../components/excerciseUI/PoseCamera";
import { analyzeSquat } from "../mediapipe/exercise/squat";

import Header from "../components/excerciseUI/Header";
import ProgressBar from "../components/excerciseUI/ProgressBar";
import VideoPlayer from "../components/excerciseUI/VideoPlayer";
import TimerCircle from "../components/excerciseUI/TimerVertical";
import ControlButtons from "../components/excerciseUI/ControlButtons";
import ExerciseInfo from "../components/excerciseUI/ExerciseInfo";
import CompletionScreen from "../components/excerciseUI/CompletionScreen";

export default function WorkoutTrainer() {
  const { id, sessionIndex } = useParams();
  const navigate = useNavigate();

  const workout = workoutClasses.find(w => w.id === id);
  const session = workout?.sessions?.[sessionIndex];

  if (!workout || !session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>ไม่พบข้อมูลการออกกำลังกาย</p>
      </div>
    );
  }

  const totalExercises = session.exercises.length;

  const [currentExercise, setCurrentExercise] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(
    session.exercises[0].duration ?? 10
  );

  /* ✅ Pose Squat State */
  const [squatState, setSquatState] = useState({
    stage: "up",
    reps: 0,
  });

  const exercise = session.exercises[currentExercise];
  const progress = ((currentExercise + 1) / totalExercises) * 100;

  /* ===== Timer ทำงานเฉพาะ Exercise ปกติ ===== */
  useEffect(() => {
    if (!isPlaying) return;
    if (exercise.usePose) return; // ✅ Pose ไม่ใช้ timer

    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          setTimeout(nextExercise, 700);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isPlaying, currentExercise]);

  /* ===== Pose Results ===== */
  const handlePoseResults = (results) => {
    if (!results.poseLandmarks) return;

    const updated = analyzeSquat(results.poseLandmarks, squatState);
    setSquatState(updated);
  };

  /* ===== Pose Target Reps → Next ===== */
  useEffect(() => {
    if (!exercise.usePose) return;

    const target = exercise.targetReps ?? 10;

    if (squatState.reps >= target) {
      setTimeout(nextExercise, 800);
    }
  }, [squatState.reps]);

  /* ===== Next Exercise ===== */
  const nextExercise = () => {
    if (currentExercise < totalExercises - 1) {
      const next = currentExercise + 1;
      const nextEx = session.exercises[next];

      setCurrentExercise(next);

      if (nextEx.usePose) {
        setTimeLeft(0); // ✅ Pose ไม่ต้องมีเวลา
      } else {
        setTimeLeft(nextEx.duration ?? 10);
      }

      setIsPlaying(true);
      setSquatState({ stage: "up", reps: 0 });
    }
  };

  /* ===== Finish Screen ===== */
  if (currentExercise === totalExercises - 1 && !exercise.usePose && timeLeft === 0) {
    return (
      <CompletionScreen
        session={session}
        totalExercises={totalExercises}
        onBack={() => navigate(-1)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header session={session} onBack={() => navigate(-1)} />

      <div className="px-4 py-4 space-y-4">
        <ProgressBar
          current={currentExercise}
          total={totalExercises}
          progress={progress}
        />

        {/* ✅ Video หรือ Pose */}
        {exercise.usePose ? (
          <PoseCamera onResults={handlePoseResults} />
        ) : (
          <VideoPlayer exercise={exercise} />
        )}

        {/* ✅ Timer หรือ Reps */}
        {exercise.usePose ? (
          <div className="text-center text-3xl font-bold py-4">
            Squat: {squatState.reps} / {exercise.targetReps ?? 10}
          </div>
        ) : (
          <TimerCircle
            timeLeft={timeLeft}
            duration={exercise.duration ?? 10}
          />
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
        />
      </div>
    </div>
  );
}