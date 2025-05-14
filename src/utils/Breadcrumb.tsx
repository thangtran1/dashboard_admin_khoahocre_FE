"use client";

import { usePathname } from "@/router/hooks";
import { Link } from "@heroui/react";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const pathArray = segments.map((seg, index) => {
    return {
      label: decodeURIComponent(seg.replace(/-/g, " ")).replace(/\b\w/g, (l) =>
        l.toUpperCase()
      ),
      href: "/" + segments.slice(0, index + 1).join("/"),
    };
  });

  return (
    <div className="text-sm text-gray-500 mb-4">
      <Link href="/" className="hover:underline text-blue-600">
        Trang chủ
      </Link>
      {pathArray.map((item, idx) => (
        <span key={idx}>
          {" > "}
          {idx === pathArray.length - 1 ? (
            <span className="text-gray-700">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:underline text-blue-600">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
