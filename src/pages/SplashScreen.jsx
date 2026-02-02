import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // ไปหน้า /home หลังจาก 3 วินาที
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white overflow-hidden">
      <div className="text-center">
        <div className="animate-pulse mb-4">
          <h1 className="text-6xl font-bold tracking-tight">
            <span className="bg-orange-500 px-2 py-1">VITRA</span>FIT
          </h1>
        </div>
        <p className="text-gray-400 mt-4">Smart Trainer Mirror</p>
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
