import { Search } from "lucide-react";

export const NoResults = () => (
  <div className="text-center py-16">
    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2">No anime found</h3>
    <p className="text-muted-foreground">
      Try different keywords or check spelling.
    </p>
  </div>
);
