import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function Index() {
  const [href, setHref] = useState<"/home" | "/login" | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setHref(data.session ? "/home" : "/login");
    });
  }, []);

  if (!href) return null;

  return <Redirect href={href} />;
}
