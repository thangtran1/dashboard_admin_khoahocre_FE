import { Tabs } from "antd";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Information from "./information";
import ActivityLog from "./activity-log";
import { useTranslation } from "react-i18next";

export default function UserDetailTabs({ userId }: { userId: string }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeKey, setActiveKey] = useState("information");

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      setActiveKey(tabFromUrl);
    }
  }, [searchParams]);

  const tabItems = [
    {
      key: "information",
      label: t("sys.user-management.user-detail.information"),
      children: <Information userId={userId} />,
    },
    {
      key: "activity-log",
      label: t("sys.user-management.user-detail.activity-log"),
      children: <ActivityLog userId={userId} />,
    },
  ];

  const handleChange = (key: string) => {
    setActiveKey(key);
    searchParams.set("tab", key);
    setSearchParams(searchParams);
  };

  return (
    <Tabs items={tabItems} activeKey={activeKey} onChange={handleChange} />
  );
}
