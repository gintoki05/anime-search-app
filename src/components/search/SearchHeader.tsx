import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const SearchHeader = () => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="relative">
        {/* Decorative Sparkle */}
        <Sparkles className="absolute -top-2 -left-8 w-6 h-6 text-yellow-500 animate-pulse" />

        {/* Main Title with Custom Font */}
        <h1 className="text-5xl md:text-7xl font-heading font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
          Anime Search
        </h1>

        {/* Decorative Sparkle */}
        <Sparkles
          className="absolute -bottom-2 -right-8 w-5 h-5 text-pink-500 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
      </div>
      <ThemeToggle />
    </div>

    {/* Subtitle with Icon */}
    <div className="relative inline-block">
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2 font-display">
        <span className="font-medium">
          Discover and explore anime titles instantly.
        </span>
      </p>

      {/* Decorative Underline */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent rounded-full opacity-50" />
    </div>
  </div>
);
