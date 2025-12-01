import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import PriceFormatter from "@/components/user/PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}
const PriceView = ({ price, discount, className }: Props) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        <PriceFormatter
          amount={price}
          className={cn("text-success", className)}
        />
        {price && discount && (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className={twMerge(
              "line-through text-xs font-normal text-foreground",
              className
            )}
          />
        )}
      </div>
    </div>
  );
};

export default PriceView;
