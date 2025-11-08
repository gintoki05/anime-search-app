import type { Anime } from "@/types/anime";
import AnimeCard from "@/components/AnimeCard";

export const ResultsGrid = ({ items }: { items: Anime[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {items.map((anime, index) => (
      <div
        key={anime.mal_id}
        className="animate-fade-in-up"
        style={{
          animationDelay: `${index * 0.05}s`,
          opacity: 0,
          animationFillMode: "forwards",
        }}
      >
        <AnimeCard anime={anime} />
      </div>
    ))}
  </div>
);
