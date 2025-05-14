
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Users, MessageSquare, Briefcase, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react"; // Added useEffect and useState

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  role?: "seeker" | "recruiter" | "any"; 
}

const navItems: NavItem[] = [
  { href: "/discover", label: "Discover", icon: Flame, role: "seeker" },
  { href: "/candidates", label: "Candidates", icon: Flame, role: "recruiter" },
  { href: "/matches", label: "Matches", icon: Users, role: "any" },
  { href: "/chat", label: "Chat", icon: MessageSquare, role: "any" },
  { href: "/jobs", label: "My Jobs", icon: Briefcase, role: "recruiter" },
  { href: "/profile", label: "Profile", icon: UserCircle2, role: "any" }, // Changed href to /profile
];


export function MobileNav() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<"seeker" | "recruiter">("seeker"); // Default role

  useEffect(() => {
    // In a real app, this would come from user profile data / AuthContext
    const storedRole = localStorage.getItem("linderjobs_user_role") as "seeker" | "recruiter";
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);


  const filteredNavItems = navItems.filter(item => {
    return item.role === "any" || item.role === userRole;
  });

  const mainItems = filteredNavItems.filter(item => item.href !== "/profile"); // Changed settings to profile
  const profileItem = filteredNavItems.find(item => item.href === "/profile"); // Changed settings to profile
  
  let displayItems = mainItems.slice(0,3); 
  if (profileItem) {
    displayItems.push(profileItem); 
  }
  if (displayItems.length < 4 && mainItems.length > 3) { 
     displayItems.splice(displayItems.length -1, 0, ...mainItems.slice(3, 4 - displayItems.length + 3));
  }
  displayItems = displayItems.slice(0,4); 


  if (filteredNavItems.length === 0) return null;


  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className={cn(
        "container mx-auto grid h-16 max-w-lg items-center px-0",
         `grid-cols-${displayItems.length}`
      )}>
        {displayItems.map((item) => { 
          const isActiveBase = pathname === item.href;
          // More specific active checks
          const isActiveDiscover = item.href === "/discover" && pathname.startsWith("/discover");
          const isActiveCandidates = item.href === "/candidates" && pathname.startsWith("/candidates");
          const isActiveMatches = item.href === "/matches" && pathname.startsWith("/matches");
          const isActiveChat = item.href === "/chat" && (pathname === "/chat" || pathname.startsWith("/chat/"));
          const isActiveJobs = item.href === "/jobs" && (pathname === "/jobs" || pathname.startsWith("/jobs/"));
          const isActiveProfile = item.href === "/profile" && pathname.startsWith("/profile");

          const finalIsActive = isActiveBase || isActiveDiscover || isActiveCandidates || isActiveMatches || isActiveChat || isActiveJobs || isActiveProfile;
          
          return (
            <Link key={item.href} href={item.href} legacyBehavior passHref>
              <a className={cn(
                "flex flex-col items-center justify-center space-y-1 p-2 text-sm font-medium",
                finalIsActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
              )}>
                <item.icon className="h-6 w-6" />
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
