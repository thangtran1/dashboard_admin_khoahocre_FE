import { cn } from "@/utils";
import type { NavProps } from "../types";
import { NavGroup } from "./nav-group";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";

export function NavVertical({ data, className, ...props }: NavProps) {
  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(() => {
    if (!searchText) return data;

    return data
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [data, searchText]);

  return (
    <nav className={cn("flex w-full flex-col h-full", className)} {...props}>
      <div className="sticky top-0 z-10 bg-background">
        <Input
          placeholder="Tìm kiếm..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          prefix={<SearchOutlined />}
          className="rounded-lg shadow-sm border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 transition"
        />
      </div>

      <div className="flex-1 overflow-y-auto mt-1">
        {filteredData.map((group, index) => (
          <NavGroup
            key={group.name || index}
            name={group.name}
            items={group.items}
          />
        ))}
      </div>
    </nav>
  );
}
