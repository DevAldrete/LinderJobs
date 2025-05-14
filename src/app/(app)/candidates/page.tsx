"use client";

import { useState, useEffect } from 'react';
import { SwipeCard } from "@/components/swipe/swipe-card";
import { placeholderCandidates } from "@/lib/placeholder-data";
import type { Candidate } from "@/types";
import { Button } from '@/components/ui/button';
import { Loader2, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DiscoverCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      setCandidates(placeholderCandidates);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSwipe = (candidateId: string, direction: "left" | "right") => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    toast({
      title: `You swiped ${direction} on ${candidate.name}`,
      description: direction === 'right' ? `Added to your potential matches!` : `Moving to the next candidate.`,
    });

    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: "No more candidates",
        description: "You've seen all available candidates for now.",
      });
    }
  };
  
  const resetCandidates = () => {
    setIsLoading(true);
    setCurrentIndex(0);
    setTimeout(() => {
      setCandidates([...placeholderCandidates].sort(() => Math.random() - 0.5));
      setIsLoading(false);
      toast({ title: "Candidates refreshed!" });
    }, 500);
  };


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-accent" />
        <p className="mt-4 text-lg text-muted-foreground">Loading candidates...</p>
      </div>
    );
  }
  
  const currentCandidate = candidates[currentIndex];

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <h1 className="text-3xl font-bold text-center">Find Your Next Hire</h1>
       {currentCandidate ? (
        <SwipeCard item={currentCandidate} onSwipe={handleSwipe} type="candidate" />
      ) : (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">All Out of Candidates!</h2>
          <p className="text-muted-foreground mb-4">You've swiped through all available candidates for now. Come back later for new profiles!</p>
          <Button onClick={resetCandidates} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Refresh Candidates
          </Button>
        </div>
      )}
      {candidates.length > 0 && currentIndex >= candidates.length && (
         <div className="text-center p-8 border border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">That's All For Now!</h2>
          <p className="text-muted-foreground mb-4">You've seen all current candidate listings.</p>
          <Button onClick={resetCandidates} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Check Again
          </Button>
        </div>
      )}
    </div>
  );
}
