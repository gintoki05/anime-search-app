import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Tv } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Anime } from "@/types/anime";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getDisplayTitle = (anime: Anime) => {
    return anime.title_english || anime.title || anime.title_japanese;
  };

  const formatScore = (score: number | null) => {
    return score ? score.toFixed(1) : "N/A";
  };

  return (
    <Link to={`/anime/${anime.mal_id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-border/50">
        <div className="relative aspect-3/4 overflow-hidden bg-muted">
          <img
            src={anime.images.jpg.image_url}
            alt={getDisplayTitle(anime)}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
          )}
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="bg-black/80 text-white hover:bg-black/80"
            >
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {formatScore(anime.score)}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-base line-clamp-2 mb-2 text-foreground">
            {getDisplayTitle(anime)}
          </h3>
          <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Tv className="w-3 h-3" />
              <span>
                {anime.episodes ? `${anime.episodes} eps` : "Unknown"}
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              {anime.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {anime.synopsis
              ? anime.synopsis.length > 100
                ? `${anime.synopsis.substring(0, 100)}...`
                : anime.synopsis
              : "No description available."}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AnimeCard;
