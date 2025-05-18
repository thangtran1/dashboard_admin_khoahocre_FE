"use client";

import { usePathname } from "@/router/hooks";
import { Link } from "@heroui/react";

const breadcrumbMap: Record<string, string> = {
  "gioi-thieu": "Giới thiệu",
  contact: "Liên hệ",
  "ho-so": "Hồ sơ",
  "wish-list": "Danh sách yêu thích",
  "list-topics": "Danh sách chủ đề",
  "tips-ai": "Bí kíp làm chủ ai",
  blog: "Danh sách bài viết",
  "buy-course": "Hướng dẫn mua khóa học",
  "clear-cache": "Xóa bộ nhớ đệm trình duyệt",
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const pathArray = segments.map((seg, index) => {
    const isCustom = breadcrumbMap.hasOwnProperty(seg);
    const capitalizeFirst = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);
    const rawLabel = isCustom
      ? breadcrumbMap[seg]
      : decodeURIComponent(seg.replace(/-/g, " "));
    const label = isCustom ? rawLabel : capitalizeFirst(rawLabel); // <-- dòng mới

    return {
      label,
      href: "/" + segments.slice(0, index + 1).join("/"),
    };
  });

  return (
    <div className="text-sm flex items-center gap-2 text-muted-foreground">
      <Link href="/" className="hover:underline text-primary">
        Trang chủ
      </Link>
      {pathArray.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className="text-gray-400">{">"}</span>
          {idx === pathArray.length - 1 ? (
            <span>{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:underline text-primary">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
