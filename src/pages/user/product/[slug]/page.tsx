import AddToCartButton from "@/components/user/AddToCartButton";
import FavoriteButton from "@/components/user/FavoriteButton";
import ImageView from "@/components/user/products/ImageView";
import PriceView from "@/components/user/products/PriceView";
import ProductCharacteristics from "@/components/user/products/ProductCharacteristics";
import { getFakeProductBySlug } from "@/constants/fakeData";
import { Product } from "@/types";
import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import { useParams } from "react-router";

const SingleProductPage = () => {
  const { slug } = useParams();
  const product = getFakeProductBySlug(slug as string);
  if (!product) {
    return <div>Product not found!</div>;
  }
  return (
    <div className="flex flex-col md:flex-row gap-10 py-5">
      {product?.images && (
        <ImageView images={product?.images} isStock={product?.stock} />
      )}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <p className="text-sm text-gray-600 tracking-wide">
            {product?.description}
          </p>
          <div className="flex items-center gap-0.5 text-xs">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={20}
                className="text-shop_light_green"
                fill={"#3b9c3c"}
              />
            ))}
            <p className="font-semibold">{`(120)`}</p>
          </div>
        </div>
        <div className="space-y-2 border-t border-b border-gray-200 py-5">
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-lg font-bold"
          />
          <p
            className={`px-4 py-1.5 text-sm text-center inline-block font-semibold rounded-lg ${product?.stock === 0 ? "bg-red-100 text-red-600" : "text-green-600 bg-green-100"}`}
          >
            {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <div className="flex items-center gap-2.5 lg:gap-3">
          <AddToCartButton product={product as Product} />
          <FavoriteButton showProduct={true} product={product as Product} />
        </div>
        <ProductCharacteristics product={product as Product} />
        <div className="flex flex-col">
          <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
            <Truck size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">
                Miễn phí vận chuyển
              </p>
              <p className="text-sm text-gray-500 underline underline-offset-2">
                Nhập mã bưu điện để kiểm tra tính sẵn sàng vận chuyển.
              </p>
            </div>
          </div>
          <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
            <CornerDownLeft size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">
                Hoàn trả vận chuyển
              </p>
              <p className="text-sm text-gray-500 ">
                Miễn phí hoàn trả vận chuyển trong vòng 30 ngày.{" "}
                <span className="underline underline-offset-2">Chi tiết</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
