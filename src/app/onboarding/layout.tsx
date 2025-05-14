import { AppHeader } from "@/components/common/header";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mx-auto max-w-xl">
          {children}
        </div>
      </main>
    </div>
  );
}
