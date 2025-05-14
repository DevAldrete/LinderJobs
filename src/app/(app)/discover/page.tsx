
"use client";

import { useState, useEffect, useRef } from 'react';
import { SwipeCard } from "@/components/swipe/swipe-card";
import { placeholderJobs } from "@/lib/placeholder-data";
import type { Job } from "@/types";
import { Button } from '@/components/ui/button';
import { Loader2, RotateCcw, SearchX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { gsap } from 'gsap';

export default function DiscoverJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const swipeCardWrapperRef = useRef<HTMLDivElement>(null);
  const [animateKey, setAnimateKey] = useState(0); // Used to trigger re-animation

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setJobs(placeholderJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (swipeCardWrapperRef.current && jobs[currentIndex]) {
      gsap.fromTo(
        swipeCardWrapperRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [animateKey, currentIndex, jobs]); // Depend on animateKey and current card

  const handleSwipe = (jobId: string, direction: "left" | "right") => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const animationDirection = direction === 'left' ? -1 : 1;
    if (swipeCardWrapperRef.current) {
      gsap.to(swipeCardWrapperRef.current, {
        x: animationDirection * 300,
        opacity: 0,
        rotate: animationDirection * 15,
        duration: 0.4,
        ease: 'power1.in',
        onComplete: () => {
          gsap.set(swipeCardWrapperRef.current, { x: 0, rotate: 0 }); // Reset for next card
          proceedToNextCard(job, direction);
        },
      });
    } else {
      proceedToNextCard(job, direction);
    }
  };

  const proceedToNextCard = (job: Job, direction: "left" | "right") => {
     toast({
      title: `You swiped ${direction} on ${job.title}`,
      description: direction === 'right' ? `Added to your potential matches!` : `Moving to the next job.`,
    });

    if (currentIndex < jobs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnimateKey(prev => prev + 1); // Trigger animation for new card
    } else {
      setCurrentIndex(jobs.length); // Mark as end of list
      setAnimateKey(prev => prev + 1); 
      toast({
        title: "No more jobs",
        description: "You've seen all available jobs for now. Check back later!",
      });
    }
  }


  const resetJobs = () => {
    setIsLoading(true);
    setCurrentIndex(0);
    setAnimateKey(prev => prev + 1);
    setTimeout(() => {
      setJobs([...placeholderJobs].sort(() => Math.random() - 0.5)); 
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
      <h1 className="text-4xl font-bold text-center tracking-tight text-foreground">Discover Your Next Opportunity</h1>
      <div className="h-[650px] w-full max-w-md flex items-center justify-center"> {/* Container to manage card height and centering */}
        {currentJob ? (
          <div ref={swipeCardWrapperRef} key={animateKey} className="w-full">
            <SwipeCard item={currentJob} onSwipe={handleSwipe} type="job" />
          </div>
        ) : (
          <div className="text-center p-8 border-2 border-dashed border-muted rounded-xl bg-card shadow-lg">
            <SearchX className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-card-foreground">All Out of Jobs!</h2>
            <p className="text-muted-foreground mb-6">You've swiped through all available jobs for now. Come back later for new listings!</p>
            <Button onClick={resetJobs} variant="outline" size="lg" className="shadow hover:shadow-md">
              <RotateCcw className="mr-2 h-5 w-5" />
              Refresh Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
