import CoursesTop from "./public/courses-top";
import TopicList from "./public/topic-list";
import TipsAi from "./public/tips-ai";
import Blog from "./public/blog";
import Testimonials from "./public/testimonials";
import UserLayout from "@/layouts/user/user-layout";
import WhyChooseCourse from "./public/why-choose-course";
import NearFooter from "./public/near-footer";
import Footer from "./public/footer";

const UserHomePage = () => {
  return (
    <UserLayout>
      <CoursesTop />
      <TopicList />
      <TipsAi />
      <Blog />
      <Testimonials />
    </UserLayout>
  );
};

export default UserHomePage;
