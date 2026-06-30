import React, { useState } from "react";
import { 
  Shield, 
  Bell, 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  Users, 
  Briefcase, 
  Building2, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Cpu,
  Sparkles,
  Award,
  MapPin,
  Flame,
  FileText
} from "lucide-react";
import { AppUser, CivicNotification } from "../types";

interface NavbarProps {
  currentUser: AppUser;
  onRoleChange: (role: "citizen" | "officer" | "worker") => void;
  activeTab: string;
  onNavigate: (tab: string) => void;
  notifications: CivicNotification[];
  onClearNotifications: () => void;
}

export default function Navbar({
  currentUser,
  onRoleChange,
  activeTab,
  onNavigate,
  notifications,
  onClearNotifications
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.length;

  const roles = [
    { id: "citizen", name: "Citizen Reporter", icon: User, color: "text-blue-600 bg-blue-50" },
    { id: "officer", name: "Municipal Officer", icon: Building2, color: "text-purple-600 bg-purple-50" },
    { id: "worker", name: "Field Worker", icon: Briefcase, color: "text-emerald-600 bg-emerald-50" }
  ];

  const handleRoleChange = (roleId: "citizen" | "officer" | "worker") => {
    onRoleChange(roleId);
    setRoleDropdownOpen(false);
    onNavigate("track"); // Switch tab automatically to help testing!
  };

  const menuItems = [
    { id: "home", name: "Home" },
    { id: "report", name: "Report Issue" },
    { id: "map", name: "Community Map" },
    { id: "track", name: "Dashboards" },
    { id: "leaderboard", name: "Leaderboard" },
    { id: "predictions", name: "Predictive AI" },
    { id: "analytics", name: "City Analytics" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm" id="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo & Slogan */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="flex items-center flex-shrink-0">
              <div className="bg-blue-600 p-2 rounded-xl text-white mr-3 shadow-md shadow-blue-200">
                <Shield className="h-6 w-6" />
              </div>
              <div className="text-left">
                <span className="font-display font-extrabold text-lg tracking-tight text-[#0A74DA]">
                  Community<span className="text-gray-900">Hero</span>
                </span>
                <span className="hidden sm:block text-[10px] text-gray-400 font-medium tracking-wide uppercase">
                  Civic Engagement AI
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === item.id 
                    ? "text-[#0A74DA] bg-blue-50" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Action Tools (Notifications, Role Swapper, Avatar) */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Notification center */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  setRoleDropdownOpen(false);
                }}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative transition"
                aria-label="Notifications"
              >
                <Bell className="h-5.5 w-5.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full scale-90">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 text-left">
                  <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <span className="font-bold text-xs text-gray-700">Recent Alerts</span>
                    <button
                      onClick={onClearNotifications}
                      className="text-[10px] text-blue-600 hover:text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded-full"
                    >
                      Clear All
                    </button>
                  </div>
                  
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-gray-400 font-semibold">No new alerts</div>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className="p-3 text-[10px] transition hover:bg-gray-50 font-semibold">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-extrabold text-gray-800">{n.title}</span>
                            <span className="text-[8px] text-gray-400 uppercase">{n.time}</span>
                          </div>
                          <p className="text-gray-500 leading-relaxed font-medium">{n.description}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Simulated Role Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-1.5 border border-gray-200 hover:border-gray-300 rounded-xl bg-gray-50 text-xs font-semibold text-gray-700 transition"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
                <span>Role: {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}</span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 text-left">
                  <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                    <span className="font-bold text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                      Identity Switcher
                    </span>
                    <span className="text-[9px] text-gray-500 font-medium">
                      Swap roles instantly to preview customized dashboards.
                    </span>
                  </div>
                  <div className="p-1 space-y-1">
                    {roles.map((r) => {
                      const IconComponent = r.icon;
                      const isSelected = currentUser.role === r.id;
                      return (
                        <button
                          key={r.id}
                          onClick={() => handleRoleChange(r.id as any)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-xs transition cursor-pointer ${
                            isSelected 
                              ? "bg-blue-50 font-bold text-blue-700" 
                              : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <span className={`p-1.5 rounded-lg ${r.color}`}>
                            <IconComponent className="h-4 w-4" />
                          </span>
                          <div className="flex-1">
                            <p className="font-bold text-gray-900">{r.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium">View features</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-8 h-8 rounded-full border border-gray-100 shadow-sm object-cover" 
            />

          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile nav items menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-100 bg-white text-left px-4 py-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-xl"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
