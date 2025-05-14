"use client";

import type { Match } from "@/types";
import { MatchListItem } from "./match-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface MatchListProps {
  matches: Match[];
}

export function MatchList({ matches: initialMatches }: MatchListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMatches = initialMatches.filter(match => 
    match.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (match.lastMessage && match.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (match.context && match.context.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  if (initialMatches.length === 0) {
    return (
      <div className="text-center py-10">
        <UsersIcon className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-xl font-semibold">No Matches Yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">Keep swiping to find your matches!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
       <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search matches..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea className="h-[calc(100vh-18rem)] rounded-md border"> {/* Adjust height as needed */}
        <div className="divide-y">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <MatchListItem key={match.id} match={match} />
            ))
          ) : (
            <p className="p-4 text-center text-muted-foreground">No matches found for "{searchTerm}".</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
