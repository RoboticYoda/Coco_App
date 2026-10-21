import { supabase } from "@/lib/supabase";

export type TrendingPiece = {
  id: string;
  path: string;
  position: number;
};

const TRENDING_COLUMNS = `
  id,
  path,
  position
`;

type TrendingPieceRow = {
  id: string;
  path: string;
  position: number;
};

function toTrendingPiece(row: TrendingPieceRow): TrendingPiece {
  return {
    id: row.id,
    path: row.path,
    position: row.position,
  };
}

export function trendingPieceImageUrl(path: string) {
  return supabase.storage.from("trending-pieces").getPublicUrl(path).data.publicUrl;
}

export async function fetchTrendingPieces() {
  const { data, error } = await supabase
    .from("trending_pieces")
    .select(TRENDING_COLUMNS)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true })
    .limit(4);

  if (error) throw error;
  return ((data ?? []) as TrendingPieceRow[]).map(toTrendingPiece);
}
