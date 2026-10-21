import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { trendingPieceImageUrl } from "@/lib/trending-pieces";

export function TrendingPiecePhoto({ path }: { path: string }) {
  return (
    <Image
      source={{ uri: trendingPieceImageUrl(path) }}
      style={styles.photo}
      contentFit="cover"
      transition={200}
      accessibilityLabel="Trending piece"
    />
  );
}

const styles = StyleSheet.create({
  photo: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
