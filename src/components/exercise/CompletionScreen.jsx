export default function CompletionScreen({ session, totalExercises, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-orange-950 flex items-center justify-center px-12">
      <div className="text-center text-white">
        <div className="bg-orange-500/20 w-64 h-64 rounded-full flex items-center justify-center mb-12 animate-pulse mx-auto border-8 border-orange-500/30">
          <span className="text-[180px]">🎉</span>
        </div>

        <h2 className="text-8xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-8">
          เสร็จสมบูรณ์!
        </h2>

        <p className="text-4xl text-gray-300 mb-16">
          ยอดเยี่ยม! คุณทำแบบฝึกหัดครบทุกท่าแล้ว
        </p>

        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-black/40 backdrop-blur-sm p-10 rounded-3xl border-2 border-orange-500/30">
            <div className="text-6xl font-bold text-orange-500 mb-3">{session.duration}</div>
            <div className="text-2xl text-gray-400">เวลารวม</div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-10 rounded-3xl border-2 border-orange-500/30">
            <div className="text-6xl font-bold text-orange-500 mb-3">{session.calories}</div>
            <div className="text-2xl text-gray-400">แคลอรี่</div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-10 rounded-3xl border-2 border-orange-500/30">
            <div className="text-6xl font-bold text-orange-500 mb-3">{totalExercises}</div>
            <div className="text-2xl text-gray-400">แบบฝึกหัด</div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="bg-orange-500 px-20 py-8 rounded-full text-white font-bold text-3xl hover:bg-orange-600 transition shadow-2xl shadow-orange-500/50"
        >
          กลับสู่หน้าหลัก
        </button>
      </div>
    </div>
  );
}
  