import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LoadingAnimationProps {
  message?: string;
}

export const LoadingAnimation = ({
  message = "Searching...",
}: LoadingAnimationProps) => (
  <div className="text-center py-12">
    <div className="w-64 h-64 mx-auto mb-6">
      <DotLottieReact src="/lottie/loading.json" loop autoplay />
    </div>
    <p className="text-muted-foreground text-lg">{message}</p>
  </div>
);
