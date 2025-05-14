export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  tags?: string[];
  imageUrl?: string; // company logo or job-related image
  postedDate: string; // ISO date string
}

export interface Candidate {
  id: string;
  name: string;
  headline: string;
  location: string;
  bio: string;
  skills: string[];
  experienceYears?: number;
  education?: string;
  imageUrl?: string; // profile picture
  availability?: 'Immediate' | '2 Weeks Notice' | 'Flexible';
}

export interface Match {
  id: string;
  userId: string; // ID of the other user in the match
  userName: string;
  userImageUrl?: string;
  lastMessage?: string;
  lastMessageTimestamp?: string; // ISO date string
  unreadCount?: number;
  // If it's a job seeker match, this could be the job ID/title they matched on
  // If it's a recruiter match, this could be the candidate ID/name they matched on
  context?: string; // e.g., "Matched on 'Senior Frontend Developer' role"
}

export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string; // 'currentUser' or other user's ID
  text: string;
  timestamp: string; // ISO date string
  isRead?: boolean;
}
