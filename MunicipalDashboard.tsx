import React, { useState } from "react";
import { 
  Building2, 
  Users, 
  Briefcase, 
  FileCheck, 
  TrendingUp, 
  Search, 
  Download, 
  MapPin, 
  Wrench, 
  SlidersHorizontal,
  ChevronRight,
  AlertTriangle,
  Layers,
  FileSpreadsheet,
  CheckCircle2
} from "lucide-react";
import { Report, IssueStatus, CivicIssueCategory } from "../types";

interface MunicipalDashboardProps {
  reports: Report[];
  onSelectReport: (report: Report) => void;
  onAssignReport: (reportId: string, workerName: string) => void;
}

export default function MunicipalDashboard({
  reports,
  onSelectReport,
  onAssignReport
}: MunicipalDashboardProps) {
  const [selectedWard, setSelectedWard] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dispatchReportId, setDispatchReportId] = useState<string | null>(null);
  const [dispatchWorker, setDispatchWorker] = useState("John Field");

  // Filter list of field workers
  const fieldWorkers = [
    { name: "John Field", dept: "Road Maintenance", activeTasks: 3 },
    { name: "Sarah Clean", dept: "Sanitation & Waste", activeTasks: 1 },
    { name: "Officer John Field", dept: "Electrical Department", activeTasks: 2 },
    { name: "Dan Sewer", dept: "Water & Sewage Authority", activeTasks: 4 }
  ];

  // Excel/CSV Simulator alerts
  const handleExport = (format: 'CSV' | 'PDF') => {
    alert(`Generating ${format} audit log... Download successfully initiated!`);
  };

  // Metric computations
  const totalIssuesCount = reports.length;
  const openIssuesCount = reports.filter(r => r.status !== 'resolved' && r.status !== 'closed').length;
  const resolvedIssuesCount = totalIssuesCount - openIssuesCount;
  const resolutionRate = totalIssuesCount > 0 ? Math.round((resolvedIssuesCount / totalIssuesCount) * 100) : 0;
  
  const highPriorityCount = reports.filter(r => r.urgency === 'high' || r.urgency === 'critical').length;
  const duplicatesMitigated = reports.reduce((acc, r) => acc + r.duplicateCount, 0);

  // Advanced Filtering
  const filtered = reports.filter(r => {
    const matchesWard = selectedWard === "all" || r.location.ward === selectedWard;
    const matchesPriority = selectedPriority === "all" || r.urgency === selectedPriority;
    const matchesDept = selectedDepartment === "all" || r.suggestedDepartment.toLowerCase().includes(selectedDepartment.toLowerCase());
    const matchesSearch = searchQuery === "" || 
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWard && matchesPriority && matchesDept && matchesSearch;
  });

  const handleDispatch = (reportId: string) => {
    onAssignReport(reportId, dispatchWorker);
    setDispatchReportId(null);
    alert(`SLA triggered successfully! Dispatch crew notified of work assignment.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="municipal-dashboard">
      
      {/* Title with mock downloads */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight flex items-center">
            <Building2 className="h-6 w-6 text-blue-600 mr-2" />
            Municipal Management Command Center
          </h1>
          <p className="text-gray-500 font-medium text-xs mt-0.5">
            Real-time interdepartmental task dispatching, resource routing, and visual civic monitoring.
          </p>
        </div>

        {/* Audit exports */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleExport('CSV')}
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold rounded-xl text-xs flex items-center space-x-2 transition shadow-sm"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          
          <button
            onClick={() => handleExport('PDF')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center space-x-2 transition shadow-lg shadow-blue-600/10"
          >
            <Download className="h-4 w-4" />
            <span>Generate PDF Audit</span>
          </button>
        </div>
      </div>

      {/* Grid of 4 Corporate KPI metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-left">
        
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Active Backlog</span>
            <p className="text-2xl font-extrabold text-gray-800 mt-0.5">{openIssuesCount} reports</p>
            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full mt-1.5 inline-block">SLA Monitored</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
            <FileCheck className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Resolution SLA Rate</span>
            <p className="text-2xl font-extrabold text-gray-800 mt-0.5">{resolutionRate}%</p>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-1.5 inline-block">Target &gt; 75%</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="bg-red-50 p-3 rounded-2xl text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">High Priority Hazards</span>
            <p className="text-2xl font-extrabold text-gray-800 mt-0.5">{highPriorityCount} issues</p>
            <span className="text-[10px] text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full mt-1.5 inline-block">Immediate Attention</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="bg-amber-50 p-3 rounded-2xl text-amber-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Duplicate Reduction</span>
            <p className="text-2xl font-extrabold text-gray-800 mt-0.5">{duplicatesMitigated} merged</p>
            <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full mt-1.5 inline-block">Save 40% workload</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column - Dispatch queue and advanced filters (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Dispatch/Search header */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-50 pb-4">
              <h2 className="font-bold text-sm text-gray-800 flex items-center">
                <Briefcase className="h-4.5 w-4.5 mr-2 text-blue-600" />
                Active Dispatch Queue ({filtered.length})
              </h2>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filter ID, Street, or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
              </div>
            </div>

            {/* Inline dynamic Filters toolbar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Priority</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold bg-white"
                >
                  <option value="all">All Urgency</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Ward</label>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold bg-white"
                >
                  <option value="all">All Districts</option>
                  <option value="Ward 1">Ward 1</option>
                  <option value="Ward 2">Ward 2</option>
                  <option value="Ward 3">Ward 3</option>
                  <option value="Ward 4">Ward 4</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold bg-white"
                >
                  <option value="all">All Departments</option>
                  <option value="Road">Road Maintenance</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Water">Water & Sewage</option>
                  <option value="Sanitation">Sanitation & Waste</option>
                </select>
              </div>

            </div>

            {/* List queue */}
            <div className="space-y-4">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-xs font-medium">
                  No active reports match selected search criteria.
                </div>
              ) : (
                filtered.map((r) => (
                  <div 
                    key={r.id}
                    className="p-4 border border-gray-100 hover:border-gray-200 rounded-2xl bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:shadow-sm"
                  >
                    {/* Media thumbnail + metadata */}
                    <div className="flex items-start space-x-3.5 flex-1 min-w-0" onClick={() => onSelectReport(r)}>
                      <img 
                        src={r.beforeImage} 
                        alt={r.title} 
                        className="w-14 h-14 rounded-xl object-cover border border-gray-100 cursor-pointer" 
                      />
                      <div className="text-left flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[9px] font-bold text-gray-400 font-mono">{r.id}</span>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md ${
                            r.urgency === 'critical' || r.urgency === 'high' 
                              ? "bg-red-50 text-red-600 border border-red-100" 
                              : "bg-blue-50 text-blue-600 border border-blue-100"
                          }`}>
                            {r.urgency.toUpperCase()}
                          </span>
                          <span className="text-[9px] text-gray-400 font-medium">Confidence: {r.confidenceScore}%</span>
                        </div>
                        <h4 className="font-bold text-xs text-gray-900 truncate hover:text-blue-600 cursor-pointer">{r.title}</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5 truncate flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" /> {r.location.address}
                        </p>
                      </div>
                    </div>

                    {/* Department assign controls */}
                    <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end border-t border-gray-50 pt-3 md:border-t-0 md:pt-0">
                      <div className="text-left md:text-right">
                        <span className="text-[9px] font-bold text-gray-400 block uppercase">Department Unit</span>
                        <span className="text-[10px] font-semibold text-gray-700">{r.suggestedDepartment}</span>
                      </div>

                      {r.status === 'reported' || r.status === 'ai_verified' || r.status === 'community_verified' ? (
                        <div>
                          {dispatchReportId === r.id ? (
                            <div className="flex items-center space-x-1">
                              <select
                                value={dispatchWorker}
                                onChange={(e) => setDispatchWorker(e.target.value)}
                                className="border border-gray-200 rounded-lg p-1.5 text-[10px] font-bold bg-white"
                              >
                                {fieldWorkers
                                  .filter(w => w.dept.toLowerCase().includes(r.category) || w.dept.toLowerCase().includes("maintenance") || w.dept.toLowerCase().includes("sanitation"))
                                  .map((w, idx) => (
                                    <option key={idx} value={w.name}>{w.name} ({w.activeTasks} active)</option>
                                  ))}
                                <option value="John Field">John Field</option>
                              </select>
                              <button
                                onClick={() => handleDispatch(r.id)}
                                className="px-2.5 py-1.5 bg-blue-600 text-white font-bold rounded-lg text-[10px]"
                              >
                                Dispatch
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setDispatchReportId(r.id);
                                // Pre-set recommended worker matching category
                                const matched = fieldWorkers.find(w => w.dept.toLowerCase().includes(r.category));
                                if (matched) setDispatchWorker(matched.name);
                              }}
                              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-[10px] transition"
                            >
                              Dispatch SLA Crew
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${
                          r.status === 'resolved' || r.status === 'closed'
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-blue-50 text-blue-600"
                        }`}>
                          {r.status.replace('_', ' ')}
                        </span>
                      )}
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>

        </div>

        {/* Right column - Field worker workloads and Ward analytics (4 Columns) */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          {/* Active Field Workers Telemetry */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-2.5 mb-3 flex items-center">
              <Wrench className="h-4.5 w-4.5 mr-2 text-blue-600" />
              Active Field Worker Workloads
            </h3>

            <div className="space-y-4">
              {fieldWorkers.map((w, i) => (
                <div key={i} className="flex justify-between items-center text-xs pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold text-gray-800">{w.name}</p>
                    <p className="text-[10px] text-gray-400 font-semibold">{w.dept}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-gray-400 block uppercase">Current Backlog</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mt-0.5 ${
                      w.activeTasks >= 3 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                    }`}>
                      {w.activeTasks} active tasks
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* District Ward Breakdown */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-2.5 mb-3">
              Ward Analytics Spread
            </h3>

            <div className="space-y-3">
              {["Ward 1", "Ward 2", "Ward 3", "Ward 4", "Ward 5"].map((ward, idx) => {
                const wardReports = reports.filter(r => r.location.ward === ward);
                const wardResolved = wardReports.filter(r => r.status === 'resolved' || r.status === 'closed').length;
                const percentage = wardReports.length > 0 ? Math.round((wardResolved / wardReports.length) * 100) : 100;
                
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-gray-600">{ward} (Oak/Downtown)</span>
                      <span className="text-gray-900 font-bold">{wardReports.length} reports ({percentage}% SLA)</span>
                    </div>
                    {/* Tiny visual chart bar */}
                    <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${(wardReports.length / reports.length) * 100}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
