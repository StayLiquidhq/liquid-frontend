import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
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
  }, [supabase, router]);

  return { user, loading };
};
