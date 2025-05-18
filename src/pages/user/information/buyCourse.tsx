import Breadcrumbs from "@/utils/Breadcrumb";

type Step = {
  step: number;
  title: string;
  description: string;
  imageUrl: string;
};

export const BuyCourse = () => {
  const steps: Step[] = [
    {
      step: 1,
      title: "Truy cập trang chủ",
      description:
        "Truy cập trang web khoahocre.com. Lựa chọn khóa bạn muốn đăng ký",
      imageUrl: "https://khoahocre.com/wp-content/uploads/2024/10/1-1.png",
    },
    {
      step: 2,
      title: "Bấm vào học ngay",
      description:
        "Thêm vào giỏ hàng. Một số khóa chưa up video hãy nhắn ad để học thử",
      imageUrl: "https://khoahocre.com/wp-content/uploads/2024/10/2.png",
    },
    {
      step: 3,
      title: "Thêm vào giỏ hàng",
      description:
        "Nhấn vào biểu tượng giỏ hàng để kiểm tra các khóa học đã chọn.",
      imageUrl: "https://khoahocre.com/wp-content/uploads/2024/10/3.png",
    },
    {
      step: 4,
      title: "Bấm thanh toán",
      description:
        "Thao tác thêm bớt đơn hàng nhanh, chốt số lượng và bấm thanh toán",
      imageUrl: "https://khoahocre.com/wp-content/uploads/2024/10/4.png",
    },
    {
      step: 5,
      title: "Điền thông tin",
      description:
        "Nếu chưa có tài khoản hãy bấm tạo sau đó điền thông tin cơ bản. Nếu đã có tài khoản chuyển đến bước 6",
      imageUrl: "https://khoahocre.com/wp-content/uploads/2024/10/5.png",
    },
    {
      step: 6,
      title: "Bấm đặt hàng",
      description:
        "Điền thông tin, áp mã giảm giá và bấm đặt hàng để nhận ưu đãi",
      imageUrl: "https://khoahocre.com/wp-content/uploads/2024/10/6.png",
    },
    {
      step: 7,
      title: "Thanh toán",
      description: "Chuyển khoản điền nội dung chuẩn, nhận khóa học sau 3 giây",
      imageUrl: "https://khoahocre.com/wp-content/uploads/2024/10/7.png",
    },
    {
      step: 8,
      title: "Truy cập hồ sơ",
      description:
        "Truy cập hồ sơ, bấm vào khóa học để xem hoặc kiểm tra địa chỉ gmail.",
      imageUrl: "https://khoahocre.com/wp-content/uploads/2024/10/8.png",
    },
  ];

  return (
    <>
      <div className="p-2 mb-6 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>

      <section className="bg-muted text-center rounded-lg border border-border py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/images/pattern.svg')] bg-cover bg-no-repeat" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 uppercase">
            QUY TRÌNH 8 BƯỚC ĐĂNG KÝ TRONG VÒNG 30{" "}
            <br className="hidden md:block" />
            GIÂY
          </h2>
        </div>
      </section>

      {steps.map(({ step, title, description, imageUrl }) => (
        <section key={step} className="w-full py-8">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Text bên trái */}
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold mb-4">
                Bước {step}: {title}
              </h2>
              <p className="text-2xl text-gray-700">{description}</p>
            </div>

            {/* Ảnh bên phải */}
            <div className="w-full md:w-full">
              <img
                src={imageUrl}
                alt={`Bước ${step}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>
      ))}
      <section className="w-full rounded-lg p-4 bg-muted py-16">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Box 1: Đăng ký khóa học */}
          <div className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-white to-[#d3e5ff] text-center p-8">
            <img
              src="https://khoahocre.com/wp-content/uploads/2024/10/1-1.png"
              alt="Đăng ký khóa học"
              className="w-full h-auto rounded-lg mb-6"
            />
            <h3 className="text-2xl text-primary md:text-3xl font-bold mb-4">
              Đăng Ký Khóa Học
            </h3>
            <p className="text-gray-700 mb-6">
              Sở hữu vĩnh viễn, shop cập nhật các khóa học mới nhất 2024 tại đây
            </p>
            <a
              href="https://khoahocre.com/shop-khoa-hoc/"
              className="inline-block border border-primary rounded-full  px-6 py-3 font-medium transition"
            >
              Shop Khóa Học
            </a>
          </div>

          {/* Box 2: Đăng ký hội viên */}
          <div className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-white to-[#fff1c0] text-center p-8">
            <img
              src="https://khoahocre.com/wp-content/uploads/2024/10/2.png"
              alt="Đăng ký hội viên"
              className="w-full h-auto rounded-lg mb-6"
            />
            <h3 className="text-2xl text-primary md:text-3xl font-bold mb-4">
              Đăng Ký Hội Viên
            </h3>
            <p className="text-gray-700 mb-6">
              Ưu đãi đặc quyền học toàn bộ khóa học hơn 5000+ khóa, miễn phí
              update
            </p>
            <a
              href="https://khoahocre.com/goi-hoi-vien/"
              className="inline-block border border-primary rounded-full  px-6 py-3 font-medium transition"
            >
              Gói Hội Viên
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
