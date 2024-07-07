import { Card } from "@/ui/shadcn/card";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card>{children}</Card>
    </main>
  );
}
