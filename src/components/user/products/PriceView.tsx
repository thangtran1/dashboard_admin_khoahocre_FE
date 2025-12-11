import PriceFormatter from "@/components/user/PriceFormatter";
import { Separator } from "@/ui/separator";

interface Props {
  price?: number;
  discount?: number;
  className?: string;
  stock?: number | undefined;
}

const PriceView = ({ price, discount, className, stock }: Props) => {
  const oldPrice =
    price && discount ? price + (discount * price) / 100 : undefined;

  return (
    <div
      className={`rounded-xl p-5 border border-success/40 shadow-sm ${
        className || ""
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="flex flex-col justify-center">
          <p className="text-foreground mb-1">Giá sản phẩm</p>
          {price !== undefined && (
            <PriceFormatter
              amount={price}
              className="text-3xl font-bold text-foreground"
            />
          )}
          {oldPrice && (
            <PriceFormatter
              amount={oldPrice}
              className="line-through text-sm text-muted-foreground mt-1"
            />
          )}
        </div>

        <div className="flex items-center w-full">
          <div className="hidden md:flex items-center w-full">
            <Separator className="flex-1" />
            <span className="px-2 text-muted-foreground font-normal text-sm">
              hoặc
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="flex md:hidden items-center w-full">
            <Separator className="flex-1" />
            <span className="px-2 text-muted-foreground font-normal text-sm">
              hoặc
            </span>
            <Separator className="flex-1" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex justify-end   mb-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap">
              Thu cũ lên đời chỉ từ
            </span>
          </div>
          <div className="flex justify-end">
            {price !== undefined && (
              <PriceFormatter
                amount={price}
                className="text-3xl font-bold text-foreground"
              />
            )}
          </div>
          {discount && (
            <p className="mt-2 text-red-600 text-base flex justify-end font-semibold text-center">
              Giảm giá lên đến {discount}%
            </p>
          )}
        </div>
      </div>

      <div className="text-center mt-4">
        <p
          className={`px-4 py-1.5 text-sm font-semibold rounded-lg ${
            stock === 0
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {stock === undefined || stock > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </div>
  );
};

export default PriceView;
