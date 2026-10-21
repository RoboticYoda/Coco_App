import { router } from "expo-router";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import BellRingCreamIcon from "@/assets/images/icons/bell-ring-cream.svg";
import BellRingIcon from "@/assets/images/icons/bell-ring.svg";
import CalendarDaysCreamIcon from "@/assets/images/icons/calendar-days-cream.svg";
import CalendarDaysIcon from "@/assets/images/icons/calendar-days.svg";

const ICON_SIZE = 26.4;

const ICONS = {
  light: { Calendar: CalendarDaysCreamIcon, Bell: BellRingCreamIcon },
  dark: { Calendar: CalendarDaysIcon, Bell: BellRingIcon },
};

type HeaderActionsProps = {
  tone?: "light" | "dark";
  style?: StyleProp<ViewStyle>;
};

export function HeaderActions({ tone = "dark", style }: HeaderActionsProps) {
  const { Calendar, Bell } = ICONS[tone];

  return (
    <View style={[styles.row, style]}>
      <Pressable
        onPress={() => router.navigate("/calendar")}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Calendar"
      >
        <Calendar width={ICON_SIZE} height={ICON_SIZE} />
      </Pressable>
      <Pressable
        onPress={() => router.navigate("/notifications")}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
      >
        <Bell width={ICON_SIZE} height={ICON_SIZE} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12.6,
  },
});
