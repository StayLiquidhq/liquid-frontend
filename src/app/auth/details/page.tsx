"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const AuthDetailsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, [supabase]);

  return (
    <div className="bg-[#1A1A1A] min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-medium mb-4">Auth Details</h1>
      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default AuthDetailsPage;
