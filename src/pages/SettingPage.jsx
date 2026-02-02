import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-black text-white max-w-auto mx-auto">
      {/* Header */}
      <nav className="flex items-center justify-between px-12 py-16 bg-neutral-900 shadow-lg">
        <button
          onClick={() => navigate("/home")}
          className="text-orange-500 text-3xl hover:text-orange-400 transition"
        >
          ← Back
        </button>
        <h1 className="text-5xl font-bold">Settings</h1>
        <div className="w-24" />
      </nav>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-12 py-12 pb-48 space-y-10">
        {/* Sound */}
        <SettingToggle
          title="Sound Effects"
          description="Enable workout sounds"
          enabled={soundEnabled}
          onToggle={() => setSoundEnabled(!soundEnabled)}
        />

        {/* Notifications */}
        <SettingToggle
          title="Notifications"
          description="Get workout reminders"
          enabled={notifications}
          onToggle={() => setNotifications(!notifications)}
        />
      </div>

      <Navbar currentPage="settings" />
    </div>
  );
}

function SettingToggle({ title, description, enabled, onToggle }) {
  return (
    <div className="bg-neutral-900 rounded-2xl p-10 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold">{title}</h3>
          <p className="text-lg text-gray-400">{description}</p>
        </div>
        <button
          onClick={onToggle}
          className={`w-20 h-10 rounded-full transition ${
            enabled ? "bg-orange-500" : "bg-gray-600"
          }`}
        >
          <div
            className={`w-8 h-8 bg-white rounded-full transition transform ${
              enabled ? "translate-x-10" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
