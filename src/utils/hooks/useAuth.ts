import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User, SupabaseClient } from "@supabase/supabase-js";

// 🔹 Helper: Log signup/login events
async function logAuthEvent(
  supabase: SupabaseClient,
  eventType: "signup" | "login"
) {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error("Error getting session:", sessionError);
      return;
    }

    const accessToken = session.access_token;
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/audit_logs/${eventType}_logs`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorResult = await response.json();
      console.error(`API Error logging ${eventType}:`, errorResult.error);
      return;
    }

    console.log(`✅ Logged ${eventType} event`);
  } catch (error) {
    console.error(`Unexpected error logging ${eventType}:`, error);
  }
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginEventLogged, setLoginEventLogged] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const endpoint = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        const isNewUser =
          session.user.created_at === session.user.last_sign_in_at;
        console.log(session.user.created_at);
        console.log(session.user.last_sign_in_at);

        if (isNewUser) {
          logAuthEvent(supabase, "signup");

          // 🔹 Create user profile via backend
          fetch(`${endpoint}/api/user/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
          }).catch((err) => console.error("Profile creation failed:", err));
        } else {
          if (!loginEventLogged) {
            logAuthEvent(supabase, "login");
            setLoginEventLogged(true);
          }
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setLoginEventLogged(false);
        router.push("/auth");
      }
    });

    // 🔹 Check if user exists + has plan (via backend)
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth");
        setLoading(false);
        return;
      }

      setUser(session.user);

      try {
        const response = await fetch(`${endpoint}/api/user/has-plan`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          const result = await response.json();
          console.error("Error checking plan:", result.error);
          router.push("/auth");
          return;
        }

        const { hasPlan } = await response.json();

        if (hasPlan) {
          router.push("/savings");
        } else {
          router.push("/auth/details");
        }
      } catch (err) {
        console.error("Unexpected error checking plan:", err);
        router.push("/auth");
      }

      setLoading(false);
    };

    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  return { user, loading };
};
