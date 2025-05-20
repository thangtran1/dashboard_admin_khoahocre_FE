import { contentWrapper } from "@/utils/use-always";
import { Image } from "antd";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const Voucher = () => {
  const { t } = useTranslation();

  return (
    <section className="border-b border-border">
      <div
        className={clsx(
          "flex flex-col items-center justify-center bg-background gap-6 mx-auto md:flex-row",
          contentWrapper
        )}
      >
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            {t("voucher.title").replace("KHR10", "")}
            <span className="text-primary">{t("voucher.highlight")}</span>
            {t("voucher.title").split("KHR10")[1]}
          </h1>
          <p className="mb-6 text-muted-foreground">
            {t("voucher.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-primary text-primary-foreground px-5 py-2 rounded-md font-medium">
              {t("voucher.btnCreate")}
            </button>
            <button className="border border-primary text-primary px-5 py-2 rounded-md font-medium">
              {t("voucher.btnShop")}
            </button>
          </div>
        </div>
        <div className="flex items-center w-full justify-center p-2 max-w-md">
          <Image
            src="https://khoahocre.com/wp-content/uploads/2024/11/112.png"
            alt={t("voucher.imgAlt")}
            className="object-contain rounded-lg w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
export default Voucher;
