import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BackBar = ({ onBack }: { onBack: () => void }) => (
  <div className="mb-6">
    <Button variant="outline" className="gap-2" onClick={onBack}>
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  </div>
);
