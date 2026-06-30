import React, { useState } from "react";
import { 
  X, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  AlertTriangle,
  Cpu,
  UserCheck,
  Send,
  Camera,
  Layers,
  Wrench,
  LockKeyhole
} from "lucide-react";
import { Report } from "../types";

interface IssueDetailsModalProps {
  report: Report;
  onClose: () => void;
  currentUser: any;
  onVoteReport: (reportId: string, voteType: "upvote" | "downvote") => void;
  onAddComment: (reportId: string, commentText: string) => void;
}

export default function IssueDetailsModal({
  report,
  onClose,
  currentUser,
  onVoteReport,
  onAddComment
}: IssueDetailsModalProps) {
  const [commentInput, setCommentInput] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  // Status mapping to timeline index
  const statusLevels: Record<string, number> = {
    reported: 1,
    ai_verified: 2,
    community_verified: 3,
    assigned: 4,
    in_progress: 5,
    resolved: 6,
    closed: 7
  };

  const currentLevel = statusLevels[report.status] || 1;

  const handleVoteSubmit = (type: "upvote" | "downvote") => {
    onVoteReport(report.id, type);
    setHasVoted(true);
    alert(`Thank you for voting! Your community reputation accuracy score has increased. You gained +15 XP!`);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(report.id, commentInput);
    setCommentInput("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn text-left">
      
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">
        
        {/* Sticky Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 sticky top-0 z-10 backdrop-blur">
          <div className="flex items-center space-x-2.5">
            <span className="text-[10px] font-bold text-gray-400 font-mono">{report.id}</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full capitalize">
              {report.category}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-full transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto">
          
          {/* Left panel - Image comparisons & Descriptions (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Geolocation */}
            <div>
              <h2 className="font-display font-extrabold text-lg text-gray-900 tracking-tight leading-tight">{report.title}</h2>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <MapPin className="h-4.5 w-4.5 mr-1 text-gray-400" /> {report.location.address}
              </p>
            </div>

            {/* Before / After comparisons split layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 flex items-center">
                  <Camera className="h-3 w-3 mr-1 text-amber-500" /> Before Photograph
                </p>
                <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 aspect-video">
                  <img 
                    src={report.beforeImage} 
                    alt="Before State" 
                    className="w-full h-full object-cover" 
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/75 text-white text-[9px] font-bold rounded">
                    Original Capture
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1 text-emerald-500" /> Restored State
                </p>
                <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 aspect-video flex items-center justify-center">
                  {report.afterImage ? (
                    <>
                      <img 
                        src={report.afterImage} 
                        alt="After State" 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-bold rounded">
                        Restored Proof
                      </span>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <Wrench className="h-6 w-6 text-gray-300 mx-auto mb-1 animate-pulse" />
                      <p className="text-[10px] font-bold text-gray-400">Repairs Pending</p>
                      <p className="text-[8px] text-gray-400 mt-0.5">SLA Active</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Description note */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-bold uppercase text-gray-400 mb-1.5">Description Note</p>
              <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                {report.description}
              </p>
              {report.resolutionNotes && (
                <div className="mt-4 border-t border-gray-200 pt-3 text-[10px] leading-relaxed text-gray-500">
                  <strong>Resolution Notes:</strong> {report.resolutionNotes}
                  <p className="mt-1 font-bold text-emerald-600">Materials: {report.materialsUsed}</p>
                </div>
              )}
            </div>

            {/* Community comments panel */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-gray-800 flex items-center">
                <MessageSquare className="h-4 w-4 mr-1 text-blue-600" />
                Citizen Comments ({report.comments.length})
              </h3>

              <div className="space-y-3 max-h-36 overflow-y-auto pr-1">
                {report.comments.map((c, i) => (
                  <div key={i} className="p-3 bg-gray-50/50 rounded-xl text-[10px] font-semibold text-gray-700">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-blue-700 font-bold">{c.userName}</span>
                      <span className="text-gray-400 text-[8px]">{c.timestamp ? new Date(c.timestamp).toLocaleDateString() : "Just now"}</span>
                    </div>
                    <p className="leading-relaxed">{c.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add comment form */}
              <form onSubmit={handleCommentSubmit} className="flex space-x-2">
                <input
                  type="text"
                  required
                  placeholder="Share details, updates, or express support..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>

          </div>

          {/* Right panel - Timelines, verification, SLAs (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* SLA countdown metrics card */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 p-5 rounded-3xl text-white shadow-lg text-left">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">Service Delivery SLA</span>
              <p className="text-xl font-extrabold font-display mt-0.5">{report.suggestedDepartment}</p>
              
              <div className="flex justify-between text-xs font-semibold mt-4 py-1.5 border-b border-white/5">
                <span className="text-blue-200">Severity</span>
                <span className="font-bold text-[#F6B93B] capitalize">{report.severity}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold py-1.5 border-b border-white/5">
                <span className="text-blue-200">Complexity</span>
                <span className="font-bold text-white capitalize">{report.repairComplexity}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold py-1.5">
                <span className="text-blue-200">Completion Estimate</span>
                <span className="font-bold text-[#F6B93B]">{report.estimatedRepairTime}</span>
              </div>
            </div>

            {/* Voter validation board (Gamification prompt) */}
            {report.status === 'reported' && (
              <div className="p-5 border border-amber-100 bg-amber-50/50 rounded-3xl text-left space-y-3.5">
                <div className="flex items-start space-x-2.5">
                  <div className="p-1.5 bg-amber-100 rounded-lg text-amber-700">
                    <UserCheck className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-amber-900">Nearby Citizen Validation</h4>
                    <p className="text-[10px] text-amber-700 leading-relaxed mt-0.5">
                      Are you currently in the area? Vote to confirm the authenticity of this hazard and eliminate reporting spam.
                    </p>
                  </div>
                </div>

                {!hasVoted ? (
                  <div className="flex space-x-2 pt-1">
                    <button
                      onClick={() => handleVoteSubmit("upvote")}
                      className="flex-1 py-2 bg-[#F6B93B] hover:bg-yellow-500 text-gray-950 font-bold rounded-xl text-[10px] flex items-center justify-center space-x-1.5 shadow-sm transition"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>Confirm/Verify (+15 XP)</span>
                    </button>
                    
                    <button
                      onClick={() => handleVoteSubmit("downvote")}
                      className="px-3 py-2 border border-amber-300 text-amber-900 hover:bg-amber-100 rounded-xl text-[10px] flex items-center justify-center transition"
                      title="Mark as Spam"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <p className="text-[10px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                    ✓ Thank you for validating this report. Reputation metrics recalculated.
                  </p>
                )}
              </div>
            )}

            {/* Lifecycle Phase Progression list */}
            <div className="p-5 bg-white border border-gray-100 rounded-3xl text-left space-y-4">
              <h4 className="font-bold text-xs text-gray-800">Issue Lifecycle Progress</h4>
              
              <div className="space-y-4 relative pl-5 border-l-2 border-gray-100">
                
                {/* 1. Captured */}
                <div className="relative">
                  <span className={`absolute -left-[25px] top-0.5 w-3 h-3 rounded-full border-2 ${
                    currentLevel >= 1 ? 'bg-blue-600 border-white' : 'bg-white border-gray-200'
                  }`}></span>
                  <p className={`text-[10px] font-bold ${currentLevel >= 1 ? 'text-gray-800' : 'text-gray-400'}`}>Report Snap Captured</p>
                  <p className="text-[8px] text-gray-400 font-semibold mt-0.5">Uploaded by Citizen Alex R.</p>
                </div>

                {/* 2. AI analyzed */}
                <div className="relative">
                  <span className={`absolute -left-[25px] top-0.5 w-3 h-3 rounded-full border-2 ${
                    currentLevel >= 2 ? 'bg-blue-600 border-white' : 'bg-white border-gray-200'
                  }`}></span>
                  <p className={`text-[10px] font-bold ${currentLevel >= 2 ? 'text-gray-800' : 'text-gray-400'}`}>AI Parameters Scanned</p>
                  <p className="text-[8px] text-gray-400 font-semibold mt-0.5">Gemini Vision matched confidence logs</p>
                </div>

                {/* 3. Community confirmed */}
                <div className="relative">
                  <span className={`absolute -left-[25px] top-0.5 w-3 h-3 rounded-full border-2 ${
                    currentLevel >= 3 ? 'bg-blue-600 border-white' : 'bg-white border-gray-200'
                  }`}>
                    {currentLevel === 3 && <span className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-45"></span>}
                  </span>
                  <p className={`text-[10px] font-bold ${currentLevel >= 3 ? 'text-gray-800' : 'text-gray-400'}`}>Volunteers Verified</p>
                  <p className="text-[8px] text-gray-400 font-semibold mt-0.5">Approved via localized voting ({report.confidenceScore}% confidence)</p>
                </div>

                {/* 4. Assigned to crew */}
                <div className="relative">
                  <span className={`absolute -left-[25px] top-0.5 w-3 h-3 rounded-full border-2 ${
                    currentLevel >= 4 ? 'bg-blue-600 border-white' : 'bg-white border-gray-200'
                  }`}></span>
                  <p className={`text-[10px] font-bold ${currentLevel >= 4 ? 'text-gray-800' : 'text-gray-400'}`}>Crew Dispatched</p>
                  <p className="text-[8px] text-gray-400 font-semibold mt-0.5">Task queued under maintenance crew</p>
                </div>

                {/* 5. Complete */}
                <div className="relative">
                  <span className={`absolute -left-[25px] top-0.5 w-3 h-3 rounded-full border-2 ${
                    currentLevel >= 6 ? 'bg-emerald-500 border-white' : 'bg-white border-gray-200'
                  }`}></span>
                  <p className={`text-[10px] font-bold ${currentLevel >= 6 ? 'text-emerald-700' : 'text-gray-400'}`}>Restored (Lock Resolution)</p>
                  <p className="text-[8px] text-gray-400 font-semibold mt-0.5">Proof of work and materials uploaded</p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
