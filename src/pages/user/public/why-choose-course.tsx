import { contentWrapper } from "@/utils/use-always";
import { reasons } from "./dataExport";
import clsx from "clsx";
import { Divider } from "@heroui/react";

const WhyChooseCourse = () => {
  return (
    <section className="bg-background py-6">
      <div
        className={clsx(
          "w-full flex flex-col px-4 gap-6 py-3 mx-auto lg:px-16",
          contentWrapper
        )}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
          Tại Sao Bạn Nên Lựa Chọn{" "}
          <span className="text-primary">Khóa Học Rẻ?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 text-center">
          {reasons.map((item, idx) => (
            <>
              <div key={idx} className="flex flex-col items-center gap-2">
                {item.icon}
                <h3 className="font-semibold text-lg text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {item.desc}
                </p>
              </div>
              <div>
                <Divider />
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCourse;
