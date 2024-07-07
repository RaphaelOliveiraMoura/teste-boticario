export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[400px] p-6 shadow-md">{children}</div>
    </main>
  );
}
