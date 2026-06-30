import React, { useState } from "react";
import { 
  MapPin, 
  Layers, 
  SlidersHorizontal, 
  Flame, 
  Map as MapIcon, 
  Filter, 
  Wrench, 
  CheckCircle,
  Eye,
  Search,
  Maximize2,
  X
} from "lucide-react";
import { Report, CivicIssueCategory, IssueStatus } from "../types";

interface CommunityMapProps {
  reports: Report[];
  onSelectReport: (report: Report) => void;
}

export default function CommunityMap({ reports, onSelectReport }: CommunityMapProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedWard, setSelectedWard] = useState<string>("all");
  const [heatmapMode, setHeatmapMode] = useState(false);
  const [radius, setRadius] = useState<number>(2); // KM
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredReport, setHoveredReport] = useState<Report | null>(null);

  // Ward layout definitions for our interactive vector city map
  const wards = [
    { id: "Ward 1", name: "Oak District (Ward 1)", color: "fill-blue-50/40 hover:fill-blue-100/60 stroke-blue-200", path: "M 20,20 L 160,20 L 140,140 L 20,100 Z" },
    { id: "Ward 2", name: "Downtown Core (Ward 2)", color: "fill-indigo-50/40 hover:fill-indigo-100/60 stroke-indigo-200", path: "M 160,20 L 320,20 L 300,160 L 140,140 Z" },
    { id: "Ward 3", name: "Sutter Heights (Ward 3)", color: "fill-purple-50/40 hover:fill-purple-100/60 stroke-purple-200", path: "M 20,100 L 140,140 L 110,280 L 20,280 Z" },
    { id: "Ward 4", name: "Green Valley (Ward 4)", color: "fill-emerald-50/40 hover:fill-emerald-100/60 stroke-emerald-200", path: "M 140,140 L 300,160 L 260,280 L 110,280 Z" },
    { id: "Ward 5", name: "Marina Bay (Ward 5)", color: "fill-teal-50/40 hover:fill-teal-100/60 stroke-teal-200", path: "M 320,20 L 480,20 L 480,200 L 300,160 Z" }
  ];

  // Map database coordinate boundaries to our 500x300 SVG viewbox
  const mapReportToSvgCoord = (lat: number, lng: number, ward?: string) => {
    // Generate distinct coordinate presets depending on ward to make mock layout stunning
    if (ward === "Ward 1") return { x: 70, y: 60 };
    if (ward === "Ward 2") return { x: 220, y: 70 };
    if (ward === "Ward 3") return { x: 80, y: 190 };
    if (ward === "Ward 4") return { x: 200, y: 210 };
    if (ward === "Ward 5") return { x: 380, y: 100 };
    
    // Default fallback scatter formula based on coordinate floats
    const x = Math.abs((lng + 122.45) * 8000) % 400 + 50;
    const y = Math.abs((lat - 37.74) * 8000) % 200 + 50;
    return { x, y };
  };

  const getCategoryColor = (cat: CivicIssueCategory) => {
    const colors: Record<CivicIssueCategory, string> = {
      road: "bg-amber-500 text-white border-amber-600",
      electricity: "bg-blue-500 text-white border-blue-600",
      water: "bg-cyan-500 text-white border-cyan-600",
      garbage: "bg-red-500 text-white border-red-600",
      sewage: "bg-purple-500 text-white border-purple-600",
      traffic: "bg-orange-500 text-white border-orange-600",
      environment: "bg-emerald-500 text-white border-emerald-600",
      park: "bg-teal-500 text-white border-teal-600",
      other: "bg-gray-500 text-white border-gray-600"
    };
    return colors[cat] || "bg-gray-400";
  };

  const filteredReports = reports.filter(r => {
    const matchesCategory = selectedCategory === "all" || r.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || r.status === selectedStatus;
    const matchesWard = selectedWard === "all" || r.location.ward === selectedWard;
    const matchesSearch = searchQuery === "" || 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesWard && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="community-map-dashboard">
      
      {/* Title */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">
            Interactive Community Map
          </h1>
          <p className="text-gray-500 font-medium text-xs mt-0.5">
            Real-time geolocation tracking of localized public hazards, reports, and resolution crews.
          </p>
        </div>

        {/* Heatmap/Map view controls */}
        <div className="flex items-center space-x-2 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
          <button
            onClick={() => setHeatmapMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              !heatmapMode 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <MapIcon className="h-3.5 w-3.5" />
            <span>Telemetry Markers</span>
          </button>
          
          <button
            onClick={() => setHeatmapMode(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              heatmapMode 
                ? "bg-red-600 text-white shadow-sm" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Flame className="h-3.5 w-3.5" />
            <span>AI Risk Heatmap</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Advanced Filter panel (3 Columns) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <SlidersHorizontal className="h-4 w-4 text-blue-600" />
            <h3 className="font-bold text-sm text-gray-800">Advanced Filters</h3>
          </div>

          {/* Search */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Search Issue</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search ID, title, street..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="road">Roads & Potholes</option>
              <option value="electricity">Electrical & Lights</option>
              <option value="water">Water Leakage</option>
              <option value="garbage">Sanitation & Garbage</option>
              <option value="sewage">Sewage Back-up</option>
              <option value="park">Playgrounds & Parks</option>
            </select>
          </div>

          {/* Ward filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Ward / District</label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Wards</option>
              <option value="Ward 1">Ward 1 (Oak District)</option>
              <option value="Ward 2">Ward 2 (Downtown Core)</option>
              <option value="Ward 3">Ward 3 (Sutter Heights)</option>
              <option value="Ward 4">Ward 4 (Green Valley)</option>
              <option value="Ward 5">Ward 5 (Marina Bay)</option>
            </select>
          </div>

          {/* Status filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Lifecycle Phase</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Phases</option>
              <option value="reported">Reported</option>
              <option value="community_verified">Community Verified</option>
              <option value="assigned">Assigned to Crew</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed (Locked)</option>
            </select>
          </div>

          {/* Radius selector */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1 flex justify-between">
              <span>Alert Radius</span>
              <span className="text-blue-600 font-bold">{radius} KM</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full accent-blue-600 bg-gray-200 rounded-lg cursor-pointer h-1"
            />
            <span className="text-[9px] text-gray-400 mt-1 block">Receiving notifications for issues within {radius}km</span>
          </div>

          {/* Map Legend */}
          <div className="border-t border-gray-100 pt-3">
            <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Category Legend</p>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-gray-600">
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>Roads</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>Electricity</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-500 mr-1.5"></span>Water</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>Garbage</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 mr-1.5"></span>Sewage</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-teal-500 mr-1.5"></span>Parks</div>
            </div>
          </div>

        </div>

        {/* Vector SVG Interactive Map Frame (9 Columns) */}
        <div className="lg:col-span-9 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          
          <div className="relative border border-gray-100 rounded-2xl bg-slate-50 overflow-hidden h-[450px]">
            
            {/* Real SVG Map Drawing */}
            <svg 
              className="w-full h-full object-cover select-none" 
              viewBox="0 0 500 300"
              id="svg-city-grid"
            >
              {/* Background river design */}
              <path 
                d="M 450,0 Q 400,120 480,220 T 420,300 L 500,300 L 500,0 Z" 
                fill="#e0f2fe" 
                className="opacity-60" 
              />

              {/* Draw Wards */}
              {wards.map((w, idx) => (
                <path
                  key={idx}
                  d={w.path}
                  className={`transition duration-300 stroke-2 ${w.color} cursor-pointer`}
                  onClick={() => setSelectedWard(w.id === selectedWard ? "all" : w.id)}
                  title={w.name}
                />
              ))}

              {/* Draw Ward Label Text */}
              <text x="60" y="55" className="text-[10px] font-extrabold fill-slate-400 pointer-events-none uppercase tracking-wider font-display">Ward 1</text>
              <text x="210" y="60" className="text-[10px] font-extrabold fill-slate-400 pointer-events-none uppercase tracking-wider font-display">Ward 2</text>
              <text x="50" y="220" className="text-[10px] font-extrabold fill-slate-400 pointer-events-none uppercase tracking-wider font-display">Ward 3</text>
              <text x="180" y="210" className="text-[10px] font-extrabold fill-slate-400 pointer-events-none uppercase tracking-wider font-display">Ward 4</text>
              <text x="360" y="80" className="text-[10px] font-extrabold fill-slate-400 pointer-events-none uppercase tracking-wider font-display">Ward 5</text>

              {/* AI Risk Heatmap clouds overlays */}
              {heatmapMode && (
                <>
                  <circle cx="210" cy="180" r="45" className="fill-red-500/25 filter blur-md animate-pulse" />
                  <circle cx="90" cy="140" r="30" className="fill-orange-500/25 filter blur-md" />
                  <circle cx="390" cy="90" r="35" className="fill-yellow-500/25 filter blur-md" />
                </>
              )}

              {/* Render dynamic interactive report markers */}
              {!heatmapMode && filteredReports.map((r) => {
                const coord = mapReportToSvgCoord(r.location.lat, r.location.lng, r.location.ward);
                const color = getCategoryColor(r.category);
                const isHovered = hoveredReport?.id === r.id;

                return (
                  <g 
                    key={r.id} 
                    transform={`translate(${coord.x}, ${coord.y})`}
                    className="cursor-pointer group"
                    onClick={() => onSelectReport(r)}
                    onMouseEnter={() => setHoveredReport(r)}
                  >
                    {/* Ring aura for high-urgency reports */}
                    {(r.urgency === "critical" || r.urgency === "high") && (
                      <circle 
                        r="12" 
                        className="fill-red-400/20 stroke-red-400/40 animate-ping" 
                        style={{ animationDuration: "3s" }} 
                      />
                    )}

                    {/* Standard Pin Marker circle */}
                    <circle 
                      r="7.5" 
                      className={`stroke-white stroke-[1.5px] shadow-md transition duration-200 ${
                        isHovered ? "scale-125 r-9 fill-blue-600" : "fill-blue-500"
                      }`}
                    />

                    {/* Inner core matching category color */}
                    <circle 
                      r="4" 
                      className={r.status === 'resolved' || r.status === 'closed' ? "fill-green-400" : "fill-amber-400"}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Float HUD card for hovered or pinned marker details */}
            {hoveredReport && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 bg-white p-4 rounded-2xl border border-gray-100 shadow-xl flex items-start space-x-3 transition duration-300 animate-fadeIn z-30">
                <img 
                  src={hoveredReport.beforeImage} 
                  alt={hoveredReport.title}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-100" 
                />
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-bold text-gray-400 font-mono">{hoveredReport.id}</span>
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full capitalize">{hoveredReport.category}</span>
                  </div>
                  <h4 className="font-bold text-xs text-gray-800 line-clamp-1">{hoveredReport.title}</h4>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5">{hoveredReport.location.address}</p>
                  
                  <div className="flex justify-between items-center mt-2 border-t border-gray-50 pt-1.5">
                    <span className="text-[9px] font-bold text-amber-600 capitalize bg-amber-50 px-2 py-0.5 rounded-md flex items-center">
                      {hoveredReport.status.replace('_', ' ')}
                    </span>
                    <button 
                      onClick={() => onSelectReport(hoveredReport)}
                      className="text-[9px] text-blue-600 hover:text-blue-800 font-bold flex items-center"
                    >
                      <span>Explore History</span>
                      <Maximize2 className="h-2.5 w-2.5 ml-1" />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setHoveredReport(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Quick alert bar: Nearby verifications requests (Simulating Geofencing) */}
            <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur px-4 py-2.5 rounded-xl border border-blue-50 shadow-md flex justify-between items-center z-10">
              <div className="flex items-center space-x-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <p className="text-[10px] font-bold text-gray-700">
                  ⚠️ 2 Nearby hazards awaiting community verification votes in your 2km radius.
                </p>
              </div>
              <button 
                onClick={() => {
                  const toVerify = reports.find(r => r.status === 'reported');
                  if (toVerify) onSelectReport(toVerify);
                }}
                className="text-[9px] bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg transition"
              >
                Inspect
              </button>
            </div>

          </div>

          {/* Quick Stats Summary underneath Map */}
          <div className="grid grid-cols-3 gap-4 mt-4 text-left">
            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
              <span className="text-[9px] font-bold uppercase text-blue-400 tracking-wider">Filtered PinCount</span>
              <p className="text-lg font-bold text-blue-900 mt-0.5">{filteredReports.length} Issues</p>
            </div>
            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
              <span className="text-[9px] font-bold uppercase text-emerald-400 tracking-wider">Resolved SLA</span>
              <p className="text-lg font-bold text-emerald-900 mt-0.5">
                {filteredReports.filter(r => r.status === 'resolved' || r.status === 'closed').length} Done
              </p>
            </div>
            <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100">
              <span className="text-[9px] font-bold uppercase text-amber-400 tracking-wider">Active Backlog</span>
              <p className="text-lg font-bold text-amber-900 mt-0.5">
                {filteredReports.filter(r => r.status !== 'resolved' && r.status !== 'closed').length} Pending
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
