import React from "react";
import { ScreenType } from "../types";

interface BottomNavBarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-xl shadow-lg bg-surface dark:bg-surface-dim pb-safe md:hidden border-t border-surface-variant/50">
      <div className="flex justify-around items-center h-20 w-full px-4">
        {/* Home */}
        <button
          onClick={() => onNavigate("home")}
          className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all active:scale-90 rounded-full w-16 ${
            currentScreen === "home"
              ? "bg-secondary-container text-on-secondary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{
              fontVariationSettings:
                currentScreen === "home" ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            home
          </span>
          <span className="text-[12px] font-medium tracking-wide mt-0.5">
            Home
          </span>
        </button>

        {/* Detection */}
        <button
          onClick={() => onNavigate("detection")}
          className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all active:scale-90 rounded-full w-16 ${
            currentScreen === "detection" || currentScreen === "report"
              ? "bg-secondary-container text-on-secondary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{
              fontVariationSettings:
                currentScreen === "detection" || currentScreen === "report"
                  ? "'FILL' 1"
                  : "'FILL' 0",
            }}
          >
            document_scanner
          </span>
          <span className="text-[12px] font-medium tracking-wide mt-0.5">
            Detection
          </span>
        </button>

        {/* Dashboard */}
        <button
          onClick={() => onNavigate("dashboard")}
          className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all active:scale-90 rounded-full w-16 ${
            currentScreen === "dashboard"
              ? "bg-secondary-container text-on-secondary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{
              fontVariationSettings:
                currentScreen === "dashboard" ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            dashboard
          </span>
          <span className="text-[12px] font-medium tracking-wide mt-0.5">
            Dashboard
          </span>
        </button>

        {/* Map */}
        <button
          onClick={() => onNavigate("map")}
          className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all active:scale-90 rounded-full w-16 ${
            currentScreen === "map"
              ? "bg-secondary-container text-on-secondary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{
              fontVariationSettings:
                currentScreen === "map" ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            map
          </span>
          <span className="text-[12px] font-medium tracking-wide mt-0.5">
            Map
          </span>
        </button>
      </div>
    </nav>
  );
};
