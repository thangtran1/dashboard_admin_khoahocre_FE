import { Button } from "@/ui/button";
import { Icon } from "@/components/icon";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

interface GoogleOAuthButtonProps {
  className?: string;
  mode?: "login" | "register";
}

export function GoogleOAuthButton({
  className,
  mode = "login",
}: GoogleOAuthButtonProps) {
  const { t } = useTranslation();
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const tooltipTitle =
    mode === "register"
      ? t("sys.login.googleLoginRegister")
      : t("sys.login.googleLoginLogin");
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
        onClick={handleGoogleLogin}
        className={className}
      >
        <Icon icon="ant-design:google-circle-filled" size={24} />
      </Button>
    </Tooltip>
  );
}
