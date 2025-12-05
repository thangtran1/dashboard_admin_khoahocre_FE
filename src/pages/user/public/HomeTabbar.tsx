"use client";

import { productType } from "@/constants/data";
import { Tabs } from "antd";
import SeeMore from "@/ui/see-more";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex-1 min-w-[200px]">
        <Tabs
          activeKey={selectedTab}
          onChange={(key) => onTabSelect(key)}
          items={productType.map((item) => ({
            key: item.title,
            label: <span className="font-medium text-sm">{item.title}</span>,
          }))}
          className="custom-tabs"
        />
      </div>

      <SeeMore to="/shop">Xem Thêm</SeeMore>

    </div>

  );
};

export default HomeTabbar;
