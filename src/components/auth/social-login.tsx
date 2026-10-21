import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppleIcon, FacebookIcon, GoogleIcon } from "@/components/social-icons";
import { Colors, Fonts } from "@/constants/theme";

type SocialLoginProps = {
  label: string;
};

export function SocialLogin({ label }: SocialLoginProps) {
  return (
    <>
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>{label}</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialRow}>
        <SocialButton label="Continue with Apple">
          <AppleIcon size={24} />
        </SocialButton>
        <SocialButton label="Continue with Google">
          <GoogleIcon size={24} />
        </SocialButton>
        <SocialButton label="Continue with Facebook">
          <FacebookIcon size={28} />
        </SocialButton>
      </View>
    </>
  );
}

function SocialButton({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.divider,
  },
  dividerText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.muted,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginTop: 24,
  },
  socialButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.8,
  },
});
