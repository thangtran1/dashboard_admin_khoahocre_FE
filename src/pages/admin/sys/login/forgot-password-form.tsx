import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ReturnButton } from "./components/ReturnButton";
import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/login-provider";
import { Radio } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import userService from "@/api/services/userApi";
import { toast } from "sonner";
import VerifyOTP from "./components/verifyOTP";

function ForgotPasswordForm() {
  const { t } = useTranslation();
  const { loginState, backToLogin } = useLoginStateContext();
  const form = useForm();
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("link");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const navigate = useNavigate();
  const forgotPasswordMutation = useMutation({
    mutationFn: userService.forgotPassword,
  });

  const onFinish = async () => {
    setIsLoading(true);
    try {
      const res = await forgotPasswordMutation.mutateAsync({ email });

      if (res.data?.success) {
        if (method === "link") {
          toast.success(t("sys.login.linkContent"));
          form.reset();
          setEmail("");
          navigate("/login");
        } else {
          toast.success(t("sys.login.methodOTP"));
          setIsOtpModalOpen(true);
        }
      } else {
        toast.success(res.data?.message || t("sys.login.errorForgetPassword"));
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  if (loginState !== LoginStateEnum.RESET_PASSWORD) return null;

  return (
    <>
      <div className="mb-8 text-center">
        <Icon
          icon="local:ic-reset-password"
          size="100"
          className="text-primary!"
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              {t("sys.login.forgetFormTitle")}
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
              {t("sys.login.forgetFormSecondTitle")}
            </p>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t("sys.login.email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="method"
            render={() => (
              <FormItem>
                <FormLabel className="flex justify-center text-md">
                  {t("sys.login.selectMethod")}
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Radio.Group
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                    >
                      <Radio value="link">
                        <div className="text-[11px]">
                          {t("sys.login.resetLink")}
                        </div>
                      </Radio>
                      <Radio value="otp">
                        <div className="text-[11px]">
                          {t("sys.login.receiveOTP")}
                        </div>
                      </Radio>
                    </Radio.Group>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-xs p-2 rounded-lg text-foreground font-medium bg-muted">
            {t("sys.login.noteConfirm")}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full text-foreground font-medium">
            {isLoading
              ? t("sys.login.sending")
              : t("sys.login.sendEmailButton")}
          </Button>
          <ReturnButton onClick={backToLogin} />
        </form>
      </Form>

      <VerifyOTP
        email={email}
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
      />
    </>
  );
}

export default ForgotPasswordForm;
