import { DEFAULT_USER } from "@/_mock/assets";
import type { SignInReq } from "@/api/services/userService";
import { Icon } from "@/components/icon";
import { useSignIn } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { cn } from "@/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/login-provider";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);

  const { loginState, setLoginState } = useLoginStateContext();
  const signIn = useSignIn();

  const form = useForm<SignInReq>({
    defaultValues: {
      email: "thangtrandz04@gmail.com",
      password: "222222",
    },
  });

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async (values: SignInReq) => {
    setLoading(true);
    try {
      await signIn(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Form {...form} {...props}>
        <form onSubmit={form.handleSubmit(handleFinish)} className="space-y-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              {t("sys.login.signInFormTitle")}
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
              {t("sys.login.signInFormDescription")}
            </p>
          </div>

          <FormField
            control={form.control}
            name="email"
            rules={{ required: t("sys.login.accountPlaceholder") }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sys.login.userName")}</FormLabel>
                <FormControl>
                  <Input placeholder="admin/test" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{ required: t("sys.login.passwordPlaceholder") }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sys.login.password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("sys.login.password")}
                    {...field}
                    suppressHydrationWarning
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(checked) =>
                  setRemember(checked === "indeterminate" ? false : checked)
                }
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("sys.login.rememberMe")}
              </label>
            </div>
            <Button
              variant="link"
              onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
              size="sm"
            >
              {t("sys.login.forgetPassword")}
            </Button>
          </div>

          <Button type="submit" className="w-full">
            {loading && <Loader2 className="animate-spin mr-2" />}
            {t("sys.login.loginButton")}
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              {t("sys.login.otherSignIn")}
            </span>
          </div>
          <div className="flex cursor-pointer justify-around text-2xl">
            <Button type="button" variant="ghost" size="icon">
              <Icon icon="mdi:github" size={24} />
            </Button>
            <Button type="button" variant="ghost" size="icon">
              <Icon icon="ant-design:google-circle-filled" size={24} />
            </Button>
          </div>

          <div className="text-center text-sm">
            {t("sys.login.noAccount")}
            <Button
              variant="link"
              className="px-1"
              onClick={() => setLoginState(LoginStateEnum.REGISTER)}
            >
              {t("sys.login.signUpFormTitle")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
