import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ArrowUpDownIcon from "@/assets/images/icons/arrow-up-down.svg";
import AvatarPlaceholder from "@/assets/images/icons/avatar-placeholder.svg";
import ListDivider from "@/assets/images/icons/list-divider.svg";
import SearchSmallIcon from "@/assets/images/icons/search-small.svg";
import { TAB_BAR_HEIGHT } from "@/components/home/tab-bar";
import { SavedStoreRow } from "@/components/lists/saved-store-row";
import { ScreenTopBar } from "@/components/screen-top-bar";
import { Colors, Fonts } from "@/constants/theme";
import { useProfile } from "@/hooks/use-profile";
import { useSavedStores } from "@/hooks/use-saved-stores";
import { openStore } from "@/lib/navigation";

const STATS = [
  { label: "Followers", value: 0 },
  { label: "Following", value: 0 },
  { label: "Friends", value: 0 },
];

const FILTERS = ["City", "Open", "Price"];
const TOP_ROW_SPACE = 56;
const SMALL_ICON_SIZE = 13.5;

export default function MyListsScreen() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const { name, email } = useProfile();
  const { data: savedStores, isLoading, isError } = useSavedStores();
  const cardMinHeight = windowHeight - insets.top - TOP_ROW_SPACE;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 8 }}
        showsVerticalScrollIndicator={false}
        overScrollMode="always"
      >
        <ScreenTopBar title="My List" />

        <View style={styles.profile}>
          <AvatarPlaceholder width={115} height={115} />
          <Text style={styles.name}>{name || "Your Name"}</Text>
          {email ? <Text style={styles.email}>{email}</Text> : null}

          <View style={styles.stats}>
            {STATS.map((stat) => (
              <View key={stat.label} style={styles.stat}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.profileButtons}>
            <Pressable
              style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <Text style={styles.profileButtonText}>Edit Profile</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <Text style={styles.profileButtonText}>Share Profile</Text>
            </Pressable>
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              minHeight: cardMinHeight,
              paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 48,
            },
          ]}
        >
          <View style={styles.filterRow}>
            {FILTERS.map((filter) => (
              <Pressable
                key={filter}
                style={({ pressed }) => [styles.filterPill, pressed && styles.pressed]}
                accessibilityRole="button"
              >
                <Text style={styles.filterText}>{filter}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.sortRow}>
            <Pressable style={styles.sortButton} hitSlop={8} accessibilityRole="button">
              <ArrowUpDownIcon width={SMALL_ICON_SIZE} height={SMALL_ICON_SIZE} />
              <Text style={styles.sortText}>Rating</Text>
            </Pressable>
            <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="Search list">
              <SearchSmallIcon width={SMALL_ICON_SIZE} height={SMALL_ICON_SIZE} />
            </Pressable>
          </View>

          {isError ? (
            <Text style={styles.empty}>Your list could not be loaded.</Text>
          ) : savedStores && savedStores.length > 0 ? (
            savedStores.map((store) => (
              <Fragment key={store.id}>
                <SavedStoreRow store={store} onPress={() => openStore(store.id)} />
                <ListDivider width={353.6} height={1.2} style={styles.divider} />
              </Fragment>
            ))
          ) : !isLoading ? (
            <Text style={styles.empty}>Stores you heart will show up here.</Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.plum,
  },
  profile: {
    alignItems: "center",
    marginTop: 36,
  },
  name: {
    marginTop: 15,
    fontFamily: Fonts.body,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
    color: Colors.cream,
  },
  email: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.12,
    color: Colors.cream,
  },
  stats: {
    flexDirection: "row",
    marginTop: 18,
  },
  stat: {
    width: 88,
    alignItems: "center",
  },
  statValue: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: Colors.cream,
  },
  statLabel: {
    marginTop: 2,
    fontFamily: Fonts.body,
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: -0.1,
    color: Colors.cream,
  },
  profileButtons: {
    flexDirection: "row",
    gap: 7,
    marginTop: 17,
  },
  profileButton: {
    width: 102,
    height: 35,
    borderRadius: 30,
    backgroundColor: Colors.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  profileButtonText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    letterSpacing: -0.12,
    color: Colors.plum,
  },
  card: {
    marginTop: 20,
    backgroundColor: Colors.cream,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  filterRow: {
    flexDirection: "row",
    gap: 10.5,
  },
  filterPill: {
    flex: 1,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.plum,
    alignItems: "center",
    justifyContent: "center",
  },
  filterText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: Colors.white,
  },
  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingLeft: 3,
    paddingRight: 4.5,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5.5,
  },
  sortText: {
    fontFamily: Fonts.body,
    fontSize: 11,
    letterSpacing: -0.11,
    color: Colors.plum,
  },
  divider: {
    alignSelf: "center",
  },
  empty: {
    marginTop: 28,
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: Colors.plum,
  },
  pressed: {
    opacity: 0.8,
  },
});
