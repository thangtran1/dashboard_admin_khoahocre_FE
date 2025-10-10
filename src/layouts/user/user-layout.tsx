import { ThemeProvider } from "@/theme/theme-provider";
import { AntdAdapter } from "@/theme/adapter/antd.adapter";
import HeaderTop from "@/pages/user/public/header-top";
import Footer from "@/pages/user/public/footer";
import NearFooter from "@/pages/user/public/near-footer";
import Logo from "@/components/logo";
import clsx from "clsx";
import { contentWrapper } from "@/utils/use-always";
import { Link, Outlet } from "react-router";
import ScrollToTop from "@/utils/ScrollToTop";
import LocalePicker from "@/components/locale-picker";
import SettingButton from "../components/setting-button";
import WhyChooseCourse from "@/pages/user/public/why-choose-course";
import NoticeButton from "../components/notice";

export default function UserLayout() {
  return (
    <ThemeProvider adapters={[AntdAdapter]}>
      <ScrollToTop />
      <div className="sticky top-0 left-0 w-full z-50 px-2 py-1 flex flex-row items-center justify-between bg-muted shadow">
        <div />
        <div className="flex items-center gap-2 font-medium cursor-pointer">
          <Logo size={28} />
          <span>TVT Admin</span>
        </div>
        <div className="flex items-center">
          <LocalePicker />
          <NoticeButton />
          <SettingButton />
        </div>
      </div>
      <div className="bg-primary text-muted text-sm text-center p-2">
        THAM GIA CỘNG ĐỒNG (2) ĐỂ NHẬN THÔNG BÁO, VOUCHER VÀ KHÓA HỌC MIỄN PHÍ
        DÀNH RIÊNG CHO NHÓM! 👉
        <Link
          to="/blog"
          className="underline bg-background !text-muted font-semibold"
        >
          BẤM VÀO ĐÂY
        </Link>
      </div>
      <div className="bg-background text-foreground">
        <main
          className={clsx(
            "w-full flex flex-col gap-4 px-4 py-3 md:px-6 lg:px-16 mx-auto",
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
