import Breadcrumbs from "@/utils/Breadcrumb";
import { Image } from "antd/lib";

const Introduce = () => {
  return (
    <>
      <div className="p-2 mb-2 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>
      <div className="text-center flex flex-col gap-10 text-foreground">
        {/* Section 1: Hero */}
        <section className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-snug">
            <span className="text-primary">KHÓA HỌC RẺ</span> NƠI CHIA SẺ
            <br />
            KHÓA HỌC TIẾT KIỆM <span className="text-primary">CHUẨN GỐC</span>
          </h1>
          <p className="mt-6 text-gray-600 text-sm md:text-base">
            Khóa Học Rẻ là nền tảng chia sẻ khóa học trực tuyến với mục tiêu
            giúp bạn học tập hiệu quả nhất mà không phải lo lắng về chi phí.
            Chúng tôi cam kết mang đến những khóa học chất lượng cao, đa dạng
            chủ đề từ công nghệ, kinh doanh, tài chính, đến thiết kế, giúp bạn
            nâng cao kiến thức và kỹ năng để phát triển sự nghiệp và cuộc sống.
          </p>
        </section>

        {/* Section 2: Stats */}
        <section className=" border border-border rounded-lg p-2">
          <div className=" mx-auto flex flex-col md:flex-row justify-between gap-10">
            <div className="text-left max-w-md">
              <h2 className="text-2xl font-bold mb-4">
                Chúng Tôi Không Ngừng Phát Triển
              </h2>
              <p className="text-sm">
                Tại Khóa Học Rẻ, sự hài lòng của học viên luôn là ưu tiên hàng
                đầu. Những con số sau là minh chứng cho sự phát triển không
                ngừng của chúng tôi:
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:max-w-lg">
              <div className="border border-primary p-4 rounded-lg font-semibold">
                <div className="text-2xl">17532</div>
                <div className="text-sm">Fanpage Followers</div>
              </div>
              <div className="border border-error  p-4 rounded-lg font-semibold">
                <div className="text-2xl">4583</div>
                <div className="text-sm">Khóa Học</div>
              </div>
              <div className="border border-border  p-4 rounded-lg font-semibold">
                <div className="text-2xl">10678</div>
                <div className="text-sm">Học Viên Đã Đăng Ký</div>
              </div>
              <div className="border border-warning  p-4 rounded-lg font-semibold">
                <div className="text-2xl">2678</div>
                <div className="text-sm">Giảng Viên</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Features */}
        <section className="mx-auto">
          <h2 className="text-2xl font-bold mb-2">
            Điều Gì Làm Chúng Tôi{" "}
            <span className="text-primary">Đặc Biệt ?</span>
          </h2>
          <p className="mb-10 text-sm">
            Tại Khóa Học Rẻ, bạn không chỉ tìm thấy những khóa học giá rẻ mà còn
            được đảm bảo về chất lượng nội dung và dịch vụ.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-lg overflow-hidden border border-border shadow bg-background text-left">
              <Image
                src="https://khoahocre.com/wp-content/uploads/2023/06/about-us-new-2-1.jpg"
                alt="Chúng Tôi Là?"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">Chúng Tôi Là?</h3>
                <p className="text-sm text-gray-600">
                  Khóa Học Rẻ là hệ sinh thái học tập trực tuyến giúp bạn tiết
                  kiệm chi phí nhưng vẫn đảm bảo chất lượng học tập. Chúng tôi
                  hợp tác với các giảng viên hàng đầu để mang đến trải nghiệm
                  học tập tốt nhất cho bạn.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-lg overflow-hidden border border-border shadow bg-background text-left">
              <Image
                src="https://khoahocre.com/wp-content/uploads/2023/06/about-us-new-2-1.jpg"
                alt="Chúng Tôi Làm Gì?"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">Chúng Tôi Làm Gì?</h3>
                <p className="text-sm text-gray-600">
                  Chúng tôi cung cấp hàng nghìn khóa học đa dạng lĩnh vực từ cơ
                  bản đến nâng cao. Từ công nghệ, marketing, tài chính đến kỹ
                  năng mềm – Khóa Học Rẻ luôn có giải pháp phù hợp cho bạn.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-lg border border-border overflow-hidden shadow bg-background text-left">
              <Image
                src="https://khoahocre.com/wp-content/uploads/2023/06/about-us-new-2-1.jpg"
                alt="Hoạt Động Như Thế Nào?"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">Hoạt Động Như Thế Nào?</h3>
                <p className="text-sm text-gray-600">
                  Chọn khóa học phù hợp → Thanh toán an toàn → Kích hoạt học
                  ngay. Chỉ mất 3 giây sau thanh toán là bạn đã có thể bắt đầu
                  hành trình học tập hiệu quả.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Introduce;
