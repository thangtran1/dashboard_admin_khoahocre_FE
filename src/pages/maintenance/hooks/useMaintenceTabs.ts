import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export type MaintenanceTabKey = "all" | "scheduled";

export function useMaintenceTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): MaintenanceTabKey => {
    const tabParam = searchParams.get("tab");

    if (tabParam === "all") return "all";
    if (tabParam === "scheduled") return "scheduled";

    return "all";
  };

  const [activeTab, setActiveTab] = useState<MaintenanceTabKey>(
    getInitialTab()
  );

  useEffect(() => {
    const currentTab = getInitialTab();
    const tabParam = searchParams.get("tab");

    if (!tabParam && currentTab) {
      const params = new URLSearchParams(searchParams);
      params.set("tab", currentTab);
      setSearchParams(params, { replace: true });
    }
  }, []);

  const handleTabChange = (tab: MaintenanceTabKey) => {
    setActiveTab(tab);
    // Clear search params except tab when changing tabs
    const params = new URLSearchParams();
    params.set("tab", tab);
    params.set("page", "1");
    params.set("limit", "10");
    setSearchParams(params);
  };

  useEffect(() => {
    const newTab = getInitialTab();
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [searchParams.get("tab"), activeTab]);

  return {
    activeTab,
    handleTabChange,
  };
}
