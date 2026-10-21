import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { SavedStore } from "@/components/lists/saved-store-row";
import { fetchSavedStores, heartStore, unheartStore } from "@/lib/saved-stores";

export const savedStoresQueryKey = ["saved-stores"] as const;

export function useSavedStores() {
  return useQuery({
    queryKey: savedStoresQueryKey,
    queryFn: fetchSavedStores,
  });
}

export function useToggleSavedStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ store, saved }: { store: SavedStore; saved: boolean }) => {
      if (saved) await unheartStore(store.id);
      else await heartStore(store.id);
    },
    onMutate: async ({ store, saved }) => {
      await queryClient.cancelQueries({ queryKey: savedStoresQueryKey });
      const previous = queryClient.getQueryData<SavedStore[]>(savedStoresQueryKey);

      queryClient.setQueryData<SavedStore[]>(savedStoresQueryKey, (current) => {
        const list = current ?? [];
        if (saved) return list.filter((item) => item.id !== store.id);
        if (list.some((item) => item.id === store.id)) return list;
        return [store, ...list];
      });

      return { previous };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(savedStoresQueryKey, context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: savedStoresQueryKey });
    },
  });
}
