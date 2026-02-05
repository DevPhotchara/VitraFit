import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function SideViewOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="relative w-[88%] max-w-md rounded-3xl 
                   bg-white/10 border border-white/20
                   shadow-2xl px-8 py-10 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-500/20">
            <AlertCircle className="w-9 h-9 text-orange-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-3">
          กรุณาหันข้างก่อนเริ่ม Squat
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 text-base leading-relaxed">
          เพื่อให้ระบบจับมุมเข่าได้แม่นยำ
          <br />
          โปรดยืนให้เห็นด้านข้างชัดเจน
        </p>

        {/* Tip */}
        <div className="mt-6 text-sm text-white/60">
          💡 Tip: ไหล่ซ้าย–ขวาควรอยู่ใกล้กัน
        </div>

        {/* Loading */}
        <motion.div
          className="mt-8 flex justify-center gap-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <div className="w-2 h-2 rounded-full bg-orange-400" />
        </motion.div>

        {/* Skip Button */}
        <button
          onClick={onClose}
          className="mt-8 w-full py-3 rounded-xl 
                     bg-white/20 hover:bg-white/30 
                     text-white font-medium transition"
        >
          ข้ามไปก่อน →
        </button>
      </motion.div>
    </div>
  );
}
