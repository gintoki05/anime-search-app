import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Tv, Clock, Calendar, Building } from "lucide-react";
import type { Anime } from "@/types/anime";

export const AnimeLayout = ({ anime }: { anime: Anime }) => {
  const displayTitle =
    anime.title_english || anime.title || anime.title_japanese;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <Card className="overflow-hidden bg-white/90 backdrop-blur-sm">
            <div className="aspect-3/4 relative">
              <img
                src={
                  anime.images.jpg.large_image_url || anime.images.jpg.image_url
                }
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
              {anime.score && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/80 text-white hover:bg-black/80 gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {anime.score.toFixed(1)}
                  </Badge>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{displayTitle}</CardTitle>
            {anime.title_japanese && anime.title_japanese !== displayTitle && (
              <p className="text-lg text-muted-foreground italic">
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
                <Badge variant="outline">{anime.status}</Badge>
              </MetaItem>
              <MetaItem icon={<Calendar className="w-3 h-3" />} label="Aired">
                <span className="text-sm font-semibold">
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
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Genres</CardTitle>
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
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Building className="w-5 h-5" />
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
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Synopsis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
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
