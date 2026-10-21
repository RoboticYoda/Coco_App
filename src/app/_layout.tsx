import { Kalnia_500Medium } from "@expo-google-fonts/kalnia";
import {
  PlayfairDisplay_700Bold,
  useFonts,
} from "@expo-google-fonts/playfair-display";
import { Questrial_400Regular } from "@expo-google-fonts/questrial";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { LoadingScreen } from "@/components/loading-screen";
import { Colors } from "@/constants/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
});

const MIN_LOADING_MS = 1500;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlayfairDisplay_700Bold,
    Kalnia_500Medium,
    Questrial_400Regular,
  });
  const fontsReady = loaded || !!error;
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!fontsReady) return;
    SplashScreen.hide();
    const timer = setTimeout(() => setShowLoading(false), MIN_LOADING_MS);
    return () => clearTimeout(timer);
  }, [fontsReady]);

  if (!fontsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1, backgroundColor: Colors.cream }}>
        <Stack screenOptions={{ headerShown: false }} />
        {showLoading && <LoadingScreen />}
      </View>
    </QueryClientProvider>
  );
}
