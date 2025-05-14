
"use client"; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/common/header';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Users, Briefcase, MessageSquare, TrendingUp, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Animation
    if (heroRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
      tl.fromTo(
        heroRef.current.querySelector('h1 .highlight-text'),
        { opacity: 0, y: 20, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        heroRef.current.querySelectorAll('h1 .normal-text'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        "-=0.5"
      )
      .fromTo(
        heroRef.current.querySelector('p'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        "-=0.6"
      )
      .fromTo(
        heroRef.current.querySelectorAll('.hero-buttons > *'),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
        "-=0.5"
      );
    }

    // Animate sections on scroll
    const animateSection = (ref: React.RefObject<HTMLDivElement>, elementsSelector: string, fromProps: gsap.TweenVars = { opacity: 0, y: 50, scale: 0.95 }, stagger: number = 0.2) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current.querySelectorAll(elementsSelector),
          fromProps,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: stagger,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    };
    
    animateSection(featuresRef, '.feature-card');
    animateSection(howItWorksRef, '.step-card');
    animateSection(testimonialsRef, '.testimonial-card');
    
    // CTA Section Animation
    if (ctaSectionRef.current) {
       gsap.fromTo(
        ctaSectionRef.current.querySelectorAll('img, h2, p, ul, .cta-buttons > *'),
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
    
    // Footer Animation
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
           scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

  }, []);

  const featureItems = [
    { icon: Zap, title: "Intuitive Swiping", description: "Easily browse jobs or candidates with a simple swipe." },
    { icon: TrendingUp, title: "Instant Matches", description: "Connect instantly when there's mutual interest." },
    { icon: MessageSquare, title: "Direct Chat", description: "Communicate with matches directly within the app." },
  ];

  const howItWorksSteps = [
    { title: "Create Your Profile", description: "Sign up and build a compelling profile that showcases your skills or company culture.", icon: Users },
    { title: "Swipe & Discover", description: "Browse through curated job listings or candidate profiles with an engaging swipe interface.", icon: Briefcase },
    { title: "Get Matched", description: "Receive instant notifications when you have a mutual match with a job or candidate.", icon: Zap },
    { title: "Connect & Chat", description: "Start conversations with your matches directly in the app to explore opportunities further.", icon: MessageSquare },
  ];

  const testimonials = [
    { quote: "LinderJobs made my job search incredibly efficient and fun! Found my dream role in weeks.", name: "Sarah L.", role: "Software Engineer" , avatarSeed: "sarah"},
    { quote: "As a recruiter, finding qualified candidates used to be a chore. LinderJobs streamlined the process.", name: "Michael B.", role: "Talent Acquisition Lead", avatarSeed: "michael" },
    { quote: "The swipe interface is genius! It's so much more engaging than traditional job boards.", name: "Jessica P.", role: "UX Designer", avatarSeed: "jessica" },
  ];


  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AppHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          ref={heroRef} 
          className="relative container mx-auto flex flex-col items-center justify-center px-4 py-20 md:py-32 text-center overflow-hidden"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 dark:bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl animate-pulse-slower"></div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <span className="block normal-text">Swipe Right on Your</span>
            <span className="block highlight-text text-accent mt-2 md:mt-3">Dream Career</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            LinderJobs revolutionizes job searching and talent acquisition. Discover opportunities and connect with candidates through an intuitive, engaging swipe interface.
          </p>
          <div className="mt-12 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 hero-buttons">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-10 py-7 text-lg">
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-md hover:shadow-lg transition-all transform hover:scale-105 px-10 py-7 text-lg border-2">
              <Link href="/(app)/discover">Explore Jobs <ChevronRight className="ml-2 h-5 w-5"/></Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-16 md:py-24 bg-secondary/50 dark:bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Why Choose <span className="text-accent">LinderJobs?</span></h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {featureItems.map(feature => (
                <div key={feature.title} className="feature-card p-6 md:p-8 bg-card rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <feature.icon className="mx-auto mb-6 h-12 w-12 text-accent" />
                  <h3 className="text-2xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-md">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Simple Steps to <span className="text-accent">Success</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step, index) => (
                <Card key={index} className="step-card text-center bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-6">
                  <div className="flex-shrink-0 mb-4">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-xl font-semibold text-card-foreground">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section ref={testimonialsRef} className="py-16 md:py-24 bg-secondary/50 dark:bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Loved by <span className="text-accent">Professionals</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="testimonial-card bg-card p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                  <CardContent className="p-0 flex-grow">
                    <p className="text-lg italic text-foreground mb-6 before:content-['“'] before:mr-1 before:font-serif before:text-3xl before:text-accent after:content-['”'] after:ml-1 after:font-serif after:text-3xl after:text-accent">
                      {testimonial.quote}
                    </p>
                  </CardContent>
                  <div className="mt-auto flex items-center pt-4 border-t border-border">
                    <Image 
                      src={`https://placehold.co/40x40.png?text=${testimonial.name.substring(0,1)}`}
                      alt={testimonial.name}
                      data-ai-hint="person avatar"
                      width={40} height={40} className="rounded-full mr-4" />
                    <div>
                      <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

         {/* Call to Action Section */}
         <section ref={ctaSectionRef} className="container mx-auto px-4 py-16 md:py-24">
          <div className="bg-gradient-to-r from-accent/80 to-primary/80 dark:from-accent/60 dark:to-primary/60 p-8 md:p-16 rounded-2xl shadow-2xl text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/2">
                <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="Professionals collaborating in a modern office"
                  data-ai-hint="team meeting"
                  width={600} 
                  height={400}
                  className="rounded-lg shadow-xl" 
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">Ready to Find Your Next Big Thing?</h2>
                <p className="text-lg text-primary-foreground/90 mb-8">
                  Join thousands of job seekers and recruiters who are making smarter connections on LinderJobs. Your next opportunity is just a swipe away.
                </p>
                <div className="flex flex-col items-center md:items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 cta-buttons">
                  <Button size="lg" asChild className="bg-background text-foreground hover:bg-background/90 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-8 py-6 text-md">
                    <Link href="/signup">Sign Up Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground shadow-md hover:shadow-lg transition-all transform hover:scale-105 px-8 py-6 text-md">
                    <Link href="/pricing">View Pricing Plans</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer ref={footerRef} className="py-8 text-center border-t bg-secondary/30">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} LinderJobs. All rights reserved.</p>
      </footer>
    </div>
  );
}
