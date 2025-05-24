import { Icon } from "@/components/icon";
import LocalePicker from "@/components/locale-picker";
import { useSettings } from "@/store/settingStore";
import { Button } from "@/ui/button";
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
  const role = useUserInfo();
  return (
    <header
      data-slot="TVT-layout-admin"
      className={cn(
        "sticky top-0 right-0 left-auto flex items-center bg-background justify-between px-2 ml-[1px]",
        "h-[var(--layout-header-height)] grow-0 shrink-0"
      )}
    >
      {String(role) === "user" && (
        <div className="flex items-center">
          {headerLeftSlot}

          <div className="hidden md:block ml-4">
            {breadCrumb && <BreadCrumb />}
          </div>
        </div>
      )}

      <div className="flex w-ful justify-end items-end gap-1">
        <SearchBar />
        <LocalePicker />
        {/* <NoticeButton /> */}
        <SettingButton />
        <AccountDropdown />
      </div>
    </header>
  );
}
