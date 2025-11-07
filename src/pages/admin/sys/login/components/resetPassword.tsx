import userService from "@/api/services/userApi";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { LockOutlined } from "@ant-design/icons";
import PlaceholderImg from "@/assets/images/background/placeholder.svg";

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
   
    <div className="relative grid min-h-svh lg:grid-cols-2 bg-background">
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm">
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
             <div className="mt-2">
               <Button
                 htmlType="submit"
                 loading={isLoading}
                 size="large"
                 type="primary"
                 className="w-full"
               >
                 {t("sys.login.confirm")}
               </Button>
               <Button
                 onClick={() => navigate("/login")}
                 size="large"
                 className="w-full mt-4"
               >
                 {t("sys.login.backToLogin")}
               </Button>
             </div>
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
  </div>
  );
};

export default ResetPassword;
