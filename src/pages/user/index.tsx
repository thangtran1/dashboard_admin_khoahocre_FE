import TopicList from "./public/topic-list";
import NewCourses from "./public/new-courses";
import BlogPage from "./blog/page";
import ShopByBrands from "./public/ShopByBrands";

const UserHomePage = () => {
  return (
    <>
      <NewCourses />
      <TopicList />
      <ShopByBrands />
      <BlogPage />
    </>
  );
};

export default UserHomePage;
