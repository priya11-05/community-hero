import React, { useState } from "react";
import { 
  Award, 
  TrendingUp, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { AppUser, Challenge } from "../types";

interface LeaderboardTabProps {
  currentUser: AppUser;
  challenges: Challenge[];
}

export default function LeaderboardTab({ currentUser, challenges }: LeaderboardTabProps) {
  const [activeLeaderboard, setActiveLeaderboard] = useState<"volunteer" | "neighborhood">("volunteer");
  const [showCelebration, setShowCelebration] = useState<string | null>(null);

  // Simulated volunteers rankings
  const topVolunteers = [
    { rank: 1, name: "Elena Rostova", score: 1480, reports: 18, verifications: 84, badge: "🛡️ Community Guardian" },
    { rank: 2, name: "Marcus Chen", score: 1250, reports: 14, verifications: 62, badge: "🌟 Top Volunteer" },
    { rank: 3, name: "Clara Oswald", score: 920, reports: 9, verifications: 44, badge: "🧹 Clean City Champion" },
    { rank: 4, name: "David Kim", score: 810, reports: 12, verifications: 38, badge: "🚧 Road Warrior" },
    { rank: 5, name: "Alex Rivera (You)", score: 480, reports: 8, verifications: 14, badge: "🥈 Silver Medal" },
    { rank: 6, name: "Sophia Martinez", score: 450, reports: 6, verifications: 12, badge: "💧 Water Saver" },
    { rank: 7, name: "Tariq Mahmood", score: 410, reports: 5, verifications: 9, badge: "🌱 Green Guard" }
  ];

  // Simulated neighborhood rankings
  const neighborhoodRankings = [
    { rank: 1, name: "Mission District (Ward 3)", score: 12400, activeResolutions: "92%", color: "bg-blue-500/10 text-blue-700" },
    { rank: 2, name: "Downtown Core (Ward 2)", score: 10100, activeResolutions: "88%", color: "bg-purple-500/10 text-purple-700" },
    { rank: 3, name: "Marina Bay (Ward 5)", score: 9300, activeResolutions: "85%", color: "bg-teal-500/10 text-teal-700" },
    { rank: 4, name: "Oak District (Ward 1)", score: 7100, activeResolutions: "81%", color: "bg-orange-500/10 text-orange-700" },
    { rank: 5, name: "Green Valley (Ward 4)", score: 6800, activeResolutions: "76%", color: "bg-emerald-500/10 text-emerald-700" }
  ];

  const badges = [
    { name: "First Reporter", emoji: "🏅", desc: "Submit your first approved civic issue photograph.", unlocked: true },
    { name: "Road Warrior", emoji: "🚧", desc: "Report or confirm 3 road degradation concerns.", unlocked: true },
    { name: "Water Saver", emoji: "💧", desc: "Acknowledge and submit 2 pipeline leakage details.", unlocked: true },
    { name: "Clean City Champion", emoji: "🧹", desc: "Successfully resolve or verify 5 illegal dumping reports.", unlocked: false },
    { name: "Community Guardian", emoji: "🛡️", desc: "Reach a 95% verification accuracy rate across 20 reviews.", unlocked: false }
  ];

  const triggerBadgeCelebration = (badgeName: string) => {
    setShowCelebration(badgeName);
    setTimeout(() => {
      setShowCelebration(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="leaderboard-engagement">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="font-display font-extrabold text-3xl text-gray-900 tracking-tight flex items-center justify-center">
          <Award className="h-7 w-7 text-yellow-500 mr-2" />
          Community Leaderboard & Badges
        </h1>
        <p className="text-gray-500 font-medium text-xs mt-0.5">
          Compete in daily challenges, gain community XP, and level up your citizen reputation rank.
        </p>
      </div>

      {/* Confetti alert simulation */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-3xl text-center border-2 border-yellow-400 max-w-sm shadow-2xl relative overflow-hidden">
            <span className="text-6xl block mb-4 animate-bounce">🏆</span>
            <h3 className="font-display font-extrabold text-xl text-gray-900">Achievement Unlocked!</h3>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-1">{showCelebration}</p>
            <p className="text-xs text-gray-500 leading-relaxed mt-3">
              Congratulations! Your community reporting metrics have unlocked this rare badge. You earned +150 Community XP points!
            </p>
            <button 
              onClick={() => setShowCelebration(null)}
              className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs cursor-pointer transition"
            >
              Claim XP Reward
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left columns - active missions + unlocked badge grid (5 Columns) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          {/* Badge Grid Cabinet */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 border-b border-gray-50 pb-2.5 mb-4 flex items-center">
              <Sparkles className="h-4.5 w-4.5 mr-2 text-yellow-500" />
              Civic Badge Gallery (Click to inspect)
            </h3>

            <div className="space-y-3">
              {badges.map((b, i) => (
                <button
                  key={i}
                  onClick={() => triggerBadgeCelebration(b.name)}
                  className={`w-full flex items-start space-x-3.5 p-3 rounded-2xl border text-left transition ${
                    b.unlocked 
                      ? "bg-blue-50/20 border-blue-100 hover:bg-blue-50/50" 
                      : "bg-gray-50/40 border-gray-100 opacity-60 hover:opacity-85"
                  }`}
                >
                  <span className="text-3xl p-1 bg-white rounded-xl shadow-sm border border-gray-50">{b.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="font-bold text-xs text-gray-900">{b.name}</h4>
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${b.unlocked ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                        {b.unlocked ? 'Unlocked' : 'Locked'}
                      </span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-gray-400 font-medium">{b.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right columns - Leaderboards volunteers vs districts (7 Columns) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          
          {/* Header tab selectors */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-50 pb-4">
            <h2 className="font-bold text-sm text-gray-800 flex items-center">
              <TrendingUp className="h-4.5 w-4.5 mr-2 text-blue-600" />
              District leaderboards
            </h2>

            {/* Toggles */}
            <div className="flex items-center space-x-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button
                onClick={() => setActiveLeaderboard("volunteer")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeLeaderboard === "volunteer" 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Top Volunteers
              </button>
              
              <button
                onClick={() => setActiveLeaderboard("neighborhood")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeLeaderboard === "neighborhood" 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Top Districts
              </button>
            </div>
          </div>

          {/* Table display */}
          <div className="overflow-x-auto">
            {activeLeaderboard === "volunteer" ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
                    <th className="py-2.5">Rank</th>
                    <th>Citizen Reporter</th>
                    <th>Reports</th>
                    <th>Accuracy</th>
                    <th className="text-right">Total XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs font-semibold text-gray-700">
                  {topVolunteers.map((vol) => (
                    <tr 
                      key={vol.rank} 
                      className={`hover:bg-gray-50/50 transition ${vol.name.includes("You") ? "bg-blue-50/50" : ""}`}
                    >
                      <td className="py-3.5 pl-1.5">
                        {vol.rank === 1 ? "🥇" : vol.rank === 2 ? "🥈" : vol.rank === 3 ? "🥉" : vol.rank}
                      </td>
                      <td>
                        <div>
                          <p className={`font-bold ${vol.name.includes("You") ? "text-blue-700" : "text-gray-800"}`}>{vol.name}</p>
                          <p className="text-[9px] text-gray-400 font-medium">{vol.badge}</p>
                        </div>
                      </td>
                      <td>{vol.reports} cases</td>
                      <td>{vol.verifications}% Acc</td>
                      <td className="text-right pr-2.5 font-bold text-gray-900">{vol.score} XP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
                    <th className="py-2.5">Rank</th>
                    <th>Neighborhood Ward</th>
                    <th>SLA Completion</th>
                    <th className="text-right">Accumulated Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs font-semibold text-gray-700">
                  {neighborhoodRankings.map((n) => (
                    <tr key={n.rank} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 pl-1.5">
                        {n.rank === 1 ? "🥇" : n.rank === 2 ? "🥈" : n.rank}
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <span className={`w-2.5 h-2.5 rounded-full bg-blue-500`}></span>
                          <span className="font-bold text-gray-800">{n.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          {n.activeResolutions} Resolution Rate
                        </span>
                      </td>
                      <td className="text-right pr-2.5 font-extrabold text-blue-900">{n.score.toLocaleString()} XP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
