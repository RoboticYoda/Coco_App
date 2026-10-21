import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import { type FC } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { SvgProps } from "react-native-svg";

import CalendarDaysIcon from "@/assets/images/icons/calendar-days.svg";
import CameraIcon from "@/assets/images/icons/camera.svg";
import ChevronLeftSmallIcon from "@/assets/images/icons/chevron-left-small.svg";
import HeartWhiteFilledIcon from "@/assets/images/icons/heart-white-filled.svg";
import HeartWhiteIcon from "@/assets/images/icons/heart-white.svg";
import MapIcon from "@/assets/images/icons/map.svg";
import NotebookPenIcon from "@/assets/images/icons/notebook-pen.svg";
import UserGroupIcon from "@/assets/images/icons/user-group.svg";
import { TAB_BAR_HEIGHT } from "@/components/home/tab-bar";
import { ScreenTopBar } from "@/components/screen-top-bar";
import { StorePhoto } from "@/components/store/store-photo";
import { Colors, Fonts } from "@/constants/theme";
import { useSavedStores, useToggleSavedStore } from "@/hooks/use-saved-stores";
import { useStore } from "@/hooks/use-stores";
import { goBack } from "@/lib/navigation";
import { formatStorePlace, storeCoverPath, type StoreImage } from "@/lib/stores";

const PHOTO_PLACEHOLDERS: StoreImage[] = [0, 1, 2].map((position) => ({
  id: `placeholder-${position}`,
  path: null,
  position,
}));

const REVIEW_PLACEHOLDERS = [0, 1, 2];

const ACTIONS: { label: string; Icon: FC<SvgProps> }[] = [
  { label: "Add photos", Icon: CameraIcon },
  { label: "Add notes", Icon: NotebookPenIcon },
  { label: "Add visit date", Icon: CalendarDaysIcon },
  { label: "Tag friends", Icon: UserGroupIcon },
];

const ACTION_ICON_SIZE = 26.4;
const CHEVRON_SIZE = 21.6;
const HEADER_ICON_SIZE = 24;

function routeId(id: string | string[] | undefined) {
  return Array.isArray(id) ? id[0] : id;
}

export default function StoreScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const storeId = routeId(id);
  const { data: store, isLoading, isError } = useStore(storeId);
  const { data: savedStores } = useSavedStores();
  const toggleSaved = useToggleSavedStore();
  const saved = savedStores?.some((item) => item.id === storeId) ?? false;
  const HeartIcon = saved ? HeartWhiteFilledIcon : HeartWhiteIcon;
  const photos = store && store.images.length > 0 ? store.images : PHOTO_PLACEHOLDERS;
  const tags = store ? [...store.categories, ...store.styles] : [];
  const place = store ? formatStorePlace(store) : "";
  const missing = !isLoading && !isError && store === null;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <View style={styles.headerOverscroll} />
          <ScreenTopBar onBack={goBack} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photos}
          >
            {photos.map((photo) => (
              <StorePhoto
                key={photo.id}
                path={photo.path}
                label={photo.position === 0 ? "Main store photo" : "Store photo"}
              />
            ))}
          </ScrollView>

          <View style={styles.nameRow}>
            <Text style={styles.name}>{store?.name ?? ""}</Text>
            <Pressable
              hitSlop={8}
              disabled={!store}
              onPress={() => {
                if (!store) return;
                toggleSaved.mutate({
                  store: {
                    id: store.id,
                    name: store.name,
                    categories: store.categories,
                    styles: store.styles,
                    coverPath: storeCoverPath(store.images),
                  },
                  saved,
                });
              }}
              accessibilityRole="button"
              accessibilityLabel={saved ? "Remove from My List" : "Save store"}
              accessibilityState={{ selected: saved }}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <HeartIcon width={HEADER_ICON_SIZE} height={HEADER_ICON_SIZE} />
            </Pressable>
            <Pressable
              hitSlop={8}
              disabled={!place}
              onPress={() => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(place)}`)}
              accessibilityRole="button"
              accessibilityLabel="Open map"
              style={({ pressed }) => pressed && styles.pressed}
            >
              <MapIcon width={HEADER_ICON_SIZE} height={HEADER_ICON_SIZE} />
            </Pressable>
          </View>
        </View>

        {missing || (isError && !store) ? (
          <Text style={styles.message}>
            {missing ? "This store could not be found." : "This store could not be loaded."}
          </Text>
        ) : (
          <View style={styles.body}>
            {tags.length > 0 ? (
              <View style={styles.tags}>
                {tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {place ? <Text style={styles.place}>{place}</Text> : null}

            <View style={styles.friendRow}>
              <View style={styles.friendDot} />
              <Text style={styles.friendText}>
                <Text style={styles.friendCount}>1 </Text>
                friend wants to go
              </Text>
            </View>

            <View style={styles.actions}>
              {ACTIONS.map(({ label, Icon }, index) => (
                <View key={label}>
                  <Pressable
                    style={({ pressed }) => [styles.action, pressed && styles.pressed]}
                    accessibilityRole="button"
                    accessibilityLabel={label}
                  >
                    <Icon width={ACTION_ICON_SIZE} height={ACTION_ICON_SIZE} />
                    <Text style={styles.actionLabel}>{label}</Text>
                    <ChevronLeftSmallIcon
                      width={CHEVRON_SIZE}
                      height={CHEVRON_SIZE}
                      style={styles.chevron}
                    />
                  </Pressable>
                  {index < ACTIONS.length - 1 ? <View style={styles.divider} /> : null}
                </View>
              ))}
            </View>

            <Text style={styles.reviewsTitle}>Reviews</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.reviews}
            >
              {REVIEW_PLACEHOLDERS.map((id) => (
                <View key={id} style={styles.reviewCard} />
              ))}
            </ScrollView>
          </View>
        )}
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
    paddingBottom: 18,
  },
  headerOverscroll: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "100%",
    height: 1000,
    backgroundColor: Colors.plum,
  },
  photos: {
    gap: 11,
    paddingHorizontal: 18,
    marginTop: 16,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
    paddingHorizontal: 18,
  },
  name: {
    flex: 1,
    fontFamily: Fonts.brand,
    fontSize: 32,
    lineHeight: 41,
    letterSpacing: -0.32,
    color: Colors.white,
  },
  body: {
    paddingTop: 16,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    rowGap: 5,
    paddingHorizontal: 18,
  },
  tag: {
    height: 20,
    borderRadius: 50,
    backgroundColor: Colors.plum,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  tagText: {
    fontFamily: Fonts.body,
    fontSize: 11,
    letterSpacing: -0.11,
    color: Colors.white,
  },
  place: {
    marginTop: 10,
    paddingHorizontal: 18,
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 20,
    color: Colors.cardPlaceholder,
  },
  friendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
    paddingHorizontal: 18,
  },
  friendDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.cardPlaceholder,
  },
  friendText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 20,
    color: Colors.plum,
  },
  friendCount: {
    letterSpacing: 0.8,
  },
  actions: {
    marginTop: 22,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 29,
    gap: 22,
  },
  actionLabel: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: Colors.plum,
  },
  chevron: {
    transform: [{ rotate: "180deg" }],
  },
  divider: {
    height: 1,
    marginHorizontal: 36,
    backgroundColor: Colors.plum,
  },
  reviewsTitle: {
    marginTop: 28,
    marginBottom: 12,
    paddingHorizontal: 18,
    fontFamily: Fonts.brand,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
    color: Colors.plum,
  },
  reviews: {
    gap: 7,
    paddingHorizontal: 18,
  },
  reviewCard: {
    width: 139,
    height: 145,
    borderRadius: 10,
    backgroundColor: Colors.cardPlaceholder,
  },
  message: {
    marginTop: 28,
    paddingHorizontal: 18,
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: Colors.plum,
  },
  pressed: {
    opacity: 0.8,
  },
});
