import { useState } from "react";

export const SiderBarDetail = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<string | null>(null);

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
  const filtered = topics.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );
  const handleSelect = (name: string) => {
    setActive((prev) => (prev === name ? null : name));
  };

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  return (
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
  );
};
