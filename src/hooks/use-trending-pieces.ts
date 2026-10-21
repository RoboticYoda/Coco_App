import { useQuery } from "@tanstack/react-query";

import { fetchTrendingPieces } from "@/lib/trending-pieces";

export const trendingPiecesQueryKey = ["trending-pieces"] as const;

export function useTrendingPieces() {
  return useQuery({
    queryKey: trendingPiecesQueryKey,
    queryFn: fetchTrendingPieces,
  });
}
