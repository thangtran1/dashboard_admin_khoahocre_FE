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
