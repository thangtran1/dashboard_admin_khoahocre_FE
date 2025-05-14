import { ThemeProvider } from "@/theme/theme-provider";
import { AntdAdapter } from "@/theme/adapter/antd.adapter";
import HeaderTop from "@/pages/user/public/header-top";
import Footer from "@/pages/user/public/footer";
import NearFooter from "@/pages/user/public/near-footer";
import WhyChooseCourse from "@/pages/user/public/why-choose-course";
import { Image } from "antd";
import Logo from "@/assets/images/logo.png";
import { useUserInfo } from "@/store/userStore";
import Header from "@/layouts/dashboard/header";
import clsx from "clsx";
import { contentWrapper } from "@/utils/use-always";
import { Link, Outlet } from "react-router";

export default function UserLayout() {
  const { username } = useUserInfo();
  return (
    <ThemeProvider adapters={[AntdAdapter]}>
      <div className="px-4 py-3 bg-background text-foreground flex justify-between items-center border-b border-border">
        <div className="flex items-center gap-3">
          <Image src={Logo} width={62} height={62} className="rounded-lg" />
          <span className="text-sm font-medium">{username}</span>
        </div>
        <Header />
      </div>
      <div className="bg-blue-600 text-white text-sm text-center p-2">
        THAM GIA CỘNG ĐỒNG (2) ĐỂ NHẬN THÔNG BÁO, VOUCHER VÀ KHÓA HỌC MIỄN PHÍ
        DÀNH RIÊNG CHO NHÓM! 👉
        <Link to="/blog" className="underline font-semibold">
          BẤM VÀO ĐÂY
        </Link>
      </div>
      <div className="bg-background text-foreground">
        <main
          className={clsx(
            "w-full flex flex-col gap-6 px-4 py-3 md:px-6 lg:px-16 mx-auto",
            contentWrapper
          )}
        >
          <HeaderTop />
          <Outlet /> {/* Route con sẽ hiển thị ở đây */}
        </main>
        <WhyChooseCourse />
        <NearFooter />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
