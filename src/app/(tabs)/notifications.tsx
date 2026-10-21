import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BellRingLargeIcon from "@/assets/images/icons/bell-ring-large.svg";
import { ScreenTopBar } from "@/components/screen-top-bar";
import { Colors, Fonts } from "@/constants/theme";
import { goBack } from "@/lib/navigation";

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <ScreenTopBar title="Notifications" tone="dark" onBack={goBack} />

      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.emptyState}>
          <BellRingLargeIcon width={81} height={81} />
          <View style={styles.message}>
            <Text style={styles.heading}>{"You're all caught up!"}</Text>
            <Text style={styles.body}>{"You don't have new notifications"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    position: "absolute",
    top: "50%",
    marginTop: 52,
    alignItems: "center",
  },
  heading: {
    fontFamily: Fonts.brand,
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.14,
    color: Colors.plum,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.14,
    color: Colors.plum,
  },
});
