import { Pressable, StyleSheet, Text } from "react-native";

import { Colors, Fonts } from "@/constants/theme";

type PrimaryButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ title, onPress, disabled }: PrimaryButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, (pressed || disabled) && styles.pressed]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.plum,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 36,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontFamily: Fonts.display,
    fontSize: 24,
    color: Colors.white,
  },
});
