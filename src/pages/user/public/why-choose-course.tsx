import { useTranslation } from "react-i18next";
import { contentWrapper } from "@/utils/use-always";
import clsx from "clsx";
import {
  CheckCircle,
  GraduationCap,
  MonitorSmartphone,
  PhoneCall,
  PiggyBank,
  Truck,
} from "lucide-react";

const WhyChooseCourse = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: <CheckCircle className="text-blue-600 w-8 h-8" />,
      titleKey: "whyCourse.reason1Title",
      descKey: "whyCourse.reason1Desc",
    },
    {
      icon: <Truck className="text-blue-600 w-8 h-8" />,
      titleKey: "whyCourse.reason2Title",
      descKey: "whyCourse.reason2Desc",
    },
    {
      icon: <PiggyBank className="text-blue-600 w-8 h-8" />,
      titleKey: "whyCourse.reason3Title",
      descKey: "whyCourse.reason3Desc",
    },
    {
      icon: <MonitorSmartphone className="text-blue-600 w-8 h-8" />,
      titleKey: "whyCourse.reason4Title",
      descKey: "whyCourse.reason4Desc",
    },
    {
      icon: <GraduationCap className="text-blue-600 w-8 h-8" />,
      titleKey: "whyCourse.reason5Title",
      descKey: "whyCourse.reason5Desc",
    },
    {
      icon: <PhoneCall className="text-blue-600 w-8 h-8" />,
      titleKey: "whyCourse.reason6Title",
      descKey: "whyCourse.reason6Desc",
    },
  ];

  return (
    <section className="bg-muted py-6">
      <div
        className={clsx(
          "w-full flex flex-col px-4 gap-6 py-3 mx-auto lg:px-16",
          contentWrapper
        )}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
          {t("whyCourse.heading")}{" "}
          <span className="text-primary">{t("whyCourse.brandHighlight")}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 text-center">
          {reasons.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              {item.icon}
              <h3 className="font-semibold text-lg text-foreground">
                {t(item.titleKey)}
              </h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {t(item.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCourse;
