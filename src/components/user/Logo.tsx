import { cn } from "@/lib/utils";
import { Link } from "react-router";

const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link to={"/"} className="inline-flex">
      <h2
        className={cn(
          "text-2xl font-black tracking-wider uppercase group font-sans",
          className
        )}
      >
        Shopcar
        <span
          className={cn(
            "text-primary group-hover:text-primary",
            spanDesign
          )}
        >
          t
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
