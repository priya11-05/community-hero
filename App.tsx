import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import HowItWorks from "./components/HowItWorks";
import ReportIssueForm from "./components/ReportIssueForm";
import CommunityMap from "./components/CommunityMap";
import CitizenDashboard from "./components/CitizenDashboard";
import MunicipalDashboard from "./components/MunicipalDashboard";
import FieldWorkerDashboard from "./components/FieldWorkerDashboard";
import LeaderboardTab from "./components/LeaderboardTab";
import PredictiveAnalyticsTab from "./components/PredictiveAnalyticsTab";
import AnalyticsDashboardTab from "./components/AnalyticsDashboardTab";
import IssueDetailsModal from "./components/IssueDetailsModal";
import CivicAIChatbot from "./components/CivicAIChatbot";
import Footer from "./components/Footer";

import { Report, AppUser, Challenge, Prediction, CivicNotification } from "./types";

export default function App() {
  // Navigation: "home" | "report" | "map" | "track" | "leaderboard" | "predictions" | "analytics"
  const [activeTab, setActiveTab] = useState<string>("home");
  
  // Real database full-stack state synchronizers
  const [reports, setReports] = useState<Report[]>([]);
  const [notifications, setNotifications] = useState<CivicNotification[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  // Active inspectors
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Simulated current users profiles based on selected Role switcher inside Navbar
  const users: Record<string, AppUser> = {
    citizen: {
      id: "U-101",
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "citizen",
      communityScore: 480,
      trustLevel: "Silver",
      badges: ["First Reporter", "Road Warrior", "Water Saver"],
      verificationAccuracy: 92
    },
    officer: {
      id: "U-202",
      name: "Director Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      role: "officer",
      communityScore: 1250,
      trustLevel: "Community Hero",
      badges: ["Community Guardian", "Top Volunteer"],
      verificationAccuracy: 98
    },
    worker: {
      id: "U-303",
      name: "John Field",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      role: "worker",
      communityScore: 180,
      trustLevel: "Bronze",
      badges: ["Road Warrior"],
      verificationAccuracy: 88
    }
  };

  const [currentRole, setCurrentRole] = useState<"citizen" | "officer" | "worker">("citizen");
  const currentUser = users[currentRole];

  // Fetch initial data from server APIs
  useEffect(() => {
    async function initData() {
      try {
        setLoading(true);
        const [repRes, notRes, chalRes, predRes] = await Promise.all([
          fetch("/api/reports"),
          fetch("/api/notifications"),
          fetch("/api/challenges"),
          fetch("/api/predictions")
        ]);

        if (repRes.ok && notRes.ok && chalRes.ok && predRes.ok) {
          const repData = await repRes.json();
          const notData = await notRes.json();
          const chalData = await chalRes.json();
          const predData = await predRes.json();

          setReports(repData);
          setNotifications(notData);
          setChallenges(chalData);
          setPredictions(predData);
        }
      } catch (err) {
        console.error("Failed to fetch initial database profiles", err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  // API submit new report
  const handleCreateReport = async (reportPayload: Partial<Report>) => {
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportPayload)
      });

      if (res.ok) {
        const newReport = await res.json();
        setReports(prev => [newReport, ...prev]);
        
        // Push a fresh notification locally
        const notif: CivicNotification = {
          id: `NOT-${Math.floor(Math.random() * 9000) + 1000}`,
          title: "Report Successfully Filed",
          description: `Your case is assigned under ${newReport.suggestedDepartment}. Target SLA is ${newReport.estimatedRepairTime}.`,
          category: "verification",
          time: "Just now",
          read: false
        };
        setNotifications(prev => [notif, ...prev]);
        setActiveTab("track"); // Switch tab to Dashboard list to track it!
      }
    } catch (err) {
      console.error(err);
    }
  };

  // API assign report to field worker
  const handleAssignReport = async (reportId: string, workerName: string) => {
    try {
      const res = await fetch(`/api/reports/${reportId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedWorker: workerName })
      });

      if (res.ok) {
        const updated = await res.json();
        setReports(prev => prev.map(r => r.id === reportId ? updated : r));
        
        // Push notification
        const notif: CivicNotification = {
          id: `NOT-${Math.floor(Math.random() * 9000) + 1000}`,
          title: "SLA Crew Dispatched",
          description: `Task ${reportId} successfully routed to ${workerName} for remediation.`,
          category: "dispatch",
          time: "Just now",
          read: false
        };
        setNotifications(prev => [notif, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // API resolve report
  const handleResolveReport = async (reportId: string, notes: string, materials: string, afterImage?: string) => {
    try {
      const res = await fetch(`/api/reports/${reportId}/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, materials, afterImage })
      });

      if (res.ok) {
        const updated = await res.json();
        setReports(prev => prev.map(r => r.id === reportId ? updated : r));

        const notif: CivicNotification = {
          id: `NOT-${Math.floor(Math.random() * 9000) + 1000}`,
          title: "Issue Resolved!",
          description: `Telemetry proof submitted for repair order ${reportId}. Awaiting citizen review.`,
          category: "resolution",
          time: "Just now",
          read: false
        };
        setNotifications(prev => [notif, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Upvote/Downvote report
  const handleVoteReport = async (reportId: string, type: "upvote" | "downvote") => {
    try {
      const res = await fetch(`/api/reports/${reportId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type })
      });

      if (res.ok) {
        const updated = await res.json();
        setReports(prev => prev.map(r => r.id === reportId ? updated : r));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Comment to report
  const handleAddComment = async (reportId: string, commentText: string) => {
    try {
      const res = await fetch(`/api/reports/${reportId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: currentUser.name,
          avatar: currentUser.avatar,
          comment: commentText
        })
      });

      if (res.ok) {
        const updated = await res.json();
        setReports(prev => prev.map(r => r.id === reportId ? updated : r));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Clear or read all notifications locally
  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col font-sans">
      
      {/* Dynamic Header navbar */}
      <Navbar
        currentUser={currentUser}
        onRoleChange={setCurrentRole}
        notifications={notifications}
        onClearNotifications={handleClearNotifications}
        activeTab={activeTab}
        onNavigate={setActiveTab}
      />

      {/* Main Content Layout router */}
      <main className="flex-1">
        {loading ? (
          <div className="py-24 text-center flex flex-col items-center justify-center space-y-3">
            <span className="text-3xl animate-spin">🛡️</span>
            <p className="text-xs font-bold text-slate-500">Connecting to municipal database...</p>
          </div>
        ) : (
          <>
            {/* 1. HOME TAB */}
            {activeTab === "home" && (
              <div className="animate-fadeIn">
                <HeroSection 
                  onReportClick={() => setActiveTab("report")} 
                  onMapClick={() => setActiveTab("map")} 
                />
                <ProblemSection />
                <HowItWorks />
              </div>
            )}

            {/* 2. REPORT TAB */}
            {activeTab === "report" && (
              <div className="animate-fadeIn">
                <ReportIssueForm
                  currentUser={currentUser}
                  onSubmitReport={handleCreateReport}
                  existingReports={reports}
                />
              </div>
            )}

            {/* 3. COMMUNITY MAP TAB */}
            {activeTab === "map" && (
              <div className="animate-fadeIn">
                <CommunityMap
                  reports={reports}
                  onSelectReport={setSelectedReport}
                />
              </div>
            )}

            {/* 4. TRACK / ROLE-BASED DASHBOARDS */}
            {activeTab === "track" && (
              <div className="animate-fadeIn">
                {currentRole === "citizen" && (
                  <CitizenDashboard
                    currentUser={currentUser}
                    reports={reports}
                    challenges={challenges}
                    onSelectReport={setSelectedReport}
                  />
                )}

                {currentRole === "officer" && (
                  <MunicipalDashboard
                    reports={reports}
                    onSelectReport={setSelectedReport}
                    onAssignReport={handleAssignReport}
                  />
                )}

                {currentRole === "worker" && (
                  <FieldWorkerDashboard
                    reports={reports}
                    currentUser={currentUser}
                    onResolveReport={handleResolveReport}
                  />
                )}
              </div>
            )}

            {/* 5. GAMIFICATION / LEADERBOARD */}
            {activeTab === "leaderboard" && (
              <div className="animate-fadeIn">
                <LeaderboardTab
                  currentUser={currentUser}
                  challenges={challenges}
                />
              </div>
            )}

            {/* 6. AI PREDICTIONS TAB */}
            {activeTab === "predictions" && (
              <div className="animate-fadeIn">
                <PredictiveAnalyticsTab
                  predictions={predictions}
                />
              </div>
            )}

            {/* 7. PERFORMANCE ANALYTICS TAB */}
            {activeTab === "analytics" && (
              <div className="animate-fadeIn">
                <AnalyticsDashboardTab
                  reports={reports}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating conversational chatbot element */}
      <CivicAIChatbot />

      {/* Detailed Modal inspector overlay */}
      {selectedReport && (
        <IssueDetailsModal
          report={selectedReport}
          currentUser={currentUser}
          onClose={() => setSelectedReport(null)}
          onVoteReport={handleVoteReport}
          onAddComment={handleAddComment}
        />
      )}

      {/* Corporate ADA-compliant Footer */}
      <Footer />

    </div>
  );
}
