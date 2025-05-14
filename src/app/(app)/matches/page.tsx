"use client";

import { MatchList } from "@/components/matches/match-list";
import { placeholderMatches } from "@/lib/placeholder-data";
import type { Match } from "@/types";
import { useState, useEffect } from 'react';
import { Loader2 } from "lucide-react";


export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMatches(placeholderMatches);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
        <p className="mt-4 text-muted-foreground">Loading your matches...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Matches</h1>
      <MatchList matches={matches} />
    </div>
  );
}
