import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from "recharts";
import { Report } from "../types";
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  ShieldAlert, 
  ArrowUpRight, 
  CheckCircle, 
  Clock 
} from "lucide-react";

interface AnalyticsDashboardTabProps {
  reports: Report[];
}

export default function AnalyticsDashboardTab({ reports }: AnalyticsDashboardTabProps) {
  
  // 1. Category Distribution Spread
  const categoriesCount = reports.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoriesCount).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value
  }));

  const COLORS = ["#0A74DA", "#1E88E5", "#F6B93B", "#34C759", "#FF4D4F", "#a855f7", "#14b8a6", "#ec4899"];

  // 2. Monthly Trend Data (Jan - Jun)
  const monthlyData = [
    { name: "Jan", issues: 120, resolved: 90, volunteers: 150 },
    { name: "Feb", issues: 180, resolved: 140, volunteers: 180 },
    { name: "Mar", issues: 240, resolved: 195, volunteers: 230 },
    { name: "Apr", issues: 290, resolved: 240, volunteers: 310 },
    { name: "May", issues: 340, resolved: 290, volunteers: 390 },
    { name: "Jun", issues: 380, resolved: 320, volunteers: 485 }
  ];

  // 3. Ward Comparison Spread (Reports active vs resolved)
  const wardComparisonData = [
    { name: "Ward 1", Active: 14, Resolved: 32 },
    { name: "Ward 2", Active: 18, Resolved: 48 },
    { name: "Ward 3", Active: 8, Resolved: 52 },
    { name: "Ward 4", Active: 24, Resolved: 28 },
    { name: "Ward 5", Active: 11, Resolved: 39 }
  ];

  // 4. Average Resolution times in hours
  const resolutionTimesData = [
    { department: "Roads", SLA: 48, Actual: 18 },
    { department: "Electric", SLA: 24, Actual: 12 },
    { department: "Water", SLA: 12, Actual: 8 },
    { department: "Sanitation", SLA: 8, Actual: 3 },
    { department: "Parks", SLA: 72, Actual: 24 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="corporate-analytics-charts">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight flex items-center">
          <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
          Analytics & Performance Dashboard
        </h1>
        <p className="text-gray-500 font-medium text-xs mt-0.5">
          Detailed departmental charts, historical trends, service delivery SLAs, and ward-level performance comparisons.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Large Chart: Monthly Trend Issues vs Resolution SLA (8 Columns) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-sm text-gray-800 flex items-center">
              <LineChartIcon className="h-4.5 w-4.5 mr-2 text-blue-600" />
              Monthly Issues Registered vs Resolved (SLA Tracking)
            </h3>
            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold flex items-center">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> 15% SLA Growth
            </span>
          </div>

          <div className="h-72 w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A74DA" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0A74DA" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34C759" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#34C759" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="issues" name="Registered Concerns" stroke="#0A74DA" strokeWidth={2} fillOpacity={1} fill="url(#colorIssues)" />
                <Area type="monotone" dataKey="resolved" name="Resolved Tasks" stroke="#34C759" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category distribution Pie chart (4 Columns) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-sm text-gray-800 flex items-center mb-6">
            <PieChartIcon className="h-4.5 w-4.5 mr-2 text-blue-600" />
            Category Distribution Spread
          </h3>

          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData.length > 0 ? categoryChartData : [{ name: "Roads", value: 4 }, { name: "Electricity", value: 2 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(categoryChartData.length > 0 ? categoryChartData : [{ name: "Roads", value: 4 }]).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend counts lists inside */}
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
              <span className="text-xl font-extrabold text-gray-800">{reports.length}</span>
              <span className="text-[9px] text-gray-400 font-bold uppercase">Total Cases</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center mt-2 text-[10px] font-bold text-gray-600">
            {(categoryChartData.length > 0 ? categoryChartData : [{ name: "Roads", value: 4 }]).map((entry, index) => (
              <span key={index} className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name} ({entry.value})
              </span>
            ))}
          </div>
        </div>

        {/* SLA Resolution speeds: Target SLA vs Actual completion SLA (6 Columns) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-sm text-gray-800 flex items-center mb-6">
            <Clock className="h-4.5 w-4.5 mr-2 text-blue-600" />
            Department Resolution Speeds vs SLA Target (Hours)
          </h3>

          <div className="h-64 w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resolutionTimesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="department" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend iconType="circle" />
                <Bar dataKey="SLA" name="Contract SLA limit (Hrs)" fill="#FF4D4F" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="Actual" name="Actual Repair Time (Hrs)" fill="#34C759" radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ward Comparisons: Active backlog vs Resolved cases (6 Columns) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-sm text-gray-800 flex items-center mb-6">
            <ShieldAlert className="h-4.5 w-4.5 mr-2 text-blue-600" />
            Ward Comparison Breakdown (Active Backlog vs Resolved)
          </h3>

          <div className="h-64 w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardComparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend iconType="circle" />
                <Bar dataKey="Active" name="Active Pending Cases" fill="#F6B93B" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="Resolved" name="Resolved Locked Cases" fill="#0A74DA" radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
