import { useState } from "react";
import { ScreenType, WasteAnalysisResult, ReportItem } from "./types";
import { SAMPLE_ANALYSIS_DEFAULT, INITIAL_REPORTS } from "./data/mockData";
import { Header } from "./components/Header";
import { BottomNavBar } from "./components/BottomNavBar";
import { LandingScreen } from "./components/LandingScreen";
import { DetectionScreen } from "./components/DetectionScreen";
import { ReportScreen } from "./components/ReportScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { MapScreen } from "./components/MapScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("home");
  const [analysisResult, setAnalysisResult] = useState<WasteAnalysisResult>(
    SAMPLE_ANALYSIS_DEFAULT
  );
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const handleAnalysisComplete = (result: WasteAnalysisResult) => {
    setAnalysisResult(result);
  };

  const handleSubmitReport = (newReport: ReportItem) => {
    setReports((prev) => [newReport, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans selection:bg-primary-container selection:text-on-primary-container">
      {/* Top Navigation Bar */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        unreadNotificationsCount={3}
        onToggleNotifications={() => setShowNotifications(!showNotifications)}
      />

      {/* Notifications Drawer Banner */}
      {showNotifications && (
        <div className="fixed top-16 right-4 md:right-8 z-50 w-80 bg-surface-container-lowest border border-surface-variant shadow-xl rounded-2xl p-4 flex flex-col gap-3 animate-fade-in">
          <div className="flex justify-between items-center border-b border-surface-variant pb-2">
            <span className="font-bold text-sm text-on-surface">
              Recent Alerts
            </span>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-outline hover:text-on-surface text-xs p-1"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="p-2 bg-error-container/30 border border-error-container rounded-lg flex flex-col gap-0.5">
              <span className="font-bold text-error">Critical Overflow Alert</span>
              <span className="text-on-surface-variant">
                East Wing Park bin exceeded 90% litter capacity.
              </span>
            </div>
            <div className="p-2 bg-surface-container rounded-lg flex flex-col gap-0.5">
              <span className="font-bold text-primary">Inspection Completed</span>
              <span className="text-on-surface-variant">
                North Gate clean score recorded at 92/100.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Screen Views */}
      <div className="flex-1 flex flex-col">
        {currentScreen === "home" && (
          <LandingScreen onNavigate={(screen) => setCurrentScreen(screen)} />
        )}

        {currentScreen === "detection" && (
          <DetectionScreen
            onAnalysisComplete={handleAnalysisComplete}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === "report" && (
          <ReportScreen
            analysisData={analysisResult}
            onSubmitReport={handleSubmitReport}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === "dashboard" && (
          <DashboardScreen
            reports={reports}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === "map" && (
          <MapScreen onNavigate={(screen) => setCurrentScreen(screen)} />
        )}
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavBar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
      />
    </div>
  );
}
