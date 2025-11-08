import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NotFoundSection = ({ onBack }: { onBack: () => void }) => (
  <div className="container mx-auto px-4 py-8">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Anime Not Found</h2>
      <p className="text-muted-foreground mb-6">
        The requested anime could not be found.
      </p>
      <Button onClick={onBack} variant="outline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Search
      </Button>
    </div>
  </div>
);
