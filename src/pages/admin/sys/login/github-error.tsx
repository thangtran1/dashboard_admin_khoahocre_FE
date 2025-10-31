import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { Button } from "@/ui/button";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function GitHubError() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
          toast.error(t("sys.login.githubLoginErrorDescription"));
    } else {
      toast.error(t("sys.login.githubLoginErrorDescription"));
    }
  }, [searchParams]);

  const handleBackToLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">
          {t("sys.login.githubLoginError")}
        </h1>
        <p className="text-muted-foreground mb-6">
          {t("sys.login.githubLoginErrorDescription")}
        </p>
        <Button onClick={handleBackToLogin} className="w-full">
          {t("sys.login.backToLogin")}
        </Button>
      </div>
    </div>
  );
}
