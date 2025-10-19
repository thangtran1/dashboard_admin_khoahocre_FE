import { useSettings } from "@/store/settingStore";
import { ScrollArea } from "@/ui/scroll-area";
import { cn } from "@/utils";
import { Outlet } from "react-router";
import MultiTabs from "./multi-tabs";
import { MultiTabsProvider } from "./multi-tabs/providers/multi-tabs-provider";

const Main = () => {
  const { themeStretch, multiTab } = useSettings();

  return (
    <main
      data-slot="TVT-layout"
      className={cn("flex w-full flex-1 bg-background overflow-hidden", {
        "md:pt-[var(--layout-multi-tabs-height)]": multiTab,
      })}
    >
      <ScrollArea
        className={cn(
          "w-full p-2 mx-auto transition-all duration-300 ease-in-out",
          themeStretch ? "" : "xl:max-w-screen-2xl"
        )}
      >
        {multiTab ? (
          <MultiTabsProvider>
            <MultiTabs />
          </MultiTabsProvider>
        ) : (
          <Outlet />
        )}
      </ScrollArea>
    </main>
  );
};

export default Main;
