"use client";

import type { Job } from "@/types";
import { JobListItem } from "./job-list-item";
import { useState } from "react";

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs: initialJobs }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const handleDeleteJob = (jobId: string) => {
    setJobs(currentJobs => currentJobs.filter(job => job.id !== jobId));
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed rounded-lg">
        <BriefcaseIcon className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-xl font-semibold">No Job Postings Yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">Click "Create New Job" to add your first posting.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} onDelete={handleDeleteJob} />
      ))}
    </div>
  );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}
