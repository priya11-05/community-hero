import React from "react";
import { ShieldCheck, Mail, Phone, Clock, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800" id="municipal-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          
          {/* Logo Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="text-2xl">🛡️</span>
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                Community <span className="text-[#F6B93B]">Hero</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Empowering citizens to report, track, and resolve local issues directly with municipal field staff. Together we build safer neighborhoods.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Platform Resources</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
              <li><a href="#reporting-module" className="hover:text-white transition">Report an Issue</a></li>
              <li><a href="#community-map-dashboard" className="hover:text-white transition">Interactive GIS Map</a></li>
              <li><a href="#leaderboard-engagement" className="hover:text-white transition">Badge Cabinet</a></li>
              <li><a href="#corporate-analytics-charts" className="hover:text-white transition">Open Data Analytics</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Municipal Support</h4>
            <ul className="space-y-3 text-xs text-slate-400 font-semibold">
              <li className="flex items-center">
                <Mail className="h-4.5 w-4.5 text-[#F6B93B] mr-2" />
                <span>citizens@municipal.gov</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4.5 w-4.5 text-[#F6B93B] mr-2" />
                <span>311 Hotline (24/7 Service)</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4.5 w-4.5 text-[#F6B93B] mr-2" />
                <span>Mon - Fri, 8AM - 5PM</span>
              </li>
            </ul>
          </div>

          {/* Legal and Compliance declarations */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">ADA & Compliance</h4>
            <div className="space-y-2 text-xs text-slate-400 font-semibold">
              <div className="flex items-center space-x-1.5 text-slate-300">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
                <span>WCAG 2.1 AA Compliant</span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-400 font-medium">
                This platform is accessible to individuals with disabilities, featuring voice descriptions and high contrast settings.
              </p>
            </div>
          </div>

        </div>

        {/* Legal footprint bar */}
        <div className="border-t border-slate-800 pt-8 pb-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 font-medium">
          <p>© 2026 Community Hero Civic Platform. Municipal GIS division. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition flex items-center">
              <FileText className="h-3 w-3 mr-1" /> Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">Terms of Use</a>
            <a href="#" className="hover:text-white transition">Open Data Guidelines</a>
          </div>
        </div>

      </div>

      {/* Sleek Bottom Bar Status Ticker */}
      <div className="mt-8 h-12 bg-white border-t border-gray-200 px-6 sm:px-8 flex items-center justify-between text-gray-700" id="systems-status-ticker">
        <div className="flex items-center space-x-6 overflow-hidden">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Systems Operational</span>
          </div>
          <div className="hidden md:block text-[10px] text-gray-400 font-medium italic truncate max-w-sm lg:max-w-xl">
            Update: AI engine parsed 18 duplicate reports today in West Ward. SLAs optimized.
          </div>
        </div>
        <div className="flex items-center space-x-4 text-[9px] font-bold text-gray-400 tracking-wider">
          <a href="#" className="hover:text-[#0A74DA] transition">CONTACT SUPPORT</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-[#0A74DA] transition">DATA PRIVACY</a>
          <span className="text-gray-200">|</span>
          <a href="https://municipal.gov" target="_blank" rel="noopener noreferrer" className="text-[#0A74DA] hover:underline flex items-center font-extrabold">
            GOV PORTAL <span className="ml-0.5">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
