import { Clock, Zap } from "lucide-react";

export default function ExerciseInfoOverlay({ exercise, currentIndex = 1, totalExercises = 1 }) {
  return (
    <div className="absolute bottom-4 left-6 right-6 z-20">
      <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-orange-200/10 backdrop-blur-xl rounded-3xl px-8 py-8 border border-orange-400/30 shadow-2xl overflow-hidden">

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/30 animate-pulse"></div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/20 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative flex items-center justify-between">

          {/* Exercise Name + Duration + Intensity */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-12 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
              <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-lg">
                {exercise?.name || "-"}
              </h2>
            </div>

            <div className="flex items-center gap-4 ml-2 my-2">
              <div className="flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-400/30">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="text-xl font-semibold text-white">
                  {exercise?.duration || 0}s
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-xl font-medium">High Intensity</span>
              </div>
            </div>
          </div>

          {/* Current / Remaining Exercises ฝั่งขวา (แบบตัวเลข 1/10) */}
          <div className="flex flex-col items-center bg-orange-500/20 backdrop-blur-xl px-8 py-3 rounded-3xl border border-orange-400/30">
            <span className="text-white font-semibold text-2xl">{currentIndex}/{totalExercises}</span>
            <div className="w-16 h-2 bg-white/20 rounded-full mt-1">
              <div
                className="h-2 bg-orange-400 rounded-full"
                style={{ width: `${(currentIndex / totalExercises) * 100}%` }}
              />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
