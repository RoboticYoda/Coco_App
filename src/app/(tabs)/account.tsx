import { StatusBar } from "expo-status-bar";
import { useState, type FC } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { SvgProps } from "react-native-svg";

import AvatarPlaceholder from "@/assets/images/icons/avatar-placeholder.svg";
import CircleQuestionMarkIcon from "@/assets/images/icons/circle-question-mark.svg";
import Clock3Icon from "@/assets/images/icons/clock-3.svg";
import DividerLine from "@/assets/images/icons/divider-line.svg";
import GlobeIcon from "@/assets/images/icons/globe.svg";
import HeartIcon from "@/assets/images/icons/heart.svg";
import LockKeyholeIcon from "@/assets/images/icons/lock-keyhole.svg";
import MailIcon from "@/assets/images/icons/mail.svg";
import MapPinIcon from "@/assets/images/icons/map-pin.svg";
import UserIcon from "@/assets/images/icons/user.svg";
import { AccountInput } from "@/components/account/account-input";
import { HeaderActions } from "@/components/header-actions";
import { TAB_BAR_HEIGHT } from "@/components/home/tab-bar";
import { Colors, Fonts } from "@/constants/theme";
import { useProfile } from "@/hooks/use-profile";

type MenuItem = { label: string; Icon: FC<SvgProps>; size: number };

const MENU_ITEMS: MenuItem[] = [
  { label: "Favorites", Icon: HeartIcon, size: 26.4 },
  { label: "Change Location", Icon: MapPinIcon, size: 29.04 },
  { label: "Language", Icon: GlobeIcon, size: 26.4 },
  { label: "Search History", Icon: Clock3Icon, size: 26.4 },
  { label: "Contact Us / Help", Icon: CircleQuestionMarkIcon, size: 26.4 },
];

export default function AccountScreen() {
  const insets = useSafeAreaInsets();

  const { name, email } = useProfile();
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 8,
          paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 48,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topRow}>
          <Text style={styles.logo}>coco</Text>
          <HeaderActions tone="dark" />
        </View>

        <View style={styles.profile}>
          <AvatarPlaceholder width={115} height={115} />
          <Text style={styles.name}>{name || "Your Name"}</Text>
          {email ? <Text style={styles.email}>{email}</Text> : null}
          <Pressable
            style={({ pressed }) => [styles.editPicture, pressed && styles.pressed]}
            accessibilityRole="button"
          >
            <Text style={styles.editPictureText}>Edit Picture</Text>
          </Pressable>
        </View>

        <View style={styles.menu}>
          {MENU_ITEMS.map(({ label, Icon, size }) => (
            <Pressable
              key={label}
              style={({ pressed }) => [styles.menuRow, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <View style={styles.menuIconBox}>
                <Icon width={size} height={size} />
              </View>
              <Text style={styles.menuLabel}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <DividerLine width={348} height={2} style={styles.divider} />

        <View style={styles.fields}>
          <AccountInput
            icon={UserIcon}
            placeholder="New Username"
            value={newUsername}
            onChangeText={setNewUsername}
            autoComplete="username"
            textContentType="username"
          />
          <AccountInput
            icon={MailIcon}
            placeholder="New Email"
            value={newEmail}
            onChangeText={setNewEmail}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
          />
          <AccountInput
            icon={LockKeyholeIcon}
            secure
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            autoComplete="new-password"
            textContentType="newPassword"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 31,
  },
  logo: {
    fontFamily: Fonts.brand,
    fontSize: 25,
    lineHeight: 32,
    letterSpacing: -0.25,
    color: Colors.plum,
  },
  profile: {
    alignItems: "center",
    marginTop: 49,
  },
  name: {
    marginTop: 14,
    fontFamily: Fonts.body,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
    color: Colors.plum,
  },
  email: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.12,
    color: Colors.plum,
  },
  editPicture: {
    marginTop: 9,
    width: 95,
    height: 35,
    borderRadius: 30,
    backgroundColor: Colors.plum,
    alignItems: "center",
    justifyContent: "center",
  },
  editPictureText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    letterSpacing: -0.12,
    color: Colors.white,
  },
  menu: {
    marginTop: 20,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingLeft: 29,
    gap: 20,
  },
  menuIconBox: {
    width: 29.04,
    alignItems: "center",
  },
  menuLabel: {
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: Colors.plum,
  },
  divider: {
    alignSelf: "center",
    marginTop: 13,
  },
  fields: {
    marginTop: 22,
    marginHorizontal: 26,
    gap: 22,
  },
  pressed: {
    opacity: 0.8,
  },
});
