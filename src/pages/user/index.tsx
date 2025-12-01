import CategoryProduct from "./public/category-product";
import BlogPage from "./blog/page";
import ShopByBrands from "./public/ShopByBrands";
import ProductGrid from "./public/ProductGrid";
import HomeBanner from "./public/HomeBanner";
const UserHomePage = () => {
  return (
    <>
      <HomeBanner />
      <ProductGrid />
      <CategoryProduct />
      <ShopByBrands />
      <BlogPage />
    </>
  );
};

export default UserHomePage;
