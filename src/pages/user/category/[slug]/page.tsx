"use client";

import Title from "@/ui/title";
import { getFakeCategories } from "@/constants/fakeData";
import { useParams } from "react-router";
import CategoryPage from "@/pages/user/category/page";

const DetailCategory = async () => {
  const { slug } = useParams();  
  const categories = await getFakeCategories();

  const currentSlug = slug || "all";
  
  const currentCategory = categories.find(cat => cat.slug?.current === slug);
  const categoryName = currentSlug === "all" ? "Tất cả sản phẩm" : currentCategory?.name || slug;

  return (
      <div>
        <Title>
          Sản phẩm theo danh mục:{" "}
          <span className="font-bold text-primary capitalize tracking-wide">
            {categoryName}
          </span>
        </Title>

        <CategoryPage categories={categories} slug={currentSlug} />
      </div>
  );
};

export default DetailCategory;
