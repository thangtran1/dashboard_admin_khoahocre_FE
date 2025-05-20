import { contentWrapper } from "@/utils/use-always";
import { Button } from "@heroui/react";
import { Image } from "antd";
import clsx from "clsx";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const NearFooter = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-muted">
      <div
        className={clsx(
          "w-full lg:px-16 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center",
          contentWrapper
        )}
      >
        <div className="flex mt-6 md:mt-0 justify-center">
          <div className="w-[300px] md:w-[400px]">
            <Image
              src="https://khoahocre.com/wp-content/uploads/2023/05/banner-footer-1.png"
              alt={t("nearFooter.imageAlt")}
              className="rounded-3xl object-contain w-full h-auto"
            />
          </div>
        </div>

        <div className="text-center pb-6 md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            {t("nearFooter.title")}
          </h2>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t("nearFooter.subtitle")}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {t("nearFooter.description")}
          </p>
          <Button className="bg-primary hover:bg-primary/80 font-semibold text-base px-5 py-3 rounded flex items-center gap-2">
            <Heart size={16} /> {t("nearFooter.button")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NearFooter;
