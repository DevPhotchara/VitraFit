export default function TimerVertical({ timeLeft, duration }) {
  const percent = (timeLeft / duration) * 100;

  return (
    <div className="absolute top-14 right-6 z-20 flex flex-col items-center">
      
      {/* Number */}
      <div className="text-4xl font-bold text-orange-400 drop-shadow-[0_0_12px_#ff7b32]">
        {timeLeft}
      </div>

      {/* Vertical Neon Bar */}
      <div className="h-[480px] w-7 bg-neutral-900/80 rounded-xl mt-3 overflow-hidden shadow-[0_0_20px_#ff7b32] relative border border-orange-500/30">
        <div
          className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500 via-orange-400 to-orange-300 shadow-[0_0_20px_#ff7b32]"
          style={{ height: `${percent}%` }}
        />

        {/* Glow effect */}
        <div className="absolute inset-0 bg-orange-400 blur-xl opacity-20 pointer-events-none"></div>
      </div>

      {/* Label */}
      <p className="text-xl text-orange-300 mt-2 tracking-wide drop-shadow-[0_0_10px_#ff7b32]">
        วินาที
      </p>
    </div>
  );
}
