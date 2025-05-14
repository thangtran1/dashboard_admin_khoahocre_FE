import { contentWrapper } from "@/utils/use-always";
import { Image } from "antd";
import clsx from "clsx";

const Voucher = () => {
  return (
    <section className="border-b border-border">
      <div
        className={clsx(
          "flex flex-col items-center justify-center bg-background gap-6 mx-auto md:flex-row",
          contentWrapper
        )}
      >
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            TẶNG MÃ <span className="text-primary">KHR10</span> GIẢM 10% <br />
            DÀNH CHO BẠN MỚI! 🎉
          </h1>
          <p className="mb-6 text-muted-foreground">
            Nhập ngay mã KHR10 giảm 10% khi đăng ký lần đầu tại Khóa Học Rẻ –
            nền tảng chia sẻ khóa học trực tuyến giá tốt, đa dạng lĩnh vực như
            công nghệ, kinh doanh, tài chính, thiết kế.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-primary text-primary-foreground px-5 py-2 rounded-md font-medium">
              Tạo Tài Khoản Ngay
            </button>
            <button className="border border-primary text-primary px-5 py-2 rounded-md font-medium">
              Ghé Shop Khóa Học
            </button>
          </div>
        </div>
        <div className="flex items-center w-full justify-center p-2 max-w-md">
          <Image
            src="https://khoahocre.com/wp-content/uploads/2024/11/112.png"
            alt="Khóa học"
            className="object-contai rounded-lg w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
export default Voucher;
