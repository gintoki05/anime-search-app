import { Search } from "lucide-react";

export const EmptyState = () => (
  <div className="text-center py-20">
    <div className="w-20 h-20 bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Search className="w-10 h-10 text-blue-600" />
    </div>
    <h3 className="text-2xl font-semibold mb-3">Start searching for anime</h3>
    <p className="text-muted-foreground text-lg">
      Type a title above to begin.
    </p>
  </div>
);
