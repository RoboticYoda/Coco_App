import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { outfitImageUrl } from "@/lib/outfits";

export function OutfitPhoto({ path }: { path: string }) {
  return (
    <Image
      source={{ uri: outfitImageUrl(path) }}
      style={styles.photo}
      contentFit="cover"
      transition={200}
      accessibilityElementsHidden
      importantForAccessibility="no"
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
