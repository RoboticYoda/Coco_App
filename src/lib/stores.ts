import { supabase } from "@/lib/supabase";

export type StoreImage = {
  id: string;
  path: string | null;
  position: number;
};

export type StoreHours = Record<string, { open: string; close: string }>;

export type Store = {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  neighborhood: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  categories: string[];
  styles: string[];
  priceLevel: number | null;
  hours: StoreHours | null;
  website: string | null;
  instagram: string | null;
  isFeatured: boolean;
  images: StoreImage[];
};

const STORE_COLUMNS = `
  id,
  name,
  description,
  address,
  neighborhood,
  city,
  region,
  latitude,
  longitude,
  categories,
  styles,
  price_level,
  hours,
  website,
  instagram,
  is_featured,
  store_images (
    id,
    path,
    position
  )
`;

type StoreImageRow = {
  id: string;
  path: string | null;
  position: number;
};

type StoreRow = {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  neighborhood: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  categories: string[] | null;
  styles: string[] | null;
  price_level: number | null;
  hours: StoreHours | null;
  website: string | null;
  instagram: string | null;
  is_featured: boolean;
  store_images: StoreImageRow[] | null;
};

function toStore(row: StoreRow): Store {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    address: row.address,
    neighborhood: row.neighborhood,
    city: row.city,
    region: row.region,
    latitude: row.latitude,
    longitude: row.longitude,
    categories: row.categories ?? [],
    styles: row.styles ?? [],
    priceLevel: row.price_level,
    hours: row.hours,
    website: row.website,
    instagram: row.instagram,
    isFeatured: row.is_featured,
    images: [...(row.store_images ?? [])].sort((a, b) => a.position - b.position),
  };
}

export function storeCoverPath(images: StoreImage[]) {
  const cover = images.find((image) => image.position === 0) ?? images[0];
  return cover?.path ?? null;
}

export function formatStorePlace(store: Store) {
  return [store.neighborhood, store.city, store.region].filter(Boolean).join(", ");
}

export function storeImageUrl(path: string) {
  return supabase.storage.from("store-images").getPublicUrl(path).data.publicUrl;
}

export async function fetchStores() {
  const { data, error } = await supabase
    .from("stores")
    .select(STORE_COLUMNS)
    .order("is_featured", { ascending: false })
    .order("name")
    .order("position", { referencedTable: "store_images", ascending: true });

  if (error) throw error;
  return ((data ?? []) as StoreRow[]).map(toStore);
}

export async function fetchStore(id: string) {
  const { data, error } = await supabase
    .from("stores")
    .select(STORE_COLUMNS)
    .eq("id", id)
    .order("position", { referencedTable: "store_images", ascending: true })
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return toStore(data as StoreRow);
}
