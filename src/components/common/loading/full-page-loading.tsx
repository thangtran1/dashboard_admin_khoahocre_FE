import { Loader2 } from "lucide-react";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import "./full-page-loading.css";

interface FullPageLoadingProps {
  message?: string;
  className?: string;
  minDuration?: number;
}

export function FullPageLoading({
  message,
  className,
  minDuration = 1000,
}: FullPageLoadingProps) {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinished(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  if (finished) return null;

  return (
    <div
      className={cn(
        "full-page-loading fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"
            style={{ animationDuration: "1.2s" }}
          />
          <Loader2
            className="h-10 w-10 animate-spin text-primary relative z-10"
            style={{ animationDuration: "0.8s" }}
          />
        </div>

        {message && (
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
