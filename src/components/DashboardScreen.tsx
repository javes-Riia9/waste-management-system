import React, { useState } from "react";
import { ReportItem, ScreenType } from "../types";
import {
  WASTE_DISTRIBUTION_DATA,
  WEEKLY_TREND_DATA,
} from "../data/mockData";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ComposedChart,
} from "recharts";

interface DashboardScreenProps {
  reports: ReportItem[];
  onNavigate: (screen: ScreenType) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  reports,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const totalReportsCount = 1240 + reports.length - 5;
  const avgCleanlinessScore = 84;
  const hotspotsCount = 12;
  const reportsThisWeek = "+45";

  const filteredReports = reports.filter((rep) => {
    const matchesSearch =
      rep.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.wasteType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || rep.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="pt-20 pb-28 px-4 md:px-8 max-w-[1440px] mx-auto w-full flex flex-col gap-8">
      {/* Page Heading */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
          Analytics Overview
        </h1>
        <p className="text-sm md:text-base text-on-surface-variant">
          System performance and logistics metrics.
        </p>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Reports */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col justify-between gap-4 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Total Reports
            </span>
            <span className="material-symbols-outlined text-primary bg-surface-container p-2 rounded-xl">
              assignment
            </span>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-on-surface">
            {totalReportsCount.toLocaleString()}
          </div>
        </div>

        {/* Card 2: Average Cleanliness Score */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col justify-between gap-4 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Avg Score
            </span>
            <span className="material-symbols-outlined text-secondary bg-surface-container p-2 rounded-xl">
              star
            </span>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-on-surface flex items-baseline gap-1">
            {avgCleanlinessScore}
            <span className="text-lg font-semibold text-on-surface-variant">
              /100
            </span>
          </div>
        </div>

        {/* Card 3: Hotspots Identified */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col justify-between gap-4 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Hotspots
            </span>
            <span className="material-symbols-outlined text-error bg-error-container p-2 rounded-xl">
              local_fire_department
            </span>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-on-surface">
            {hotspotsCount}
          </div>
        </div>

        {/* Card 4: Reports This Week */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col justify-between gap-4 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Reports This Week
            </span>
            <span className="material-symbols-outlined text-primary bg-primary-container/20 text-primary-container p-2 rounded-xl">
              trending_up
            </span>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-primary">
            {reportsThisWeek}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pie Chart: Waste Type Distribution (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-on-surface">
            Waste Type Distribution
          </h3>
          <div className="w-full h-60 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={WASTE_DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {WASTE_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-medium text-on-surface-variant">
                Primary
              </span>
              <span className="text-2xl font-bold text-on-surface">45%</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {WASTE_DISTRIBUTION_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.name} ({item.value}%)
              </div>
            ))}
          </div>
        </div>

        {/* Combined Bar & Line Chart: Weekly Reports (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-on-surface">
              Weekly Reports &amp; Cleanliness Trend
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-primary"></span>
                <span>Reports</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-secondary rounded-full"></span>
                <span>Score Trend</span>
              </div>
            </div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={WEEKLY_TREND_DATA}>
                <XAxis dataKey="day" stroke="#707a6c" fontSize={12} />
                <YAxis yAxisId="left" stroke="#707a6c" fontSize={12} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  stroke="#006e1c"
                  fontSize={12}
                />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="reports"
                  fill="#0d631b"
                  radius={[6, 6, 0, 0]}
                  barSize={32}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cleanliness"
                  stroke="#006e1c"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#006e1c" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(38,50,56,0.04)] border border-surface-variant overflow-hidden flex flex-col">
        <div className="p-6 border-b border-surface-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-on-surface">
              Recent Reports
            </h3>
            <p className="text-xs text-on-surface-variant">
              Live inspection stream and municipal submission logs
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            {/* Status Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 bg-surface-container-low border border-outline-variant/50 rounded-lg text-xs text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
              <option value="Pending">Pending</option>
            </select>

            <button
              onClick={() => onNavigate("detection")}
              className="bg-primary text-on-primary text-xs font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer flex items-center gap-1 ml-auto sm:ml-0"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Scan
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-variant text-xs text-on-surface-variant font-semibold uppercase">
                <th className="p-4">Location</th>
                <th className="p-4">Score</th>
                <th className="p-4">Waste Type</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant text-sm text-on-surface">
              {filteredReports.map((rep) => (
                <tr
                  key={rep.id}
                  className="hover:bg-surface-bright transition-colors group cursor-pointer"
                >
                  <td className="p-4 font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-outline text-lg">
                      location_on
                    </span>
                    <div>
                      <div className="font-semibold text-on-surface">
                        {rep.location}
                      </div>
                      <div className="text-xs text-outline">{rep.date}</div>
                    </div>
                  </td>

                  <td className="p-4 font-bold">
                    <span
                      className={
                        rep.score >= 70
                          ? "text-primary"
                          : rep.score >= 45
                          ? "text-on-surface-variant"
                          : "text-error"
                      }
                    >
                      {rep.score}/100
                    </span>
                  </td>

                  <td className="p-4 text-xs text-on-surface-variant">
                    {rep.wasteType}
                  </td>

                  <td className="p-4">
                    {rep.status === "Success" ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-container/20 text-primary-container text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5"></span>
                        Success
                      </span>
                    ) : rep.status === "Warning" ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-1.5"></span>
                        Warning
                      </span>
                    ) : rep.status === "Critical" ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-error-container text-on-error-container text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                        Critical
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-variant text-on-surface-variant text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-outline mr-1.5"></span>
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => onNavigate("map")}
                      className="text-on-surface-variant hover:text-primary transition-colors p-1"
                      title="View on Map"
                    >
                      <span className="material-symbols-outlined text-lg">
                        map
                      </span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredReports.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-on-surface-variant text-sm italic"
                  >
                    No reports match your current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
