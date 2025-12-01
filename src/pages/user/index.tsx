import CategoryProduct from "./public/category-product";
import BlogPage from "./blog/page";
import ShopByBrands from "./public/ShopByBrands";
import ProductGrid from "./public/ProductGrid";

const UserHomePage = () => {
  return (
    <>
      <ProductGrid />
      <CategoryProduct />
      <ShopByBrands />
      <BlogPage />
    </>
  );
};

export default UserHomePage;
