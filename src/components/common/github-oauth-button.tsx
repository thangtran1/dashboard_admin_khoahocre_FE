import { Button } from "@/ui/button";
import { Icon } from "@/components/icon";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { styleTooltip } from "@/utils/use-always";
interface GitHubOAuthButtonProps {
  className?: string;
  mode?: "login" | "register";
}

export function GitHubOAuthButton({
  className,
  mode = "login",
}: GitHubOAuthButtonProps) {
  const { t } = useTranslation();
  const handleGitHubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };

  const tooltipTitle =
    mode === "register"
      ? t("auth.login.githubLoginRegister")
      : t("auth.login.githubLoginLogin");

  return (
    <Tooltip
      className="cursor-pointer"
      title={tooltipTitle}
      styles={{
        body: styleTooltip.body,
      }}
    >
      <Button
        variant="outline"
        type="button"
        className={className}
        onClick={handleGitHubLogin}
      >
        <Icon icon="mdi:github" size={24} />
      </Button>
    </Tooltip>
  );
}
