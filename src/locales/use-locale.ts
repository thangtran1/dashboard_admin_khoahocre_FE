import "dayjs/locale/zh-cn";
import en from "antd/locale/en_US";
import vi from "antd/locale/vi_VN";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import type { Locale as AntdLocal } from "antd/es/locale";
import { LocalEnum } from "#/enum";

type Locale = keyof typeof LocalEnum;
type Language = {
  locale: keyof typeof LocalEnum;
  icon: string;
  label: string;
  antdLocal: AntdLocal;
};

export const LANGUAGE_MAP: Record<Locale, Language> = {
  [LocalEnum.vi]: {
    locale: LocalEnum.vi,
    label: "Vietnamese",
    icon: "flag-vn",
    antdLocal: vi,
  },
  [LocalEnum.en]: {
    locale: LocalEnum.en,
    label: "English",
    icon: "flag-us",
    antdLocal: en,
  },
};

export default function useLocale() {
  const { i18n } = useTranslation();

  const locale = (i18n.resolvedLanguage || LocalEnum.en) as Locale;
  const language = LANGUAGE_MAP[locale];

  const setLocale = (locale: Locale) => {
    i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
    dayjs.locale(locale);
  };

  return {
    locale,
    language,
    setLocale,
  };
}
