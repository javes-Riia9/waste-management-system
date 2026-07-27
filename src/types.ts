export type ScreenType = "home" | "detection" | "report" | "dashboard" | "map";

export interface BoundingBox {
  label: string;
  x: number; // percentage
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
  confidence: number;
}

export interface WasteCategoryItem {
  category: "Plastic Bottles" | "Paper" | "Cans" | "Other Waste" | string;
  count: number;
  color?: string;
}

export interface WasteAnalysisResult {
  reportId: string;
  timestamp: string;
  cleanlinessScore: number;
  summary: string;
  items: WasteCategoryItem[];
  boundingBoxes: BoundingBox[];
  imageUrl: string;
  location?: string;
}

export interface ReportItem {
  id: string;
  location: string;
  score: number;
  wasteType: string;
  status: "Success" | "Warning" | "Pending" | "Critical";
  date: string;
  timestamp: string;
  imageUrl?: string;
  itemsSummary?: string;
}

export interface HotspotLocation {
  id: string;
  name: string;
  status: "Clean" | "Moderate" | "High Litter";
  cleanlinessScore: number;
  reportsCount: number;
  lat: number;
  lng: number;
  topPollutant: string;
  xPercent: number; // For interactive visual map representation
  yPercent: number;
  activityLabel: string;
}
