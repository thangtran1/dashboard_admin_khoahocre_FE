import { contentWrapper } from "@/utils/use-always";
import { Button } from "@heroui/react";
import { Image } from "antd";
import clsx from "clsx";
import { Heart } from "lucide-react";

const NearFooter = () => {
  return (
    <section className="bg-muted">
      <div
        className={clsx(
          "w-full lg:px-16 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center",
          contentWrapper
        )}
      >
        <div className="flex justify-center items-center bg-transparent w-full">
          <Image
            src="https://khoahocre.com/wp-content/uploads/2023/05/banner-footer-1.png"
            alt="Trao đổi khóa học"
            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-3xl object-contain"
          />
        </div>

        <div className="text-center py-6 md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            BẠN CÓ KHÓA HỌC NHƯNG ĐÃ HỌC XONG?
          </h2>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Cùng nhau chia sẻ tri thức và nhận lại nhiều giá trị hơn!
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Trao đổi khóa học là cách tuyệt vời để cả hai bên cùng có lợi: bạn
            sẽ mở rộng kiến thức với những khóa học chất lượng và chúng tôi sẽ
            gia tăng nội dung phong phú, giúp nhiều người có cơ hội tiếp cận
            hơn. Đây là cơ hội hợp tác Win-Win để mọi người cùng phát triển!
          </p>
          <Button className="bg-primary hover:bg-primary/80  font-semibold text-base px-5 py-3 rounded flex items-center gap-2">
            <Heart size={16} /> Trao Đổi Khóa Học Ngay!
          </Button>
        </div>
      </div>
    </section>
  );
};
export default NearFooter;
