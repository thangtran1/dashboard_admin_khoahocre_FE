import userService from "@/api/services/userApi";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button, Card } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { LockOutlined } from "@ant-design/icons";

const ResetPassword = () => {
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const resetPasswordMutation = useMutation({
    mutationFn: userService.resetPassword,
  });

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

  const handleResetPassword = async () => {
    if (!validate()) return;
    if (!token) {
      toast.error(t("sys.login.invalidToken"));
      return;
    }
    setIsLoading(true);

    try {
      const res = await resetPasswordMutation.mutateAsync({
        token,
        newPassword,
      });

      if (res.data?.success) {
        toast.success(t("sys.login.pasChangeSuccess"));
        navigate("/login");
      } else {
        toast.error(res.data?.message || t("sys.login.failChangePas"));
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-card text-card-foreground px-6 pt-4 flex flex-col gap-6 rounded-xl border shadow-sm w-full max-w-lg backdrop-blur-sm">
        <div className="text-center mb-4">
          <div className="flex justify-center items-center mb-3">
            <div className="bg-primary p-3 rounded-full">
              <LockOutlined className="text-3xl text-background" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">
            {t("sys.login.forgetFormTitle")}
          </h1>
        </div>

        <Form layout="vertical" onFinish={handleResetPassword}>
          <Form.Item
            label={
              <span className="font-medium text-foreground">
                {t("sys.login.newPas")}
              </span>
            }
            help={newPasswordError}
            validateStatus={newPasswordError ? "error" : ""}
          >
            <Input.Password
              placeholder={t("sys.login.newPas")}
              value={newPassword}
              onChange={handleNewPasswordChange}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium text-foreground">
                {t("sys.login.confirmPassword")}
              </span>
            }
            help={confirmPasswordError}
            validateStatus={confirmPasswordError ? "error" : ""}
          >
            <Input.Password
              placeholder={t("sys.login.confirmPassword")}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex w-full mt-4 gap-2 justify-between">
              <Button
                htmlType="submit"
                loading={isLoading}
                color="primary"
                variant="outlined"
                size="large"
                className="w-full"
              >
                {t("sys.login.confirm")}
              </Button>
              <Button
                danger
                onClick={() => navigate("/login")}
                size="large"
                className="w-full"
              >
                {t("sys.login.backToLogin")}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
