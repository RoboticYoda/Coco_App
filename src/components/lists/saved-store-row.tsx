import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { StoreCover } from "@/components/store/store-photo";
import { Colors, Fonts } from "@/constants/theme";

export type SavedStore = {
  id: string;
  name: string;
  categories: string[];
  styles: string[];
  coverPath: string | null;
};

export function SavedStoreRow({
  store,
  onPress,
}: {
  store: SavedStore;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={store.name}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.thumbnail}>
        <StoreCover path={store.coverPath} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{store.name}</Text>
        <TagRow label="Categories" tags={store.categories} />
        <TagRow label="Style" tags={store.styles} style={styles.styleRow} />
      </View>
    </Pressable>
  );
}

function TagRow({
  label,
  tags,
  style,
}: {
  label: string;
  tags: string[];
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.tagRow, style]}>
      <Text style={styles.tagLabel}>{label}</Text>
      {tags.map((tag) => (
        <View key={tag} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 22,
    paddingBottom: 26,
    gap: 9,
  },
  thumbnail: {
    width: 69,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.cardPlaceholder,
  },
  details: {
    flex: 1,
  },
  name: {
    fontFamily: Fonts.brand,
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.2,
    color: Colors.plum,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 4,
    rowGap: 2,
  },
  styleRow: {
    marginTop: 2,
  },
  tagLabel: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 25,
    letterSpacing: -0.14,
    color: Colors.plum,
  },
  tag: {
    height: 20,
    borderRadius: 50,
    backgroundColor: Colors.plum,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  tagText: {
    fontFamily: Fonts.body,
    fontSize: 11,
    letterSpacing: -0.11,
    color: Colors.white,
  },
  pressed: {
    opacity: 0.8,
  },
});
