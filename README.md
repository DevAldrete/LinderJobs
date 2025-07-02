# LinderJobs

**Hire with confidence. Apply with clarity.**

LinderJobs is a modern job platform built on the principles of transparency, accountability, and efficiency. We are creating a marketplace that respects the time of both job seekers and recruiters by eliminating ghost jobs, mandating salary transparency, and rewarding good actors.

[![Build Status](https://img.shields.io/github/actions/workflow/status/linderjobs/linderjobs/ci.yml?branch=main)](https://github.com/devaldrete/linderjobs/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Follow on Twitter](https://img.shields.io/twitter/follow/LinderJobs?style=social)](https://twitter.com/LinderJobs)

---

## The Problem

The modern job market is broken. It's plagued by:

- **👻 Ghost Jobs:** Postings left open for months to pool talent with no real intent to hire.
- **🤫 Salary Secrecy:** Lack of upfront salary and benefits information wastes everyone's time.
- **🔇 Recruiter Ghosting:** Candidates invest hours into applications and interviews, only to be met with silence.
- **🤖 Application Black Holes:** Sending applications feels like shouting into the void.

## Our Solution: The Core Features

LinderJobs is designed from the ground up to solve these problems with a set of non-negotiable features:

- **⏳ Dynamic 20-Day Job Posts:** Job posts automatically expire after 20 days. This ensures all listings are active and urgent.
- **🏅 Recruiter Accountability Badge:** Recruiters who fail to engage with applicants on a closed job post receive a temporary "Unresponsive" badge on their profile. Good behavior is a visible asset.
- **💰 Mandatory Salary & Benefits:** Every single job post **must** include a clear salary range and a list of benefits. No exceptions.
- **💬 Unlimited Direct Contact:** We encourage genuine connection. All users can send direct messages to recruiters and participate in networking events.
- **🤖 AI Application Assistant:** An integrated AI helps candidates craft a concise, high-impact summary of their qualifications, helping them stand out and saving recruiters time.
- **⭐ AI Behavioral Rating (Experimental):** A lightweight AI analyzes public interactions to provide a general "professionalism" rating, promoting respectful communication on the platform.

## 🛠️ Tech Stack & Architecture

This project is built with a modern, scalable, and developer-friendly stack.

- **Frontend:** [SvelteKit](https://kit.svelte.dev/) & [TailwindCSS](https://tailwindcss.com/)
  - **Architecture:** Component-Driven Design
- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python) & [SQLAlchemy](https://www.sqlalchemy.org/)
  - **Architecture:** Layered Architecture (Presentation, Business, Persistence)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Deployment:** [Docker](https://www.docker.com/) for containerization.
  - **Staging/Initial:** [Vercel](https://vercel.com/) (Frontend) & [Railway](https://railway.app/) (Backend/DB)
  - **Production (Future):** AWS / Digital Ocean
- **CI/CD:** [GitHub Actions](https://github.com/features/actions) for automated testing and deployment.

## 🚀 Getting Started (Local Development)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/linderjobs.git
    cd linderjobs
    ```

2.  **Set up Environment Variables:**

    - Create a `.env` file in the `backend/` directory. See `.env.example` for required variables (`DATABASE_URL`, `SECRET_KEY`, `GEMINI_API_KEY`, etc.).

3.  **Run the Backend (with Docker):**

    ```bash
    cd backend
    docker-compose up --build
    ```

    The API will be available at `http://localhost:8000`.

4.  **Run the Frontend:**
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 🌱 Contributing

This is currently a work in progress! We are gauging community interest and building our MVP. The best way to contribute right now is to:

1.  Follow our journey on [Twitter](https://twitter.com/LinderJobs) and [Instagram](https://instagram.com/LinderJobs).
2.  Star this repository!
3.  Open an issue to suggest a feature or report a bug.

---
