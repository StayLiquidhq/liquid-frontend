import { SupabaseClient } from "@supabase/supabase-js";

// 🔹 Helper: Logs a login event by calling our API endpoint
export async function logAuthEvent(
  supabase: SupabaseClient,
  eventType: "login"
) {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/audit_logs/login_logs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      const errorResult = await response.json();
      console.error(`API Error logging ${eventType}:`, errorResult.error);
    } else {
      console.log(`✅ Logged ${eventType} event via API`);
    }
  } catch (error) {
    console.error(`Unexpected error while logging ${eventType}:`, error);
  }
}

// 🔹 Helper: Checks user's plan status and redirects based on the result
export async function checkUserPlanStatus(
  session: any,
  router: any,
  onError?: (message: string) => void
): Promise<boolean> {
  const endpoint = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${endpoint}/api/plans/status`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      onError?.("Unable to verify plan status. Please sign in again.");
      router.push("/auth");
      return false;
    }

    const { hasPlan } = await response.json();

    if (hasPlan) {
      router.push("/savings");
    }
    return hasPlan;
  } catch (err) {
    console.error("Error checking plan:", err);
    onError?.("Something went wrong while checking your plan.");
    router.push("/auth");
    return false;
  }
}
