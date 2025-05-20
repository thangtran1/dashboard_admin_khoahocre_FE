import TopicList from "./public/topic-list";
import TipsAi from "./public/tips-ai";
import Blog from "./public/blog";
import Testimonials from "./public/testimonials";
import MobileBottomNav from "./public/mobile-bottom";
import Voucher from "./public/voucher";
import YouTube from "./public/youtube";
import NewCourses from "./public/new-courses";
import Market from "./public/market";
import GroupBuy from "./public/group-buy";

const UserHomePage = () => {
  return (
    <>
      <Voucher />
      <NewCourses />
      <TopicList />
      <YouTube />
      <Market />
      <TipsAi />
      <GroupBuy />
      <Testimonials />
      <Blog />
      <MobileBottomNav />
    </>
  );
};

export default UserHomePage;
