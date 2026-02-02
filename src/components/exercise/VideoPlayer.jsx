import { Dumbbell } from "lucide-react";

export default function VideoPlayer({ exercise }) {
  return (
    <div className="absolute inset-0 z-0 flex justify-center items-start pt-10"> 
      {/* items-start = ดันขึ้นด้านบน, pt-10 = เว้นระยะจากบน */}
      <div className="relative w-[70%] h-[70%]">
        {exercise.videoUrl ? (
          <video
            src={exercise.videoUrl}
            className="w-full h-full object-cover rounded-xl shadow-lg"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to from-neutral-900 to-black rounded-xl shadow-lg">
            <Dumbbell className="w-80 h-80 text-orange-500 opacity-20" />
          </div>
        )}

        {/* Gradient Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 rounded-xl" />
      </div>
    </div>
  );
}
