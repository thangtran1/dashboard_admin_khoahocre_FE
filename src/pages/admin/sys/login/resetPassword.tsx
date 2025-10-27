import userService from "@/api/services/userApi";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button, Card } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

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
    <div className="reset-password-container flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-xl p-6 shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold mb-6 text-center">
          {t("sys.login.forgetFormTitle")}
        </h1>

        <Form layout="vertical" onFinish={handleResetPassword}>
          <Form.Item
            help={newPasswordError}
            label={t("sys.login.newPas")}
            validateStatus={newPasswordError ? "error" : ""}
          >
            <Input.Password
              placeholder={t("sys.login.newPas")}
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </Form.Item>

          <Form.Item
            help={confirmPasswordError}
            label={t("sys.login.confirmPassword")}
            validateStatus={confirmPasswordError ? "error" : ""}
          >
            <Input.Password
              placeholder={t("sys.login.confirmPassword")}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit" loading={isLoading} type="primary">
              {t("sys.login.forgetFormTitle")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
