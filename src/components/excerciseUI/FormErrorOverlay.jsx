import { AlertTriangle } from "lucide-react";

export default function FormErrorOverlay({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[5000]">
      <div
        className="flex items-center gap-3 px-6 py-4 rounded-2xl
                   bg-red-500/20 border border-red-400/40
                   backdrop-blur-md shadow-xl"
      >
        <AlertTriangle className="w-6 h-6 text-red-300" />
        <p className="text-white font-semibold text-lg">
          {message}
        </p>
      </div>
    </div>
  );
}
