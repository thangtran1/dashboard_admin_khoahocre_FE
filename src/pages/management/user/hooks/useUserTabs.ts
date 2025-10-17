import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export type UserTabKey = "active" | "deleted";

export function useUserTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): UserTabKey => {
    const tabParam = searchParams.get("tab");
    const isDeletedParam = searchParams.get("isDeleted");

    if (tabParam === "deleted") return "deleted";
    if (tabParam === "active") return "active";

    if (isDeletedParam === "true") return "deleted";

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
    } else {
      params.set("isDeleted", "false");
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
  }, [searchParams.get("tab"), searchParams.get("isDeleted"), activeTab]);

  return {
    activeTab,
    handleTabChange,
  };
}
