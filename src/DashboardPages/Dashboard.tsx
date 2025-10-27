import React, { useContext, useEffect, useState } from "react";
import { Card } from "primereact/card";
import {
  FaUsers,
  FaCarSide,
  FaChartPie,
  FaClipboardList,
  FaBicycle,
  FaUserCheck,
} from "react-icons/fa";
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
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../Auth/AuthProvider";
import Loading from "../Loading/Loading";

interface User {
  name: string;
  email: string;
  role: string;
}

interface StatCard {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  gradient: string;
}

interface RideData {
  month: string;
  rides: number;
}

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUserData(res.data);
        const findUser = res.data.find(
          (a: User) => a?.email === user?.email
        );
        if (findUser) setRole(findUser.role);
      })
      .catch((err) => console.error("Error loading users:", err))
      .finally(() => setLoading(false));
  }, [user?.email]);


  let stats: StatCard[] = [];

  if (role === "admin") {
    stats = [
      {
        label: "মোট ব্যবহারকারী",
        value: 1240,
        icon: <FaUsers />,
        gradient: "from-blue-400 to-blue-600",
      },
      {
        label: "মোট রিপোর্ট",
        value: 320,
        icon: <FaClipboardList />,
        gradient: "from-red-400 to-red-600",
      },
      {
        label: "মোট ড্রাইভার",
        value: 86,
        icon: <FaCarSide />,
        gradient: "from-green-400 to-green-600",
      },
      {
        label: "মোট রাইড",
        value: 452,
        icon: <FaChartPie />,
        gradient: "from-yellow-400 to-yellow-600",
      },
    ];
  } else if (role === "rider") {
    stats = [
      {
        label: "সম্পন্ন রাইড",
        value: 45,
        icon: <FaBicycle />,
        gradient: "from-green-400 to-green-600",
      },
      {
        label: "চলমান রাইড",
        value: 3,
        icon: <FaChartPie />,
        gradient: "from-blue-400 to-blue-600",
      },
      {
        label: "রেটিং",
        value: 4.8,
        icon: <FaUserCheck />,
        gradient: "from-yellow-400 to-orange-500",
      },
      {
        label: "মোট আয় (৳)",
        value: 8500,
        icon: <FaClipboardList />,
        gradient: "from-emerald-400 to-emerald-600",
      },
    ];
  } else if (role === "user") {
    stats = [
      {
        label: "মোট রাইড অনুরোধ",
        value: 12,
        icon: <FaClipboardList />,
        gradient: "from-blue-400 to-blue-600",
      },
      {
        label: "সম্পন্ন রাইড",
        value: 8,
        icon: <FaCarSide />,
        gradient: "from-green-400 to-green-600",
      },
      {
        label: "বাতিল রাইড",
        value: 2,
        icon: <FaChartPie />,
        gradient: "from-red-400 to-red-600",
      },
      {
        label: "মোট খরচ (৳)",
        value: 1500,
        icon: <FaUsers />,
        gradient: "from-yellow-400 to-orange-600",
      },
    ];
  }

  const rideData: RideData[] = [
    { month: "Jan", rides: 120 },
    { month: "Feb", rides: 180 },
    { month: "Mar", rides: 150 },
    { month: "Apr", rides: 200 },
    { month: "May", rides: 250 },
    { month: "Jun", rides: 300 },
  ];

  // 🌀 Loading Spinner
  if (loading) {
    return (
     <Loading></Loading>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-[#e6fcf9] via-[#f3f9fa] to-[#eaf5ff] min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-[#27445D] mb-10 text-center"
      >
        📊 ড্যাশবোর্ড সারসংক্ষেপ ({role ? role.toUpperCase() : "UNKNOWN"})
      </motion.h2>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.length > 0 ? (
          stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="shadow-lg border border-gray-100 rounded-3xl backdrop-blur bg-white/80 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <h3 className="text-3xl font-bold mt-1 text-[#1e293b]">
                      {item.value}
                    </h3>
                  </div>
                  <div
                    className={`p-4 rounded-2xl text-white bg-gradient-to-br ${item.gradient} shadow-md`}
                  >
                    {item.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">
            কোনো তথ্য পাওয়া যায়নি 😔
          </p>
        )}
      </div>

      <Divider align="center">
        <Tag value="Analytics" severity="info" />
      </Divider>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 p-8 rounded-3xl shadow-lg backdrop-blur-md"
      >
        <h3 className="text-2xl font-semibold mb-4 text-[#27445D]">
          📈 মাসভিত্তিক রাইড পরিসংখ্যান
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={rideData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rides" fill="#71BBB2" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Dashboard;
