
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
    imageUrl: 'https://picsum.photos/seed/job1/600/375',
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
    imageUrl: 'https://picsum.photos/seed/job2/600/375',
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
    imageUrl: 'https://picsum.photos/seed/job3/600/375',
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
   {
    id: 'job4',
    title: 'Backend Developer (Python/Django)',
    company: 'DataCorp',
    location: 'Remote',
    description: 'Develop and maintain robust backend services and APIs. Experience with Django, PostgreSQL, and RESTful APIs is crucial.',
    salary: '€90,000 - €110,000',
    type: 'Full-time',
    tags: ['Python', 'Django', 'PostgreSQL', 'API', 'Backend'],
    imageUrl: 'https://picsum.photos/seed/job4/600/375',
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'job5',
    title: 'DevOps Engineer',
    company: 'CloudNine Systems',
    location: 'Berlin, Germany',
    description: 'Manage and automate our CI/CD pipelines, infrastructure, and deployments on AWS. Kubernetes and Terraform experience preferred.',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    tags: ['DevOps', 'AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    imageUrl: 'https://picsum.photos/seed/job5/600/375',
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const placeholderCandidates: Candidate[] = [
  {
    id: 'cand1',
    name: 'Alex Johnson',
    headline: 'Full-Stack Engineer with 5+ years experience',
    location: 'Austin, TX',
    bio: 'Passionate about building scalable web applications and working in collaborative environments. Proficient in Node.js, Python, and cloud platforms. I enjoy tackling complex problems and continuously learning new technologies. Looking for a challenging role in a fast-paced company.',
    skills: ['Node.js', 'Python', 'React', 'AWS', 'Docker', 'Kubernetes', 'SQL'],
    experienceYears: 5,
    education: 'B.S. in Computer Science, University of Texas',
    imageUrl: 'https://picsum.photos/seed/cand1/600/375',
    availability: 'Immediate',
  },
  {
    id: 'cand2',
    name: 'Maria Garcia',
    headline: 'Data Scientist | Machine Learning Enthusiast',
    location: 'Boston, MA',
    bio: 'Experienced in developing machine learning models and deriving insights from complex datasets. Skilled in Python, R, and SQL. I have a strong background in statistical analysis and a proven ability to translate data into actionable business strategies. Seeking a role where I can contribute to cutting-edge AI projects.',
    skills: ['Python', 'R', 'Machine Learning', 'SQL', 'TensorFlow', 'PyTorch', 'Statistics'],
    experienceYears: 3,
    education: 'M.S. in Data Science, MIT',
    imageUrl: 'https://picsum.photos/seed/cand2/600/375',
    availability: '2 Weeks Notice',
  },
  {
    id: 'cand3',
    name: 'David Lee',
    headline: 'Marketing Specialist | Digital Strategy Expert',
    location: 'Chicago, IL',
    bio: 'Results-driven marketing professional with a knack for digital campaigns, SEO, and content creation. Proven track record of increasing engagement and driving growth. I am adept at using analytics to optimize marketing spend and achieve KPIs. Looking for a leadership role in a dynamic marketing team.',
    skills: ['SEO', 'Content Marketing', 'Google Analytics', 'Social Media Ads', 'Email Marketing', 'HubSpot'],
    experienceYears: 7,
    education: 'B.A. in Marketing, Northwestern University',
    imageUrl: 'https://picsum.photos/seed/cand3/600/375',
    availability: 'Flexible',
  },
  {
    id: 'cand4',
    name: 'Sophia Chen',
    headline: 'Junior UX Designer | Passionate about User-Centered Design',
    location: 'Remote (PST)',
    bio: 'Recent graduate with a strong portfolio in UX research, wireframing, and prototyping. Eager to contribute to a team that values intuitive and accessible design. Proficient in Figma and Adobe Creative Suite. I am a quick learner and highly collaborative.',
    skills: ['UX Research', 'Wireframing', 'Prototyping', 'Figma', 'Adobe XD', 'User Testing'],
    experienceYears: 1,
    education: 'Certificate in UX Design, DesignLab',
    imageUrl: 'https://picsum.photos/seed/cand4/600/375',
    availability: 'Immediate',
  }
];

export const placeholderMatches: Match[] = [
  {
    id: 'match1',
    userId: 'cand1', // Corresponds to Alex Johnson
    userName: 'Alex Johnson',
    userImageUrl: 'https://picsum.photos/seed/cand1/100/100',
    lastMessage: "Hey, great to connect! Your profile looks interesting.",
    lastMessageTimestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 mins ago
    unreadCount: 1,
    context: "Matched on 'Senior Frontend Developer'",
  },
  {
    id: 'match2',
    userId: 'job2', // Assuming a recruiter (user of this app) matched with Innovatech Ltd for their job
    userName: 'Innovatech Ltd.', // Could be the company name or recruiter name
    userImageUrl: 'https://picsum.photos/seed/job2/100/100',
    lastMessage: "Thanks for your interest in the Product Manager role!",
    lastMessageTimestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    unreadCount: 0,
    context: "You matched their 'Product Manager' job posting",
  },
  {
    id: 'match3',
    userId: 'cand2', // Corresponds to Maria Garcia
    userName: 'Maria Garcia',
    userImageUrl: 'https://picsum.photos/seed/cand2/100/100',
    lastMessage: "Can you tell me more about the team culture?",
    lastMessageTimestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    unreadCount: 0,
    context: "Matched on 'Data Scientist' role",
  },
];

export const placeholderChatMessages: Record<string, ChatMessage[]> = {
  match1: [
    { id: 'msg1-1', matchId: 'match1', senderId: 'cand1', text: "Hey, great to connect! Your profile looks interesting.", timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
    { id: 'msg1-2', matchId: 'match1', senderId: 'currentUser', text: "Hi Alex! Thanks, likewise. Tell me more about the projects at Tech Solutions.", timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString() },
    { id: 'msg1-3', matchId: 'match1', senderId: 'cand1', text: "We're working on a new fintech platform, it's quite exciting!", timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() },
  ],
  match2: [
     { id: 'msg2-1', matchId: 'match2', senderId: 'job2', text: "Thanks for your interest in the Product Manager role!", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
     { id: 'msg2-2', matchId: 'match2', senderId: 'currentUser', text: "You're welcome! I'm very interested. What are the next steps?", timestamp: new Date(Date.now() - 1.9 * 60 * 60 * 1000).toISOString() },
  ],
  match3: [
    { id: 'msg3-1', matchId: 'match3', senderId: 'cand2', text: "Can you tell me more about the team culture?", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    { id: 'msg3-2', matchId: 'match3', senderId: 'currentUser', text: "Absolutely! We have a very collaborative and supportive environment. We do weekly knowledge sharing sessions.", timestamp: new Date(Date.now() - 23.5 * 60 * 60 * 1000).toISOString() },
  ]
};
