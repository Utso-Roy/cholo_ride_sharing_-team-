import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import {
  FaWallet,
  FaChartLine,
  FaCalendarDay,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

const EarningRide = () => {
  // Dummy earnings data
  const earningsData = {
    total: 15800,
    today: 1250,
    averageFare: 95,
  };

  // Last withdrawal date (can be from backend)
  const [lastWithdrawDate, setLastWithdrawDate] = useState("2025-10-20");
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [nextWithdrawDate, setNextWithdrawDate] = useState("");

  // Chart data for last 7 days
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Earnings (৳)",
        data: [1200, 1500, 900, 1700, 1100, 1400, 2000],
        fill: true,
        borderColor: "#22c55e",
        tension: 0.4,
        backgroundColor: "rgba(34,197,94,0.2)",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: { color: "#374151", font: { size: 14 } },
      },
    },
    scales: {
      x: { ticks: { color: "#6b7280" }, grid: { color: "#f3f4f6" } },
      y: { ticks: { color: "#6b7280" }, grid: { color: "#f3f4f6" } },
    },
  };

  // Check withdraw eligibility (every 7 days)
  useEffect(() => {
    const lastDate = new Date(lastWithdrawDate);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + 7);
    setNextWithdrawDate(nextDate.toDateString());

    const now = new Date();
    setCanWithdraw(now >= nextDate);
  }, [lastWithdrawDate]);

  // Handle Cashout
  const handleWithdraw = () => {
    if (!canWithdraw) {
      Swal.fire({
        icon: "warning",
        title: "Withdraw not available yet!",
        text: `You can withdraw again on ${nextWithdrawDate}.`,
      });
      return;
    }

    Swal.fire({
      title: "Confirm Cashout?",
      text: `Do you want to withdraw ৳${earningsData.total}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Withdraw",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setLastWithdrawDate(new Date().toISOString().split("T")[0]);
        Swal.fire({
          icon: "success",
          title: "Withdrawal Successful!",
          text: "Your earnings have been transferred successfully.",
        });
      }
    });
  };

  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#27445D] mb-6">
        Earnings Overview
      </h1>

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md hover:shadow-lg transition-all border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg text-[#27445D]">Total Earnings</h2>
              <p className="text-2xl font-bold text-green-600">
                ৳{earningsData.total}
              </p>
            </div>
            <FaWallet className="text-green-500 text-3xl" />
          </div>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-all border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg text-[#27445D]">Today’s Earnings</h2>
              <p className="text-2xl font-bold text-blue-600">
                ৳{earningsData.today}
              </p>
            </div>
            <FaCalendarDay className="text-blue-500 text-3xl" />
          </div>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-all border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg text-[#27445D]">Average Fare</h2>
              <p className="text-2xl font-bold text-yellow-600">
                ৳{earningsData.averageFare}
              </p>
            </div>
            <FaMoneyBillWave className="text-yellow-500 text-3xl" />
          </div>
        </Card>
      </div>

      {/* Cashout Section */}
      <Card className="shadow-md p-5 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-[#27445D] flex items-center gap-2 mb-2">
              <FaMoneyCheckAlt className="text-green-500" /> Cashout Section
            </h2>
            <p className="text-[#27445D] text-sm">
              Next eligible withdrawal date:{" "}
              <span className="font-medium text-green-600">
                {nextWithdrawDate}
              </span>
            </p>
          </div>

          <button
            onClick={handleWithdraw}
            disabled={!canWithdraw}
            className={`mt-4 sm:mt-0 px-6 py-2 rounded-lg font-semibold text-white transition-all ${
              canWithdraw
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {canWithdraw ? "Withdraw Now" : "Withdraw Locked"}
          </button>
        </div>
      </Card>

      {/* Earnings Chart */}
      <Card className="shadow-md p-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#27445D] flex items-center gap-2">
          <FaChartLine className="text-green-500" /> Weekly Earnings Chart
        </h2>
        <Chart
          type="line"
          data={chartData}
          options={chartOptions}
          className="w-full h-72"
        />
      </Card>
    </div>
  );
};

export default EarningRide;
