import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "antd";
import { InputOtp } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import userService from "@/api/services/userApi";
import ModalBase from "./modalBase";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

type FormValues = {
  otp: string;
};

const VerifyOTP = ({ isOpen, onClose, email }: OtpModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const verifyOTPMutation = useMutation({
    mutationFn: userService.verifyOtp,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { otp: "" },
  });

  const onSubmit = async ({ otp }: FormValues) => {
    if (!otp) return;
    setIsLoading(true);

    try {
      const res = await verifyOTPMutation.mutateAsync({ email, otp });

      if (res.data?.success) {
        toast.success(t("sys.login.authSuccessful"));
        onClose();
        setTimeout(() => {
          navigate(
            `/reset-password?token=${res.data?.token ?? ""}&email=${email}`
          );
        }, 300);
      } else {
        toast.error(t("sys.login.invalidOTP"));
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("sys.login.errorOTP"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <Icon
          icon="local:ic-new-transaction"
          size="100"
          className="text-primary!"
        />
      </div>
      <div className="flex flex-col items-center text-center px-6 py-8 max-w-sm">
        <h1 className="text-2xl font-bold">{t("sys.login.confirmOTP")}</h1>
        <p className="text-sm text-gray-600 mb-4">
          {t("sys.login.sentMessageBefore")} <b>{email}</b>
          {t("sys.login.sentMessageAfter")}
        </p>

        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="otp"
            render={({ field }) => (
              <InputOtp
                {...field}
                classNames={{
                  base: "flex gap-2 justify-center",
                  input:
                    "w-12 h-12 text-lg rounded-md text-center text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm",
                  errorMessage: "text-red-500 text-sm text-center mt-1",
                }}
                errorMessage={errors.otp?.message}
                isInvalid={!!errors.otp}
                length={6}
                onChange={(e) =>
                  field.onChange((e.target as HTMLInputElement).value)
                }
              />
            )}
            rules={{
              required: t("sys.login.plsOTP"),
              minLength: { value: 6, message: t("sys.login.maxOTP") },
              maxLength: { value: 6, message: t("sys.login.maxOTP") },
            }}
          />

          <Button
            className="mt-6 w-full h-10 rounded-lg"
            htmlType="submit"
            loading={isLoading}
            type="primary"
          >
            {t("sys.login.confirm")}
          </Button>
        </form>
      </div>
    </ModalBase>
  );
};

export default VerifyOTP;
