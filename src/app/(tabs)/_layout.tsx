import { router, Tabs } from "expo-router";
import { useEffect, useState } from "react";

import { TabBar } from "@/components/home/tab-bar";
import { Colors } from "@/constants/theme";
import { supabase } from "@/lib/supabase";

export default function TabsLayout() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setAllowed(true);
    });

    return () => {
      active = false;
    };
  }, []);

  if (!allowed) return null;

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: Colors.cream },
      }}
      tabBar={() => <TabBar />}
    />
  );
}
