"use client";

import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { productType } from "@/constants/data";
import { Tabs } from "antd";

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
  
    <Link
      to="/shop"
      className="text-sm text-primary font-medium hover:underline inline-flex items-center whitespace-nowrap"
    >
      Xem Thêm <ArrowRight className="w-4 h-4 ml-1" />
    </Link>
  </div>
  
  );
};

export default HomeTabbar;
