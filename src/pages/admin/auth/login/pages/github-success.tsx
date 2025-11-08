import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useUserActions } from "@/store/userStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const { VITE_APP_ADMIN: HOMEPAGE } = import.meta.env;

export default function GitHubSuccess() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserToken, setUserInfo } = useUserActions();

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");

    if (token && refreshToken) {
      const timer = setTimeout(() => {
        try {
          // Lưu token trước
          setUserToken({
            accessToken: token,
            refreshToken: refreshToken,
          });

          // Parse JWT payload để lấy thông tin user
          const payload = JSON.parse(atob(token.split(".")[1]));

          // Lưu thông tin user
          setUserInfo({
            id: payload.sub,
            email: payload.email,
            username: searchParams.get("username") || payload.email,
            avatar: undefined,
            role: payload.role,
          });

          toast.success(t("sys.login.githubLoginSuccess"));

          // Chuyển hướng dựa vào role
          if (payload.role === "user") {
            navigate("/", { replace: true });
          } else {
            navigate(HOMEPAGE, { replace: true });
          }
        } catch (error) {
          navigate("/login", { replace: true });
        }
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      toast.error(t("sys.login.githubLoginError"));
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex flex-col items-center space-y-8">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/30 animate-pulse"></div>
        </div>

        <div className="w-56 h-1.5 bg-blue-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-[progress_1.5s_ease-in-out_infinite]"></div>
        </div>

        <p className="text-gray-700 text-sm text-center font-medium animate-[fadeIn_1s_ease-in-out]">
          {t("sys.login.githubLoginProcessing")}
        </p>
      </div>

      <style>{`
      @keyframes progress {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(0%); }
        100% { transform: translateX(100%); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `}</style>
    </div>
  );
}
