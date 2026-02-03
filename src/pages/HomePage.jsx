import { workoutClasses } from "../data/workouts";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const navigate = useNavigate();
  const currentPage = "home";

  return (
    <div className="flex flex-col min-h-screen bg-black text-white pb-40 2xl:pb-56">
      
      {/* Header */}
      <nav className="flex items-center justify-center px-6 py-10 bg-neutral-900 shadow-lg 2xl:py-16">
        <h1 className="text-4xl font-bold tracking-tight 2xl:text-6xl">
          <span className="bg-green-500 px-2 py-1">VITRA</span>FIT
        </h1>
      </nav>

      {/* Title Section */}
      <div className="px-6 py-10 2xl:px-16 2xl:py-20">
        <h2 className="text-5xl font-light mb-4 2xl:text-7xl">Find Your</h2>
        <h2 className="text-5xl font-extrabold border-b-8 border-orange-500 inline-block 2xl:text-7xl">
          Workout Class
        </h2>
      </div>

      {/* Grid Workout Cards */}
      <div className="flex-1 overflow-y-auto px-6 2xl:px-16 pb-32 2xl:pb-48">
        <div className="grid grid-cols-1 gap-8 2xl:gap-14">
          {workoutClasses.map((w) => (
            <button
              key={w.id}
              onClick={() => navigate(`/exercise-course/${w.id}`)}
              className={`bg-gradient-to-br ${w.gradient} rounded-3xl p-10 
                          hover:scale-[1.03] transition cursor-pointer text-left
                          2xl:p-16`}
            >
              <h3 className="text-4xl font-bold mb-4 2xl:text-6xl">
                {w.title}
              </h3>
              <p className="text-xl text-gray-300 2xl:text-3xl">
                {w.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === "home") navigate("/home");
          if (page === "settings") navigate("/settings");
        }}
      />
    </div>
  );
}
