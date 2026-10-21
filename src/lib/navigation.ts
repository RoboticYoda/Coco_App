import { router, type Href } from "expo-router";

export function goBack() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.navigate("/home");
  }
}

export function openStore(id: string) {
  router.push(`/store/${id}` as Href);
}
