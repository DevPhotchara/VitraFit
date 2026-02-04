import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

export default function ControlButtons({
  isPlaying,
  onPause,
  onResume,
  onNext,
  onPrev,
  showNext,
  showPrev
}) {
  return (
    <div className="absolute bottom-[23rem] left-0 right-0 z-30 pointer-events-none">

      {/* ◀️ Prev */}
      {showPrev && (
        <button
          onClick={onPrev}
          className="
            pointer-events-auto
            absolute left-20
            bg-black/70 backdrop-blur-sm
            text-orange-500 p-8 rounded-full
            border-4 border-orange-500/50
            hover:bg-orange-500/20 transition
          "
        >
          <SkipBack className="w-12 h-12" />
        </button>
      )}

      {/* ⏯ Center Play / Pause */}
      {!isPlaying ? (
        <button
          onClick={onResume}
          className="
            pointer-events-auto
            absolute left-1/2 -translate-x-1/2
            bg-orange-500 text-white
            px-16 py-8 rounded-full
            font-bold text-3xl
            flex items-center gap-4
            hover:bg-orange-600 transition
            shadow-2xl shadow-orange-500/50
          "
        >
          <Play className="w-10 h-10" />
          เริ่ม
        </button>
      ) : (
        <button
          onClick={onPause}
          className="
            pointer-events-auto
            absolute left-1/2 -translate-x-1/2
            bg-black/70 backdrop-blur-sm
            text-white px-16 py-8 rounded-full
            font-bold text-3xl
            flex items-center gap-4
            hover:bg-white/20 transition
            border-4 border-white/30
          "
        >
          <Pause className="w-10 h-10" />
          หยุด
        </button>
      )}

      {/* ▶️ Next */}
      {showNext && (
        <button
          onClick={onNext}
          className="
            pointer-events-auto
            absolute right-20
            bg-black/70 backdrop-blur-sm
            text-orange-500 p-8 rounded-full
            border-4 border-orange-500/50
            hover:bg-orange-500/20 transition
          "
        >
          <SkipForward className="w-10 h-10" />
        </button>
      )}
    </div>
  );
}
