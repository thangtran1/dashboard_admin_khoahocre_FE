import { contentWrapper } from "@/utils/use-always";
import { Image } from "antd/lib";
import clsx from "clsx";
import {
  ChevronUp,
  Facebook,
  InstagramIcon,
  MessageCircleMore,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollPercent(percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollPercent / 100) * circumference;
  return (
    <>
      <footer className="bg-background text-foreground">
        <div
          className={clsx("w-full px-4 lg:px-16 py-10 mx-auto", contentWrapper)}
        >
          {/* Logo + Info: Mobile -> flex row | Desktop -> block */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Cột 1: Logo + Info */}

            <div className="grid grid-cols-2 gap-6 md:col-span-4 md:grid-cols-4">
              {/* Cột 2 */}
              <div>
                <h3 className="font-semibold text-2xl mb-2">
                  {t("footer.category")}
                </h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>{t("footer.investment")}</li>
                  <li>{t("footer.marketing")}</li>
                  <li>{t("footer.graphicDesign")}</li>
                  <li>{t("footer.videoPhotography")}</li>
                  <li>{t("footer.language")}</li>
                  <li className="flex items-center gap-2">
                    {t("footer.business")}{" "}
                    <span className="text-xs bg-yellow-400 text-white px-1 rounded">
                      {t("footer.tagSale")}
                    </span>
                  </li>
                  <li>{t("footer.mmo")}</li>
                  <li>{t("footer.celebrities")}</li>
                </ul>
              </div>

              {/* Cột 3 */}
              <div>
                <h3 className="font-semibold mb-2 text-2xl">
                  {t("footer.content")}
                </h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>{t("footer.newCourses")}</li>
                  <li className="flex items-center gap-2">
                    {t("footer.bestSell")}{" "}
                    <span className="text-xs bg-green-200 text-green-800 px-1 rounded">
                      {t("footer.tagPopular")}
                    </span>
                  </li>
                  <li>{t("footer.saleCourses")}</li>
                  <li>{t("footer.freeCourses")}</li>
                  <li className="flex items-center gap-2">
                    {t("footer.blog")}{" "}
                    <span className="text-xs bg-green-200 text-green-800 px-1 rounded">
                      {t("footer.tagPopular")}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    {t("footer.ebooks")}{" "}
                    <span className="text-xs bg-blue-200 text-blue-800 px-1 rounded">
                      {t("footer.tagNew")}
                    </span>
                  </li>
                  <li>{t("footer.events")}</li>
                </ul>
              </div>

              {/* Cột 4 */}
              <div>
                <h3 className="font-semibold mb-2 text-2xl">
                  {t("footer.info")}
                </h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>{t("footer.aboutUs")}</li>
                  <li>{t("footer.privacy")}</li>
                  <li>{t("footer.contact")}</li>
                  <li className="flex items-center gap-2">
                    {t("footer.support")}{" "}
                    <span className="text-xs bg-pink-200 text-pink-700 px-1 rounded">
                      {t("footer.tagHiring")}
                    </span>
                  </li>
                  <li>{t("footer.becomeSeller")}</li>
                  <li>{t("footer.terms")}</li>
                  <li>{t("footer.policy")}</li>
                </ul>
              </div>

              {/* Cột 5 */}
              <div>
                <h3 className="font-semibold mb-2 text-2xl">
                  {t("footer.highlight")}
                </h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>{t("footer.userManagement")}</li>
                  <li>{t("footer.deviceUsage")}</li>
                  <li>{t("footer.report")}</li>
                  <li>{t("footer.courseGroup")}</li>
                  <li>{t("footer.languageSetting")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Nút social nổi góc dưới bên trái */}
        <div className="fixed bottom-16 left-6 flex flex-col gap-2 z-50">
          <a
            href="https://facebook.com"
            className="w-12 h-12 rounded-full !bg-primary flex items-center justify-center shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={20} className="text-white" />
          </a>
          <a
            href="https://zalo.me"
            className="w-12 h-12 rounded-full !bg-primary flex items-center justify-center shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircleMore size={20} className="text-white" />
          </a>
        </div>
      </footer>

      {/* Bottom footer */}
      <div className="bg-border/40">
        <div
          className={clsx(
            "w-full lg:px-16 mx-auto p-2 flex flex-col md:flex-row md:items-center md:justify-between gap-1",
            contentWrapper
          )}
        >
          <p className="text-sm text-muted-foreground text-center md:text-left">
            {t("footer.copyright")}{" "}
            <a
              href="#"
              className="text-primary text-md font-semibold hover:underline"
            >
              Khoahocre{" "}
            </a>
            – {t("footer.brand")}
          </p>

          <div className="flex md:h-[40px] flex-col md:flex-row md:pb-0 pb-12 items-center gap-2 md:gap-4 text-muted-foreground">
            <span>{t("footer.socialText")}</span>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-primary">
                <Facebook size={22} />
              </a>
              <a href="#" className="hover:text-pink-600">
                <InstagramIcon size={22} />
              </a>
              <a href="#" className="hover:text-red-600">
                <Youtube size={22} />
              </a>
              <Image
                src="https://images.dmca.com/Badges/dmca-badge-w100-2x1-02.png?ID=27963a45-490d-46d3-89d8-492a06469df6"
                alt="DMCA Protected"
                className="h-6 w-auto"
              />
            </div>
          </div>
        </div>

        {scrollPercent > 0 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-14 right-8 z-50 w-14 h-14 rounded-full bg-background border border-border text-primary hover:bg-primary hover:text-white transition flex items-center justify-center"
          >
            <svg
              className="absolute w-full h-full rotate-[-90deg]"
              viewBox="0 0 50 50"
            >
              <circle
                cx="25"
                cy="25"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <ChevronUp size={22} className="relative z-10" />
          </button>
        )}
      </div>
    </>
  );
};

export default Footer;
