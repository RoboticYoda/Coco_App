import { useQuery } from "@tanstack/react-query";

import { fetchFeaturedStore } from "@/lib/featured-store";

export const featuredStoreQueryKey = ["featured-store"] as const;

export function useFeaturedStore() {
  return useQuery({
    queryKey: featuredStoreQueryKey,
    queryFn: fetchFeaturedStore,
  });
}
