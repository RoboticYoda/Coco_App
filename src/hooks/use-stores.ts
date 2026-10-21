import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchStore, fetchStores, type Store } from "@/lib/stores";

export const storesQueryKey = ["stores"] as const;

export function storeQueryKey(id: string) {
  return ["store", id] as const;
}

export function useStores() {
  return useQuery({
    queryKey: storesQueryKey,
    queryFn: fetchStores,
  });
}

export function useStore(id: string | undefined) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: storeQueryKey(id ?? ""),
    queryFn: () => fetchStore(id ?? ""),
    enabled: Boolean(id),
    placeholderData: () => {
      if (!id) return undefined;
      return queryClient
        .getQueryData<Store[]>(storesQueryKey)
        ?.find((store) => store.id === id);
    },
  });
}
