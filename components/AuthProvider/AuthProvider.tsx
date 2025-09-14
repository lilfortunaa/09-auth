"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { getSession, getCurrentUser } from "@/lib/api/clientApi";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        
        const session = await getSession();

        if (!session?.isAuthenticated) {
          clearIsAuthenticated();
         
          if (pathname.startsWith("/profile") || pathname.startsWith("/dashboard")) {
            router.replace("/sign-in");
          }
        } else {
          const user = await getCurrentUser();
          setUser(user); 
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
