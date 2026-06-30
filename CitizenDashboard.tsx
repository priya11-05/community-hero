import React from "react";
import { 
  Award, 
  FileText, 
  Clock, 
  CheckCircle, 
  Heart, 
  MapPin, 
  Bell, 
  TrendingUp, 
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { Report, AppUser, Challenge } from "../types";

interface CitizenDashboardProps {
  currentUser: AppUser;
  reports: Report[];
  challenges: Challenge[];
  onSelectReport: (report: Report) => void;
}

export default function CitizenDashboard({
  currentUser,
  reports,
  challenges,
  onSelectReport
}: CitizenDashboardProps) {
  // Filter reports submitted by this user
  const myReports = reports.filter(r => r.reporter.id === currentUser.id);
  const pendingReports = myReports.filter(r => r.status !== 'resolved' && r.status !== 'closed');
  const resolvedReports = myReports.filter(r => r.status === 'resolved' || r.status === 'closed');

  // Gamification badges reference data
  const badgeIcons: Record<string, string> = {
    "First Reporter": "🏅",
    "Road Warrior": "🚧",
    "Water Saver": "💧",
    "Clean City Champion": "🧹",
    "Community Guardian": "🛡️",
    "Top Volunteer": "🌟"
  };

  const getRankColor = (trust: AppUser["trustLevel"]) => {
    const colors = {
      Bronze: "bg-orange-100 text-orange-800 border-orange-200",
      Silver: "bg-slate-100 text-slate-800 border-slate-200",
      Gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Platinum: "bg-cyan-100 text-cyan-800 border-cyan-200",
      "Community Hero": "bg-blue-600 text-white border-blue-600 font-bold"
    };
    return colors[trust] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="citizen-dashboard">
      
      {/* Welcome header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center space-x-4">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-14 h-14 rounded-full border-4 border-blue-500/20 object-cover" 
          />
          <div>
            <h1 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight flex items-center">
              Welcome Back, {currentUser.name}! 
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ml-2.5 ${getRankColor(currentUser.trustLevel)}`}>
                {currentUser.trustLevel} Tier
              </span>
            </h1>
            <p className="text-gray-500 font-medium text-xs mt-0.5">
              Your community validation rating is at <strong className="text-blue-600">{currentUser.verificationAccuracy}% Accuracy</strong>. Thank you for making our neighborhood safer!
            </p>
          </div>
        </div>

        {/* Level summary stats */}
        <div className="flex space-x-6">
          <div className="text-left">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Community XP</span>
            <p className="text-xl font-extrabold text-blue-600 mt-0.5">{currentUser.communityScore} pts</p>
          </div>
          <div className="w-[1px] bg-gray-100"></div>
          <div className="text-left">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Reports Active</span>
            <p className="text-xl font-extrabold text-gray-800 mt-0.5">{pendingReports.length} cases</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column (8 Columns) - Missions & My reports list */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Challenges & Missions */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-4">
              <Award className="h-4 w-4 text-[#F6B93B]" />
              <h2 className="font-bold text-sm text-gray-800">Active Gamified Missions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {challenges.map((ch) => (
                <div key={ch.id} className="p-4 border border-gray-100 hover:border-gray-200 rounded-2xl bg-gray-50/40 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${ch.type === 'daily' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                        {ch.type === 'daily' ? 'Daily Mission' : 'Weekly Mission'}
                      </span>
                      <span className="text-[10px] font-bold text-amber-500">+{ch.points} XP</span>
                    </div>
                    <h4 className="font-bold text-xs text-gray-900 mb-1">{ch.title}</h4>
                    <p className="text-[10px] leading-relaxed text-gray-400 font-medium mb-4">{ch.description}</p>
                  </div>

                  <div>
                    {/* Progress slider */}
                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{ch.progress}/{ch.maxProgress}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-2">
                      <div 
                        className={`h-1.5 rounded-full ${ch.completed ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                        style={{ width: `${(ch.progress / ch.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                    {ch.completed ? (
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center justify-center">
                        ✓ Claimed Reward
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full block text-center">
                        Active Quest
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Submitted Reports */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-4">
              <FileText className="h-4 w-4 text-blue-600" />
              <h2 className="font-bold text-sm text-gray-800">My Submitted Reports ({myReports.length})</h2>
            </div>

            {myReports.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <p className="text-xs font-semibold">You haven't reported any civic issues yet.</p>
                <p className="text-[10px] text-gray-400 mt-1">Submit a photograph in the 'Report Issue' tab to earn your first badge!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myReports.map((r) => (
                  <div 
                    key={r.id}
                    onClick={() => onSelectReport(r)}
                    className="p-4 border border-gray-100 hover:border-gray-200 rounded-2xl transition hover:shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                      <img 
                        src={r.beforeImage} 
                        alt={r.title} 
                        className="w-14 h-14 rounded-xl object-cover border border-gray-100 shadow-sm"
                      />
                      <div className="text-left min-w-0 flex-1">
                        <div className="flex items-center space-x-2.5 mb-1.5">
                          <span className="text-[10px] font-bold text-gray-400 font-mono">{r.id}</span>
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full capitalize">
                            {r.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-gray-900 line-clamp-1">{r.title}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {r.location.address}
                        </p>
                      </div>
                    </div>

                    {/* Progress status indicators */}
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-gray-400 block uppercase">Lifecycle Status</span>
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full inline-block mt-1 capitalize ${
                          r.status === 'resolved' || r.status === 'closed'
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : r.status === 'in_progress'
                              ? "bg-blue-50 text-blue-600 border border-blue-100"
                              : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}>
                          {r.status.replace('_', ' ')}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 hidden md:block" />
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right column (4 Columns) - Gamification badges, leader board rank, rewards */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          {/* Rewards & Rank Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">Level Progress</span>
              <span className="text-[10px] font-bold bg-white/20 text-white px-2.5 py-0.5 rounded-full">Level 4</span>
            </div>
            
            <p className="text-3xl font-extrabold font-display">Silver Elite</p>
            <p className="text-xs text-blue-200 mt-1 font-medium">Next rank unlocks at 500 XP. You need 20 XP more.</p>

            {/* Simulated level progress bar */}
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-4 mb-2">
              <div className="bg-[#F6B93B] h-2 rounded-full" style={{ width: "96%" }}></div>
            </div>

            <div className="flex justify-between text-[10px] text-blue-200 font-bold">
              <span>480 XP</span>
              <span>500 XP</span>
            </div>
          </div>

          {/* Unlocked Badges Cabinet */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-2.5 mb-4">
              My Badge Cabinet ({currentUser.badges.length})
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {currentUser.badges.map((b_name, idx) => (
                <div key={idx} className="p-3 border border-gray-50 bg-gray-50/50 rounded-2xl text-center flex flex-col items-center group hover:border-blue-100 transition">
                  <span className="text-3xl mb-1.5 transition duration-300 group-hover:scale-110">{badgeIcons[b_name] || "🏅"}</span>
                  <p className="font-bold text-[10px] text-gray-800 leading-tight">{b_name}</p>
                  <p className="text-[8px] text-gray-400 mt-0.5 font-medium">Unlocked</p>
                </div>
              ))}
              
              {/* Mock locked badges to encourage engagement */}
              <div className="p-3 border border-dashed border-gray-200 rounded-2xl text-center flex flex-col items-center opacity-45">
                <span className="text-3xl mb-1.5 grayscale">🧹</span>
                <p className="font-bold text-[10px] text-gray-800 leading-tight">Clean City</p>
                <p className="text-[8px] text-amber-600 mt-0.5 font-bold">Locked</p>
              </div>
            </div>
          </div>

          {/* Community Rank Summary */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-2.5 mb-3 flex justify-between items-center">
              <span>District Ranking</span>
              <span className="text-xs text-blue-600 font-semibold">Ward 3</span>
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs py-1.5 border-b border-gray-50 font-medium">
                <span className="text-gray-500">1. Chief Volunteer Elena R.</span>
                <span className="font-bold text-gray-800">1,480 XP</span>
              </div>
              <div className="flex justify-between items-center text-xs py-1.5 border-b border-gray-50 font-medium bg-blue-50/50 px-2 rounded-lg border border-blue-100">
                <span className="text-blue-700 font-bold">14. Alex Rivera (You)</span>
                <span className="font-extrabold text-blue-700">480 XP</span>
              </div>
              <div className="flex justify-between items-center text-xs py-1.5 border-b border-gray-50 font-medium">
                <span className="text-gray-500">15. Sophia Martinez</span>
                <span className="font-bold text-gray-800">450 XP</span>
              </div>
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-gray-500">16. Tariq Mahmood</span>
                <span className="font-bold text-gray-800">410 XP</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
