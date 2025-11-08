import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const EmptyState = () => (
  <div className="text-center">
    <div className="w-64 h-64 mx-auto mb-6">
      <DotLottieReact src="/lottie/empty.json" loop autoplay />
    </div>
    <h3 className="text-2xl font-semibold mb-3">Start searching for anime</h3>
    <p className="text-muted-foreground text-lg">
      Type a title above to begin.
    </p>
  </div>
);
