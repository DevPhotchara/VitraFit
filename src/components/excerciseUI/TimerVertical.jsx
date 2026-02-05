import React from "react";
import { RotateCcw } from "lucide-react";

export default function TimerVertical({
  timeLeft,
  duration,
  onReset, // 👈 callback reset เวลา
}) {
  const progress = Math.min((timeLeft / duration) * 100, 100);

  return (
    <div className="absolute top-24 right-6 z-40">
      <div className="bg-black/50 backdrop-blur-xl border border-orange-400/30 shadow-xl rounded-2xl px-6 py-4 min-w-[160px]">

        {/* Label */}
        <p className="text-white/70 text-xl font-semibold tracking-widest text-center">
          TIME
        </p>

        {/* Timer Number */}
        <div className="flex justify-center items-end gap-1 mt-1">
          <span className="text-6xl font-extrabold text-orange-400 drop-shadow-lg">
            {timeLeft}
          </span>
          <span className="text-white/50 text-xl font-bold">s</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mt-3">
          <div
            className="h-2 bg-orange-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 🔥 Reset Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => onReset?.()}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
}
  