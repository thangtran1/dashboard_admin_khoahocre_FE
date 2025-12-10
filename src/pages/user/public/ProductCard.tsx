import { Link } from "react-router";
import { StarIcon } from "lucide-react";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import Title from "@/ui/title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "@/components/user/AddToCartButton";
import { FireOutlined, StarFilled, ThunderboltOutlined } from "@ant-design/icons";
import { Separator } from "@/ui/separator";

const ProductCard = ({ product }: { product: any }) => {
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
        {product?.discount > 0 ? (
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
        
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
            {product.isNew && (
              <span className="bg-blue-500/90 backdrop-blur text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <ThunderboltOutlined className="text-[10px]" /> Mới
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-amber-500/90 backdrop-blur text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <StarFilled className="text-[10px]" /> Nổi bật
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-orange-500/90 backdrop-blur text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <FireOutlined className="text-[10px]" /> Bán chạy
              </span>
            )}
          </div>
      </div>
      <div className="p-3 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {product.category?.name || "Chưa phân loại"}
            </span>
            <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">
              {product.brand?.name || "Không có"}
            </span>
          </div>
        <Title className="text-lg line-clamp-1 mt-1 mb-3">{product.name}</Title>
        <PriceView
          price={product?.price}
          discount={product?.discount}
        />
        <Separator />
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
          <p className="text-foreground tracking-wide">  | {product?.reviews?.length > 0 ? product?.reviews?.length + ' đánh giá' : 'Chưa có đánh giá'}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="font-medium">Kho: </p>
          <p
            className={`${product?.stock === 0 ? "text-error" : "text-success font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock + " sản phẩm" : "Hết hàng"}
          </p>
        </div>
        <AddToCartButton product={product} className="w-36 mx-auto rounded-full flex items-center justify-center" />
      </div>
    </div>
  );
};

export default ProductCard;
