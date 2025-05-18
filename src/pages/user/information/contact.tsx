"use client";

import Breadcrumbs from "@/utils/Breadcrumb";
import { inputClass } from "@/utils/use-always";
import { useState } from "react";
const Contact = () => {
  const [showTerms, setShowTerms] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    subscribe: false,
    agree: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("📩 Contact Form Submitted:", form);
    alert("Thông tin đã được gửi!");
  };

  return (
    <>
      <div className="p-2 mb-6 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>
      <section className="bg-muted text-center rounded-lg border border-border  py-20 px-4 relative overflow-hidden">
        {/* Optional: background pattern nếu có */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/images/pattern.svg')] bg-cover bg-no-repeat" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 uppercase">
            CHÚNG TÔI CÓ THỂ GIÚP <br className="hidden md:block" />
            BẠN NHƯ THẾ NÀO?
          </h2>
          <p className="text-base md:text-lg">
            Một thành viên trong đội ngũ Khóa Học Rẻ luôn sẵn sàng hỗ trợ bạn
            giải đáp mọi thắc mắc. Hãy để chúng tôi hiểu rõ hơn về bạn và nhu
            cầu của bạn.
          </p>
        </div>
      </section>

      <section className="mx-auto grid md:grid-cols-2 gap-10">
        {/* Left: Info */}
        <div className="text-left space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            Hãy điền thông tin cần hỗ trợ, <br />
            <span className="text-primary">chúng tôi sẽ support cho bạn</span>
          </h2>

          <div>
            <h3 className="font-semibold text-lg mb-2">
              Dưới Đây Là Những Gì Chúng Tôi Có Thể Hỗ Trợ:
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {[
                "Hãy thảo luận với đội ngũ của chúng tôi về các yêu cầu khóa học trực tuyến của bạn.",
                "Gặp vấn đề trong quá trình học? Chúng tôi ở đây để giải quyết.",
                "Nếu bạn muốn hợp tác, chúng tôi rất vui được lắng nghe ý tưởng của bạn.",
                "Đừng ngần ngại đặt câu hỏi, chúng tôi sẵn sàng hỗ trợ bạn.",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold">✔</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-gray-600">
            Hãy xem ngay{" "}
            <a
              href="/chinh-sach-ho-tro"
              className="text-primary font-medium underline"
            >
              Chính Sách Hỗ Trợ
            </a>{" "}
            của chúng tôi để tìm các hướng dẫn cài đặt, cập nhật tính năng, và
            bài viết, khóa học khắc phục sự cố.
          </p>
        </div>

        {/* Right: Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-left bg-background p-6 rounded-lg shadow-md border border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              required
              placeholder="*Your Name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="*Email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <input
            type="text"
            name="subject"
            required
            placeholder="*Subject"
            value={form.subject}
            onChange={handleChange}
            className={inputClass}
          />
          <textarea
            name="message"
            required
            placeholder="*Message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className={inputClass}
          />

          <div className=" space-y-3 text-sm">
            {/* Phần nội dung điều khoản — hiển thị phía trên */}
            {showTerms && (
              <div className="max-h-60 overflow-y-auto border rounded p-3 bg-background shadow-inner">
                <div className="space-y-2 text-base">
                  <div>📜 ĐIỀU KHOẢN SỬ DỤNG WEBSITE – KHOAHOCRE.COM</div>
                  <p>
                    <strong>khoahocre.com</strong> là nền tảng chia sẻ học liệu
                    do cộng đồng đóng góp, giúp người học tiếp cận kiến thức một
                    cách tiết kiệm, nhanh chóng và tiện lợi.
                  </p>
                  <p>
                    1. 📦 Nội dung & phạm vi: chia sẻ Tất cả tài nguyên tại
                    website bao gồm video, tài liệu, học liệu điện tử,… được
                    tổng hợp từ các nguồn công khai hoặc do người dùng đóng góp.
                    Khoahocre.com không tuyên bố sở hữu bản quyền toàn bộ nội
                    dung được chia sẻ. Việc truy cập nội dung chỉ dành cho người
                    dùng đã thanh toán phí hỗ trợ hệ thống để duy trì máy chủ,
                    lưu trữ, và hỗ trợ kỹ thuật, hoàn toàn không mang tính
                    thương mại hóa nội dung.
                  </p>
                  <p>
                    2. 🔒 Bản quyền & khiếu nại: Chúng tôi không chịu trách
                    nhiệm bản quyền đối với nội dung do người dùng đóng góp hoặc
                    sưu tầm từ internet. Nếu bạn là chủ sở hữu hợp pháp và không
                    đồng ý với việc chia sẻ, hãy liên hệ qua email:
                    admin@khoahocre.com. Chúng tôi cam kết xử lý thiện chí và gỡ
                    bỏ nhanh chóng. ⚠️ Việc chia sẻ lại tài nguyên vì mục đích
                    thương mại hoặc vi phạm quyền sở hữu trí tuệ có thể dẫn đến
                    khóa tài khoản vĩnh viễn.
                  </p>
                  <p>
                    3. 👤 Quy định về tài khoản: Mỗi người dùng chỉ nên đăng ký
                    và sử dụng một tài khoản duy nhất. Không chia sẻ tài khoản
                    hoặc sử dụng cho mục đích thương mại. Người dùng chịu trách
                    nhiệm bảo mật và hành vi sử dụng tài khoản của mình.
                  </p>
                  <p>
                    4. 📬 Liên hệ Email: thangtrandz04@gmail.com Zalo CSKH:
                    0888.993.991 Fanpage: vanthang.io.vn
                  </p>
                </div>
              </div>
            )}

            {/* Checkbox — nằm dưới nội dung */}
            <label className="flex items-center gap-2 whitespace-nowrap">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              Tôi đã đọc và đồng ý với{" "}
              <span
                onClick={() => setShowTerms((prev) => !prev)}
                className="underline text-primary cursor-pointer"
              >
                điều khoản và điều kiện
              </span>{" "}
              của website
            </label>
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition"
          >
            Submit
          </button>
        </form>
      </section>
      <section className="bg-muted rounded-lg border-border py-6">
        <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm md:text-base text-foreground">
          {/* Địa chỉ */}
          <div className="flex flex-col items-center">
            <div className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 text-xl">
              📍
            </div>
            <h3 className="font-semibold text-lg mb-1">Địa Chỉ</h3>
            <p>Làng Obung, Xã Iako, Huyện Chư Sê, Tỉnh Gia Lai</p>
          </div>

          {/* Thông tin liên hệ */}
          <div className="flex flex-col items-center">
            <div className="bg-primary w-12 h-12 flex items-center justify-center rounded-full mb-4 text-xl">
              💬
            </div>
            <h3 className="font-semibold text-lg mb-1">Thông Tin Liên Hệ</h3>
            <p>Tin Nhắn: (+84) - 389.215.396</p>
            <p>Hotline: 0389.215.396</p>
            <p className="break-all">Mail: thangtrandz04@gmail.com</p>
          </div>

          {/* Thời gian làm việc */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-400 text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 text-xl">
              ⏰
            </div>
            <h3 className="font-semibold text-lg mb-1">Thời Gian Làm Việc</h3>
            <p>Thứ Hai – Thứ Bảy: 07:00 - 23:59</p>
            <p>Chủ Nhật: 8:00 - 22:00</p>
          </div>
        </div>
        <h1 className="mt-4 text-center">
          Hãy liên hệ với chúng tôi nếu bạn gặp thắc mắc hoặc khó khăn gì qua:{" "}
          <a
            href="https://vanthang.io.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-primary underline"
          >
            vanthang.io.vn
          </a>
        </h1>
      </section>
    </>
  );
};

export default Contact;
