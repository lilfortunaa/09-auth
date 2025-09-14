'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter();

  useEffect(()=>{
    router.refresh();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      {children}
    </main>
  );
}
