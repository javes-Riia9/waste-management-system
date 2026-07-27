import React, { useState } from "react";
import { HotspotLocation, ScreenType } from "../types";
import { HOTSPOT_LOCATIONS } from "../data/mockData";

interface MapScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState<"Today" | "This Week" | "This Month">("Today");
  const [selectedLocation, setSelectedLocation] = useState<HotspotLocation>(HOTSPOT_LOCATIONS[0]);
  const [filterStatus, setFilterStatus] = useState<"All" | "High Litter" | "Moderate" | "Clean">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const filteredHotspots = HOTSPOT_LOCATIONS.filter((loc) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.topPollutant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.activityLabel.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || loc.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleSelectHotspot = (loc: HotspotLocation) => {
    setSelectedLocation(loc);
    setIsSearchFocused(false);
  };

  return (
    <main className="relative w-full h-[calc(100vh-64px)] mt-16 md:mb-0 mb-20 overflow-hidden flex flex-col font-sans">
      {/* Interactive Map Canvas Layer */}
      <div className="absolute inset-0 w-full h-full bg-surface-container overflow-hidden">
        {/* Styled Vector Map Grid Layer */}
        <div className="absolute inset-0 map-bg opacity-40"></div>

        {/* Map Roads & Geography Vector Shapes */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main roads */}
          <path
            d="M -100 200 C 300 150, 600 400, 1500 300"
            fill="none"
            stroke="#bfcaba"
            strokeWidth="12"
          />
          <path
            d="M 400 -100 C 450 300, 700 800, 800 1200"
            fill="none"
            stroke="#bfcaba"
            strokeWidth="16"
          />
          <path
            d="M 200 600 C 500 550, 900 650, 1400 500"
            fill="none"
            stroke="#a3f69c"
            strokeWidth="8"
          />
          {/* River / Blue Lake */}
          <path
            d="M -50 450 Q 400 350 800 600 T 1600 400"
            fill="none"
            stroke="#cfdce4"
            strokeWidth="48"
          />
        </svg>

        {/* Floating Top Search Bar Overlay */}
        <div className="absolute top-4 left-4 right-4 md:left-8 md:right-[420px] z-30 flex flex-col gap-2">
          <div className="relative bg-surface/95 backdrop-blur-md rounded-2xl shadow-xl border border-surface-variant/80 p-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl pl-2">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search location or zone (e.g. East Wing Park, Metro, Gate)..."
              className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none py-1.5"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full text-outline hover:text-on-surface hover:bg-surface-container transition-colors mr-1"
                title="Clear search"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1 border-l border-surface-variant/80 pl-2">
              <button
                onClick={() => setFilterStatus("All")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === "All"
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("High Litter")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === "High Litter"
                    ? "bg-error text-on-error"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                High Litter
              </button>
            </div>
          </div>

          {/* Real-time Search Suggestions Dropdown */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="bg-surface/95 backdrop-blur-md rounded-2xl shadow-2xl border border-surface-variant p-2 flex flex-col gap-1 max-h-56 overflow-y-auto animate-fade-in">
              {filteredHotspots.length > 0 ? (
                filteredHotspots.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectHotspot(loc)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-high transition-colors text-left w-full cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`material-symbols-outlined text-base ${
                          loc.status === "High Litter"
                            ? "text-error"
                            : "text-primary"
                        }`}
                      >
                        location_on
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-on-surface">
                          {loc.name}
                        </span>
                        <span className="text-[11px] text-on-surface-variant">
                          {loc.topPollutant}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        loc.status === "High Litter"
                          ? "bg-error-container text-on-error-container"
                          : "bg-primary-container/20 text-primary-container"
                      }`}
                    >
                      {loc.status} ({loc.cleanlinessScore}%)
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-xs text-outline italic text-center">
                  No locations or zones match &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Interactive Map Markers */}
        {filteredHotspots.map((loc) => {
          const isSelected = selectedLocation.id === loc.id;
          return (
            <div
              key={loc.id}
              onClick={() => handleSelectHotspot(loc)}
              style={{ top: `${loc.yPercent}%`, left: `${loc.xPercent}%` }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 z-10 ${
                isSelected ? "scale-110 z-30" : "hover:scale-105"
              }`}
            >
              {/* Marker Badge */}
              <div
                className={`rounded-full px-3 py-1 flex items-center gap-1.5 font-semibold text-xs shadow-md transition-all ${
                  loc.status === "High Litter"
                    ? "bg-error text-on-error"
                    : loc.status === "Moderate"
                    ? "bg-surface-tint text-on-primary"
                    : "bg-primary text-on-primary"
                }`}
              >
                <span className="material-symbols-outlined text-xs">
                  {loc.status === "High Litter"
                    ? "warning"
                    : loc.status === "Moderate"
                    ? "info"
                    : "check_circle"}
                </span>
                {loc.name}
              </div>
              {/* Marker Arrow Pointer */}
              <div
                className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] -mt-px ${
                  loc.status === "High Litter"
                    ? "border-t-error"
                    : loc.status === "Moderate"
                    ? "border-t-surface-tint"
                    : "border-t-primary"
                }`}
              ></div>
            </div>
          );
        })}

        {/* Floating Zoom / Status Legend Overlay */}
        <div className="hidden md:flex absolute bottom-6 left-8 bg-surface/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-surface-variant flex-col gap-2 z-20 max-w-[200px]">
          <div className="font-bold text-xs text-on-surface mb-0.5">
            Status Legend
          </div>
          <div
            onClick={() => setFilterStatus("Clean")}
            className="flex items-center gap-2 text-xs font-medium text-on-surface-variant cursor-pointer hover:text-primary"
          >
            <div className="w-3 h-3 rounded-full bg-primary"></div> Clean Area
          </div>
          <div
            onClick={() => setFilterStatus("Moderate")}
            className="flex items-center gap-2 text-xs font-medium text-on-surface-variant cursor-pointer hover:text-primary"
          >
            <div className="w-3 h-3 rounded-full bg-surface-tint"></div> Moderate
          </div>
          <div
            onClick={() => setFilterStatus("High Litter")}
            className="flex items-center gap-2 text-xs font-medium text-on-surface-variant cursor-pointer hover:text-error"
          >
            <div className="w-3 h-3 rounded-full bg-error"></div> High Litter Area
          </div>
        </div>

        {/* Side Panel / Bottom Sheet */}
        <aside className="absolute bottom-4 left-4 right-4 md:top-20 md:bottom-4 md:right-8 md:left-auto md:w-[380px] bg-surface/95 backdrop-blur-xl rounded-2xl shadow-[0px_8px_32px_rgba(38,50,56,0.12)] border border-surface-variant flex flex-col overflow-hidden z-20 transition-all duration-300 max-h-[50vh] md:max-h-none">
          {/* Filters Header */}
          <div className="p-4 border-b border-surface-variant/60">
            <div className="flex bg-surface-container-high rounded-xl p-1">
              {(["Today", "This Week", "This Month"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTimeRange(tab)}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                    timeRange === tab
                      ? "bg-surface shadow-sm text-primary"
                      : "text-on-surface-variant hover:bg-surface/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4">
            {/* Metrics Bento */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface p-4 rounded-xl shadow-xs border border-surface-variant/60 flex flex-col gap-1">
                <span className="text-xs text-outline font-semibold">
                  Avg Cleanliness
                </span>
                <span className="text-2xl font-bold text-primary">68%</span>
              </div>
              <div className="bg-surface p-4 rounded-xl shadow-xs border border-surface-variant/60 flex flex-col gap-1">
                <span className="text-xs text-outline font-semibold">
                  Suggested Priority
                </span>
                <span className="text-sm font-bold text-on-surface line-clamp-1">
                  North Gate
                </span>
              </div>
            </div>

            {/* Selected Location Card */}
            {selectedLocation && (
              <div className="bg-surface p-4 rounded-xl border border-primary-container/40 flex flex-col gap-2 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-bold text-on-surface">
                      {selectedLocation.name}
                    </h4>
                    <span className="text-xs text-on-surface-variant">
                      Top contaminant: {selectedLocation.topPollutant}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      selectedLocation.status === "High Litter"
                        ? "bg-error-container text-on-error-container"
                        : selectedLocation.status === "Moderate"
                        ? "bg-surface-variant text-on-surface-variant"
                        : "bg-primary-container/20 text-primary-container"
                    }`}
                  >
                    {selectedLocation.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-outline pt-2 border-t border-surface-variant/40 mt-1">
                  <span>
                    Clean Score: <strong>{selectedLocation.cleanlinessScore}%</strong>
                  </span>
                  <span>{selectedLocation.reportsCount} Reports</span>
                </div>

                <button
                  onClick={() => onNavigate("detection")}
                  className="mt-2 w-full bg-primary text-on-primary text-xs font-semibold py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">
                    document_scanner
                  </span>
                  Analyze This Area
                </button>
              </div>
            )}

            {/* Filtered Polluted Locations List */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mt-1">
                <h3 className="text-sm font-bold text-on-surface">
                  Urban Hotspots ({filteredHotspots.length})
                </h3>
                {searchQuery && (
                  <span className="text-[11px] text-primary font-medium">
                    Filtered by &quot;{searchQuery}&quot;
                  </span>
                )}
              </div>

              {filteredHotspots.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => handleSelectHotspot(loc)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-surface-container-low border-primary shadow-xs"
                        : "bg-surface border-surface-variant/60 hover:bg-surface-container-lowest"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        loc.status === "High Litter"
                          ? "bg-error-container text-error"
                          : "bg-surface-variant text-surface-tint"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        location_on
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <span className="text-xs font-bold text-on-surface">
                        {loc.name}
                      </span>
                      <span
                        className={`text-xs ${
                          loc.status === "High Litter"
                            ? "text-error font-medium"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {loc.activityLabel}
                      </span>
                    </div>

                    <span className="material-symbols-outlined text-outline text-lg">
                      chevron_right
                    </span>
                  </div>
                );
              })}

              {filteredHotspots.length === 0 && (
                <div className="p-4 text-center text-xs text-outline italic">
                  No hotspots match your search query.
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};
