import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DiscoverSearch } from "@/components/discover/discover-search";
import { OutfitPhoto } from "@/components/discover/outfit-photo";
import { TAB_BAR_HEIGHT } from "@/components/home/tab-bar";
import { ScreenTopBar } from "@/components/screen-top-bar";
import { Colors, Fonts } from "@/constants/theme";
import { useOutfitPhotos } from "@/hooks/use-outfit-photos";
import { type OutfitPhoto as OutfitPhotoItem } from "@/lib/outfits";

const LEFT_COLUMN = [1, 2, 3];
const RIGHT_COLUMN = [4, 5, 6];

function splitColumns(photos: OutfitPhotoItem[]) {
  const left: OutfitPhotoItem[] = [];
  const right: OutfitPhotoItem[] = [];
  photos.forEach((photo, index) => {
    (index % 2 === 0 ? left : right).push(photo);
  });
  return { left, right };
}

function OutfitTile({ path }: { path: string }) {
  return (
    <Pressable
      onPress={() => {}}
      accessibilityRole="button"
      accessibilityLabel="Outfit"
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <OutfitPhoto path={path} />
    </Pressable>
  );
}

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const { data: photos } = useOutfitPhotos();
  const columns = photos && photos.length > 0 ? splitColumns(photos) : null;

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="light" />
      <ScreenTopBar />
      <Text style={styles.title}>Discover your style!</Text>

      <View style={styles.cardShadow}>
        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={[
              styles.grid,
              { paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 48 },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.column}>
              {columns
                ? columns.left.map((photo) => (
                    <OutfitTile key={photo.id} path={photo.path} />
                  ))
                : LEFT_COLUMN.map((id) => <View key={id} style={styles.tile} />)}
            </View>
            <View style={[styles.column, styles.offsetColumn]}>
              {columns
                ? columns.right.map((photo) => (
                    <OutfitTile key={photo.id} path={photo.path} />
                  ))
                : RIGHT_COLUMN.map((id) => <View key={id} style={styles.tile} />)}
            </View>
          </ScrollView>

          <DiscoverSearch />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.plum,
  },
  title: {
    marginTop: 37,
    fontFamily: Fonts.brand,
    fontSize: 32,
    lineHeight: 41,
    letterSpacing: -0.32,
    color: Colors.white,
    textAlign: "center",
  },
  cardShadow: {
    flex: 1,
    marginTop: 29,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  },
  card: {
    flex: 1,
    overflow: "hidden",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: Colors.cream,
  },
  grid: {
    flexDirection: "row",
    gap: 24,
    paddingTop: 24,
    paddingLeft: 25,
    paddingRight: 21,
  },
  column: {
    flex: 1,
    gap: 25,
  },
  offsetColumn: {
    paddingTop: 68,
  },
  tile: {
    aspectRatio: 166 / 207,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: Colors.cardPlaceholder,
  },
  pressed: {
    opacity: 0.8,
  },
});
