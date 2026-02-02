import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { workoutClasses } from "../data/workouts";

import Header from "../components/exercise/Header";
import ProgressBar from "../components/exercise/ProgressBar";
import VideoPlayer from "../components/exercise/VideoPlayer";
import TimerCircle from "../components/exercise/TimerVertical";
import ControlButtons from "../components/exercise/ControlButtons";
import ExerciseInfo from "../components/exercise/ExerciseInfo";
import CompletionScreen from "../components/exercise/CompletionScreen";

export default function WorkoutTrainer() {
  const { id, sessionIndex } = useParams();
  const navigate = useNavigate();

  /* ===== ดึงข้อมูล session จาก data ===== */
  const workout = workoutClasses.find(w => w.id === id);
  const session = workout?.sessions?.[sessionIndex];

  /* ===== กัน error ถ้า URL ผิด ===== */
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

  const exercise = session.exercises[currentExercise];
  const progress = ((currentExercise + 1) / totalExercises) * 100;

  /* ===== Timer ===== */
  useEffect(() => {
    if (!isPlaying) return;

    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          if (currentExercise < totalExercises - 1) {
            setTimeout(nextExercise, 700);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isPlaying, currentExercise]);

  /* ===== Controls ===== */
  const nextExercise = () => {
    if (currentExercise < totalExercises - 1) {
      const next = currentExercise + 1;
      setCurrentExercise(next);
      setTimeLeft(session.exercises[next].duration ?? 10);
      setIsPlaying(true);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      const prev = currentExercise - 1;
      setCurrentExercise(prev);
      setTimeLeft(session.exercises[prev].duration ?? 10);
      setIsPlaying(true);
    }
  };

  /* ===== Finish Screen ===== */
  if (currentExercise === totalExercises - 1 && timeLeft === 0) {
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
      <Header
        session={session}
        onBack={() => navigate(-1)}
      />

      <div className="px-4 py-4 space-y-4">
        <ProgressBar
          current={currentExercise}
          total={totalExercises}
          progress={progress}
        />

        <VideoPlayer
          exercise={exercise}
          timeLeft={timeLeft}
        />

        <TimerCircle
          timeLeft={timeLeft}
          duration={exercise.duration ?? 10}
        />

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
      </div>
    </div>
  );
}
