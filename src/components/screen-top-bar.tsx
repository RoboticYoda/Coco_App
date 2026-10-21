import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import ChevronLeftPlumIcon from "@/assets/images/icons/chevron-left-plum.svg";
import ChevronLeftIcon from "@/assets/images/icons/chevron-left.svg";
import { Colors, Fonts } from "@/constants/theme";

const BACK_ICON_SIZE = 28.8;

type ScreenTopBarProps = {
  title?: string;
  tone?: "light" | "dark";
  onBack?: () => void;
};

export function ScreenTopBar({ title, tone = "light", onBack }: ScreenTopBarProps) {
  const dark = tone === "dark";
  const BackIcon = dark ? ChevronLeftPlumIcon : ChevronLeftIcon;

  return (
    <View style={styles.row}>
      <View style={styles.titleGroup}>
        <Pressable
          onPress={onBack ?? (() => router.navigate("/home"))}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <BackIcon width={BACK_ICON_SIZE} height={BACK_ICON_SIZE} />
        </Pressable>
        {title ? (
          <Text style={[styles.title, dark && styles.darkText]}>{title}</Text>
        ) : null}
      </View>
      <Text style={[styles.logo, dark && styles.darkText]}>coco</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 29,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11.2,
  },
  title: {
    fontFamily: Fonts.brand,
    fontSize: 25,
    lineHeight: 32,
    letterSpacing: -0.25,
    color: Colors.white,
  },
  logo: {
    fontFamily: Fonts.brand,
    fontSize: 25,
    lineHeight: 32,
    letterSpacing: -0.25,
    color: Colors.cream,
  },
  darkText: {
    color: Colors.plum,
  },
});
