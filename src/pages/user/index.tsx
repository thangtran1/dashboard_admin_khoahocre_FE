import CoursesTop from "./public/courses-top";
import TopicList from "./public/topic-list";
import TipsAi from "./public/tips-ai";
import Blog from "./public/blog";
import Testimonials from "./public/testimonials";
import MobileBottomNav from "./public/mobile-bottom";
import Voucher from "./public/voucher";

const UserHomePage = () => {
  return (
    <>
      <Voucher />
      <CoursesTop />
      <TopicList />
      <TipsAi />
      <Blog />
      <Testimonials />
      <MobileBottomNav />
    </>
  );
};

export default UserHomePage;
