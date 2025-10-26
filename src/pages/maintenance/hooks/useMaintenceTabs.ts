import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export type MaintenanceTabKey = "all" | "scheduled";

export function useMaintenceTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): MaintenanceTabKey => {
    const tabParam = searchParams.get("tab");
    const isScheduledParam = searchParams.get("isScheduled");

    if (tabParam === "all") return "all";
    if (tabParam === "scheduled") return "scheduled";

    if (isScheduledParam === "true") return "scheduled";

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

  const updateTabInUrl = (tab: MaintenanceTabKey) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);

    if (tab === "scheduled") {
      params.set("isScheduled", "true");
    } else {
      params.delete("isScheduled");
    }

    setSearchParams(params);
  };

  const handleTabChange = (tab: MaintenanceTabKey) => {
    setActiveTab(tab);
    updateTabInUrl(tab);
  };

  useEffect(() => {
    const newTab = getInitialTab();
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [searchParams.get("tab"), searchParams.get("isScheduled"), activeTab]);

  return {
    activeTab,
    handleTabChange,
  };
}
