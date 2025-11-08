import { AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const ErrorSection = ({
  message,
  onBack,
}: {
  message: string;
  onBack: () => void;
}) => (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-md mx-auto">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <div className="mt-6 text-center">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>
      </div>
    </div>
  </div>
);
