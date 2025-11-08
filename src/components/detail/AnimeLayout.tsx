import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Tv, Clock, Calendar, Building, Sparkles } from "lucide-react";
import type { Anime } from "@/types/anime";
import { useState, useEffect } from "react";

export const AnimeLayout = ({ anime }: { anime: Anime }) => {
  const displayTitle =
    anime.title_english || anime.title || anime.title_japanese;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="sticky top-6 animate-scale-in">
          <Card className="overflow-hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-2 border-indigo-200 dark:border-indigo-800 shadow-2xl shadow-indigo-500/20">
            <div className="aspect-3/4 relative group">
              {/* Parallax Image */}
              <div
                className="w-full h-full overflow-hidden"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <img
                  src={
                    anime.images.jpg.large_image_url ||
                    anime.images.jpg.image_url
                  }
                  alt={displayTitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Score Badge with Enhanced Design */}
              {anime.score && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-linear-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg text-base px-3 py-1.5 gap-1.5 animate-pulse-glow">
                    <Star className="w-4 h-4 fill-white" />
                    {anime.score.toFixed(1)}
                  </Badge>
                </div>
              )}

              {/* Decorative Corner Sparkle */}
              <div className="absolute bottom-4 left-4 opacity-80">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div
        className="lg:col-span-2 space-y-6"
        style={{
          transform: `translateY(${scrollY * -0.05}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-2 border-purple-200 dark:border-purple-800 shadow-xl animate-fade-in-up">
          <CardHeader className="relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

            <CardTitle className="text-4xl md:text-5xl font-heading font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative z-10 tracking-tight">
              {displayTitle}
            </CardTitle>
            {anime.title_japanese && anime.title_japanese !== displayTitle && (
              <p className="text-lg md:text-xl text-muted-foreground italic relative z-10 mt-2 font-display">
                {anime.title_japanese}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetaItem icon={<Tv className="w-3 h-3" />} label="Episodes">
                {anime.episodes || "Unknown"}
              </MetaItem>
              <MetaItem icon={<Clock className="w-3 h-3" />} label="Status">
                <Badge
                  variant="outline"
                  className="bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400 font-semibold"
                >
                  {anime.status}
                </Badge>
              </MetaItem>
              <MetaItem icon={<Calendar className="w-3 h-3" />} label="Aired">
                <span className="text-sm font-bold font-display">
                  {anime.aired?.string || "Unknown"}
                </span>
              </MetaItem>
              <MetaItem icon={<Star className="w-3 h-3" />} label="Score">
                {anime.score ? `${anime.score}/10` : "Not rated"}
              </MetaItem>
            </div>
          </CardContent>
        </Card>

        {anime.genres?.length > 0 && (
          <Card
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-2 border-pink-200 dark:border-pink-800 shadow-xl animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-heading bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Genres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TagRow
                items={anime.genres.map((g) => ({
                  id: g.mal_id,
                  name: g.name,
                }))}
                variant="secondary"
              />
            </CardContent>
          </Card>
        )}

        {anime.studios?.length > 0 && (
          <Card
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-2 border-blue-200 dark:border-blue-800 shadow-xl animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2 bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Studios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TagRow
                items={anime.studios.map((s) => ({
                  id: s.mal_id,
                  name: s.name,
                }))}
                variant="outline"
              />
            </CardContent>
          </Card>
        )}

        {anime.synopsis && (
          <Card
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-2 border-indigo-200 dark:border-indigo-800 shadow-xl animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-heading bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Synopsis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-base font-display">
                {anime.synopsis}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const MetaItem = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      {icon}
      {label}
    </div>
    <p className="font-semibold">{children}</p>
  </div>
);

const TagRow = ({
  items,
  variant,
}: {
  items: { id: number; name: string }[];
  variant: "secondary" | "outline";
}) => (
  <div className="flex flex-wrap gap-2">
    {items.map((it) => (
      <Badge key={it.id} variant={variant}>
        {it.name}
      </Badge>
    ))}
  </div>
);
