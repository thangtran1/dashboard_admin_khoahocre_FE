import Title from "@/ui/title";
import { Link } from "react-router";
import { fakeCategories } from "@/constants/fakeData";
import SeeMore from "@/ui/see-more";

const CategoryProduct = async () => {
  return (
    <div className="border border-border my-10 md:my-20 p-5 lg:p-7 rounded-xl shadow-sm">
      <div className="flex border-b pb-3 items-center justify-between">
      <Title className="text-lg font-semibold">
        Danh mục phổ biến
      </Title>
      <SeeMore to="/category-product">Xem Thêm</SeeMore>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fakeCategories?.map((category) => (
          <Link
            key={category?._id}
            to={`/category/${category?.slug?.current}`}
            className="
              group flex items-center gap-4 p-4 rounded-xl border border-border
              hover:shadow-md hover:border-primary/30 transition-all duration-300
              bg-white
            "
          >
            {category?.image && (
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-border p-1 bg-gray-50">
                <img
                  src={category?.image?.asset?.url || "/images/products/product_1.png"}
                  alt={category?.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}

            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {category?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">{`(${category?.productCount})`}</span>{" "}
                Sản phẩm có sẵn
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
