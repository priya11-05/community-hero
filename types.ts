export type CivicIssueCategory = 'road' | 'electricity' | 'water' | 'garbage' | 'sewage' | 'traffic' | 'environment' | 'park' | 'other';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export type IssueStatus = 
  | 'reported' 
  | 'ai_verified' 
  | 'community_verified' 
  | 'accepted' 
  | 'assigned' 
  | 'in_progress' 
  | 'resolved' 
  | 'community_confirmed' 
  | 'closed';

export interface LocationInfo {
  lat: number;
  lng: number;
  address: string;
  ward?: string;
}

export interface UserSummary {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Verification {
  id: string;
  reportId: string;
  userId: string;
  userName: string;
  avatar: string;
  option: 'confirm' | 'reject';
  comment?: string;
  photoUrl?: string;
  timestamp: string;
  voteSeverity?: UrgencyLevel;
}

export interface Comment {
  id: string;
  reportId: string;
  userName: string;
  avatar: string;
  comment: string;
  timestamp: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: CivicIssueCategory;
  urgency: UrgencyLevel;
  status: IssueStatus;
  beforeImage: string;
  afterImage?: string;
  voiceUrl?: string;
  location: LocationInfo;
  reporter: UserSummary;
  timestamps: {
    reported: string;
    aiVerified?: string;
    communityVerified?: string;
    accepted?: string;
    assigned?: string;
    inProgress?: string;
    resolved?: string;
    closed?: string;
  };
  confidenceScore: number;
  severity: UrgencyLevel;
  suggestedDepartment: string;
  repairComplexity: 'low' | 'medium' | 'high';
  estimatedRepairTime: string;
  duplicateCount: number;
  isDuplicateOf?: string;
  supportedBy: string[]; // List of user IDs who support it
  verifications: Verification[];
  comments: Comment[];
  assignedWorker?: string;
  resolutionNotes?: string;
  materialsUsed?: string;
}

export interface AppUser {
  id: string;
  name: string;
  email?: string;
  role: 'citizen' | 'volunteer' | 'municipal_officer' | 'field_worker' | 'admin' | 'officer' | 'worker';
  communityScore: number;
  verificationAccuracy: number;
  reportsSubmitted?: number;
  reportsResolved?: number;
  badges: string[];
  trustLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Community Hero';
  avatar: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt?: string;
}

export interface CivicNotification {
  id: string;
  title: string;
  description: string;
  category: string;
  time: string;
  read: boolean;
}

export interface Prediction {
  id: string;
  category: CivicIssueCategory;
  location: string;
  riskScore: number; // 0-100
  issueType: string;
  recommendation: string;
  predictedDate: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
  type: 'daily' | 'weekly';
}
