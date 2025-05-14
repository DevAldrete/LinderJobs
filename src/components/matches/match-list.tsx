
"use client";

import type { Match } from "@/types";
import { MatchListItem } from "./match-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react"; // Replaced UsersIcon with Lucide Users
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
      <div className="text-center py-10 border-2 border-dashed border-muted rounded-xl bg-card shadow-lg">
        <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="mt-2 text-xl font-semibold text-card-foreground">No Matches Yet</h3>
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
          className="pl-10 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea className="h-[calc(100vh-18rem)] rounded-md border shadow-inner"> {/* Adjust height as needed */}
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
