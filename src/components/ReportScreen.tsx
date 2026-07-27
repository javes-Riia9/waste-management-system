import React, { useState } from "react";
import { WasteAnalysisResult, ReportItem, ScreenType } from "../types";
import { triggerVibration } from "../utils/vibration";

interface ReportScreenProps {
  analysisData: WasteAnalysisResult;
  onSubmitReport: (report: ReportItem) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  analysisData,
  onSubmitReport,
  onNavigate,
}) => {
  const [location, setLocation] = useState<string>(
    analysisData.location || "Central University Campus"
  );
  const [notes, setNotes] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const locationsList = [
    "Central University Campus",
    "East Wing Park",
    "Downtown Sector 4",
    "Student Hub Plaza",
    "Northside Industrial Park",
    "Central Metro Station",
    "East Riverside Walk",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerVibration([40, 60, 40]);
    const newReport: ReportItem = {
      id: analysisData.reportId || `#WMR-${Math.floor(8000 + Math.random() * 1000)}`,
      location: location,
      score: analysisData.cleanlinessScore,
      wasteType:
        analysisData.items
          .filter((i) => i.count > 0)
          .map((i) => i.category)
          .join(", ") || "Mixed Contaminants",
      status:
        analysisData.cleanlinessScore >= 70
          ? "Success"
          : analysisData.cleanlinessScore >= 45
          ? "Warning"
          : "Critical",
      date: "Just now",
      timestamp: new Date().toISOString(),
      imageUrl: analysisData.imageUrl,
      itemsSummary: `Cleanliness ${analysisData.cleanlinessScore}/100`,
    };

    onSubmitReport(newReport);
    setSubmitted(true);
  };

  return (
    <main className="pt-20 pb-28 px-4 md:px-8 max-w-[800px] mx-auto flex flex-col gap-6 w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
          Generate Report
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant">
          Review the analysis before submitting the final report to the municipal dashboard.
        </p>
      </div>

      {submitted ? (
        /* Confirmation State */
        <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-[0px_4px_20px_rgba(38,50,56,0.06)] border border-primary-container/30 flex flex-col items-center text-center gap-4 my-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
          </div>
          <h3 className="text-2xl font-bold text-on-surface">
            Report Submitted Successfully!
          </h3>
          <p className="text-sm text-on-surface-variant max-w-md">
            Report <strong className="text-primary">{analysisData.reportId}</strong> for{" "}
            <strong>{location}</strong> has been saved and dispatched to municipal operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
            <button
              onClick={() => {
                triggerVibration(25);
                onNavigate("dashboard");
              }}
              className="bg-primary text-on-primary font-medium text-sm px-6 py-2.5 rounded-full hover:bg-secondary transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">dashboard</span>
              View in Dashboard
            </button>

            <button
              onClick={() => {
                triggerVibration(25);
                onNavigate("detection");
              }}
              className="bg-surface text-primary border border-primary font-medium text-sm px-6 py-2.5 rounded-full hover:bg-surface-container-low transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">document_scanner</span>
              Analyze Another Waste Bin
            </button>
          </div>
        </div>
      ) : (
        /* Form & Review Cards */
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Analyzed Image Thumbnail Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col gap-4">
            <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden bg-surface-container">
              <img
                src={analysisData.imageUrl}
                alt="Analyzed Waste Site"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-primary-container text-on-primary-container text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                Analyzed
              </div>
            </div>

            <div className="flex justify-between items-start pt-2 border-t border-outline-variant/30">
              <div className="flex flex-col">
                <span className="text-xs text-outline uppercase font-semibold tracking-wider">
                  Report ID
                </span>
                <span className="text-lg font-bold text-on-surface">
                  {analysisData.reportId}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-outline uppercase font-semibold tracking-wider">
                  Timestamp
                </span>
                <span className="text-sm font-medium text-on-surface">
                  {analysisData.timestamp}
                </span>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                analytics
              </span>
              Analysis Summary
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Detected Materials */}
              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/50">
                <span className="text-xs text-outline uppercase font-semibold block mb-2">
                  Detected Materials
                </span>
                <div className="flex flex-wrap gap-2">
                  {analysisData.items
                    .filter((item) => item.count > 0)
                    .map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-tertiary-container/20 text-on-tertiary-container text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {item.category.includes("Bottle")
                            ? "water_bottle"
                            : item.category.includes("Can")
                            ? "recycling"
                            : "category"}
                        </span>
                        {item.category} ({item.count})
                      </span>
                    ))}
                  {analysisData.items.every((i) => i.count === 0) && (
                    <span className="text-sm text-on-surface-variant italic">
                      No contaminants detected
                    </span>
                  )}
                </div>
              </div>

              {/* Cleanliness Score */}
              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/50 flex flex-col justify-center items-center">
                <span className="text-xs text-outline uppercase font-semibold mb-1">
                  Cleanliness Score
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary">
                    {analysisData.cleanlinessScore}
                  </span>
                  <span className="text-sm text-on-surface-variant">/ 100</span>
                </div>
                <div className="w-full bg-surface-variant h-2.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-700"
                    style={{ width: `${analysisData.cleanlinessScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                location_on
              </span>
              Location &amp; Notes
            </h3>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="location-select"
                className="text-xs text-outline uppercase font-semibold"
              >
                Site Location
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                  map
                </span>
                <select
                  id="location-select"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant/50 rounded-xl text-base text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
                >
                  {locationsList.map((loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="notes"
                className="text-xs text-outline uppercase font-semibold"
              >
                Additional Inspection Notes (Optional)
              </label>
              <textarea
                id="notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Bin lid broken, request immediate cleanup dispatch."
                className="w-full p-3 bg-surface-container-low border border-outline-variant/50 rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="mt-2 flex flex-col items-center gap-2">
            <button
              type="submit"
              className="w-full sm:w-auto min-w-[280px] h-12 bg-primary hover:bg-secondary text-on-primary font-medium text-base rounded-full flex items-center justify-center gap-2 transition-all shadow-[0px_8px_32px_rgba(38,50,56,0.12)] active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">send</span>
              Submit Report
            </button>
            <span className="text-xs text-outline flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-sm">
                check_circle
              </span>
              Report ready for submission
            </span>
          </div>
        </form>
      )}
    </main>
  );
};
