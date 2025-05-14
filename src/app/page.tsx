import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/common/header';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center md:py-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Swipe Right on Your <span className="text-accent">Dream Career</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            LinderJobs revolutionizes job searching and talent acquisition. Discover opportunities and connect with candidates through an intuitive, engaging swipe interface.
          </p>
          <div className="mt-10 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/onboarding">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/(app)/discover">Explore Jobs</Link>
            </Button>
          </div>
        </section>
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-card rounded-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-accent"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Intuitive Swiping</h3>
                <p className="text-muted-foreground">Easily browse jobs or candidates with a simple swipe.</p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-md">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-accent"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Instant Matches</h3>
                <p className="text-muted-foreground">Connect instantly when there's mutual interest.</p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-accent"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Direct Chat</h3>
                <p className="text-muted-foreground">Communicate with matches directly within the app.</p>
              </div>
            </div>
          </div>
        </section>
         <section className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image 
                src="https://picsum.photos/600/400" 
                alt="Happy professionals collaborating"
                data-ai-hint="team collaboration"
                width={600} 
                height={400}
                className="rounded-lg shadow-xl" 
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-foreground">For Job Seekers & Recruiters</h2>
              <p className="text-lg text-muted-foreground mb-3">
                Whether you're looking for your next big career move or searching for the perfect candidate to join your team, LinderJobs provides the tools and platform for efficient and enjoyable connections.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Create a standout profile in minutes.</li>
                <li>Filter searches to find exactly what you're looking for.</li>
                <li>Manage your applications or job postings with ease.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 text-center border-t">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} LinderJobs. All rights reserved.</p>
      </footer>
    </div>
  );
}
