import { Button } from "@/ui/button";
import { Icon } from "@/components/icon";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

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
      ? t("sys.login.githubLoginRegister")
      : t("sys.login.githubLoginLogin");
  const tooltipColor = mode === "register" ? "blue" : "green";

  return (
    <Tooltip
      title={tooltipTitle}
      overlayInnerStyle={{
        backgroundColor: "#f5f5f5",
        color: tooltipColor,
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
