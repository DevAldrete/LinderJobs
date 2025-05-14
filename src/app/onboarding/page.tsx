import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to LinderJobs!</CardTitle>
          <CardDescription className="text-md">
            Let's get your profile set up so you can start swiping.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <p className="text-center text-muted-foreground">
            We'll guide you through a few simple steps to create your account and specify your role.
          </p>
          <Button size="lg" asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/onboarding/role">
              Start Onboarding <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
