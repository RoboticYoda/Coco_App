import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { Colors, Fonts } from "@/constants/theme";

export function LoadingScreen() {
  return (
    <Animated.View style={styles.container} exiting={FadeOut.duration(400)}>
      <StatusBar style="dark" />
      <Animated.Text style={styles.logo} entering={FadeIn.duration(500)}>
        coco
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontFamily: Fonts.display,
    fontSize: 48,
    color: Colors.plum,
  },
});
