import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export type UserTabKey = "active" | "deleted" | "new";

export function useUserTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): UserTabKey => {
    const tabParam = searchParams.get("tab");
    const isDeletedParam = searchParams.get("isDeleted");
    const isNewParam = searchParams.get("isNew");

    if (tabParam === "deleted") return "deleted";
    if (tabParam === "active") return "active";
    if (tabParam === "new") return "new";

    if (isDeletedParam === "true") return "deleted";
    if (isNewParam === "true") return "new";

    return "active";
  };

  const [activeTab, setActiveTab] = useState<UserTabKey>(getInitialTab());

  useEffect(() => {
    const currentTab = getInitialTab();
    const tabParam = searchParams.get("tab");

    if (!tabParam && currentTab) {
      const params = new URLSearchParams(searchParams);
      params.set("tab", currentTab);
      setSearchParams(params, { replace: true });
    }
  }, []);

  const updateTabInUrl = (tab: UserTabKey) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);

    if (tab === "deleted") {
      params.set("isDeleted", "true");
      params.delete("isNew");
    } else if (tab === "new") {
      params.set("isNew", "true");
      params.delete("isDeleted");
    } else {
      params.set("isDeleted", "false");
      params.delete("isNew");
    }

    setSearchParams(params);
  };

  const handleTabChange = (tab: UserTabKey) => {
    setActiveTab(tab);
    updateTabInUrl(tab);
  };

  useEffect(() => {
    const newTab = getInitialTab();
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [
    searchParams.get("tab"),
    searchParams.get("isDeleted"),
    searchParams.get("isNew"),
    activeTab,
  ]);

  return {
    activeTab,
    handleTabChange,
  };
}
