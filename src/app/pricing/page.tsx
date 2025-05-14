
"use client";

import { AppHeader } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Sparkles, Briefcase, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link'; // Added import

const pricingTiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Get started and explore core features.",
    features: [
      "Limited swipes per day",
      "Basic profile creation",
      "View job/candidate matches",
      "Standard search filters",
    ],
    icon: Users,
    cta: "Get Started",
    variant: "default" as const,
  },
  {
    name: "Premium Career",
    price: "$29",
    priceSuffix: "/month",
    description: "Supercharge your job search and stand out.",
    features: [
      "Unlimited swipes",
      "Advanced profile insights",
      "See who viewed your profile",
      "Priority placement in searches",
      "Direct messaging to recruiters (5 InMails/month)",
      "AI-powered resume feedback",
    ],
    icon: Sparkles,
    cta: "Choose Career",
    variant: "accent" as const,
    popular: true,
  },
  {
    name: "Premium Business",
    price: "$79",
    priceSuffix: "/month",
    description: "Find top talent faster and manage hiring efficiently.",
    features: [
      "Unlimited candidate searches & swipes",
      "Advanced recruiter filters",
      "Post up to 5 jobs",
      "Candidate management tools",
      "Direct messaging to candidates (25 InMails/month)",
      "Company branding options",
    ],
    icon: Briefcase,
    cta: "Choose Business",
    variant: "default" as const,
  },
];

export default function PricingPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current.querySelector('h1'), 
        { opacity: 0, y: -30 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(pageRef.current.querySelector('p.text-xl'), 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      );
    }
    cardRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(el,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.3 + index * 0.15, ease: 'power2.out' }
        );
      }
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main ref={pageRef} className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Find the <span className="text-accent">Perfect Plan</span> For You
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're starting out, advancing your career, or scaling your business, we have a plan that fits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={tier.name}
              ref={el => cardRefs.current[index] = el}
              className={cn(
                "flex flex-col rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1",
                tier.popular ? "border-accent border-2 ring-4 ring-accent/20" : "border-border"
              )}
            >
              <CardHeader className="p-6 text-center">
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-semibold bg-accent text-accent-foreground shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                <tier.icon className={cn("w-12 h-12 mx-auto mb-4", tier.popular ? "text-accent" : "text-muted-foreground")} />
                <CardTitle className="text-2xl font-bold text-foreground">{tier.name}</CardTitle>
                <CardDescription className="text-muted-foreground mt-1 h-10">{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-foreground">{tier.price}</span>
                  {tier.priceSuffix && <span className="text-md font-medium text-muted-foreground">{tier.priceSuffix}</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6 space-y-3">
                <ul className="space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2.5 shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6 mt-auto">
                <Button 
                  size="lg" 
                  className={cn(
                    "w-full text-lg py-3 shadow-md hover:shadow-lg transition-shadow",
                    tier.variant === "accent" ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-12 text-sm">
            Need something different? <Link href="/contact" className="text-accent hover:underline">Contact us</Link> for enterprise solutions.
        </p>
      </main>
       <footer className="py-8 text-center border-t bg-secondary/50">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} LinderJobs. All rights reserved.</p>
      </footer>
    </div>
  );
}

