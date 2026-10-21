import { useState, type FC } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import Svg, { Circle, Path, type SvgProps } from "react-native-svg";

import EyeOffIcon from "@/assets/images/icons/eye-off.svg";
import { Colors, Fonts } from "@/constants/theme";

const ICON_SIZE = 24;

type AccountInputProps = TextInputProps & {
  icon: FC<SvgProps>;
  secure?: boolean;
};

export function AccountInput({ icon: Icon, secure, style, ...inputProps }: AccountInputProps) {
  const [showText, setShowText] = useState(false);

  return (
    <View style={styles.row}>
      <Icon width={ICON_SIZE} height={ICON_SIZE} />
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={Colors.searchPlaceholder}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secure && !showText}
        {...inputProps}
      />
      {secure && (
        <Pressable
          onPress={() => setShowText((prev) => !prev)}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={showText ? "Hide password" : "Show password"}
        >
          {showText ? <EyeIcon /> : <EyeOffIcon width={ICON_SIZE} height={ICON_SIZE} />}
        </Pressable>
      )}
    </View>
  );
}

function EyeIcon() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
        stroke={Colors.searchPlaceholder}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={12}
        cy={12}
        r={3}
        stroke={Colors.searchPlaceholder}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    borderRadius: 50,
    backgroundColor: Colors.white,
    paddingLeft: 25,
    paddingRight: 24,
    gap: 16,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: "#2B2B2B",
  },
});
