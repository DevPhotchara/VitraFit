import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Flame, ChevronRight } from "lucide-react";
import WorkoutTrainer from "./WorkoutTrainer";
import Navbar from "../components/Navbar";
import { workoutClasses } from "../data/workouts";


export default function WorkoutMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState(null);

  // หา workout จาก id
  const workout = workoutClasses.find(w => w.id === id);

  // ถ้าไม่มี workout → redirect /home หรือแสดงข้อความ
  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Select a workout first</h2>
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-orange-500 rounded-xl text-white font-semibold hover:bg-orange-400 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }
  
  // ถ้ามี session ถูกเลือก
  if (selectedSession) {
    return <WorkoutTrainer session={selectedSession} onBack={() => setSelectedSession(null)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">

      {/* Header */}
      <div className="bg-neutral-900 p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-neutral-800 rounded-lg transition"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>
          <h1 className="text-4xl font-bold ml-4">
            <span className="bg-orange-500 px-1">VITRA</span>FIT
          </h1>
        </div>
      </div>

      {/* Workout Info */}
      <div className="p-6">
        <div className={`bg-gradient-to-br ${workout.gradient} rounded-3xl p-10 mb-8 shadow-xl`}>
          <h2 className="text-5xl font-bold mb-3">{workout.title}</h2>
          <p className="text-gray-200 text-xl">{workout.description}</p>
        </div>

        {/* Available Sessions */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-3xl font-bold">Available Sessions</h3>
          <div className="h-2 flex-1 bg-orange-500 ml-6 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {workout.sessions.map((session, index) => (
            <button
              key={index}
              onClick={() =>navigate(`/workout-trainer/${workout.id}/${index}`)}
              className="w-full bg-neutral-900 hover:bg-neutral-800 rounded-3xl p-8 transition-all border border-neutral-800 hover:border-orange-500 text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-3xl font-bold group-hover:text-orange-500 transition">
                  {session.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="bg-orange-500/20 text-orange-500 px-5 py-2 rounded-full font-semibold">
                    {session.level}
                  </span>
                  <ChevronRight className="w-6 h-6 text-orange-500 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>
              <div className="flex items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">{session.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">{session.calories} cal</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navbar
        currentPage="workout"
        onNavigate={(page) => {
          if (page === "home") navigate("/home");
          if (page === "settings") navigate("/settings");
        }}
      />
    </div>
  );
}
