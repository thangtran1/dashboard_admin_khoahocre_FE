import { useCurrentRouteMeta } from "@/router/hooks";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/**
 * Component tự động cập nhật title dựa trên route metadata cho trang admin
 */
export default function AutoPageTitle() {
  const { t } = useTranslation();
  const currentRouteMeta = useCurrentRouteMeta();

  // Nếu có route meta và có label, set title từ label cho trang admin
  if (currentRouteMeta?.label) {
    const title = t(currentRouteMeta.label);
    return (
      <Helmet>
        <title>{title} | TVT Admin</title>
      </Helmet>
    );
  }

  return null;
}
