
"use client";

import { useState, useEffect, useRef } from 'react';
import { SwipeCard } from "@/components/swipe/swipe-card";
import { placeholderCandidates } from "@/lib/placeholder-data";
import type { Candidate } from "@/types";
import { Button } from '@/components/ui/button';
import { Loader2, RotateCcw, Users2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { gsap } from 'gsap';

export default function DiscoverCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const swipeCardWrapperRef = useRef<HTMLDivElement>(null);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCandidates(placeholderCandidates);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (swipeCardWrapperRef.current && candidates[currentIndex]) {
      gsap.fromTo(
        swipeCardWrapperRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [animateKey, currentIndex, candidates]);

  const handleSwipe = (candidateId: string, direction: "left" | "right") => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;
    
    const animationDirection = direction === 'left' ? -1 : 1;
    if (swipeCardWrapperRef.current) {
      gsap.to(swipeCardWrapperRef.current, {
        x: animationDirection * 300,
        opacity: 0,
        rotate: animationDirection * 15,
        duration: 0.4,
        ease: 'power1.in',
        onComplete: () => {
          gsap.set(swipeCardWrapperRef.current, { x: 0, rotate: 0 });
          proceedToNextCandidate(candidate, direction);
        },
      });
    } else {
      proceedToNextCandidate(candidate, direction);
    }
  };
  
  const proceedToNextCandidate = (candidate: Candidate, direction: "left" | "right") => {
    toast({
      title: `You swiped ${direction} on ${candidate.name}`,
      description: direction === 'right' ? `Added to your potential matches!` : `Moving to the next candidate.`,
    });

    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnimateKey(prev => prev + 1);
    } else {
      setCurrentIndex(candidates.length);
      setAnimateKey(prev => prev + 1);
      toast({
        title: "No more candidates",
        description: "You've seen all available candidates for now.",
      });
    }
  };
  
  const resetCandidates = () => {
    setIsLoading(true);
    setCurrentIndex(0);
    setAnimateKey(prev => prev + 1);
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
      <h1 className="text-4xl font-bold text-center tracking-tight text-foreground">Find Your Next Hire</h1>
      <div className="h-[650px] w-full max-w-md flex items-center justify-center">
       {currentCandidate ? (
        <div ref={swipeCardWrapperRef} key={animateKey} className="w-full">
            <SwipeCard item={currentCandidate} onSwipe={handleSwipe} type="candidate" />
        </div>
      ) : (
        <div className="text-center p-8 border-2 border-dashed border-muted rounded-xl bg-card shadow-lg">
          <Users2 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-card-foreground">All Out of Candidates!</h2>
          <p className="text-muted-foreground mb-6">You've swiped through all available candidates for now. Come back later for new profiles!</p>
          <Button onClick={resetCandidates} variant="outline" size="lg" className="shadow hover:shadow-md">
            <RotateCcw className="mr-2 h-5 w-5" />
            Refresh Candidates
          </Button>
        </div>
      )}
      </div>
    </div>
  );
}
