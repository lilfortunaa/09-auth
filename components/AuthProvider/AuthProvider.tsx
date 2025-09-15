"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { getSession, getCurrentUser } from "@/lib/api/clientApi";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const session = await getSession();

        if (!session?.isAuthenticated) {
          clearIsAuthenticated();

          if (pathname.startsWith("/profile") || pathname.startsWith("/dashboard")) {
            router.replace("/sign-in");
          }
        } else {
          const user = await getCurrentUser();
          if (user) {
            setUser(user);
          } else {
            clearIsAuthenticated();
            router.replace("/sign-in");
          }
        }
      } catch (error) {
        console.error("Session check failed:", error);
        clearIsAuthenticated();
        router.replace("/sign-in");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, setUser, clearIsAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
