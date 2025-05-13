import CoursesTop from "./public/courses-top";
import TopicList from "./public/topic-list";
import TipsAi from "./public/tips-ai";
import Blog from "./public/blog";
import Testimonials from "./public/testimonials";
import UserLayout from "@/layouts/user/user-layout";
import MobileBottomNav from "./public/mobile-bottom";

const UserHomePage = () => {
  return (
    <UserLayout>
      <CoursesTop />
      <TopicList />
      <TipsAi />
      <Blog />
      <Testimonials />
      <MobileBottomNav />
    </UserLayout>
  );
};

export default UserHomePage;
