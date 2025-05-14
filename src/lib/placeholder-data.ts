import type { Job, Candidate, Match, ChatMessage } from '@/types';

export const placeholderJobs: Job[] = [
  {
    id: 'job1',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'New York, NY',
    description: 'Join our innovative team to build next-gen web applications using React and TypeScript. Exciting projects and great culture.',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    tags: ['React', 'TypeScript', 'Frontend', 'JavaScript', 'Agile'],
    imageUrl: 'https://picsum.photos/seed/job1/400/300',
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 'job2',
    title: 'Product Manager',
    company: 'Innovatech Ltd.',
    location: 'San Francisco, CA',
    description: 'Lead product strategy for our flagship SaaS product. Work closely with engineering and design teams to deliver value to users.',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    tags: ['Product Management', 'SaaS', 'Agile', 'Roadmap', 'UX'],
    imageUrl: 'https://picsum.photos/seed/job2/400/300',
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'job3',
    title: 'UX/UI Designer',
    company: 'Creative Designs Co.',
    location: 'Remote',
    description: 'Craft beautiful and intuitive user experiences for mobile and web platforms. Strong portfolio required.',
    type: 'Contract',
    tags: ['UX', 'UI', 'Figma', 'Mobile Design', 'Web Design'],
    imageUrl: 'https://picsum.photos/seed/job3/400/300',
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const placeholderCandidates: Candidate[] = [
  {
    id: 'cand1',
    name: 'Alex Johnson',
    headline: 'Full-Stack Engineer with 5+ years experience',
    location: 'Austin, TX',
    bio: 'Passionate about building scalable web applications and working in collaborative environments. Proficient in Node.js, Python, and cloud platforms.',
    skills: ['Node.js', 'Python', 'React', 'AWS', 'Docker'],
    experienceYears: 5,
    education: 'B.S. in Computer Science',
    imageUrl: 'https://picsum.photos/seed/cand1/400/300',
    availability: 'Immediate',
  },
  {
    id: 'cand2',
    name: 'Maria Garcia',
    headline: 'Data Scientist | Machine Learning Enthusiast',
    location: 'Boston, MA',
    bio: 'Experienced in developing machine learning models and deriving insights from complex datasets. Skilled in Python, R, and SQL.',
    skills: ['Python', 'R', 'Machine Learning', 'SQL', 'TensorFlow'],
    experienceYears: 3,
    education: 'M.S. in Data Science',
    imageUrl: 'https://picsum.photos/seed/cand2/400/300',
    availability: '2 Weeks Notice',
  },
  {
    id: 'cand3',
    name: 'David Lee',
    headline: 'Marketing Specialist | Digital Strategy Expert',
    location: 'Chicago, IL',
    bio: 'Results-driven marketing professional with a knack for digital campaigns, SEO, and content creation. Proven track record of increasing engagement.',
    skills: ['SEO', 'Content Marketing', 'Google Analytics', 'Social Media', 'Email Marketing'],
    experienceYears: 7,
    education: 'B.A. in Marketing',
    imageUrl: 'https://picsum.photos/seed/cand3/400/300',
    availability: 'Flexible',
  },
];

export const placeholderMatches: Match[] = [
  {
    id: 'match1',
    userId: 'cand1',
    userName: 'Alex Johnson',
    userImageUrl: 'https://picsum.photos/seed/cand1/100/100',
    lastMessage: "Hey, great to connect! Your profile looks interesting.",
    lastMessageTimestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 mins ago
    unreadCount: 1,
    context: "Matched on 'Senior Frontend Developer'",
  },
  {
    id: 'match2',
    userId: 'job2', // Assuming a recruiter matched with a job seeker for their job
    userName: 'Innovatech Ltd. (Hiring for Product Manager)',
    userImageUrl: 'https://picsum.photos/seed/job2/100/100',
    lastMessage: "Thanks for your interest in the Product Manager role!",
    lastMessageTimestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    unreadCount: 0,
  },
];

export const placeholderChatMessages: Record<string, ChatMessage[]> = {
  match1: [
    { id: 'msg1', matchId: 'match1', senderId: 'otherUser', text: "Hey, great to connect! Your profile looks interesting.", timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
    { id: 'msg2', matchId: 'match1', senderId: 'currentUser', text: "Hi Alex! Thanks, likewise. Tell me more about the projects at Tech Solutions.", timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString() },
  ],
  match2: [
     { id: 'msg3', matchId: 'match2', senderId: 'otherUser', text: "Thanks for your interest in the Product Manager role!", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  ]
};
