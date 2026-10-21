import { supabase } from "@/lib/supabase";

export type FeaturedStore = {
  id: string;
  storeId: string;
  storeName: string;
  path: string;
  position: number;
};

const FEATURED_COLUMNS = `
  id,
  store_id,
  path,
  position,
  stores ( name )
`;

type StoreName = {
  name: string;
};

type FeaturedStoreRow = {
  id: string;
  store_id: string;
  path: string;
  position: number;
  stores: StoreName | StoreName[] | null;
};

function storeName(stores: FeaturedStoreRow["stores"]) {
  if (Array.isArray(stores)) return stores[0]?.name ?? "Featured store";
  return stores?.name ?? "Featured store";
}

function toFeaturedStore(row: FeaturedStoreRow): FeaturedStore {
  return {
    id: row.id,
    storeId: row.store_id,
    storeName: storeName(row.stores),
    path: row.path,
    position: row.position,
  };
}

export function featuredStoreImageUrl(path: string) {
  return supabase.storage.from("featured-stores").getPublicUrl(path).data.publicUrl;
}

export async function fetchFeaturedStore() {
  const { data, error } = await supabase
    .from("featured_stores")
    .select(FEATURED_COLUMNS)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return toFeaturedStore(data as FeaturedStoreRow);
}
