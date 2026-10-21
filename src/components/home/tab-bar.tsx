import { router, usePathname, type Href } from "expo-router";
import type { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { SvgProps } from "react-native-svg";

import CircleUserIcon from "@/assets/images/icons/circle-user.svg";
import HouseIcon from "@/assets/images/icons/house.svg";
import ListIcon from "@/assets/images/icons/list.svg";
import PlusButtonCircle from "@/assets/images/icons/plus-button-circle.svg";
import PlusIcon from "@/assets/images/icons/plus.svg";
import ShirtIcon from "@/assets/images/icons/shirt.svg";
import { Colors, Fonts } from "@/constants/theme";

export const TAB_BAR_HEIGHT = 72;
const ICON_SIZE = 25.92;
const PLUS_BUTTON_SIZE = 52;
const PLUS_ICON_SIZE = 31.68;

export type TabName = "home" | "discover" | "lists" | "account";

type Tab = { name: TabName; label: string; Icon: FC<SvgProps>; href?: Href };

const LEFT_TABS: Tab[] = [
  { name: "home", label: "Home", Icon: HouseIcon, href: "/home" },
  { name: "discover", label: "Discover", Icon: ShirtIcon, href: "/discover" },
];

const RIGHT_TABS: Tab[] = [
  { name: "lists", label: "My Lists", Icon: ListIcon, href: "/my-lists" },
  { name: "account", label: "Account", Icon: CircleUserIcon, href: "/account" },
];

export function TabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const renderTab = ({ name, label, Icon, href }: Tab) => (
    <Pressable
      key={name}
      style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
      onPress={() => {
        if (href) router.navigate(href);
      }}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: pathname === href }}
    >
      <Icon width={ICON_SIZE} height={ICON_SIZE} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );

  return (
    <View
      style={[styles.bar, { height: TAB_BAR_HEIGHT + insets.bottom }]}
      accessibilityRole="tablist"
    >
      {LEFT_TABS.map(renderTab)}
      <View style={styles.tab}>
        <Pressable
          style={({ pressed }) => [styles.plusButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Add"
        >
          <PlusButtonCircle width={PLUS_BUTTON_SIZE} height={PLUS_BUTTON_SIZE} />
          <PlusIcon width={PLUS_ICON_SIZE} height={PLUS_ICON_SIZE} style={styles.plusIcon} />
        </Pressable>
      </View>
      {RIGHT_TABS.map(renderTab)}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    marginTop: 6,
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.plum,
  },
  plusButton: {
    position: "absolute",
    top: -35,
    width: PLUS_BUTTON_SIZE,
    height: PLUS_BUTTON_SIZE,
  },
  plusIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  pressed: {
    opacity: 0.8,
  },
});
