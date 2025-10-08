import LocalePicker from "@/components/locale-picker";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";
import type { ReactNode } from "react";
import AccountDropdown from "../components/account-dropdown";
import BreadCrumb from "../components/bread-crumb";
import NoticeButton from "../components/notice";
import SearchBar from "../components/search-bar";
import SettingButton from "../components/setting-button";
import { useUserInfo } from "@/store/userStore";

interface HeaderProps {
  headerLeftSlot?: ReactNode;
}

export default function Header({ headerLeftSlot }: HeaderProps) {
  const { breadCrumb } = useSettings();
  const { role } = useUserInfo();

  return (
    <header
      data-slot="TVT-layout-admin"
      className={cn(
        "sticky top-0 right-0 left-auto flex items-center bg-background justify-between px-2 ml-[1px]",
        "h-[var(--layout-header-height)] grow-0 shrink-0 z-50 shadow-sm"
      )}
    >
      {role === "user" ? (
        <div className="flex items-center">
          {headerLeftSlot}
          <div className="hidden md:block ml-4">
            {breadCrumb && <BreadCrumb />}
          </div>
        </div>
      ) : (
        <>  
        <SearchBar />
        <div className="flex flex-1" />
        </>
      )}

      <div className="flex w-full justify-end items-center gap-2 pr-4">
        <LocalePicker />
        <NoticeButton />
        <SettingButton />
        <AccountDropdown />
      </div>
    </header>
  );
}

