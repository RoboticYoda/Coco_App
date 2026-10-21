import { SymbolView, type SymbolViewProps } from "expo-symbols";
import light from "expo-symbols/androidWeights/light";
import { useState, type Ref } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { Colors, Fonts } from "@/constants/theme";

const ICON_WEIGHT = { ios: "light", android: light } as const;

type AuthInputProps = TextInputProps & {
  icon: SymbolViewProps["name"];
  secure?: boolean;
  ref?: Ref<TextInput>;
};

export function AuthInput({ icon, secure, style, ...inputProps }: AuthInputProps) {
  const [showText, setShowText] = useState(false);

  return (
    <View style={styles.row}>
      <SymbolView
        name={icon}
        weight={ICON_WEIGHT}
        tintColor={Colors.icon}
        size={22}
      />
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={Colors.placeholder}
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
          <SymbolView
            name={
              showText
                ? { ios: "eye", android: "visibility", web: "visibility" }
                : {
                    ios: "eye.slash",
                    android: "visibility_off",
                    web: "visibility_off",
                  }
            }
            weight={ICON_WEIGHT}
            tintColor={Colors.icon}
            size={22}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    marginTop: 16,
    gap: 14,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: Fonts.body,
    fontSize: 16,
    color: "#2B2B2B",
  },
});
