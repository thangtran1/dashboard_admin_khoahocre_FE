import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { blogs } from "./public/dataExport";
import { Pagination } from "@heroui/react";
import Breadcrumbs from "@/utils/Breadcrumb";

const BlogGridPage = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const totalPages = Math.ceil(blogs.length / pageSize);
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const [selected, setSelected] = useState<string[]>([]);

  const topics = [
    "AI Tổng Hợp",
    "Khóa Hot Nhất",
    "Lập Trình Web",
    "Thiết Kế Đồ Họa",
    "Marketing Online",
    "Phân Tích Dữ Liệu",
    "Kỹ Năng Mềm",
    "Học Máy",
    "Sản Xuất Video",
    "Chụp Ảnh",
    "Thuyết Trình",
    "React",
    "Node.js",
    "Thiết Kế Đồ Họa (2)",
    "Marketing Online (3)",
    "Marketing Online (4)",
    "Marketing Online (5)",
    "Marketing Online (6)",
  ];

  const categories = [
    { name: "Công Nghệ Thông Tin", count: 33 },
    { name: "Data", count: 14 },
    { name: "Đầu Tư", count: 69 },
    { name: "Facebook", count: 11 },
    { name: "Group Buy", count: 14 },
    { name: "Kinh Doanh", count: 12 },
    { name: "Kỹ Năng", count: 20 },
    { name: "Marketing", count: 70 },
    { name: "MMO - Kiếm Tiền Online", count: 35 },
    { name: "Ngoại Ngữ", count: 8 },
    { name: "Người Nổi Tiếng", count: 3 },
    { name: "Nhiếp ảnh & Dựng phim", count: 14 },
    { name: "Phát triển bản thân", count: 11 },
    { name: "Phong Cách Sống", count: 22 },
    { name: "Sách Ebook", count: 1 },
  ];

  const handleSelect = (name: string) => {
    setActive((prev) => (prev === name ? null : name));
  };

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filtered = topics.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section className="w-full py-6">
      <Breadcrumbs />

      <h2 className="text-2xl font-bold mb-6">Danh Sách Bài Viết</h2>

      <div className="xl:flex xl:gap-6">
        {/* Grid blog - chiếm 3 cột */}
        <div className="w-full xl:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedBlogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-background border shadow rounded-lg overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-3">
                <h3 className="text-base font-semibold line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {blog.desc}
                </p>
                <div className="text-xs text-gray-500 flex items-center gap-2 mt-2">
                  <span>🏷 {blog.category}</span>
                  <span>📅 {blog.date}</span>
                </div>
                <a
                  href="#"
                  className="mt-2 inline-flex items-center text-md font-medium text-blue-600 hover:underline"
                >
                  Đọc thêm <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar - chiếm 1 cột bên phải */}
        <div className="w-full xl:w-1/4 mt-6 xl:mt-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
          <div className="bg-background border border-border p-4 rounded-xl">
            <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded font-bold mb-2 inline-block">
              VIP.
            </span>
            <h3 className="text-lg font-bold mb-2">Gói Hội Viên</h3>
            <p className="text-sm mb-4 leading-relaxed">
              Ưu đãi học toàn bộ 5000 khóa học
              <br />
              shop đang sở hữu và đăng bán,
              <br />
              cập nhập mới nhất <b>2025!!!</b>
            </p>
            <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-300 transition">
              HỌC THỬ NGAY!
            </button>
          </div>

          <div className="bg-background p-4 border border-border rounded-lg shadow space-y-3 text-sm">
            <div className="flex justify-between items-center font-semibold">
              <span>Bộ lọc bổ sung</span>
              <button
                className="text-blue-600 text-xs hover:underline"
                onClick={() => setSelected([])}
              >
                Reset
              </button>
            </div>

            <input
              type="text"
              placeholder="Tìm chủ đề..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded outline-none focus:ring-1 focus:ring-blue-500"
            />

            <div className="max-h-120 overflow-y-auto pr-1 space-y-2">
              {filtered.map((topic) => (
                <label
                  key={topic}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(topic)}
                    onChange={() => toggle(topic)}
                    className="accent-blue-600"
                  />
                  <span className="text-base">{topic}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-background p-4 rounded-lg border border-border shadow-sm text-sm space-y-2">
            <h3 className="font-semibold mb-2">Mục Lục Khóa Học:</h3>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  onClick={() => handleSelect(cat.name)}
                  className={`flex justify-between items-center cursor-pointer px-2 py-1 rounded hover:bg-muted ${
                    active === cat.name ? "text-blue-600 font-medium" : ""
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-gray-500 text-sm">({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="text-right mt-5 flex justify-center">
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={(p) => {
            setCurrentPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          showControls
          siblings={1}
          boundaries={1}
          classNames={{
            item: "rounded-full bg-background hover:bg-primary transition",
            prev: "bg-muted  hover:bg-primary rounded-full",
            next: "bg-muted  hover:bg-primary rounded-full",
            ellipsis: "text-gray-400",
          }}
        />
      </div>
    </section>
  );
};

export default BlogGridPage;
