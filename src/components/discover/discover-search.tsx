import { useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import SearchIcon from "@/assets/images/icons/search.svg";
import { Colors, Fonts } from "@/constants/theme";

const SIZE = 45;
const ICON_SIZE = 24;
const CLOSED_RIGHT = 21;
const OPEN_RIGHT = 23;
const OPEN_ICON_LEFT = 19;
const CLOSED_ICON_LEFT = (SIZE - ICON_SIZE) / 2;
const TIMING = { duration: 320, easing: Easing.out(Easing.cubic) };

export function DiscoverSearch() {
  const { width: windowWidth } = useWindowDimensions();
  const openWidth = windowWidth - OPEN_RIGHT * 2;
  const progress = useSharedValue(0);
  const inputRef = useRef<TextInput>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const setSearchOpen = (next: boolean) => {
    setOpen(next);
    progress.set(withTiming(next ? 1 : 0, TIMING));
    if (next) {
      inputRef.current?.focus();
    } else {
      setQuery("");
      Keyboard.dismiss();
    }
  };

  const containerStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.get(), [0, 1], [SIZE, openWidth]),
    right: interpolate(progress.get(), [0, 1], [CLOSED_RIGHT, OPEN_RIGHT]),
  }));

  const iconStyle = useAnimatedStyle(() => ({
    marginLeft: interpolate(progress.get(), [0, 1], [CLOSED_ICON_LEFT, OPEN_ICON_LEFT]),
  }));

  const inputStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.get(), [0.4, 1], [0, 1], "clamp"),
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Pressable
        onPress={() => (open ? inputRef.current?.focus() : setSearchOpen(true))}
        hitSlop={11}
        accessibilityRole="button"
        accessibilityLabel="Search"
      >
        <Animated.View style={iconStyle}>
          <SearchIcon width={ICON_SIZE} height={ICON_SIZE} />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[styles.inputWrap, inputStyle]}
        pointerEvents={open ? "auto" : "none"}
      >
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          onBlur={() => {
            if (!query) setSearchOpen(false);
          }}
          placeholder="Personalize your feed"
          placeholderTextColor={Colors.searchPlaceholder}
          returnKeyType="search"
          autoCorrect={false}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 24,
    height: SIZE,
    borderRadius: 50,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  inputWrap: {
    flex: 1,
    height: "100%",
    marginLeft: 13,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    letterSpacing: -0.14,
    color: "#2B2B2B",
  },
});
