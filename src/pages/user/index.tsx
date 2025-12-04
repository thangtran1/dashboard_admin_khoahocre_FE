import CategoryProduct from "./public/category-product";
import BlogPage from "./blog/page";
import ShopByBrands from "./public/ShopByBrands";
import ProductGrid from "./public/ProductGrid";
import HomeBanner from "./public/HomeBanner";
const UserHomePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <HomeBanner />
      <ProductGrid />
      <CategoryProduct />
      <ShopByBrands />
      <BlogPage />
    </div>
  );
};

export default UserHomePage;
