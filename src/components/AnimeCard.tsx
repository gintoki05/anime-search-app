import React, { useState, useRef } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const getDisplayTitle = (anime: Anime) => {
    return anime.title_english || anime.title || anime.title_japanese;
  };

  const formatScore = (score: number | null) => {
    return score ? score.toFixed(1) : "N/A";
  };

  // Magnetic 3D Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <Link to={`/anime/${anime.mal_id}`} className="group block">
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/30 dark:hover:shadow-purple-500/30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-purple-500 card-3d"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) scale(1.05) translateZ(20px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)",
        }}
      >
        {/* Image Container with Parallax */}
        <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
          <img
            src={anime.images.jpg.image_url}
            alt={getDisplayTitle(anime)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            } ${isHovered ? "scale-110 brightness-110" : ""}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            style={{
              transform: isHovered
                ? `translateZ(30px) translateY(${mousePosition.x * 0.5}px)`
                : "translateZ(0px)",
            }}
          />

          {/* Shimmer Loading Effect */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-linear-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 shimmer" />
          )}

          {/* Score Badge with Glow */}
          <div className="absolute top-3 right-3 z-10">
            <Badge
              variant="secondary"
              className="bg-linear-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
              style={{
                transform: isHovered
                  ? "translateZ(40px) scale(1.1)"
                  : "translateZ(10px)",
              }}
            >
              <Star className="w-3 h-3 mr-1 fill-white" />
              {formatScore(anime.score)}
            </Badge>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* Info Badge on Hover */}
          <div
            className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg px-3 py-2 shadow-xl">
              <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-1">
                Click to view details →
              </p>
            </div>
          </div>
        </div>

        {/* Content with Enhanced Typography */}
        <CardContent className="p-5 relative">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full" />

          <h3 className="font-bold text-lg line-clamp-2 mb-3 text-foreground relative z-10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {getDisplayTitle(anime)}
          </h3>

          <div className="flex items-center justify-between mb-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full">
              <Tv className="w-4 h-4 text-indigo-500" />
              <span className="font-medium">
                {anime.episodes ? `${anime.episodes} eps` : "TBA"}
              </span>
            </div>
            <Badge
              variant="outline"
              className="text-xs font-semibold bg-linear-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 text-green-700 dark:text-green-400"
            >
              {anime.status}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed relative z-10">
            {anime.synopsis
              ? anime.synopsis.length > 100
                ? `${anime.synopsis.substring(0, 100)}...`
                : anime.synopsis
              : "No description available."}
          </p>

          {/* Hover Indicator Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default AnimeCard;
