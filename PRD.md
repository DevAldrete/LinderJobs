Product Requirements Document: LinderJobs MVP

Document Status: Draft
Author: Aldrete
Date: 2025-07-02
Version: 1.0

1. Introduction & Problem Statement

The current landscape of professional networking and job-seeking platforms, dominated by LinkedIn, has led to widespread user frustration. Key problems include the proliferation of "ghost jobs," a lack of salary transparency, and a culture of "ghosting" where candidates receive no feedback. This creates an inefficient, opaque, and demoralizing experience for job seekers and clutters the pipeline with low-intent applications for serious recruiters.
LinderJobs aims to build a job marketplace centered on transparency, accountability, and efficiency, creating a high-valuable environment for both candidates and employers.

2. Goals & Objectives (MVP)

- Product Goal: Launch a functional MVP that validates the core hypothesis: a transparent and accountable platform will attract high-quality candidates and recruiters.
- Business Goal: Onboard the first 1,000 active candidates and 50 companies/recruiters within 3 months of launch.
- User Goal: Enable a candidate to find, apply for, and receive a response for a job in a process that feels fair and respectful of their time.

3. User Personas

- Sofia, the Mid-Level Software Engineer (Candidate):

  - Bio: 28, skilled in React and Go, has 4 years of experience.
  - Goals: Find a new role with a clear career path and a competitive salary. Wants to know the salary before applying.
  - Frustrations: Wasting weeks on interview processes for jobs that turn out to be underpaid. Getting ghosted after final-round interviews. Unsure if a job posting is even real.

- David, the Tech Recruiter (Employer):

      - Bio: 35, works for a 100-person tech startup.
      - Goals: Fill 3 open engineering roles in the next quarter with qualified candidates who are genuinely interested.
      - Frustrations: Sifting through hundreds of low-quality applications from talent pools. Competing with the noise of thousands of other job posts. Candidates dropping out late in the process when they learn the salary.

4. Features & Requirements (User Stories)

Epic: Core Platform & User Profiles

- User Story: As a user (candidate or recruiter), I can sign up for an account using my email and password or a social login (e.g., Google, GitHub).
- User Story: As a candidate, I can create a profile detailing my work experience, skills, education, and project portfolio.
- User Story: As a recruiter, I can create a profile for myself and the company I represent.

Epic: Transparent Job Posting (Recruiter)

- User Story: As a recruiter, I must enter a specific salary range (e.g., $120,000 - $140,000) and select at least 3 key benefits to create a job post.
- User Story: As a recruiter, when I post a job, I am notified that it will automatically expire and be delisted in 20 days.
- User Story: As a recruiter, I can view and manage all the applications for my job post from a central dashboard.

Epic: Job Discovery & Application (Candidate)

- User Story: As a candidate, I can search and filter jobs based on role, tech stack, salary, and location.
- User Story: As a candidate, I can see the salary, benefits, and expiration date clearly on every job listing.
- User Story: As a candidate, when applying, I can use an integrated AI assistant to help me write a 3-sentence summary highlighting my fit for the role.

Epic: Accountability & Reputation System

- User Story: As a system, when a 20-day job post expires, I will check if the recruiter has engaged (viewed, messaged, or rejected) with their applicants.
- User Story: As a system, if a recruiter has engaged with less than a defined threshold (e.g., 10%) of their applicants, I will apply a visible "Unresponsive Recruiter" badge to their profile for 30 days.
- User Story: As a user, I can see the "Unresponsive Recruiter" badge on a recruiter's profile and job posts.

5. Out of Scope (For MVP)

To ensure a focused and timely launch, the following features will be considered for future versions:

- Full-blown social feed (posts, articles, etc.).
- Complex company pages with "life at" sections.
- Dedicated mobile applications (the web app will be mobile-responsive).
- Paid premium features (e.g., "Promote Job Post").
- The AI Behavioral Rating system (due to its complexity and ethical considerations, this will be developed post-MVP).
- Online networking events.

6. Success Metrics

- Activation: # of new candidate/recruiter sign-ups per week.
- Engagement: Ratio of applications per job post; Daily Active Users (DAU).
- Core Value Prop: Average recruiter response time; % of job posts that are filled vs. expired.
- Retention: 1-month cohort retention for candidates.
