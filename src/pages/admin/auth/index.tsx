import PlaceholderImg from "@/assets/images/background/placeholder.svg";
import LocalePicker from "@/components/common/locale-picker";
import Logo from "@/components/common/logo";
import SettingButton from "@/layouts/dashboard/components/setting-button";
import LoginForm from "./login/login-form";
import { LoginProvider } from "./login/providers/login-provider";
import RegisterForm from "./login/register-form";
import ForgotPasswordForm from "./forgot-password/forgot-password-form";

export default function LoginPage() {
  return (
    <div className="relative grid min-h-svh lg:grid-cols-2 bg-background">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium cursor-pointer">
            <Logo size={28} />
            <span>TVT Admin</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginProvider>
              <LoginForm />
              <RegisterForm />
              <ForgotPasswordForm />
            </LoginProvider>
          </div>
        </div>
      </div>

      <div className="relative hidden bg-background-paper lg:block">
        <img
          src={PlaceholderImg}
          alt="placeholder img"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
        />
      </div>

      <div className="absolute right-2 top-0 flex flex-row">
        <LocalePicker />
        <SettingButton />
      </div>
    </div>
  );
}
