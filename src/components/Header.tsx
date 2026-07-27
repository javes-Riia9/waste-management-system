import React from "react";
import { ScreenType } from "../types";

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  unreadNotificationsCount?: number;
  onToggleNotifications?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  unreadNotificationsCount = 3,
  onToggleNotifications,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 shadow-sm bg-surface dark:bg-surface-dim transition-colors duration-300">
      <div className="flex justify-between items-center px-4 md:px-8 h-16 w-full max-w-[1440px] mx-auto">
        {/* Brand / Logo */}
        <div
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity active:scale-95"
        >
          <span
            className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            recycling
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-2xl text-primary dark:text-primary-fixed-dim tracking-tight leading-none">
              CleanSight AI
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Waste Management System
            </span>
          </div>
        </div>

        {/* Desktop Navigation Cluster */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onNavigate("home")}
            className={`font-medium text-sm transition-all flex items-center gap-1.5 py-1 px-2 rounded-md ${
              currentScreen === "home"
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-lg">home</span> Home
          </button>

          <button
            onClick={() => onNavigate("detection")}
            className={`font-medium text-sm transition-all flex items-center gap-1.5 py-1 px-2 rounded-md ${
              currentScreen === "detection" || currentScreen === "report"
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              document_scanner
            </span>{" "}
            Detection
          </button>

          <button
            onClick={() => onNavigate("dashboard")}
            className={`font-medium text-sm transition-all flex items-center gap-1.5 py-1 px-2 rounded-md ${
              currentScreen === "dashboard"
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              dashboard
            </span>{" "}
            Dashboard
          </button>

          <button
            onClick={() => onNavigate("map")}
            className={`font-medium text-sm transition-all flex items-center gap-1.5 py-1 px-2 rounded-md ${
              currentScreen === "map"
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-lg">map</span> Map
          </button>
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleNotifications}
            aria-label="Notifications"
            className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">
              notifications
            </span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
