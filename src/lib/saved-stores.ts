import type { SavedStore } from "@/components/lists/saved-store-row";
import { supabase } from "@/lib/supabase";

type StoreImageFields = {
  path: string | null;
  position: number;
};

type StoreFields = {
  id: string;
  name: string;
  categories: string[] | null;
  styles: string[] | null;
  store_images: StoreImageFields[] | StoreImageFields | null;
};

function coverPath(images: StoreFields["store_images"]) {
  const list = !images ? [] : Array.isArray(images) ? images : [images];
  const cover = list.find((image) => image.position === 0) ?? list[0];
  return cover?.path ?? null;
}

type SavedStoreJoin = {
  created_at: string;
  stores: StoreFields | StoreFields[] | null;
};

function oneStore(stores: SavedStoreJoin["stores"]) {
  if (!stores) return null;
  return Array.isArray(stores) ? (stores[0] ?? null) : stores;
}

async function currentUserId() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

export async function fetchSavedStores(): Promise<SavedStore[]> {
  const userId = await currentUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from("saved_stores")
    .select(
      `
      created_at,
      stores (
        id,
        name,
        categories,
        styles,
        store_images (
          path,
          position
        )
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return ((data ?? []) as unknown as SavedStoreJoin[]).flatMap((row) => {
    const store = oneStore(row.stores);
    if (!store) return [];
    return [
      {
        id: store.id,
        name: store.name,
        categories: store.categories ?? [],
        styles: store.styles ?? [],
        coverPath: coverPath(store.store_images),
      },
    ];
  });
}

export async function heartStore(storeId: string) {
  const userId = await currentUserId();
  if (!userId) throw new Error("You need to be signed in to save a store.");

  const { error } = await supabase
    .from("saved_stores")
    .insert({ user_id: userId, store_id: storeId });

  if (error && error.code !== "23505") throw error;
}

export async function unheartStore(storeId: string) {
  const userId = await currentUserId();
  if (!userId) throw new Error("You need to be signed in to save a store.");

  const { error } = await supabase
    .from("saved_stores")
    .delete()
    .eq("user_id", userId)
    .eq("store_id", storeId);

  if (error) throw error;
}
