import { StatusBar } from "expo-status-bar";
import { Fragment, useState, type FC } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { SvgProps } from "react-native-svg";

import LineStyleWhiteIcon from "@/assets/images/icons/line-style-white.svg";
import PlusSmallWhiteIcon from "@/assets/images/icons/plus-small-white.svg";
import SearchWhiteIcon from "@/assets/images/icons/search-white.svg";
import { CELL_HEIGHT, MonthGrid } from "@/components/calendar/month-grid";
import { TAB_BAR_HEIGHT } from "@/components/home/tab-bar";
import { ScreenTopBar } from "@/components/screen-top-bar";
import { Colors, Fonts } from "@/constants/theme";
import { goBack } from "@/lib/navigation";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS_TO_SHOW = 12;

const TOOL_ICON_SIZE = 24;

const TOOLS: { label: string; Icon: FC<SvgProps> }[] = [
  { label: "Search events", Icon: SearchWhiteIcon },
  { label: "Add event", Icon: PlusSmallWhiteIcon },
  { label: "Change view", Icon: LineStyleWhiteIcon },
];

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const [today] = useState(() => new Date());

  const months = Array.from({ length: MONTHS_TO_SHOW }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
    return { year: date.getFullYear(), month: date.getMonth() };
  });
  const [first, ...rest] = months;

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="light" />
      <ScreenTopBar title="Calendar" onBack={goBack} />

      <View style={styles.tools}>
        {TOOLS.map(({ label, Icon }) => (
          <Pressable
            key={label}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel={label}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Icon width={TOOL_ICON_SIZE} height={TOOL_ICON_SIZE} />
          </Pressable>
        ))}
      </View>

      <View style={styles.cardShadow}>
        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={[
              styles.content,
              { paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 48 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>{MONTH_NAMES[first.month]}</Text>
              <Text style={styles.headerText}>{first.year}</Text>
            </View>

            <View style={styles.weekdays}>
              {WEEKDAYS.map((day, index) => (
                <Text key={index} style={styles.weekday}>
                  {day}
                </Text>
              ))}
            </View>

            <MonthGrid year={first.year} month={first.month} />

            {rest.map(({ year, month }) => (
              <Fragment key={`${year}-${month}`}>
                <Text style={styles.monthTitle}>
                  {MONTH_NAMES[month]}
                  {year !== first.year ? ` ${year}` : ""}
                </Text>
                <MonthGrid year={year} month={month} />
              </Fragment>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.plum,
  },
  tools: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 11,
    marginTop: 25,
    paddingRight: 24,
  },
  cardShadow: {
    flex: 1,
    marginTop: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  },
  card: {
    flex: 1,
    overflow: "hidden",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: Colors.cream,
  },
  content: {
    paddingTop: 17,
    paddingHorizontal: 25.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 1.5,
    paddingRight: 8.5,
  },
  headerText: {
    fontFamily: Fonts.brand,
    fontSize: 32,
    lineHeight: 41,
    letterSpacing: -0.32,
    color: Colors.plum,
  },
  weekdays: {
    flexDirection: "row",
    height: CELL_HEIGHT,
    alignItems: "center",
    marginTop: 18.5,
    marginBottom: 2,
  },
  weekday: {
    flex: 1,
    textAlign: "center",
    fontFamily: Fonts.body,
    fontSize: 11,
    letterSpacing: -0.11,
    color: Colors.searchPlaceholder,
  },
  monthTitle: {
    marginTop: 24,
    marginBottom: 2,
    paddingLeft: 1.5,
    fontFamily: Fonts.brand,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
    color: Colors.plum,
  },
  pressed: {
    opacity: 0.7,
  },
});
