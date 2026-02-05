import { Zap } from "lucide-react";

export default function ExerciseInfoOverlay({
  exercise,
  currentIndex = 1,
  totalExercises = 1,
}) {
  return (
    <div className="absolute bottom-4 left-6 right-6 z-20">
      <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-orange-200/10 backdrop-blur-xl rounded-3xl px-8 py-7 border border-orange-400/30 shadow-2xl overflow-hidden">

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/30 animate-pulse"></div>

        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-orange-500/20 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative flex items-center justify-between">

          {/* Left: Exercise Name */}
          <div className="flex flex-col gap-5">
            <h2 className="text-5xl font-black text-white tracking-tight drop-shadow-xl ml-2">
              {exercise?.name || "-"}
            </h2>

            {/* Intensity Tag */}
            <div className="flex items-center gap-2 bg-orange-500/15 px-5 py-2 rounded-full border border-orange-400/20 w-fit">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-medium text-white/90">
                High Intensity
              </span>
            </div>
          </div>

          {/* Right: Progress */}
          <div className="flex flex-col items-center gap-2 bg-orange-500/15 backdrop-blur-xl px-7 py-4 rounded-3xl border border-orange-400/25">
            <span className="text-white font-bold text-3xl tracking-wide">
              {currentIndex} / {totalExercises}
            </span>

            {/* Progress Bar */}
            <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-2 bg-orange-400 rounded-full transition-all duration-500"
                style={{
                  width: `${(currentIndex / totalExercises) * 100}%`,
                }}
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
