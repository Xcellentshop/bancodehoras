import { LoginSelector } from '@/components/auth/login-selector';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <LoginSelector />
    </main>
  );
}