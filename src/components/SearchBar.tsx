import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glassmorphism Container */}
      <div className="relative glass-effect dark:glass-effect-dark rounded-2xl p-1 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
          <Search className="w-5 h-5 text-indigo-500 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Input with Enhanced Styling */}
        <Input
          type="text"
          placeholder="Search for your favorite anime..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 pr-12 h-14 text-lg font-display bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:font-display"
        />

        {/* Clear Button */}
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
