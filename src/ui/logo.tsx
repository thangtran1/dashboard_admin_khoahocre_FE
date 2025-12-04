import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface LogoProps {
  className?: string;
  hideText?: boolean; // nếu true → ẩn chữ "Shopcart"
}

const Logo = ({ className, hideText = false }: LogoProps) => {
  const defaultText = "Shopcart";

  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-2 select-none", className)}
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shadow-sm">
        <span className="text-primary font-extrabold text-sm tracking-tight">
          TVT
        </span>
      </div>

      {!hideText && (
        <span className="text-sm text-success font-semibold uppercase">
          {defaultText}
        </span>
      )}
    </Link>
  );
};

export default Logo;
