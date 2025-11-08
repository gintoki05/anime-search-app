import { Search } from "lucide-react";

export const SearchHeader = () => (
  <div className="text-center mb-8">
    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
      Anime Search
    </h1>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2">
      <Search className="w-5 h-5 text-blue-600" />
      Discover and explore anime titles instantly.
    </p>
  </div>
);
