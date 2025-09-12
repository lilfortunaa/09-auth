"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        
        const res = await fetch("/api/auth/session", { cache: "no-store" });

        if (!res.ok) {
          clearIsAuthenticated();
         
          if (pathname.startsWith("/profile") || pathname.startsWith("/dashboard")) {
            router.replace("/sign-in");
          }
        } else {
          const data = await res.json();
          setUser(data.user); 
        }
      } catch (error) {
        console.error("Session check failed:", error);
        clearIsAuthenticated();
        router.replace("/sign-in");
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, [pathname,clearIsAuthenticated, setUser, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
