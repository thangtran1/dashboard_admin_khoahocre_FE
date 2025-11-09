import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useUserActions } from "@/store/userStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { FullPageLoading } from "@/components/common/loading";
import { useLoginStateContext } from "../providers/login-provider";

const { VITE_APP_ADMIN: HOMEPAGE } = import.meta.env;

export default function GoogleSuccess() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserToken, setUserInfo } = useUserActions();
  const { backToLogin } = useLoginStateContext();
  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");

    if (token && refreshToken) {
      const timer = setTimeout(() => {
        setUserToken({ accessToken: token, refreshToken });

        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUserInfo({
            id: payload.sub,
            email: payload.email,
            username: payload.email,
            avatar: undefined,
            role: payload.role,
          });

          toast.success(t("auth.login.googleLoginSuccess"));

          if (payload.role === "user") navigate("/", { replace: true });
          else navigate(HOMEPAGE, { replace: true });
        } catch (error) {
          backToLogin();
        }
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      backToLogin();
    }
  }, []);

  return <FullPageLoading message={t("auth.login.googleLoginProcessing")} />;
}
