import React from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { FaChartLine, FaStar, FaClock, FaRoute } from "react-icons/fa";

interface PerformanceData {
  totalRides: number;
  avgRating: number;
  avgTimePerRide: string;
}

const PerformanceReport: React.FC = () => {
  // Dummy performance data
  const performanceData: PerformanceData = {
    totalRides: 128,
    avgRating: 4.6,
    avgTimePerRide: "18 min",
  };

  // Ride count chart (weekly)
  const rideChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Completed Rides",
        data: [12, 15, 9, 20, 17, 22, 33],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "#3b82f6",
        borderWidth: 2,
      },
    ],
  };

  const rideChartOptions = {
    plugins: {
      legend: { labels: { color: "#374151" } },
    },
    scales: {
      x: { ticks: { color: "#6b7280" }, grid: { color: "#f3f4f6" } },
      y: { ticks: { color: "#6b7280" }, grid: { color: "#f3f4f6" } },
    },
  };

  // Customer rating chart (doughnut)
  const ratingChartData = {
    labels: ["5★", "4★", "3★", "2★", "1★"],
    datasets: [
      {
        data: [60, 25, 10, 3, 2],
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#facc15",
          "#f97316",
          "#ef4444",
        ],
        hoverBackgroundColor: [
          "#16a34a",
          "#2563eb",
          "#eab308",
          "#ea580c",
          "#dc2626",
        ],
      },
    ],
  };

  const ratingChartOptions = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: "#374151", font: { size: 14 } },
      },
    },
  };

  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#27445D] mb-6 flex items-center gap-2">
        <FaChartLine className="text-blue-500" /> Performance Report
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md hover:shadow-lg transition-all border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg text-[#27445D]">Total Rides</h2>
              <p className="text-2xl font-bold text-blue-600">
                {performanceData.totalRides}
              </p>
            </div>
            <FaRoute className="text-blue-500 text-3xl" />
          </div>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-all border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg text-[#27445D]">Average Rating</h2>
              <p className="text-2xl font-bold text-yellow-500">
                {performanceData.avgRating}★
              </p>
            </div>
            <FaStar className="text-yellow-500 text-3xl" />
          </div>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-all border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg text-[#27445D]">Avg. Ride Time</h2>
              <p className="text-2xl font-bold text-green-600">
                {performanceData.avgTimePerRide}
              </p>
            </div>
            <FaClock className="text-green-500 text-3xl" />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ride Chart */}
        <Card className="shadow-md p-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#27445D] flex items-center gap-2">
            📊 Weekly Ride Count
          </h2>
          <Chart
            type="bar"
            data={rideChartData}
            options={rideChartOptions}
            className="w-full h-72"
          />
        </Card>

        {/* Rating Chart */}
        <Card className="shadow-md p-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#27445D] flex items-center gap-2">
            Customer Rating Distribution
          </h2>
          <Chart
            type="doughnut"
            data={ratingChartData}
            options={ratingChartOptions}
            className="w-full h-72"
          />
        </Card>
      </div>
    </div>
  );
};

export default PerformanceReport;
