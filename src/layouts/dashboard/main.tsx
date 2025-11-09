import { useSettings } from "@/store/settingStore";
import { ScrollArea } from "@/ui/scroll-area";
import { cn } from "@/utils";
import { Outlet } from "react-router";

const Main = () => {
  const { themeStretch } = useSettings();

  return (
    <main
      data-slot="TVT-layout"
      className={cn("flex w-full flex-1 bg-background overflow-hidden", {
      })}
    >
      <ScrollArea
        className={cn(
          "w-full p-2 mx-auto transition-all duration-300 ease-in-out",
          themeStretch ? "" : "xl:max-w-screen-2xl"
        )}
      >
        <Outlet />
      </ScrollArea>
    </main>
  );
};

export default Main;
