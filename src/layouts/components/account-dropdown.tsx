import { useLoginStateContext } from "@/pages/sys/login/providers/login-provider";
import { useRouter } from "@/router/hooks";
import { useUserActions } from "@/store/userStore";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export default function AccountDropdown() {
  const { replace } = useRouter();
  const { profile } = useUserProfile();
  const { clearUserInfoAndToken } = useUserActions();
  const { backToLogin } = useLoginStateContext();
  const { t } = useTranslation();
  const logout = () => {
    try {
      clearUserInfoAndToken();
      backToLogin();
    } catch (error) {
      console.log(error);
    } finally {
      replace("/login");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <img
            className="h-6 w-6 rounded-full"
            src={
              profile?.avatar
                ? `${import.meta.env.VITE_API_URL}${profile.avatar}`
                : "/default-avatar.svg"
            }
            alt=""
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="flex items-center gap-2 p-2">
          <img
            className="h-10 w-10 rounded-full"
            src={
              profile?.avatar
                ? `${import.meta.env.VITE_API_URL}${profile.avatar}`
                : "/default-avatar.svg"
            }
            alt=""
          />
          <div className="flex flex-col items-start">
            <div className="text-text-primary text-sm font-medium">
              {profile?.name || "Loading..."}
            </div>
            <div className="text-text-secondary text-xs">
              {profile?.email || "Loading..."}
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NavLink to="/profile?tab=profile">
            {t("sys.menu.user.profile")}
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-bold text-warning" onClick={logout}>
          {t("sys.login.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
