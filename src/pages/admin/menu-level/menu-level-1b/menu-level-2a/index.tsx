import { H1 } from "@/ui/typography";
import { useTranslation } from "react-i18next";
export default function MenuLevel2a() {
  const { t } = useTranslation();
  return <H1>{t("menu-level.level-2a")}</H1>;
}
