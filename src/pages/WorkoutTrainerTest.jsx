import { useState, useEffect } from "react";
import PoseCamera from "../components/PoseCamera";
import { checkSquatRep } from "../logic/squatLogic";

const EXERCISE_TIME = 45;

export default function WorkoutTrainerTest() {
  const [rep, setRep] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [timeLeft, setTimeLeft] = useState(EXERCISE_TIME);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const onResults = (results) => {
    if (!results.poseLandmarks) return;

    const result = checkSquatRep(results.poseLandmarks);
    setStatus(result.status);

    if (result.rep) {
      setRep((r) => r + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        Workout Trainer Test (AI)
      </h1>

      <div className="flex gap-6 text-xl">
        <div>⏱️ {timeLeft}s</div>
        <div>🔢 Reps: {rep}</div>
      </div>

      <div className={`text-2xl font-bold
        ${status === "correct" && "text-green-400"}
        ${status === "almost" && "text-yellow-400"}
        ${status === "wrong" && "text-red-400"}
      `}>
        {status.toUpperCase()}
      </div>

      <PoseCamera onResults={onResults} />
    </div>
  );
}
