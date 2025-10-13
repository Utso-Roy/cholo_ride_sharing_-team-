import React from "react";
import { Card } from "primereact/card";
import { FaUsers, FaCarSide, FaChartPie, FaClipboardList } from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";

interface StatCard {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

interface RideData {
  month: string;
  rides: number;
}

const Dashboard: React.FC = () => {
  // Dummy summary data
  const stats: StatCard[] = [
    { label: "Total Users", value: 1240, icon: <FaUsers />, color: "bg-blue-500" },
    { label: "Total Reports", value: 320, icon: <FaClipboardList />, color: "bg-red-500" },
    { label: "Total Drivers", value: 86, icon: <FaCarSide />, color: "bg-green-500" },
    { label: "Total Rides", value: 452, icon: <FaChartPie />, color: "bg-yellow-500" },
  ];

  // Dummy chart data
  const rideData: RideData[] = [
    { month: "Jan", rides: 120 },
    { month: "Feb", rides: 180 },
    { month: "Mar", rides: 150 },
    { month: "Apr", rides: 200 },
    { month: "May", rides: 250 },
    { month: "Jun", rides: 300 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">📊 Dashboard Overview</h2>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <h3 className="text-3xl font-bold mt-1">{item.value}</h3>
              </div>
              <div className={`p-4 rounded-full text-white ${item.color}`}>{item.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <Divider align="left">
        <Tag value="Analytics" severity="info" />
      </Divider>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Monthly Ride Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rideData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rides" fill="#71BBB2" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
