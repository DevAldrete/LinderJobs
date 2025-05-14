
"use client";

import type { Job } from "@/types";
import { JobListItem } from "./job-list-item";
import { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { Briefcase } from "lucide-react"; // Changed from BriefcaseIcon

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs: initialJobs }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setJobs(initialJobs); // Update local state if initialJobs prop changes
  }, [initialJobs]);

  useEffect(() => {
    if (listContainerRef.current && jobs.length > 0) {
      const jobItems = listContainerRef.current.querySelectorAll('.job-list-item-wrapper');
      gsap.fromTo(jobItems,
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.5, 
          stagger: 0.1, 
          ease: "power2.out" 
        }
      );
    }
  }, [jobs]); // Re-run animation if jobs array changes

  const handleDeleteJob = (jobId: string) => {
    setJobs(currentJobs => currentJobs.filter(job => job.id !== jobId));
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-muted rounded-xl bg-card shadow-lg">
        <Briefcase className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="mt-2 text-xl font-semibold text-card-foreground">No Job Postings Yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">Click "Create New Job" to add your first posting.</p>
      </div>
    );
  }
  return (
    <div ref={listContainerRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <div key={job.id} className="job-list-item-wrapper"> {/* Wrapper for GSAP targeting */}
          <JobListItem job={job} onDelete={handleDeleteJob} />
        </div>
      ))}
    </div>
  );
}
