import type { Anime } from "@/types/anime";
import AnimeCard from "@/components/AnimeCard";

export const ResultsGrid = ({ items }: { items: Anime[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {items.map((anime) => (
      <AnimeCard key={anime.mal_id} anime={anime} />
    ))}
  </div>
);
