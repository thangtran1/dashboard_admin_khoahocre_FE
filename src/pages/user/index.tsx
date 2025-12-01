import CategoryProduct from "./public/category-product";
import NewCourses from "./public/new-courses";
import BlogPage from "./blog/page";
import ShopByBrands from "./public/ShopByBrands";

const UserHomePage = () => {
  return (
    <>
      <NewCourses />
      <CategoryProduct />
      <ShopByBrands />
      <BlogPage />
    </>
  );
};

export default UserHomePage;
