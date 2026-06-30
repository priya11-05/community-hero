import React, { useState } from "react";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Wrench, 
  Upload, 
  CheckCircle, 
  Play, 
  Clock, 
  Eye, 
  X,
  FileText
} from "lucide-react";
import { Report } from "../types";

interface FieldWorkerDashboardProps {
  reports: Report[];
  currentUser: any;
  onResolveReport: (reportId: string, notes: string, materials: string, afterImage?: string) => void;
}

export default function FieldWorkerDashboard({
  reports,
  currentUser,
  onResolveReport
}: FieldWorkerDashboardProps) {
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [materialsUsed, setMaterialsUsed] = useState("");
  const [afterImagePreset, setAfterImagePreset] = useState("https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&w=800&q=80");

  // Worker task filters (cases where assignedWorker corresponds or general assigned cases)
  const myTasks = reports.filter(r => 
    r.status === "assigned" || r.status === "in_progress"
  );

  const completedTasks = reports.filter(r => 
    r.status === "resolved" || r.status === "closed"
  );

  const handleStartTask = (reportId: string) => {
    setActiveReportId(reportId);
    setResolutionNotes("");
    setMaterialsUsed("");
  };

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReportId) return;

    onResolveReport(
      activeReportId,
      resolutionNotes || "Repair completed successfully in accordance with city guidelines.",
      materialsUsed || "Standard clean-up material and sealants.",
      afterImagePreset
    );

    setActiveReportId(null);
    alert("Task marked as resolved! Proof of work submitted. Reporter notified for confirmation.");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="field-worker-portal">
      
      {/* Title */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight flex items-center justify-center sm:justify-start">
          <Briefcase className="h-6 w-6 text-emerald-600 mr-2" />
          Field Crew Work Order Portal
        </h1>
        <p className="text-gray-500 font-medium text-xs mt-0.5">
          Access your assigned daily work tickets, record material logistics, and submit restoration photo telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Active tickets (8 Columns) */}
        <div className="md:col-span-8 space-y-6 text-left">
          
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-3.5 mb-4 flex items-center">
              <Clock className="h-4.5 w-4.5 mr-2 text-emerald-600 animate-pulse" />
              Assigned Daily Work Orders ({myTasks.length})
            </h2>

            {myTasks.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs font-semibold">
                🎉 No active tickets assigned to you today. Enjoy the clear schedule!
              </div>
            ) : (
              <div className="space-y-4">
                {myTasks.map((t) => (
                  <div 
                    key={t.id}
                    className="p-4 border border-gray-100 rounded-2xl bg-gray-50/40 hover:bg-gray-50 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <img 
                        src={t.beforeImage} 
                        alt={t.title} 
                        className="w-14 h-14 rounded-xl object-cover border border-gray-100" 
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[9px] font-bold text-gray-400 font-mono">{t.id}</span>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md ${
                            t.urgency === 'critical' ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                          }`}>
                            {t.urgency.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-gray-900 line-clamp-1">{t.title}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" /> {t.location.address}
                        </p>
                      </div>
                    </div>

                    {/* Action button to expand work completion card */}
                    <button
                      onClick={() => handleStartTask(t.id)}
                      className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5" />
                      <span>Start Repairs</span>
                    </button>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Expanded Restoration Telemetry Box */}
          {activeReportId && (
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-lg animate-fadeIn border-2">
              <div className="flex justify-between items-center border-b border-gray-50 pb-3 mb-5">
                <h3 className="font-bold text-sm text-gray-800 flex items-center">
                  <Wrench className="h-4.5 w-4.5 mr-2 text-emerald-600" />
                  Repair Completion & Restoration Checklist
                </h3>
                <button 
                  onClick={() => setActiveReportId(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleResolveSubmit} className="space-y-4">
                
                {/* Photo Restoration proof */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1.5">
                    1. Restoration Telemetry Image (After Photo)
                  </label>
                  
                  {/* Fake camera preview click */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <img 
                      src={afterImagePreset} 
                      alt="Restored Case" 
                      className="w-24 h-16 rounded-xl object-cover border border-gray-100 shadow-sm"
                    />
                    <div className="text-left flex-1">
                      <p className="text-xs font-bold text-gray-800">Restored_Site_Telemetry.jpg</p>
                      <p className="text-[10px] text-gray-400">Resolution photograph pre-loaded. Click to capture new photo</p>
                      <div className="flex space-x-2 mt-2">
                        <button
                          type="button"
                          onClick={() => setAfterImagePreset("https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80")}
                          className="px-2.5 py-1 border border-gray-200 bg-white text-gray-700 rounded-lg text-[9px] font-bold hover:bg-gray-50"
                        >
                          Use Preset 2 (Park Fix)
                        </button>
                        <button
                          type="button"
                          onClick={() => setAfterImagePreset("https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&w=800&q=80")}
                          className="px-2.5 py-1 border border-gray-200 bg-white text-gray-700 rounded-lg text-[9px] font-bold hover:bg-gray-50"
                        >
                          Use Preset 1 (Road Fix)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes and Materials list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1.5">Materials Utilized</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2 bags concrete, asphalt mix"
                      value={materialsUsed}
                      onChange={(e) => setMaterialsUsed(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1.5">Estimated Repair Duration</label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-500">
                      Completed within 3 Hours (On Time SLA)
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1.5">Completion Audit Notes</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Describe repair process details, safety validations..."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>

                {/* Mark Complete */}
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Submit Work Order & Lock SLA</span>
                </button>

              </form>
            </div>
          )}

        </div>

        {/* Right column - Completed tickets history (4 Columns) */}
        <div className="md:col-span-4 text-left space-y-6">
          
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-2.5 mb-3 flex items-center">
              <CheckCircle className="h-4.5 w-4.5 mr-2 text-emerald-600" />
              Completed History ({completedTasks.length})
            </h3>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {completedTasks.length === 0 ? (
                <div className="py-6 text-center text-gray-400 text-[10px] font-semibold">
                  No tickets resolved yet.
                </div>
              ) : (
                completedTasks.map((h, idx) => (
                  <div key={idx} className="flex space-x-2.5 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                    <img 
                      src={h.afterImage || h.beforeImage} 
                      alt={h.title} 
                      className="w-10 h-10 rounded-lg object-cover border border-gray-100 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[11px] text-gray-800 truncate">{h.title}</h4>
                      <p className="text-[9px] text-emerald-600 font-bold mt-0.5">✓ Resolved SLA Lock</p>
                      <p className="text-[8px] text-gray-400 mt-0.5">{h.location.address}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
