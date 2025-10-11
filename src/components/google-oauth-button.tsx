import { Button } from "@/ui/button";
import { Icon } from "@/components/icon";

interface GoogleOAuthButtonProps {
  size?: "sm" | "default" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
}

export function GoogleOAuthButton({
  size = "icon",
  variant = "ghost",
  className,
}: GoogleOAuthButtonProps) {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleGoogleLogin}
      className={className}
    >
      <Icon icon="ant-design:google-circle-filled" size={24} />
    </Button>
  );
}
