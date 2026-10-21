import { supabase } from "@/lib/supabase";

export type OutfitPhoto = {
  id: string;
  path: string;
  position: number;
};

const OUTFIT_COLUMNS = `
  id,
  path,
  position
`;

type OutfitPhotoRow = {
  id: string;
  path: string;
  position: number;
};

function toOutfitPhoto(row: OutfitPhotoRow): OutfitPhoto {
  return {
    id: row.id,
    path: row.path,
    position: row.position,
  };
}

export function outfitImageUrl(path: string) {
  return supabase.storage.from("outfit-images").getPublicUrl(path).data.publicUrl;
}

export async function fetchOutfitPhotos() {
  const { data, error } = await supabase
    .from("outfit_photos")
    .select(OUTFIT_COLUMNS)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return ((data ?? []) as OutfitPhotoRow[]).map(toOutfitPhoto);
}
