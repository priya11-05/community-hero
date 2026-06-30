import React, { useEffect, useState } from "react";
import { 
  FileText, 
  CheckCircle, 
  Users, 
  Building2, 
  Clock, 
  Smile,
  ArrowRight,
  TrendingDown,
  Activity
} from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onReportClick: () => void;
  onMapClick: () => void;
}

export default function HeroSection({ onReportClick, onMapClick }: HeroSectionProps) {
  // Simple animated counters
  const [issuesReported, setIssuesReported] = useState(1320);
  const [issuesResolved, setIssuesResolved] = useState(1012);
  const [volunteers, setVolunteers] = useState(420);

  useEffect(() => {
    const interval = setInterval(() => {
      setIssuesReported(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setIssuesResolved(prev => prev + (Math.random() > 0.85 ? 1 : 0));
      setVolunteers(prev => prev + (Math.random() > 0.95 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Issues Reported", value: issuesReported, suffix: "", icon: FileText, color: "text-blue-600 bg-blue-50" },
    { label: "Issues Resolved", value: issuesResolved, suffix: "", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
    { label: "Active Volunteers", value: volunteers, suffix: "", icon: Users, color: "text-amber-500 bg-amber-50" },
    { label: "Municipal Authorities", value: 24, suffix: "", icon: Building2, color: "text-indigo-600 bg-indigo-50" },
    { label: "Avg Resolution Time", value: 18.5, suffix: " hrs", icon: Clock, color: "text-pink-600 bg-pink-50", badge: "-40% SLA", badgeColor: "bg-emerald-100 text-emerald-800" },
    { label: "Citizen Satisfaction", value: 94.2, suffix: "%", icon: Smile, color: "text-teal-600 bg-teal-50", badge: "A+ Rated", badgeColor: "bg-blue-100 text-blue-800" }
  ];

  return (
    <div className="wave-container pt-12 pb-24 md:pt-20 md:pb-36 bg-[#0A74DA] overflow-hidden" id="hero-banner">
      {/* City outline background design */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300" preserveAspectRatio="none">
          <path d="M0,300 L0,220 L30,220 L30,180 L50,180 L50,220 L80,220 L80,140 L120,140 L120,220 L150,220 L150,200 L180,200 L180,250 L220,250 L220,130 L260,130 L260,250 L290,250 L290,160 L330,160 L330,220 L370,220 L370,110 L410,110 L410,220 L450,220 L450,190 L480,190 L480,240 L520,240 L520,150 L560,150 L560,240 L590,240 L590,170 L630,170 L630,230 L670,230 L670,120 L710,120 L710,230 L750,230 L750,200 L780,200 L780,250 L820,250 L820,140 L860,140 L860,250 L890,250 L890,180 L930,180 L930,220 L970,220 L970,130 L1000,130 L1000,300 Z" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Main Branding Pill */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-semibold tracking-wide mb-6">
          <span className="flex h-2 w-2 rounded-full bg-[#F6B93B] animate-pulse"></span>
          <span>Community Hero Platform v2.5</span>
          <span className="text-white/40">|</span>
          <span className="text-[#F6B93B]">Together We Build Better Communities.</span>
        </div>

        {/* Hero Headlines */}
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
          Report. Verify. <br className="sm:hidden" />
          <span className="text-[#F6B93B]">Resolve. Together.</span>
        </h1>

        <p className="text-blue-100 font-medium text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Empowering citizens and local authorities with an AI-driven civic issue management platform. Snap photos, analyze status in seconds, and trigger municipal field workers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <button
            onClick={onReportClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#F6B93B] hover:bg-yellow-500 text-black font-extrabold rounded-full shadow-xl hover:scale-[1.03] transition duration-200 active:scale-[0.98] flex items-center justify-center space-x-2"
          >
            <span>Report an Issue</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <button
            onClick={onMapClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white font-extrabold rounded-full shadow-md hover:scale-[1.03] transition duration-200 active:scale-[0.98] flex items-center justify-center space-x-2"
          >
            <Activity className="h-5 w-5" />
            <span>View Community Map</span>
          </button>
        </div>

        {/* Live Statistics Panel */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-xl text-left border border-white">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="relative p-3 rounded-2xl transition-all hover:bg-gray-50 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`p-2 rounded-xl ${st.color}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    {st.badge && (
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${st.badgeColor}`}>
                        {st.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-display">
                    {typeof st.value === "number" && st.value % 1 === 0 
                      ? st.value.toLocaleString() 
                      : st.value}
                    <span className="text-sm font-medium text-gray-500">{st.suffix}</span>
                  </p>
                </div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-1">
                  {st.label}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* Curved white wave separator separating Hero banner and next sections */}
      <div className="wave-bottom">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V120H0C50.11,114.32,154.55,103,222.18,91.24,258.07,85,291.68,71,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>

    </div>
  );
}
