import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

export default function ControlButtons({ isPlaying, onPause, onResume, onNext, onPrev, showNext, showPrev }) {
  return (
    <div className="absolute bottom-56 left-1/2 transform -translate-x-1/2 z-30 flex gap-6">
      {showPrev && (
        <button 
          className="bg-black/70 backdrop-blur-sm text-orange-500 p-8 rounded-full border-4 border-orange-500/50 hover:bg-orange-500/20 transition" 
          onClick={onPrev}
        >
          <SkipBack className="w-12 h-12" />
        </button>
      )}

      {!isPlaying ? (
        <button 
          onClick={onResume}
          className="bg-orange-500 text-white px-16 py-8 rounded-full font-bold text-3xl flex items-center gap-4 hover:bg-orange-600 transition shadow-2xl shadow-orange-500/50"
        >
          <Play className="w-10 h-10" />
          เริ่ม
        </button>
      ) : (
        <button 
          onClick={onPause}
          className="bg-black/70 backdrop-blur-sm text-white px-16 py-8 rounded-full font-bold text-3xl flex items-center gap-4 hover:bg-white/20 transition border-4 border-white/30"
        >
          <Pause className="w-10 h-10" />
          หยุด
        </button>
      )}

      {showNext && (
        <button 
          className="bg-black/70 backdrop-blur-sm text-orange-500 p-8 rounded-full border-4 border-orange-500/50 hover:bg-orange-500/20 transition" 
          onClick={onNext}
        >
          <SkipForward className="w-10 h-10" />
        </button>
      )}
    </div>
  );
}
