import userService from "@/api/services/userApi";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import PlaceholderImg from "@/assets/images/background/placeholder.svg";
import { Icon } from "@/components/icon";
import Logo from "@/components/common/logo";
import LocalePicker from "@/components/common/locale-picker";
import SettingButton from "@/layouts/dashboard/components/setting-button";
import { ReturnButton } from "../login/providers/ReturnButton";

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);

  const handleBackToLogin = () => {
    navigate("/login");
  };
  const resetPasswordMutation = useMutation({
    mutationFn: userService.resetPassword,
    onSuccess: (res) => {
      if (res.data?.success) {
        toast.success(t("sys.login.pasChangeSuccess"));
        navigate("/login");
      } else {
        toast.error(res.data?.message || t("sys.login.failChangePas"));
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || t("sys.login.failChangePas"));
    },
  });
  const handleResetPassword = () => {
    if (!validate()) return;
    if (!token) {
      toast.error(t("sys.login.invalidToken"));
      return;
    }

    resetPasswordMutation.mutate({ token, newPassword });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error(t("sys.login.notToken"));
      navigate("/dash");
    }
  }, [location, navigate]);

  const validate = () => {
    let isValid = true;

    if (!newPassword || newPassword.length < 6) {
      setNewPasswordError(t("sys.login.invalidPassword"));
      isValid = false;
    } else {
      setNewPasswordError("");
    }

    if (!confirmPassword || confirmPassword !== newPassword) {
      setConfirmPasswordError(t("sys.login.notConfirmPassword"));
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (newPasswordError) setNewPasswordError("");
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) setConfirmPasswordError("");
  };

  return (
    <div className="relative grid min-h-svh lg:grid-cols-2 bg-background">
      <div className="flex flex-col  gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium cursor-pointer">
            <Logo size={28} />
            <span>TVT Admin</span>
          </div>
        </div>
        <div className="flex flex-1  items-center justify-center">
          <div className="w-full p-4 rounded-lg max-w-xs">
            <div className="text-center mb-4 space-y-1">
              <div className="flex justify-center items-center mb-3">
                <Icon
                  icon="local:ic-reset-password"
                  size="100"
                  className="text-primary!"
                />
              </div>
              <h1 className="text-2xl font-bold">
                {t("sys.login.passwordNewTitle")}
              </h1>
            </div>

            <Form layout="vertical" onFinish={handleResetPassword}>
              <Form.Item
                label={
                  <span
                    className="font-medium text-muted-foreground text-sm"
                    style={{ position: "relative", bottom: "-8px" }}
                  >
                    {t("sys.login.newPas")}
                  </span>
                }
                help={newPasswordError}
                style={{
                  marginBottom: newPasswordError ? 12 : 6,
                }}
                validateStatus={newPasswordError ? "error" : ""}
              >
                <Input.Password
                  placeholder={t("sys.login.newPas")}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span
                    className="font-medium text-muted-foreground text-sm"
                    style={{ position: "relative", bottom: "-8px" }}
                  >
                    {t("sys.login.confirmPassword")}
                  </span>
                }
                help={confirmPasswordError}
                style={{
                  marginBottom: confirmPasswordError ? 28 : 20,
                }}
                validateStatus={confirmPasswordError ? "error" : ""}
              >
                <Input.Password
                  placeholder={t("sys.login.confirmPassword")}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </Form.Item>

              <Form.Item>
                <div className="text-xs p-2 mb-2 rounded-lg text-foreground font-medium bg-muted">
                  {t("sys.login.resetPasswordDescription")}
                </div>
                <Button
                  htmlType="submit"
                  loading={resetPasswordMutation.isPending}
                  type="primary"
                  className="w-full mb-2"
                >
                  {t("sys.login.confirm")}
                </Button>
                <ReturnButton onClick={handleBackToLogin} />
              </Form.Item>
            </Form>
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
};

export default ResetPassword;
