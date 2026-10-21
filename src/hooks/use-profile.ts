import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export function useProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      if (!user) return;
      setName(user.user_metadata?.username ?? "");
      setEmail(user.email ?? "");
    });
  }, []);

  return { name, email };
}
