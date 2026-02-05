import { X } from "lucide-react";

export default function Header({ session, onBack }) {
  return (
    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-8 z-30">
    <div className="flex items-center justify-between">
      <button onClick={onBack} className="p-4 hover:bg-white/10 rounded-full transition">
        <X className="w-10 h-10" />
      </button>
      <div className="text-center">
        <h1 className="text-4xl font-bold">{session.title}</h1>
        <p className="text-orange-500 text-3xl mt-1">{session.level}</p>
      </div>
      <div className="w-20"></div>
    </div>
  </div>
  );
}
