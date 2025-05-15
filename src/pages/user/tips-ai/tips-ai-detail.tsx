import { aiCourses } from "@/pages/user/public/dataExport";
import Breadcrumbs from "@/utils/Breadcrumb";
import { Divider } from "@heroui/react";
import { BookOpen, ChevronDown, Eye, Star, Users } from "lucide-react";
import { useRef, useState } from "react";
import { useLocation, useParams } from "react-router";

const TABS = [
  { id: "intro", label: "Giới Thiệu" },
  { id: "content", label: "Nội Dung Khóa Học" },
  { id: "teacher", label: "Giảng Viên" },
  { id: "review", label: "Đánh Giá" },
];

const COURSE_CONTENT = [
  {
    module: "Module 1: Xin Chào!",
    lessons: [
      "Bài 1: Xin chào!",
      "Bài 2: Những lưu ý!",
      "Bài 3: Tại sao lại là Youtube?",
    ],
  },
  {
    module: "Module 2: Tôi Nên Chọn Chủ Đề Nào?",
    lessons: [
      "Bài 4: Hướng dẫn chọn chủ đề tiềm năng",
      "Bài 5: Lập danh sách các đối thủ, đồng nghiệp",
      "Bài 6: Công cụ Socialblade",
    ],
  },
  // thêm module khác nếu cần
];

export default function TipsAiDetail() {
  const { id } = useParams();
  const average = 0;
  const total = 0;
  const breakdown: Record<number, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggleModule = (idx: number) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };
  const aiCourse = aiCourses.find((b) => b.id === id);

  if (!aiCourse) return <div className="p-4">Không tìm thấy bài viết</div>;
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const [form, setForm] = useState({
    comment: "",
    name: "",
    email: "",
    website: "",
  });
  const handleReset = () => {
    setForm({
      comment: "",
      name: "",
      email: "",
      website: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📝 Submitted:", form);
    alert("Đã gửi bình luận!");
  };
  return (
    <div>
      <div className="p-2 mb-2 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>
      <div className="mx-auto flex flex-col lg:flex-row gap-2">
        <aside className="order-1 lg:order-2 w-full lg:w-1/4 lg:sticky lg:top-24 h-fit">
          <div className="bg-background border rounded-xl shadow p-2 space-y-4">
            <div className="rounded-lg overflow-hidden">
              <img
                src={aiCourse.image}
                alt={aiCourse.title}
                className="w-full h-80 object-cover"
              />
              <div className="py-1">
                <h3 className="text-base font-semibold line-clamp-2">
                  {aiCourse.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {aiCourse.subTitle}
                </p>
                <div className="text-xs text-gray-500 flex items-center gap-3 mt-2">
                  <span>🏷 {aiCourse.oldPrice}</span>
                  <span>📅 {aiCourse.price}</span>
                </div>
              </div>
              <section className="mt-2 text-sm space-y-2 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-foreground">
                    Mã giảm giá của chúng tôi:
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-bold">
                    KHR10
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex tems-centeir gap-2">
                    <span>📅</span> Ngày cập nhập: 13 Tháng 5, 2025
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📚</span> Đầy đủ bài giảng
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⭐</span> Đánh giá khóa học: Yes
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔒</span> Quyền truy cập vĩnh viễn
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📈</span> Kỹ năng khóa học:
                    <span className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded">
                      All levels
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📜</span> Giấy chứng nhận hoàn thành
                  </div>
                </div>

                <div className="mt-2 flex flex-col">
                  <span className="text-blue-600 hover:underline font-medium text-sm">
                    Tham khảo gói hội viên để học 5000+ khóa khác
                  </span>
                  <span className="text-blue-600 hover:underline font-medium text-sm flex items-center gap-1">
                    🎉 Trao đổi khóa học gốc của bạn để học miễn phí!
                  </span>
                </div>
              </section>
            </div>
          </div>
        </aside>
        <div className="order-2 lg:order-1 w-full lg:w-3/4">
          <section className="bg-background border border-border md:px-6 py-6 md:py-8 rounded-lg shadow  mx-auto">
            <h1 className="text-xl md:text-3xl font-bold mb-3 text-foreground leading-snug">
              {aiCourse.title}
            </h1>

            <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
              {aiCourse.subTitle}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-sm text-muted-foreground mb-4">
              <span className="inline-flex items-center">👥 96 Học viên</span>
              <span className="inline-flex items-center text-yellow-500 font-medium gap-1">
                ⭐ 5.0{" "}
                <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-500" />
              </span>
              <span className="inline-flex items-center">💬 0 Bình luận</span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <img
                src="https://khoahocre.com/wp-content/uploads/learn-press-profile/1/498313db93f1dacbe7b3ebfe03e9f53e.png"
                alt="Giảng viên"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-semibold text-foreground">Giảng viên</p>
                <a
                  href="https://khoahocre.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  KhoaHocre.Com
                </a>
              </div>
            </div>
          </section>
          <section className="mx-auto mt-4">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-4 mb-4 justify-center overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollTo(tab.id)}
                  className="px-4 py-2 bg-success cursor-pointer text-sm rounded font-medium  hover:bg-primary"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sections */}
            <div className="space-y-12">
              <div
                ref={(el) => {
                  sectionRefs.current["intro"] = el;
                }}
                id="intro"
              >
                <h2 className="text-2xl py-2 font-bold mb-2 text-primary">
                  Giới Thiệu Khóa Học
                </h2>

                <div className="text-base leading-relaxed mb-4">
                  Bạn đang tìm kiếm một khóa học giúp bạn kiếm tiền trên YouTube
                  một cách bài bản và chuyên sâu? Khóa Học YouTube NDGroup chính
                  là lựa chọn hoàn hảo để bạn bắt đầu từ con số 0 và nhanh chóng
                  bật kiếm tiền, tạo nguồn thu nhập tự động bền vững!
                </div>

                <h1 className="font-semibold text-xl text-foreground mb-2 mt-4">
                  Tại Sao Bạn Nên Chọn Khóa Học YouTube NDGroup?
                </h1>
                <ul className="space-y-2 text-base text-muted-foreground list-none">
                  <li className="flex items-start gap-2">
                    ✅{" "}
                    <span>
                      <b>Học YouTube từ A-Z:</b> Hướng dẫn từ cơ bản đến nâng
                      cao, giúp bạn nắm vững cách vận hành kênh YouTube thành
                      công.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    ✅{" "}
                    <span>
                      <b>Xây kênh nhanh chóng:</b> Công thức xây dựng và phát
                      triển kênh thần tốc, đạt kết quả tốt chỉ trong 30 ngày.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    ✅{" "}
                    <span>
                      <b>Hỗ trợ 1-1 & Zoom chuyên sâu:</b> 8 buổi học trực
                      tuyến, giải đáp thắc mắc, kèm sát theo lộ trình cá nhân.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    ✅{" "}
                    <span>
                      <b>Tối ưu hóa nội dung:</b> Học cách làm video AI, chọn
                      chủ đề hot, tối ưu SEO giúp video lên xu hướng.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    ✅{" "}
                    <span>
                      <b>Cam kết kiếm tiền:</b> Được hướng dẫn chi tiết cách bật
                      kiếm tiền, tăng RPM và tối ưu doanh thu từ YouTube.
                    </span>
                  </li>
                </ul>

                <h1 className="font-semibold text-xl text-foreground mb-2 mt-4">
                  Bạn Sẽ Học Được Gì Từ Khóa Học YouTube NDGroup?
                </h1>
                <ul className="space-y-2 text-base text-muted-foreground list-disc list-inside">
                  <li>
                    <b>Học YouTube từ A-Z:</b> Cách chọn chủ đề, nghiên cứu thị
                    trường, tối ưu hóa video để kiếm tiền.
                  </li>
                  <li>
                    <b>Hướng dẫn xây hệ thống YouTube chuyên nghiệp:</b> Từ quy
                    trình tạo kênh đến chiến lược phát triển bền vững.
                  </li>
                  <li>
                    <b>Tối ưu video và edit content chuyên sâu:</b> Biết cách
                    chỉnh sửa video bằng AI, tạo nội dung phù hợp với ngách.
                  </li>
                  <li>
                    <b>Xây kênh YouTube trên điện thoại dễ dàng:</b> Công thức
                    giúp kênh đạt kết quả tốt chỉ trong 30 ngày.
                  </li>
                  <li>
                    <b>Làm YouTube kiếm tiền từ content ngoại:</b> Các ngách hot
                    như Funny, DIY, Farm, Sức khoẻ, Pháp, Kinh dị, Bóng đá, Tội
                    phạm…
                  </li>
                  <li>
                    <b>SEO YouTube & tìm từ khóa chuẩn viral:</b> Sử dụng tool
                    chuyên sâu giúp đo RPM và chọn từ khóa hiệu quả nhất.
                  </li>
                </ul>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["content"] = el;
                }}
                id="content"
              >
                <h2 className="text-2xl font-bold mb-2 text-primary">
                  Nội Dung Khóa Học
                </h2>
                <p className="text-base text-muted-foreground mb-2">
                  9 Chương • 43 Bài học • Truy cập vĩnh viễn
                </p>
                <div className="space-y-4">
                  {COURSE_CONTENT.map((module, idx) => (
                    <div key={idx} className="border rounded-md">
                      <button
                        className="w-full flex justify-between items-center px-4 py-3 bg-background hover:bg-muted transition"
                        onClick={() => toggleModule(idx)}
                      >
                        <span className="font-semibold text-sm text-primary">
                          {module.module}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expanded[idx] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {expanded[idx] && (
                        <ul className="px-4 py-2 space-y-2 text-sm text-muted-foreground">
                          {module.lessons.map((lesson, lidx) => (
                            <li
                              key={lidx}
                              className="flex items-center justify-between"
                            >
                              <span className="flex items-center gap-2">
                                📄 {lesson}
                              </span>
                              <span className="text-xs  border px-2 py-1 border-border rounded  flex items-center gap-1">
                                <Eye className="w-3 h-3" /> FREE
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div
                ref={(el) => {
                  sectionRefs.current["teacher"] = el;
                }}
                id="teacher"
              >
                <h2 className="text-2xl font-bold mb-2 text-primary">
                  Giảng Viên
                </h2>
                <div className="flex border border-border p-8 rounded-lg flex-col items-center gap-4">
                  <img
                    src="https://khoahocre.com/wp-content/uploads/learn-press-profile/1/498313db93f1dacbe7b3ebfe03e9f53e.png"
                    alt="KhoaHocRe.Com"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <h3 className="text-xl font-bold text-primary">
                    Khoahocre.Com
                  </h3>

                  <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-4 h-4" /> 4705 Sinh viên
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BookOpen className="w-4 h-4" /> 230 khóa học
                    </span>
                  </div>

                  <p className="text-base">
                    khoahocre.com – Nơi chia sẻ khóa học tiết kiệm chuẩn gốc
                  </p>
                </div>
              </div>
              <div
                ref={(el) => {
                  sectionRefs.current["review"] = el;
                }}
                id="review"
              >
                <h2 className="text-2xl font-bold mb-2 text-primary">
                  Đánh Giá
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold">{average.toFixed(1)}</div>
                  <div className="flex items-center gap-1 text-warning text-xl">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i <= Math.round(average) ? "fill-yellow-400" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Đánh giá {total}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = breakdown[star];
                    const percent =
                      total === 0 ? 0 : Math.round((count / total) * 100);
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <div className="w-5 font-medium">{star}</div>
                        <div className="w-12">{percent}%</div>
                        <div className="w-full h-3 bg-muted rounded">
                          <div
                            className="h-3 bg-primary rounded"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          <section className="mx-auto mb-4  mt-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Phản Hồi Về Khóa Học
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                rows={10}
                placeholder="Bình luận ***"
                required
                className="w-full border rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring focus:ring-blue-500"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Tên *"
                  required
                  className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email *"
                  required
                  className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  type="text"
                  placeholder="Trang web *"
                  required
                  className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-muted text-foreground hover:bg-muted/80 px-5 py-2 rounded text-sm border border-border"
                >
                  Xóa thông tin
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-green-700 text-white font-medium px-5 py-2 rounded text-sm"
                >
                  Gửi bình luận
                </button>
              </div>
            </form>
          </section>
          <Divider />
        </div>
      </div>
    </div>
  );
}
