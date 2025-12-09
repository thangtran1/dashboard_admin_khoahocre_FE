import { Product } from "@/types";
import { Link } from "react-router";
import { StarIcon } from "lucide-react";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import Title from "@/ui/title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "@/components/user/AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border rounded-md border-border group">
      <div className="relative group overflow-hidden bg-background">
        {product?.images && (
          <Link to={`/product/${product?.slug}`}>
            <img
              src={product.images[0]?.asset?.url || "/images/products/product_1.png"}
              alt="productImage"
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-background duration-500 
              ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />
        {product?.discount && product?.discount > 0 ? (
          <p className="absolute top-2 left-2 z-10 text-sm border border-primary/30 px-2 py-1 rounded-full group-hover:border-success hover:text-success ">
            Sale!
          </p>
        ) : (
          <Link
            to={"/deal"}
            className="absolute top-2 left-2 z-10 border border-warning/50 p-1 rounded-full group-hover:border-warning"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-warning/50 group-hover:text-warning hoverEffect"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {product?.category && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-foreground">
            {product.category.name}
          </p>
        )}
        <Title className="text-sm line-clamp-1">{product.name}</Title>
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={`${index < 4 ? "text-success" : "text-foreground"} size-4`}
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-foreground tracking-wide"> |  {' '} 5 Reviews</p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="font-medium">Trong kho</p>
          <p
            className={`${product?.stock === 0 ? "text-error" : "text-success font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "Hết hàng"}
          </p>
        </div>

        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
