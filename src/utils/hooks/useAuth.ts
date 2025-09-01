import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User, SupabaseClient } from "@supabase/supabase-js";

async function logAuthEvent(
  supabase: SupabaseClient,
  eventType: "signup" | "login"
) {
  if (eventType !== "signup" && eventType !== "login") {
    console.error('Invalid eventType. Must be "signup" or "login".');
    return;
  }

  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError);
      return;
    }

    if (!session) {
      console.error("No active session found. Cannot log event.");
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

    const result = await response.json();
    console.log(`Successfully logged ${eventType} event.`, result.data);
  } catch (error) {
    console.error(
      `An unexpected error occurred while logging ${eventType}:`,
      error
    );
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

        if (isNewUser) {
          logAuthEvent(supabase, "signup");
          const createUserProfile = async () => {
            const response = await fetch(`${endpoint}/api/user/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
              },
            });

            if (!response.ok) {
              const result = await response.json();
              console.error(`API Error: ${response.status}`, result.error);
            }
          };

          createUserProfile();
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

    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user);
        // Check if the user has a plan
        const { data: plan, error } = await supabase
          .from("plans")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching plan:", error);
        }

        if (plan) {
          router.push("/savings");
        } else {
          router.push("/auth/details");
        }
      } else {
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
