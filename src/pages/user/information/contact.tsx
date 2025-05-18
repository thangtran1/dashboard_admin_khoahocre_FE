import Breadcrumbs from "@/utils/Breadcrumb";

const Contact = () => {
  return (
    <>
      <div className="p-2 mb-2 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>
      <section className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-snug">
          <span className="text-primary">KHÓA HỌC RẺ</span> NƠI CHIA SẺ
          <br />
          KHÓA HỌC TIẾT KIỆM <span className="text-primary">CHUẨN GỐC</span>
        </h1>
        <p className="mt-6 text-gray-600 text-sm md:text-base">
          Khóa Học Rẻ là nền tảng chia sẻ khóa học trực tuyến với mục tiêu giúp
          bạn học tập hiệu quả nhất mà không phải lo lắng về chi phí. Chúng tôi
          cam kết mang đến những khóa học chất lượng cao, đa dạng chủ đề từ công
          nghệ, kinh doanh, tài chính, đến thiết kế, giúp bạn nâng cao kiến thức
          và kỹ năng để phát triển sự nghiệp và cuộc sống.
        </p>
      </section>
    </>
  );
};

export default Contact;
