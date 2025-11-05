import { CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";
import AuthSessionTableComponent from "./components/AuthSessionTableComponent";

export default function AuthSessionManagement() {
  const { t } = useTranslation();

  return (
    <div className="bg-card text-card-foreground px-6 flex flex-col gap-6 rounded-xl border shadow-sm">
      <div className="space-y-6">
        <div className="flex pt-4 items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Icon icon="lucide:users" className="h-7 w-7 text-primary" />
              {t("sys.auth-session.title")}
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              {t("sys.auth-session.description")}
            </p>
          </div>
        </div>

        <Separator className="my-0" />

        <AuthSessionTableComponent />
      </div>
    </div>
  );
}
