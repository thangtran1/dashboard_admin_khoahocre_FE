import { cn } from "@/utils";

interface SkeletonProps extends React.ComponentProps<"div"> {
  variant?: "default" | "circle" | "text" | "rect" | "image";
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  const variants = {
    default: "rounded-md",
    circle: "rounded-full aspect-square",
    text: "rounded-md h-4",
    rect: "rounded-md",
    image: "rounded-lg",
  };

  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent animate-pulse",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

// ===============================
// Sub Components
// ===============================

Skeleton.Text = function Text({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton variant="text" className={cn("w-full", className)} {...props} />;
};

Skeleton.Circle = function Circle({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton variant="circle" className={className} {...props} />;
};

Skeleton.Rect = function Rect({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton variant="rect" className={className} {...props} />;
};

Skeleton.Image = function Image({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Skeleton
      variant="image"
      className={cn("w-full h-full", className)}
      {...props}
    />
  );
};

export { Skeleton };
