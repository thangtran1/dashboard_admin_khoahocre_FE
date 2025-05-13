import Header from "@/layouts/dashboard/header";
import Logo from "@/assets/images/logo.png";
import { useUserInfo } from "@/store/userStore";
import { useTranslation } from "react-i18next";
import { Image } from "antd";

import HeaderTop from "./public/header-top";
import { useState } from "react";
import CoursesTop from "./public/courses-top";
import TopicList from "./public/topic-list";
import TipsAi from "./public/tips-ai";
import WhyChooseCourse from "./public/why-choose-course";
import Blog from "./public/blog";
import NearFooter from "./public/near-footer";
import Footer from "./public/footer";
import Testimonials from "./public/testimonials";
const UserHomePage = () => {
  const { username } = useUserInfo();
  const { t } = useTranslation();
  return (
    <div>
      <div className="px-4 flex justify-between items-center">
        <div className="flex justify-between items-center">
          <Image src={Logo} width={62} height={62} className="rounded-lg" />
          {username}
        </div>
        <Header />
      </div>
      <div className="bg-blue-600 text-white text-sm text-center py-1 px-2">
        THAM GIA CỘNG ĐỒNG (2) ĐỂ NHẬN THÔNG BÁO, VOUCHER VÀ KHÓA HỌC MIỄN PHÍ
        DÀNH RIÊNG CHO NHÓM! 👉{" "}
        <a href="#" className="underline font-semibold">
          BẤM VÀO ĐÂY
        </a>
      </div>
      <div className="w-[100%] text-[20px] flex flex-col gap-6 px-4 py-3 md:px-6 lg:px-16 md:w-[70%] mx-auto">
        <HeaderTop />
        <CoursesTop />
        <TopicList />
        <TipsAi />
        <Blog />
        <Testimonials />
      </div>

      {/* WhyChooseCourse full width */}
      <div className="w-full pb-20">
        <WhyChooseCourse />
        <NearFooter />
        <Footer />
      </div>
    </div>
  );
};

export default UserHomePage;
