import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingPage";
import ExcerciseCourse from "./pages/ExcerciseCourse";
import WorkoutTrainer from "./pages/WorkoutTrainer";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash */}
        <Route path="/" element={<SplashScreen />} />
        {/*  Homepage */}
        <Route path="/home" element={<HomePage />} />
        {/* Settings Page */}
        <Route path="/settings" element={<SettingsPage />} />
        {/* Excercise Course Page */}
        <Route path="/exercise-course/:id" element={<ExcerciseCourse />} />
        {/* Workout Trainer Page */}
         <Route path="/workout-trainer/:id/:sessionIndex" element={<WorkoutTrainer />} />
      </Routes>
    </BrowserRouter>
  );
}
