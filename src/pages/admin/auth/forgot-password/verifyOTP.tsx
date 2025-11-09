import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import userService from "@/api/services/userApi";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";
import { FullPageLoading } from "@/components/common/loading";
interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

type FormValues = {
  otp: string;
};

const VerifyOTP = ({ isOpen, onClose, email }: OtpModalProps) => {
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

    try {
      const res = await verifyOTPMutation.mutateAsync({ email, otp });

      if (res.data?.success) {
        toast.success(t("auth.forgot-password.authSuccessful"));
        onClose();
        setTimeout(() => {
          navigate(
            `/reset-password?token=${res.data?.token ?? ""}&email=${email}`
          );
        }, 300);
      } else {
        toast.error(t("auth.forgot-password.invalidOTP"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={isOpen}
      styles={{
        mask: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
      }}
      centered
      destroyOnClose
      footer={null}
      closable={true}
      maskClosable={false}
      width={400}
      onCancel={onClose}
    >
      {verifyOTPMutation.isPending && (
        <FullPageLoading message={t("auth.forgot-password.sending")} />
      )}
      <div className="text-center">
        <Icon
          icon="local:ic-new-transaction"
          size="100"
          className="text-primary!"
        />
      </div>

      <div className="flex flex-col items-center gap-1 text-center px-4 py-3 max-w-sm mx-auto">
        <h1 className="text-2xl text-foreground font-bold mb-2">
          {t("auth.forgot-password.confirmOTP")}
        </h1>
        <p
          className="text-sm text-gray-600 mb-4"
          dangerouslySetInnerHTML={{
            __html: t("auth.forgot-password.sentMessageBefore", {
              email: `<b>${email}</b>`,
            }),
          }}
        />

        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="otp"
            rules={{
              required: t("auth.forgot-password.plsOTP"),
              minLength: {
                value: 6,
                message: t("auth.forgot-password.maxOTP"),
              },
              maxLength: {
                value: 6,
                message: t("auth.forgot-password.maxOTP"),
              },
            }}
            render={({ field }) => (
              <div className="w-full flex flex-col items-center">
                <Input.OTP
                  {...field}
                  length={6}
                  size="large"
                  status={errors.otp ? "error" : ""}
                  onChange={(value) => field.onChange(value)}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">
                    {String(errors.otp.message)}
                  </p>
                )}
              </div>
            )}
          />

          <p className="text-sm text-muted-foreground font-medium  mt-2">
            {t("auth.forgot-password.noteOTP")}
          </p>
          <div className="flex w-full mt-2 gap-2">
            <Button onClick={onClose} danger size="large" className="w-full">
              {t("auth.forgot-password.cancel")}
            </Button>

            <Button
              htmlType="submit"
              color="primary"
              variant="outlined"
              size="large"
              className="w-full"
            >
              {t("auth.forgot-password.confirm")}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default VerifyOTP;
