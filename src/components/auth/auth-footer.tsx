import { Link, type Href } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";

type AuthFooterProps = {
  prompt: string;
  linkText: string;
  href: Href;
  dismissTo?: boolean;
};

export function AuthFooter({ prompt, linkText, href, dismissTo }: AuthFooterProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.prompt}>{prompt} </Text>
      <Link href={href} dismissTo={dismissTo} asChild>
        <Pressable hitSlop={8} accessibilityRole="link">
          <Text style={styles.link}>{linkText}</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 32,
  },
  prompt: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.muted,
  },
  link: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.plum,
  },
});
