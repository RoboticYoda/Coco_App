import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { storeImageUrl } from "@/lib/stores";

type StorePhotoProps = {
  path: string | null;
  label: string;
};

export function StoreCover({ path }: { path: string | null }) {
  if (!path) return null;

  return (
    <Image
      source={{ uri: storeImageUrl(path) }}
      style={styles.cover}
      contentFit="cover"
      transition={200}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}

export function StorePhoto({ path, label }: StorePhotoProps) {
  if (!path) {
    return (
      <View style={styles.photo} accessibilityLabel={label}>
        <Text style={styles.placeholderText}>store uploaded images</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: storeImageUrl(path) }}
      style={styles.photo}
      contentFit="cover"
      transition={200}
      accessibilityLabel={label}
    />
  );
}

const styles = StyleSheet.create({
  photo: {
    width: 144,
    height: 197,
    borderRadius: 10,
    backgroundColor: Colors.cardPlaceholder,
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  placeholderText: {
    width: 95,
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: Colors.black,
    textAlign: "center",
  },
});
