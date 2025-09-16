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
    let isMounted = true; 

    async function checkAuth() {
      try {
        const session = await getSession();

        if (!session?.isAuthenticated) {

          const token = document.cookie
            .split("; ")
            .find((c) => c.startsWith("accessToken="))
            ?.split("=")[1];

          if (!token) {
            clearIsAuthenticated();
            if (
              pathname.startsWith("/profile") ||
              pathname.startsWith("/dashboard")
            ) {
              router.replace("/sign-in");
            }
          }
        } else {
          const currentUser = await getCurrentUser();
          if (currentUser && isMounted) {
            setUser(currentUser);
          } else if (isMounted) {
            clearIsAuthenticated();
            router.replace("/sign-in");
          }
        }
      } catch (error) {
        console.error("Session check failed:", error);
        if (isMounted) {
          clearIsAuthenticated();
          router.replace("/sign-in");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, setUser, clearIsAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
