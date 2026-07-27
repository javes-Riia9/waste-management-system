import React, { useState, useRef } from "react";
import { WasteAnalysisResult, ScreenType } from "../types";
import { DEFAULT_SAMPLE_IMAGE, SAMPLE_ANALYSIS_DEFAULT } from "../data/mockData";
import { triggerVibration } from "../utils/vibration";

interface DetectionScreenProps {
  onAnalysisComplete: (result: WasteAnalysisResult) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const DetectionScreen: React.FC<DetectionScreenProps> = ({
  onAnalysisComplete,
  onNavigate,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(DEFAULT_SAMPLE_IMAGE);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<WasteAnalysisResult>(
    SAMPLE_ANALYSIS_DEFAULT
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64 = event.target.result as string;
        setSelectedImage(base64);
        triggerAnalysis(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const triggerAnalysis = async (imgBase64: string = selectedImage) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/analyze-waste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: imgBase64 }),
      });
      const data = await res.json();
      if (data.status === "success" && data.data) {
        const newResult: WasteAnalysisResult = {
          reportId: `#WMR-${Math.floor(8000 + Math.random() * 1000)}`,
          timestamp: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          cleanlinessScore: data.data.cleanlinessScore ?? 72,
          summary: data.data.summary || "Waste detection completed.",
          imageUrl: imgBase64,
          location: "Central University Campus",
          items: data.data.items || SAMPLE_ANALYSIS_DEFAULT.items,
          boundingBoxes:
            data.data.boundingBoxes || SAMPLE_ANALYSIS_DEFAULT.boundingBoxes,
        };
        setAnalysisResult(newResult);
        onAnalysisComplete(newResult);
      }
    } catch (err) {
      console.warn("Analysis fetch error, using default result:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getItemCount = (categoryName: string): number => {
    const found = analysisResult.items.find(
      (i) => i.category.toLowerCase() === categoryName.toLowerCase()
    );
    return found ? found.count : 0;
  };

  const totalItemsCount = analysisResult.items.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  return (
    <main className="pt-20 pb-28 px-4 md:px-8 max-w-[1440px] mx-auto w-full flex-grow">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
          Analyze Waste
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant mt-1">
          Upload an image of the waste bin to detect contaminants and assess cleanliness.
        </p>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Upload + Image Bounding Box Preview) */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          {/* Upload Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => {
              triggerVibration(25);
              fileInputRef.current?.click();
            }}
            className={`relative bg-surface-container-lowest border-2 border-dashed ${
              isDragging ? "border-primary bg-primary/5" : "border-outline-variant hover:border-primary"
            } transition-colors duration-300 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[220px] shadow-[0px_4px_20px_rgba(38,50,56,0.04)] cursor-pointer group overflow-hidden`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors text-primary">
                <span className="material-symbols-outlined text-3xl">
                  cloud_upload
                </span>
              </div>
              <h3 className="text-lg font-semibold text-on-surface mb-1">
                Drag &amp; Drop Image
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                or click to browse from your device
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerVibration(30);
                  fileInputRef.current?.click();
                }}
                className="bg-primary hover:bg-secondary text-on-primary text-sm font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">
                  photo_camera
                </span>
                Upload Image
              </button>
            </div>
          </div>

          {/* Detection Preview Card with Bounding Boxes */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant overflow-hidden flex flex-col">
            <div className="p-4 border-b border-surface-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="text-lg font-semibold text-on-surface">
                Detection Preview
              </h3>
              <span className="bg-primary-container/15 text-primary-container font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">
                  {isAnalyzing ? "sync" : "check_circle"}
                </span>
                {isAnalyzing ? "Analyzing..." : "Analysis Complete"}
              </span>
            </div>

            <div className="relative w-full aspect-video md:aspect-[16/9] bg-surface-variant flex items-center justify-center overflow-hidden">
              {/* Selected Image */}
              <img
                src={selectedImage}
                alt="Analyzed Waste Bin"
                className="w-full h-full object-cover"
              />

              {/* Bounding Box SVG Overlay */}
              {!isAnalyzing && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {analysisResult.boundingBoxes.map((box, idx) => (
                    <g key={idx}>
                      <rect
                        x={box.x}
                        y={box.y}
                        width={box.width}
                        height={box.height}
                        fill="rgba(148, 249, 144, 0.15)"
                        stroke="#2e7d32"
                        strokeWidth="0.8"
                        strokeDasharray="2"
                        className="animate-[dash_3s_linear_infinite]"
                      />
                      <rect
                        x={box.x}
                        y={Math.max(1, box.y - 6)}
                        width={Math.min(35, box.label.length * 2.2)}
                        height="5.5"
                        fill="#0d631b"
                        rx="1"
                      />
                      <text
                        x={box.x + 1}
                        y={Math.max(4, box.y - 1.8)}
                        fill="#ffffff"
                        fontSize="3.2"
                        fontWeight="600"
                        fontFamily="Hanken Grotesk"
                      >
                        {box.label}
                      </text>
                    </g>
                  ))}

                  {/* Laser Scanning Effect Line */}
                  <line
                    x1="0"
                    y1="0"
                    x2="100"
                    y2="0"
                    stroke="#88d982"
                    strokeWidth="0.5"
                    opacity="0.7"
                  >
                    <animate
                      attributeName="y1"
                      values="0;100;0"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y2"
                      values="0;100;0"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </line>
                </svg>
              )}

              {/* Loading Spinner overlay when analyzing */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2">
                  <span className="material-symbols-outlined text-4xl animate-spin">
                    progress_activity
                  </span>
                  <span className="text-sm font-semibold">
                    Running AI Vision Detection...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Cleanliness Score Gauge + Detected Items Breakdown) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          {/* Overall Cleanliness Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] flex flex-col items-center text-center border border-surface-variant">
            <h3 className="text-lg font-semibold text-on-surface mb-1 w-full text-left">
              Overall Cleanliness
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 w-full text-left">
              Based on detected contaminants
            </p>

            {/* Circular Cleanliness Score Gauge */}
            <div className="relative w-44 h-44 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#e3f0f8"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={
                    analysisResult.cleanlinessScore > 70
                      ? "#2e7d32"
                      : analysisResult.cleanlinessScore > 45
                      ? "#1b6d24"
                      : "#ba1a1a"
                  }
                  strokeWidth="10"
                  strokeDasharray="263.89"
                  strokeDashoffset={
                    263.89 - (263.89 * analysisResult.cleanlinessScore) / 100
                  }
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-primary">
                  {analysisResult.cleanlinessScore}
                </span>
                <span className="text-xs text-outline uppercase font-semibold tracking-wider">
                  / 100
                </span>
              </div>
            </div>

            <div className="bg-secondary-container/30 px-4 py-2 rounded-full w-full text-center">
              <p className="text-sm font-semibold text-on-secondary-container flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-lg">
                  trending_up
                </span>
                {analysisResult.cleanlinessScore >= 70
                  ? "Acceptable Level"
                  : analysisResult.cleanlinessScore >= 45
                  ? "Moderate Contamination"
                  : "Critical Litter Warning"}
              </p>
            </div>
          </div>

          {/* Detected Items Cards */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-on-surface">
                Detected Items
              </h3>
              <span className="text-xs text-outline font-semibold">
                Total: {totalItemsCount}
              </span>
            </div>

            <ul className="flex flex-col gap-2.5 flex-grow">
              {/* Plastic Bottles Card */}
              <li className="flex items-center justify-between p-3.5 bg-surface-container rounded-xl border border-transparent hover:border-outline-variant transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      water_bottle
                    </span>
                  </div>
                  <span className="text-sm font-medium text-on-surface">
                    Plastic Bottles
                  </span>
                </div>
                <span className="text-lg font-bold text-primary">
                  {getItemCount("Plastic Bottles")}
                </span>
              </li>

              {/* Paper Card */}
              <li className="flex items-center justify-between p-3.5 bg-surface-container rounded-xl border border-transparent hover:border-outline-variant transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-variant text-outline flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      description
                    </span>
                  </div>
                  <span className="text-sm font-medium text-on-surface">
                    Paper
                  </span>
                </div>
                <span className="text-lg font-bold text-outline">
                  {getItemCount("Paper")}
                </span>
              </li>

              {/* Cans Card */}
              <li className="flex items-center justify-between p-3.5 bg-surface-container rounded-xl border border-transparent hover:border-outline-variant transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      recycling
                    </span>
                  </div>
                  <span className="text-sm font-medium text-on-surface">
                    Cans
                  </span>
                </div>
                <span className="text-lg font-bold text-tertiary">
                  {getItemCount("Cans")}
                </span>
              </li>

              {/* Other Waste Card */}
              <li className="flex items-center justify-between p-3.5 bg-surface-container rounded-xl border border-transparent hover:border-outline-variant transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      category
                    </span>
                  </div>
                  <span className="text-sm font-medium text-on-surface">
                    Other Waste
                  </span>
                </div>
                <span className="text-lg font-bold text-on-surface-variant">
                  {getItemCount("Other Waste")}
                </span>
              </li>
            </ul>

            {/* Action to proceed to Report */}
            <div className="mt-6 pt-4 border-t border-surface-variant">
              <button
                onClick={() => {
                  triggerVibration([30, 50, 30]);
                  onNavigate("report");
                }}
                className="w-full bg-primary hover:bg-secondary text-on-primary font-medium text-base h-12 rounded-full shadow-[0px_8px_32px_rgba(38,50,56,0.12)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">
                  analytics
                </span>
                Generate Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
