import { useQuery } from "@tanstack/react-query";

import { fetchOutfitPhotos } from "@/lib/outfits";

export const outfitPhotosQueryKey = ["outfit-photos"] as const;

export function useOutfitPhotos() {
  return useQuery({
    queryKey: outfitPhotosQueryKey,
    queryFn: fetchOutfitPhotos,
  });
}
