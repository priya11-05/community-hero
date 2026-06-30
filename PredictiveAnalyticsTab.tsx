import React from "react";
import { 
  Sparkles, 
  MapPin, 
  Wrench, 
  TrendingUp, 
  HelpCircle, 
  AlertTriangle, 
  LineChart, 
  Layers,
  CheckCircle,
  FileSpreadsheet,
  AlertOctagon
} from "lucide-react";
import { Prediction } from "../types";

interface PredictiveAnalyticsTabProps {
  predictions: Prediction[];
}

export default function PredictiveAnalyticsTab({ predictions }: PredictiveAnalyticsTabProps) {
  
  const getRiskColor = (score: number) => {
    if (score >= 85) return "text-red-600 bg-red-50 border-red-100";
    if (score >= 70) return "text-orange-600 bg-orange-50 border-orange-100";
    return "text-yellow-600 bg-yellow-50 border-yellow-100";
  };

  const getProgressColor = (score: number) => {
    if (score >= 85) return "bg-red-500";
    if (score >= 70) return "bg-orange-500";
    return "bg-yellow-500";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="predictive-analytics-center">
      
      {/* Title */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
            <Sparkles className="h-6 w-6 text-[#F6B93B] animate-pulse" />
          </div>
          <div className="text-left">
            <h1 className="font-display font-extrabold text-xl text-white tracking-tight">
              AI Smart City Predictive Analytics
            </h1>
            <p className="text-blue-200 font-medium text-xs mt-0.5">
              Time-series forecasting models predicting structural road deterioration, water leakage, garbage hotspots, and electric circuit failures.
            </p>
          </div>
        </div>

        {/* Predictive stats HUD */}
        <div className="flex space-x-6 text-left">
          <div>
            <span className="text-[10px] text-blue-300 uppercase font-bold">Risk Scanned</span>
            <p className="text-lg font-extrabold text-[#F6B93B]">12 Districts</p>
          </div>
          <div className="w-[1px] bg-white/15"></div>
          <div>
            <span className="text-[10px] text-blue-300 uppercase font-bold">Risk Avoided SLA</span>
            <p className="text-lg font-extrabold text-green-400">84%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left side: AI Predictions Feed (7 Columns) */}
        <div className="lg:col-span-7 space-y-5 text-left">
          
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-3 mb-5 flex items-center justify-between">
              <span className="flex items-center">
                <AlertOctagon className="h-4.5 w-4.5 mr-2 text-red-500" />
                Active High-Risk Structural Warnings
              </span>
              <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold">Risk Level &gt; 70%</span>
            </h2>

            <div className="space-y-4">
              {predictions.map((p) => (
                <div 
                  key={p.id}
                  className="p-5 border border-gray-100 rounded-2xl bg-gray-50/40 hover:bg-gray-50/80 transition"
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span className="text-[9px] font-bold text-gray-400 font-mono">{p.id}</span>
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full capitalize">{p.category}</span>
                      </div>
                      <h4 className="font-bold text-xs text-gray-900">{p.issueType}</h4>
                      <p className="text-[10px] text-gray-500 mt-1 flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" /> {p.location}
                      </p>
                    </div>

                    {/* Risk Score gauge */}
                    <div className={`px-3 py-2 rounded-xl border text-center ${getRiskColor(p.riskScore)}`}>
                      <span className="text-[9px] font-bold block uppercase tracking-wider">Risk Score</span>
                      <span className="font-display font-extrabold text-base">{p.riskScore}%</span>
                    </div>
                  </div>

                  {/* Recommendation Card */}
                  <div className="mt-4 p-3 bg-white border border-gray-100 rounded-xl">
                    <p className="text-[10px] text-gray-700 leading-relaxed">
                      <strong>AI Recommendation:</strong> {p.recommendation}
                    </p>
                    <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 border-t border-gray-50 mt-3 pt-2">
                      <span className="flex items-center text-amber-600">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Preventive maintenance scheduled
                      </span>
                      <span>Target Date: {p.predictedDate}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right side: Preventative planning and Budget suggestions (5 Columns) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          {/* Preventative Maintenance Schedules */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-2.5 mb-3 flex items-center">
              <Wrench className="h-4.5 w-4.5 mr-2 text-blue-600" />
              SLA Preventive Action Plan
            </h3>

            <div className="space-y-4 text-xs font-semibold text-gray-700">
              <div className="p-3 border border-gray-100 rounded-xl hover:border-blue-100 transition">
                <p className="font-bold text-gray-800">Acoustic Leak Inspections</p>
                <p className="text-[10px] text-gray-400 font-medium">Ward 2 (Downtown Core) pipelines</p>
                <div className="flex justify-between items-center text-[10px] font-bold mt-2">
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Phase 1 (Active)</span>
                  <span className="text-gray-500">SLA: 2 Days</span>
                </div>
              </div>

              <div className="p-3 border border-gray-100 rounded-xl hover:border-blue-100 transition">
                <p className="font-bold text-gray-800">Substation Capacitors Swap</p>
                <p className="text-[10px] text-gray-400 font-medium">Ward 1 (Oak Avenue substation)</p>
                <div className="flex justify-between items-center text-[10px] font-bold mt-2">
                  <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Phase 2 (Pending Dispatch)</span>
                  <span className="text-gray-500">SLA: 1 Week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Allocation suggestions */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-2.5 mb-3">
              AI Budget Allocation Recommendations
            </h3>

            <div className="space-y-4">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-700">Pavement Micro-Surfacing (Roads)</span>
                  <span className="text-blue-600">45% Budget (Recommend)</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-700">Acoustic Pipeline Inspections (Water)</span>
                  <span className="text-blue-600">30% Budget (Recommend)</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-700">Sanitation Bin Distribution (Garbage)</span>
                  <span className="text-blue-600">15% Budget (Recommend)</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "15%" }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
