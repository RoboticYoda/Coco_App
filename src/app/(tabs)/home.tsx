import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SearchIcon from "@/assets/images/icons/search.svg";
import { HeaderActions } from "@/components/header-actions";
import { FeaturedStorePhoto } from "@/components/home/featured-store";
import { TAB_BAR_HEIGHT } from "@/components/home/tab-bar";
import { TrendingPiecePhoto } from "@/components/home/trending-piece";
import { StoreCover } from "@/components/store/store-photo";
import { Colors, Fonts } from "@/constants/theme";
import { useFeaturedStore } from "@/hooks/use-featured-store";
import { useStores } from "@/hooks/use-stores";
import { useTrendingPieces } from "@/hooks/use-trending-pieces";
import { openStore } from "@/lib/navigation";
import { storeCoverPath } from "@/lib/stores";

const FILTERS = ["Nearby", "Trending", "Friends"];
const TRENDING_PLACEHOLDERS = [1, 2, 3, 4];
const SHOP_PLACEHOLDERS = [1, 2, 3, 4, 5];
const FEATURED_HEIGHT = 199;
const FEATURED_OVERLAP = 146;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data: stores } = useStores();
  const { data: trendingPieces } = useTrendingPieces();
  const { data: featuredStore } = useFeaturedStore();

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 48,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <View style={styles.headerOverscroll} />
          <View style={styles.topRow}>
            <Text style={styles.logo}>coco</Text>
            <HeaderActions tone="light" />
          </View>

          <View style={styles.searchBar}>
            <SearchIcon width={24} height={24} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by location or category"
              placeholderTextColor={Colors.searchPlaceholder}
              returnKeyType="search"
              autoCorrect={false}
            />
          </View>

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
        </View>

        {featuredStore ? (
          <Pressable
            onPress={() => openStore(featuredStore.storeId)}
            accessibilityRole="button"
            accessibilityLabel={featuredStore.storeName}
            style={({ pressed }) => [styles.featuredCard, pressed && styles.pressed]}
          >
            <FeaturedStorePhoto path={featuredStore.path} />
          </Pressable>
        ) : (
          <View style={styles.featuredCard}>
            <Text style={styles.featuredText}>Featured store of the week?</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Trending Pieces</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.cardRow, { gap: 14 }]}
        >
          {trendingPieces && trendingPieces.length > 0
            ? trendingPieces.map((piece) => (
                <View key={piece.id} style={styles.trendingCard}>
                  <TrendingPiecePhoto path={piece.path} />
                </View>
              ))
            : TRENDING_PLACEHOLDERS.map((id) => (
                <View key={id} style={styles.trendingCard} />
              ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Shops Near You</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.cardRow, { gap: 13 }]}
        >
          {stores && stores.length > 0
            ? stores.map((store) => (
                <Pressable
                  key={store.id}
                  onPress={() => openStore(store.id)}
                  accessibilityRole="button"
                  accessibilityLabel={store.name}
                  style={({ pressed }) => [styles.shopCard, pressed && styles.pressed]}
                >
                  <StoreCover path={storeCoverPath(store.images)} />
                </Pressable>
              ))
            : SHOP_PLACEHOLDERS.map((id) => <View key={id} style={styles.shopCard} />)}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    backgroundColor: Colors.plum,
    paddingHorizontal: 25,
    paddingBottom: 16 + FEATURED_OVERLAP,
  },
  headerOverscroll: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "100%",
    height: 1000,
    backgroundColor: Colors.plum,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 6,
  },
  logo: {
    fontFamily: Fonts.brand,
    fontSize: 25,
    lineHeight: 32,
    letterSpacing: -0.25,
    color: Colors.cream,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    borderRadius: 50,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    gap: 13,
    marginTop: 11,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: "#2B2B2B",
  },
  filterRow: {
    flexDirection: "row",
    gap: 10.5,
    marginTop: 16,
  },
  filterPill: {
    flex: 1,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  filterText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: Colors.plum,
  },
  featuredCard: {
    height: FEATURED_HEIGHT,
    marginTop: -FEATURED_OVERLAP,
    marginHorizontal: 25,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.featuredPlaceholder,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: Colors.black,
  },
  sectionTitle: {
    fontFamily: Fonts.brand,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.22,
    color: Colors.plum,
    marginTop: 26,
    marginBottom: 16,
    marginHorizontal: 25,
  },
  cardRow: {
    paddingHorizontal: 25,
  },
  trendingCard: {
    width: 145,
    height: 181,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.cardPlaceholder,
  },
  shopCard: {
    width: 131,
    height: 149,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.cardPlaceholder,
  },
  pressed: {
    opacity: 0.8,
  },
});
