import userService from "@/api/services/userApi";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ReturnButton } from "./components/ReturnButton";
import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/login-provider";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Icon } from "@/components/icon";
import { GoogleOAuthButton } from "@/components/google-oauth-button";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

function RegisterForm() {
  const { t } = useTranslation();
  const { loginState, backToLogin } = useLoginStateContext();
  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: userService.register,
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onFinish = async (values: any) => {
    const res = await signUpMutation.mutateAsync(values);
    console.log("🚀 ~ onFinish ~ res:", res);

    navigate(HOMEPAGE, { replace: true });
    toast.success("Register in success!", {
      closeButton: true,
    });
    // backToLogin();
  };

  if (loginState !== LoginStateEnum.REGISTER) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFinish)} className="space-y-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">
            {t("sys.login.signUpFormTitle")}
          </h1>
        </div>

        <FormField
          control={form.control}
          name="name"
          rules={{ required: t("sys.login.accountPlaceholder") }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t("sys.login.userName")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{ required: t("sys.login.emaildPlaceholder") }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t("sys.login.email")} {...field} />
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
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("sys.login.password")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{
            required: t("sys.login.confirmPasswordPlaceholder"),
            validate: (value) =>
              value === form.getValues("password") || t("sys.login.diffPwd"),
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("sys.login.confirmPassword")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {t("sys.login.registerButton")}
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
          <GoogleOAuthButton />
        </div>

        <div className="mb-2 text-xs text-gray">
          <span>{t("sys.login.registerAndAgree")}</span>
        </div>

        <ReturnButton onClick={backToLogin} />
      </form>
    </Form>
  );
}

export default RegisterForm;
