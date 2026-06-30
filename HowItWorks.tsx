import React from "react";
import { 
  Camera, 
  Cpu, 
  CheckSquare, 
  UserSquare2, 
  Wrench, 
  LockKeyhole,
  CheckCircle2
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Capture Media",
      desc: "Citizen captures an image/video or records a voice description of a local hazard.",
      icon: Camera,
      bg: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      step: "02",
      title: "AI Analysis",
      desc: "Our Gemini model parses category, severity, suggested department, and repair SLA.",
      icon: Cpu,
      bg: "bg-purple-50 text-purple-600 border-purple-100"
    },
    {
      step: "03",
      title: "Community Voting",
      desc: "Nearby volunteers vote to verify, boosting confidence score and reputation rankings.",
      icon: CheckSquare,
      bg: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      step: "04",
      title: "Dispatch Task",
      desc: "Municipal officer receives automatic alerts and dispatches tasks to correct field teams.",
      icon: UserSquare2,
      bg: "bg-indigo-50 text-indigo-600 border-indigo-100"
    },
    {
      step: "05",
      title: "Field Resolution",
      desc: "Field worker completes repairs, uploading 'Before' and 'After' telemetry proof.",
      icon: Wrench,
      bg: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      step: "06",
      title: "Citizen Closeout",
      desc: "Community confirms restoration. Confidence logs are locked and badges are unlocked.",
      icon: LockKeyhole,
      bg: "bg-teal-50 text-teal-600 border-teal-100"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block">
            The Civic Lifecycle
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight mb-4">
            How Community Hero Works
          </h2>
          <p className="text-gray-500 font-medium text-base sm:text-lg">
            Our platform connects citizens, community validators, municipal managers, and field staff into a transparent, high-speed ecosystem.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
          
          {/* Subtle line background for desktop */}
          <div className="hidden lg:block absolute top-[44px] left-8 right-8 h-[2px] bg-gray-100 z-0"></div>

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                
                {/* Step badge */}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F6B93B] text-gray-950 font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
                  Step {item.step}
                </span>

                {/* Circle Icon wrapper */}
                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 shadow-sm mt-3 ${item.bg}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-display font-bold text-sm text-gray-900 mb-2">
                  {item.title}
                </h3>
                
                <p className="text-xs leading-relaxed text-gray-500 font-medium px-2">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
