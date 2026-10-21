import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";

export const CELL_HEIGHT = 50;

type MonthGridProps = {
  year: number;
  month: number;
  onPressDay?: (date: Date) => void;
};

export function MonthGrid({ year, month, onPressDay }: MonthGridProps) {
  const leadingBlanks = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = Array.from({ length: cells.length / 7 }, (_, i) =>
    cells.slice(i * 7, i * 7 + 7),
  );

  return (
    <View>
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.week}>
          {week.map((day, dayIndex) =>
            day === null ? (
              <View key={dayIndex} style={styles.cell} />
            ) : (
              <Pressable
                key={dayIndex}
                style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
                onPress={() => onPressDay?.(new Date(year, month, day))}
                accessibilityRole="button"
                accessibilityLabel={new Date(year, month, day).toDateString()}
              >
                <Text style={styles.day}>{day}</Text>
              </Pressable>
            ),
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  week: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    height: CELL_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: Colors.searchPlaceholder,
  },
  pressed: {
    opacity: 0.5,
  },
});
