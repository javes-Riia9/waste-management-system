import { ReportItem, HotspotLocation, WasteAnalysisResult } from "../types";

// High quality default waste image for instant demo
export const DEFAULT_SAMPLE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuA4kYOXBOzWQfC0-U3poizcYOHkg0eMACU78hsKeuOLDduE5gZrD_iOIWdmZ3V-Oc4o88rftpEzf8qTagXeR0pis8yqOblAcYzrfOnckD9VWD2e8OfyN1zHzfIYq4T9-HoVwADOf7BBTSjDW_TBCzOaKZJ1Tr3yr25pECTUTorHYHvYjp_jQ-1KprnTAcG6g2d2JPMVYtu3jh7c4LlgaGpnHVn17joZtYHf6nnhHevu1yEQbeGjVfTSCcg5pHJQDoEhEh7YnBqNcuSe";

export const SMART_CITY_HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCWPuEPiU20SEV_21klbaVjxV269VOzfpLQ4gtHpkT4W6uunuXcq-cRSxnSuYj_gOugXhlcFJxRtRl0Mk6CHkQCCc4peC6lv4raTmX-Zh-PuJZHq6cyD6_QcA2_1Z0hqu1ifJAGjyYH0tmK0nKtAb0YBjoKEqB5JKcDGAmhLw-vCGTURUFsU0VhW3UpCo5evGQclrCfhxy6o-XR9Ce2hOcRGX_rFAAksgxAJ70R6rBu39NRDa8Mk7mhkgumdKOGFtRTFjKIJN32RCuA";

export const SAMPLE_ANALYSIS_DEFAULT: WasteAnalysisResult = {
  reportId: "#WMR-8921",
  timestamp: "Oct 24, 2023 - 10:30 AM",
  cleanlinessScore: 72,
  summary: "Acceptable cleanliness level with plastic bottle contaminants in central recycling zone.",
  imageUrl: DEFAULT_SAMPLE_IMAGE,
  location: "Central University Campus",
  items: [
    { category: "Plastic Bottles", count: 3, color: "primary" },
    { category: "Paper", count: 0, color: "outline" },
    { category: "Cans", count: 1, color: "tertiary" },
    { category: "Other Waste", count: 2, color: "surface-tint" },
  ],
  boundingBoxes: [
    { label: "Plastic Bottle (98%)", x: 35, y: 25, width: 25, height: 50, confidence: 98 },
    { label: "Aluminum Can (91%)", x: 42, y: 60, width: 15, height: 20, confidence: 91 },
    { label: "Paper Cardboard (84%)", x: 60, y: 35, width: 20, height: 30, confidence: 84 },
  ],
};

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: "#WMR-8921",
    location: "Downtown Sector 4",
    score: 92,
    wasteType: "Organic & Paper",
    status: "Success",
    date: "Today, 10:30 AM",
    timestamp: "2026-07-27 10:30",
    imageUrl: DEFAULT_SAMPLE_IMAGE,
    itemsSummary: "Organic (45%), Paper (30%)",
  },
  {
    id: "#WMR-8920",
    location: "Northside Industrial Park",
    score: 45,
    wasteType: "Plastic & Metal Cans",
    status: "Warning",
    date: "Today, 08:15 AM",
    timestamp: "2026-07-27 08:15",
    imageUrl: DEFAULT_SAMPLE_IMAGE,
    itemsSummary: "Plastics (60%), Cans (25%)",
  },
  {
    id: "#WMR-8919",
    location: "East Riverside Walk",
    score: 78,
    wasteType: "Mixed Contaminants",
    status: "Pending",
    date: "Yesterday",
    timestamp: "2026-07-26 16:45",
    imageUrl: DEFAULT_SAMPLE_IMAGE,
    itemsSummary: "Plastic Bottles (3), Other (2)",
  },
  {
    id: "#WMR-8918",
    location: "East Wing Park",
    score: 38,
    wasteType: "Overflowing Plastics & Bags",
    status: "Critical",
    date: "Yesterday",
    timestamp: "2026-07-26 14:20",
    imageUrl: DEFAULT_SAMPLE_IMAGE,
    itemsSummary: "Critical Litter Level",
  },
  {
    id: "#WMR-8917",
    location: "Student Hub Plaza",
    score: 65,
    wasteType: "Food Containers & Cups",
    status: "Pending",
    date: "Jul 25",
    timestamp: "2026-07-25 11:10",
    imageUrl: DEFAULT_SAMPLE_IMAGE,
    itemsSummary: "Moderate Activity",
  },
];

export const HOTSPOT_LOCATIONS: HotspotLocation[] = [
  {
    id: "loc-1",
    name: "East Wing Park",
    status: "High Litter",
    cleanlinessScore: 38,
    reportsCount: 28,
    lat: 43.72,
    lng: 15.89,
    topPollutant: "Plastic Packaging & Bags",
    xPercent: 40,
    yPercent: 30,
    activityLabel: "Critical Litter Level",
  },
  {
    id: "loc-2",
    name: "Student Hub",
    status: "Moderate",
    cleanlinessScore: 65,
    reportsCount: 14,
    lat: 43.71,
    lng: 15.91,
    topPollutant: "Coffee Cups & Paper",
    xPercent: 60,
    yPercent: 50,
    activityLabel: "Moderate Activity",
  },
  {
    id: "loc-3",
    name: "North Gate",
    status: "Clean",
    cleanlinessScore: 92,
    reportsCount: 5,
    lat: 43.70,
    lng: 15.88,
    topPollutant: "Minor Organic Waste",
    xPercent: 25,
    yPercent: 65,
    activityLabel: "Clean - Scheduled Inspection",
  },
  {
    id: "loc-4",
    name: "Central Metro Station",
    status: "High Litter",
    cleanlinessScore: 42,
    reportsCount: 31,
    lat: 43.73,
    lng: 15.92,
    topPollutant: "Aluminum Cans & Bottles",
    xPercent: 75,
    yPercent: 25,
    activityLabel: "High Foot Traffic Area",
  },
];

export const WASTE_DISTRIBUTION_DATA = [
  { name: "Organic", value: 45, color: "#0d631b" },
  { name: "Plastic", value: 30, color: "#88d982" },
  { name: "Paper", value: 15, color: "#006e1c" },
  { name: "Other Waste", value: 10, color: "#d7e4ec" },
];

export const WEEKLY_TREND_DATA = [
  { day: "Mon", reports: 28, cleanliness: 82 },
  { day: "Tue", reports: 35, cleanliness: 78 },
  { day: "Wed", reports: 45, cleanliness: 85 },
  { day: "Thu", reports: 32, cleanliness: 80 },
  { day: "Fri", reports: 40, cleanliness: 84 },
  { day: "Sat", reports: 22, cleanliness: 88 },
  { day: "Sun", reports: 18, cleanliness: 91 },
];
