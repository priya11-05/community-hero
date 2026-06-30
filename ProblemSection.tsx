import React from "react";
import { 
  AlertTriangle, 
  EyeOff, 
  Copy, 
  UserCheck, 
  Clock, 
  FileWarning 
} from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      title: "Fragmented Reporting",
      description: "Traditional civic complains are scattered across various helplines, PDFs, and outdated government web portals with no consolidated logging.",
      icon: AlertTriangle,
      color: "border-amber-200 bg-amber-50/50 text-amber-600"
    },
    {
      title: "Zero Transparency",
      description: "Once submitted, reports vanish into a 'black box'. Citizens are left in the dark about whether anyone is working on their complaint.",
      icon: EyeOff,
      color: "border-red-200 bg-red-50/50 text-red-600"
    },
    {
      title: "Duplicate Complaints",
      description: "Municipal centers are overwhelmed by 100 identical complaints for the exact same pothole due to lack of co-ordinated public maps.",
      icon: Copy,
      color: "border-blue-200 bg-blue-50/50 text-blue-600"
    },
    {
      title: "No Public Accountability",
      description: "There are no verified SLAs, officer tracking, or community validation protocols to verify that work is complete.",
      icon: UserCheck,
      color: "border-purple-200 bg-purple-50/50 text-purple-600"
    },
    {
      title: "Painfully Slow Resolutions",
      description: "Manual routing between departments adds weeks to simple streetlight fixes. Critical issues get lost in red tape.",
      icon: Clock,
      color: "border-pink-200 bg-pink-50/50 text-pink-600"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F7FAFC]" id="problem-overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block">
            The Problem Landscape
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight mb-4">
            Why Traditional Civic Management Fails
          </h2>
          <p className="text-gray-500 font-medium text-base sm:text-lg">
            Municipal authorities and local neighborhoods struggle with outdated systems that disconnect citizens from field workers.
          </p>
        </div>

        {/* Illustrated Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
              >
                <div className={`p-4 rounded-2xl border mb-5 ${prob.color} group-hover:scale-110 transition duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-base text-gray-900 mb-2">
                  {prob.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-500 font-medium">
                  {prob.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
