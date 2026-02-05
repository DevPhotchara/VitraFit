import React from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";

export default function RepCounterOverlay({
  reps = 0,
  targetReps = 10,
  onAdjust, // 👈 callback ปรับ reps
}) {
  const progress = Math.min((reps / targetReps) * 100, 100);

  return (
    <div className="absolute top-24 right-6 z-40">
      <div className="bg-black/50 backdrop-blur-xl border border-orange-400/30 shadow-xl rounded-2xl px-6 py-4 min-w-[160px]">

        {/* Label */}
        <p className="text-white/70 text-xl font-semibold tracking-widest text-center">
          REPS
        </p>

        {/* Counter */}
        <div className="flex justify-center items-end gap-1 mt-1">
          <span className="text-6xl font-extrabold text-orange-400 drop-shadow-lg">
            {reps}
          </span>
          <span className="text-white/40 text-xl font-bold">/</span>
          <span className="text-white/70 text-2xl font-bold">
            {targetReps}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mt-3">
          <div
            className="h-2 bg-orange-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 🔥 Adjust Buttons */}
        <div className="flex justify-center gap-4 mt-5">

        {/* -1 */}
        <button
            onClick={() => onAdjust?.(-1)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/25 
                    transition shadow-md hover:shadow-orange-400/40"
        >
            <Minus className="w-5 h-5 text-white" />
        </button>

        {/* Reset */}
        <button
            onClick={() => onAdjust?.("reset")}
            className="p-3 rounded-full bg-white/10 hover:bg-white/25 
                    transition shadow-md hover:shadow-orange-400/40"
        >
            <RotateCcw className="w-5 h-5 text-white" />
        </button>

        {/* +1 */}
        <button
            onClick={() => onAdjust?.(1)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/25 
                    transition shadow-md hover:shadow-orange-400/40"
        >
            <Plus className="w-5 h-5 text-white" />
        </button>
        </div>
      </div>
    </div>
  );
}
