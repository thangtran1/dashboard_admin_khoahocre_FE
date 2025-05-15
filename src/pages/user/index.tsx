import TopicList from "./public/topic-list";
import TipsAi from "./public/tips-ai";
import Blog from "./public/blog";
import Testimonials from "./public/testimonials";
import MobileBottomNav from "./public/mobile-bottom";
import Voucher from "./public/voucher";
import WhyChooseCourse from "./public/why-choose-course";
import YouTube from "./public/youtube";

const UserHomePage = () => {
  return (
    <>
      <Voucher />
      <YouTube />
      <TopicList />
      <TipsAi />
      <Blog />
      <Testimonials />
      <MobileBottomNav />
      <WhyChooseCourse />
    </>
  );
};

export default UserHomePage;
