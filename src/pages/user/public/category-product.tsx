import Title from "@/ui/title";
import { Link } from "react-router";
import SeeMore from "@/ui/see-more";
import { CategoryStatus } from "@/types/enum";
import { Category, categoryService } from "@/api/services/category";
import { useEffect, useState } from "react";

const CategoryProduct = async () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchCategories = async () => {
    const response = await categoryService.getAllCategories(1, 6, {
      status: CategoryStatus.ACTIVE,
    });
    if (response.success) {
      setCategories(response.data.data);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Title className="text-2xl font-semibold">Danh mục phổ biến</Title>
        <SeeMore to="/category-product">Xem thêm</SeeMore>
      </div>

      {/* Grid Items */}
      <div className="grid grid-cols-1 border border-border rounded-xl shadow-sm p-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {categories?.map((category) => (
          <Link
            key={category?._id}
            to={`/category/${category?.slug}`}
            className="
          group flex items-center gap-4 p-4 rounded-xl border border-border
          hover:shadow-md hover:border-primary/30 transition-all duration-300
          bg-white
        "
          >
            {category?.image && (
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-border p-1 bg-gray-50">
                <img
                  src={category?.image || "/images/products/product_1.png"}
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
