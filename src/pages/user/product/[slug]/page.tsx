import { useParams } from "react-router";
import { Tabs } from "antd";
import { StarIcon, Truck, CornerDownLeft } from "lucide-react";

import ImageView from "@/components/user/products/ImageView";
import PriceView from "@/components/user/products/PriceView";
import ProductCharacteristics from "@/components/user/products/ProductCharacteristics";
import AddToCartButton from "@/components/user/AddToCartButton";
import FavoriteButton from "@/components/user/FavoriteButton";

import { getFakeProductBySlug } from "@/constants/fakeData";
import { Product } from "@/types";

const SingleProductPage = () => {
  const { slug } = useParams();
  const product = getFakeProductBySlug(slug as string);

  if (!product) return <div>Product not found!</div>;

  /*------------------------------------
   | TABS – Mô tả + Đánh giá
   ------------------------------------*/
  const items = [
    {
      key: "details",
      label: "Mô tả sản phẩm",
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Thông tin sản phẩm */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Thông tin sản phẩm</h3>
            <div className="space-y-3 p-4 bg-muted border rounded-lg text-sm">
              {[
                { label: "Thương hiệu", value: product.brand?.name },
                { label: "Danh mục", value: product.category?.name },
                { label: "Tình trạng", value: product.stock === 0 ? "Hết hàng" : "Còn hàng" },
                { label: "Bảo hành", value: product.warrantyPeriod || "12 tháng" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b pb-2 last:border-none last:pb-0"
                >
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value || "Đang cập nhật"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Đặc điểm nổi bật */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Đặc điểm nổi bật</h3>
            <div className="text-sm leading-relaxed bg-muted p-4 border rounded-lg">
              {product.description ? (
                <p className="whitespace-pre-line">{product.description}</p>
              ) : (
                <p className="italic">Chưa có mô tả</p>
              )}
            </div>
          </div>

          {/* Mô tả chi tiết */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-3">Mô tả chi tiết</h3>
            <div className="p-4 border rounded-lg bg-muted text-sm leading-relaxed">
              {product.description ? (
                <div
                  className="prose max-w-full"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <p className="italic">Chưa có mô tả chi tiết</p>
              )}
            </div>
          </div>

          {/* Thông số kỹ thuật */}
          {product.specifications && (
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-3">Thông số kỹ thuật</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <div
                    key={idx}
                    className="flex justify-between p-3 border bg-muted rounded-lg"
                  >
                    <span className="capitalize">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    },

    /*------------------------------------
     | TAB – Đánh giá
     ------------------------------------*/
    {
      key: "reviews",
      label: "Đánh giá",
      children: (
        <div className="space-y-6 max-h-[600px] overflow-y-auto">
          {product.reviews?.map((review) => (
            <div key={review._id} className="pb-4 border-b">
              <div className="flex items-center gap-3">
                <img
                  src={"/images/avatar/avatar-default.png"}
                  alt={review.user.name}
                  className="w-10 h-10 border rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-sm">{review.user.name}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        size={16}
                        className="text-shop_light_green"
                        fill="#3b9c3c"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-foreground mt-1">
                {new Date(review.createdAt).toLocaleDateString("vi-VN")} • Phân loại:{" "}
                {review.type}
              </p>

              <p className="text-md mt-2">{review.comment}</p>

              {review.images?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {review.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      {/*------------------------------------
        PRODUCT AREA
      ------------------------------------*/}
      <div className="flex flex-col md:flex-row gap-10 pt-5">
        {product.images && (
          <ImageView images={product.images} isStock={product.stock} />
        )}

        {/* Right side: title + price + actions */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">

          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{product.name}</h2>

            <p className="text-sm text-muted-foreground">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-0.5 text-xs">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  size={20}
                  className="text-shop_light_green"
                  fill="#3b9c3c"
                />
              ))}
              <p className="font-semibold">(120)</p>
            </div>
          </div>

          {/* Price + stock */}
          <div className="space-y-2 border-y py-5">
            <PriceView
              price={product.price}
              discount={product.discount}
              className="text-lg font-bold"
            />

            <p
              className={`px-4 py-1.5 text-sm text-center font-semibold rounded-lg ${
                product.stock === 0
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <AddToCartButton product={product as Product} />
            <FavoriteButton product={product as Product} showProduct />
          </div>

          {/* Characteristics */}
          <ProductCharacteristics product={product as Product} />

          {/* Info Boxes */}
          <div className="flex flex-col">
            {/* Free shipping */}
            <div className="border p-3 flex items-center gap-3">
              <Truck size={30} className="text-shop_orange" />
              <div>
                <p className="font-semibold">Miễn phí vận chuyển</p>
                <p className="text-sm underline">Nhập mã bưu điện để kiểm tra.</p>
              </div>
            </div>

            {/* Return shipping */}
            <div className="border border-t-0 p-3 flex items-center gap-3">
              <CornerDownLeft size={30} className="text-shop_orange" />
              <div>
                <p className="font-semibold">Hoàn trả vận chuyển</p>
                <p className="text-sm">
                  Miễn phí hoàn trả trong 30 ngày.{" "}
                  <span className="underline">Chi tiết</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*------------------------------------
        TABS
      ------------------------------------*/}
      <div className="border-t py-5">
        <Tabs defaultActiveKey="details" items={items} size="large" />
      </div>
    </>
  );
};

export default SingleProductPage;
