import { contentWrapper } from "@/utils/use-always";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}



const FooterTop = () => {
  const { t } = useTranslation();
  const data: ContactItemData[] = [
    {
      title: t("footerTop.visitUs"),
      subtitle: t("footerTop.newOrleans"),
      icon: (
        <MapPin className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
      ),
    },
    {
      title: t("footerTop.callUs"),
      subtitle: "+12 958 648 597",
      icon: (
        <Phone className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
      ),
    },
    {
      title: t("footerTop.workingHours"),
      subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
      icon: (
        <Clock className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
      ),
    },
    {
      title: t("footerTop.emailUs"),
      subtitle: "thangtrandz04@gmail.com",
      icon: (
        <Mail className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
      ),
    },
  ];
  return (
    <div className={`${contentWrapper} mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 `}>
      {data?.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 group hover:bg-muted p-4 transition-colors hoverEffect"
        >
          {item?.icon}
          <div>
            <h3 className="font-bold text-foreground hoverEffect">
              {item?.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-1 group-hover:text-foreground hoverEffect">
              {item?.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
