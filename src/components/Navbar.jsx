// Navbar.jsx
import { Home, Dumbbell, Settings } from "lucide-react";

export default function Navbar({ currentPage, onNavigate }) {
  const navItems = [
    { name: "home", label: "Home", icon: Home },
    { name: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-neutral-900 flex justify-around p-6 shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.name;

        return (
          <button
            key={item.name}
            onClick={() => onNavigate(item.name)}
            className="flex flex-col items-center space-y-2"
          >
            <Icon className={`w-12 h-12 transition ${isActive ? "text-orange-500" : "text-white"}`} />
            <span className={`text-lg font-semibold transition ${isActive ? "text-orange-500" : "text-white"}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
