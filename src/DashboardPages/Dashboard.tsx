import React, { useState } from 'react';
import { Users, FileText, Car, PieChart, Bike, UserCheck, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

const ModernDashboard = () => {
  const [role] = useState('admin'); 
  const getStatsByRole = () => {
    if (role === 'admin') {
      return [
        {
          label: 'মোট ব্যবহারকারী',
          value: '1,240',
          change: '+12.5%',
          icon: Users,
          gradient: 'from-violet-500 to-purple-600',
          bgGradient: 'from-violet-500/10 to-purple-600/10',
        },
        {
          label: 'মোট রিপোর্ট',
          value: '320',
          change: '+8.2%',
          icon: FileText,
          gradient: 'from-rose-500 to-pink-600',
          bgGradient: 'from-rose-500/10 to-pink-600/10',
        },
        {
          label: 'মোট ড্রাইভার',
          value: '86',
          change: '+5.1%',
          icon: Car,
          gradient: 'from-emerald-500 to-teal-600',
          bgGradient: 'from-emerald-500/10 to-teal-600/10',
        },
        {
          label: 'মোট রাইড',
          value: '452',
          change: '+18.7%',
          icon: PieChart,
          gradient: 'from-amber-500 to-orange-600',
          bgGradient: 'from-amber-500/10 to-orange-600/10',
        },
      ];
    } else if (role === 'rider') {
      return [
        {
          label: 'সম্পন্ন রাইড',
          value: '45',
          change: '+23%',
          icon: Bike,
          gradient: 'from-emerald-500 to-teal-600',
          bgGradient: 'from-emerald-500/10 to-teal-600/10',
        },
        {
          label: 'চলমান রাইড',
          value: '3',
          change: 'Active',
          icon: Activity,
          gradient: 'from-blue-500 to-cyan-600',
          bgGradient: 'from-blue-500/10 to-cyan-600/10',
        },
        {
          label: 'রেটিং',
          value: '4.8',
          change: '+0.2',
          icon: UserCheck,
          gradient: 'from-amber-500 to-orange-600',
          bgGradient: 'from-amber-500/10 to-orange-600/10',
        },
        {
          label: 'মোট আয় (৳)',
          value: '8,500',
          change: '+15%',
          icon: TrendingUp,
          gradient: 'from-violet-500 to-purple-600',
          bgGradient: 'from-violet-500/10 to-purple-600/10',
        },
      ];
    } else {
      return [
        {
          label: 'মোট রাইড অনুরোধ',
          value: '12',
          change: '+4',
          icon: FileText,
          gradient: 'from-blue-500 to-cyan-600',
          bgGradient: 'from-blue-500/10 to-cyan-600/10',
        },
        {
          label: 'সম্পন্ন রাইড',
          value: '8',
          change: '67%',
          icon: Car,
          gradient: 'from-emerald-500 to-teal-600',
          bgGradient: 'from-emerald-500/10 to-teal-600/10',
        },
        {
          label: 'বাতিল রাইড',
          value: '2',
          change: '17%',
          icon: PieChart,
          gradient: 'from-rose-500 to-pink-600',
          bgGradient: 'from-rose-500/10 to-pink-600/10',
        },
        {
          label: 'মোট খরচ (৳)',
          value: '1,500',
          change: '+₹500',
          icon: TrendingUp,
          gradient: 'from-amber-500 to-orange-600',
          bgGradient: 'from-amber-500/10 to-orange-600/10',
        },
      ];
    }
  };

  const stats = getStatsByRole();

  const rideData = [
    { month: 'Jan', rides: 120, revenue: 15000 },
    { month: 'Feb', rides: 180, revenue: 22000 },
    { month: 'Mar', rides: 150, revenue: 18000 },
    { month: 'Apr', rides: 200, revenue: 25000 },
    { month: 'May', rides: 250, revenue: 31000 },
    { month: 'Jun', rides: 300, revenue: 38000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <PieChart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              ড্যাশবোর্ড
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                    {stat.change}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800">মাসভিত্তিক রাইড</h3>
              <p className="text-slate-500 text-sm mt-1">পরিসংখ্যান বিশ্লেষণ</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-lg">
              2024
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={rideData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Bar dataKey="rides" fill="url(#barGradient)" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800">আয়ের ধারা</h3>
              <p className="text-slate-500 text-sm mt-1">মাসিক রেভিনিউ</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              +18.2%
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={rideData}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#areaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ModernDashboard;