"use client";

import { useState, useEffect } from 'react';
import { SwipeCard } from "@/components/swipe/swipe-card";
import { placeholderJobs } from "@/lib/placeholder-data";
import type { Job } from "@/types";
import { Button } from '@/components/ui/button';
import { Loader2, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DiscoverJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setJobs(placeholderJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSwipe = (jobId: string, direction: "left" | "right") => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    toast({
      title: `You swiped ${direction} on ${job.title}`,
      description: direction === 'right' ? `Added to your potential matches!` : `Moving to the next job.`,
      variant: direction === 'right' ? 'default' : 'default',
    });

    // Animate out (conceptual)
    // For now, just move to next card
    if (currentIndex < jobs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reached end of list
      toast({
        title: "No more jobs",
        description: "You've seen all available jobs for now. Check back later!",
      });
    }
  };

  const resetJobs = () => {
    setIsLoading(true);
    setCurrentIndex(0);
    // Simulate refetch or reshuffle
    setTimeout(() => {
      setJobs([...placeholderJobs].sort(() => Math.random() - 0.5)); // Simple shuffle
      setIsLoading(false);
      toast({ title: "Jobs refreshed!" });
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-accent" />
        <p className="mt-4 text-lg text-muted-foreground">Loading jobs...</p>
      </div>
    );
  }

  const currentJob = jobs[currentIndex];

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <h1 className="text-3xl font-bold text-center">Discover Your Next Opportunity</h1>
      {currentJob ? (
        <SwipeCard item={currentJob} onSwipe={handleSwipe} type="job" />
      ) : (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">All Out of Jobs!</h2>
          <p className="text-muted-foreground mb-4">You've swiped through all available jobs for now. Come back later for new listings!</p>
          <Button onClick={resetJobs} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Refresh Jobs
          </Button>
        </div>
      )}
       {jobs.length > 0 && currentIndex >= jobs.length && (
         <div className="text-center p-8 border border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">That's All For Now!</h2>
          <p className="text-muted-foreground mb-4">You've seen all current job listings.</p>
          <Button onClick={resetJobs} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Check Again
          </Button>
        </div>
      )}
    </div>
  );
}
