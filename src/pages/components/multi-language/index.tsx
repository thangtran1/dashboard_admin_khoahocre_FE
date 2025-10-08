import { Icon } from "@/components/icon";
import useLocale from "@/locales/use-locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { LocalEnum } from "#/enum";
import { useTranslation } from "react-i18next";

export default function MultiLanguagePage() {
  const {
    setLocale,
    locale,
    language: { icon, label },
  } = useLocale();
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center bg-background">
      <Card className="w-full border border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
              {t("sys.multiLanguage.title")} 🌐
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <RadioGroup
            onValueChange={(value: LocalEnum) => setLocale(value)}
            defaultValue={locale}
            className="flex flex-col gap-2"
          >
            <label
              htmlFor="en"
              className="flex items-center gap-3 border rounded-lg px-4 py-2 cursor-pointer hover:bg-muted transition"
            >
              <RadioGroupItem value={LocalEnum.en} id="en" />
              <span className="flex items-center gap-2">
                <Icon icon="local:flag-en" size="22" />
                {t("sys.multiLanguage.en")}
              </span>
            </label>

            <label
              htmlFor="vi"
              className="flex items-center gap-3 border rounded-lg px-4 py-2 cursor-pointer hover:bg-muted transition"
            >
              <RadioGroupItem value={LocalEnum.vi} id="vi" />
              <span className="flex items-center gap-2">
                <Icon icon="local:flag-vi" size="22" />
                {t("sys.multiLanguage.vi")}
              </span>
            </label>
          </RadioGroup>

          <div className="flex items-center justify-center gap-3 text-lg font-medium text-text-primary ">
            <Icon
              icon={`local:${icon}`}
              className="rounded-md"
              size="28"
            />
            <span>{t("sys.multiLanguage.current")}: {label}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
