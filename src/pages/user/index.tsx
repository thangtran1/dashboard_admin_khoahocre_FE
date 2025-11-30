import TopicList from "./public/topic-list";
import NewCourses from "./public/new-courses";
import BlogPage from "./blog/page";

const UserHomePage = () => {
  return (
    <>
      <NewCourses />
      <TopicList />
      <BlogPage />
    </>
  );
};

export default UserHomePage;
