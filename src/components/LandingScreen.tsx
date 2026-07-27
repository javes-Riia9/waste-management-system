import React from "react";
import { ScreenType } from "../types";
import liquidHeroImage from "../assets/images/liquid_3d_hero_1785168755963.jpg";

interface LandingScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onNavigate }) => {
  return (
    <main className="pt-20 pb-24 px-4 md:px-8 flex flex-col gap-10 max-w-[1440px] mx-auto w-full font-sans">
      {/* Editorial 3D Liquid Hero Section inspired by modern AI design */}
      <section className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50/30 to-emerald-50/20 border border-slate-200/80 shadow-[0px_10px_40px_rgba(0,0,0,0.04)] p-6 md:p-12 flex flex-col justify-between min-h-[500px] md:min-h-[560px]">
        {/* Subtle Architectural Grid Texture Background */}
        <div
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#0d631b 0.75px, transparent 0.75px), radial-gradient(#0d631b 0.75px, #f8fafc 0.75px)",
            backgroundSize: "30px 30px",
            backgroundPosition: "0 0, 15px 15px",
          }}
        ></div>

        {/* Top Header Row */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200/60 pb-8">
          {/* Main Giant Display Typography */}
          <div className="flex flex-col">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-none uppercase">
              CLEANSIGHT AI
            </h1>
          </div>

          {/* Subtitle & Concept Callout */}
          <div className="max-w-md text-slate-700 text-sm md:text-base font-medium flex items-center gap-3">
            <span className="h-0.5 w-8 bg-emerald-600 shrink-0"></span>
            <p>
              The future of urban cleanliness —{" "}
              <strong className="text-slate-900 font-semibold">
                unlock the potential of AI vision
              </strong>
            </p>
          </div>
        </div>

        {/* Middle Visual Area: 3D Liquid Ribbon Art + Floating Elements */}
        <div className="relative z-10 my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Rotating Badge / Tag */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-start gap-4">
            <div className="relative w-24 h-24 rounded-full border border-slate-300 flex items-center justify-center bg-white/70 backdrop-blur-sm shadow-sm group">
              <span className="material-symbols-outlined text-emerald-600 text-2xl group-hover:rotate-45 transition-transform duration-500">
                auto_awesome
              </span>
              <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                <path
                  id="textPath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[9.5px] uppercase font-bold fill-slate-600 tracking-widest">
                  <textPath href="#textPath">
                    CLEANSIGHT AI • SMART CITY •
                  </textPath>
                </text>
              </svg>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              01 / Next Gen AI
            </span>
          </div>

          {/* Center 3D Liquid Canvas Box */}
          <div className="lg:col-span-7 relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.08)] bg-white group">
            <img
              src={liquidHeroImage}
              alt="3D Fluid Liquid Wave Swirl"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Subtle glass shimmer layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none"></div>

            {/* In-Image Floating Stats Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/80 backdrop-blur-md rounded-xl p-3 border border-white/60 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Live AI Engine Active
                </span>
              </div>
              <span className="text-xs text-slate-600 font-medium">
                99.2% Detection Accuracy
              </span>
            </div>
          </div>

          {/* Right Sub-Navigation Sidebar (Matches "Resources / 01", "Community / 02" style) */}
          <div className="lg:col-span-3 flex flex-col justify-center gap-4 bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div
              onClick={() => onNavigate("detection")}
              className="p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/40 transition-all cursor-pointer flex justify-between items-center group"
            >
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Analysis / 01
                </span>
                <span className="text-base font-bold text-slate-900 group-hover:text-emerald-700">
                  AI Waste Detection
                </span>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                arrow_forward
              </span>
            </div>

            <div
              onClick={() => onNavigate("dashboard")}
              className="p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/40 transition-all cursor-pointer flex justify-between items-center group"
            >
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Analytics / 02
                </span>
                <span className="text-base font-bold text-slate-900 group-hover:text-emerald-700">
                  Municipal Metrics
                </span>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                arrow_forward
              </span>
            </div>

            <div
              onClick={() => onNavigate("map")}
              className="p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/40 transition-all cursor-pointer flex justify-between items-center group"
            >
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Mapping / 03
                </span>
                <span className="text-base font-bold text-slate-900 group-hover:text-emerald-700">
                  Urban Hotspots
                </span>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                arrow_forward
              </span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/60">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-emerald-600 text-lg">
              eco
            </span>
            Sustainable Smart City Operations
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate("detection")}
              className="bg-emerald-700 hover:bg-emerald-800 text-white h-[48px] px-8 rounded-full font-semibold text-base transition-all shadow-[0px_8px_32px_rgba(13,99,27,0.2)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">
                document_scanner
              </span>
              Analyze Waste Now
            </button>

            <button
              onClick={() => onNavigate("dashboard")}
              className="bg-white text-slate-800 border border-slate-300 h-[48px] px-8 rounded-full font-semibold text-base hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">
                dashboard
              </span>
              Explore Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Feature Bento Cards */}
      <section className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div
            onClick={() => onNavigate("detection")}
            className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col gap-2 hover:border-primary-container transition-all cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mb-1 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">
                document_scanner
              </span>
            </div>
            <h3 className="text-lg font-semibold text-on-surface">
              AI Waste Detection
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Automated identification of overflowing bins, litter anomalies, and contamination.
            </p>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onNavigate("dashboard")}
            className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col gap-2 hover:border-primary-container transition-all cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mb-1 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">
                analytics
              </span>
            </div>
            <h3 className="text-lg font-semibold text-on-surface">
              Cleanliness Analytics
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Comprehensive metrics, clean scores, and historical municipal data reporting.
            </p>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => onNavigate("map")}
            className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col gap-2 hover:border-primary-container transition-all cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-800 mb-1 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">map</span>
            </div>
            <h3 className="text-lg font-semibold text-on-surface">
              Hotspot Mapping
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Geospatial visualization of problematic waste zones and high-litter areas.
            </p>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => onNavigate("dashboard")}
            className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col gap-2 hover:border-primary-container transition-all cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 mb-1 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">
                tips_and_updates
              </span>
            </div>
            <h3 className="text-lg font-semibold text-on-surface">
              Actionable Insights
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Predictive scheduling and route optimization recommendations for clean teams.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

