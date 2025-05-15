import { ChevronLeft, ChevronRight, Youtube } from "lucide-react";
import { CourseData } from "./dataExport";
import { useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Link } from "react-router";

const YouTube = () => {
  const youtubeMiniSwiperRef = useRef<SwiperClass | null>(null);

  const scroll = (swiper: SwiperClass | null, dir: "left" | "right") => {
    if (!swiper) return;
    dir === "left" ? swiper.slidePrev() : swiper.slideNext();
  };
  return (
    <div className="relative w-full py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          <span className="text-red-500">Youtube</span> Kiếm Nghìn $ Mỗi Tháng
        </h2>
        <button className="w-9 h-9 rounded-full border flex items-center justify-center">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="relative">
        <Swiper
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          onBeforeInit={(swiper) => {
            youtubeMiniSwiperRef.current = swiper;
          }}
        >
          {CourseData.map((course, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-muted rounded-lg border shadow p-2">
                <img
                  src={course.image}
                  alt="course"
                  className="w-full h-52 sm:h-72 object-cover rounded"
                />
                <h3 className="text-base h-14 line-clamp-2 font-semibold mt-2">
                  <Link to={`/youtube`}> {course.title}</Link>
                </h3>
                <div className="text-sm line-clamp-2">{course.subTitle}</div>
                <div className="flex items-center gap-2 p-2">
                  <div className="text-xl text-error line-through">
                    {course.oldPrice}
                  </div>
                  <div className="text-blue-600 text-xl font-bold">
                    {course.price}
                  </div>
                </div>
                <Link
                  className="hover:underline !text-black bg-primary cursor-pointer p-2 mt-2 rounded w-full text-base flex items-center justify-center gap-2"
                  to={`/youtube`}
                >
                  <Youtube className="w-5 h-5 text-base" /> Vào học ngay
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => scroll(youtubeMiniSwiperRef.current, "left")}
          className="cursor-pointer hover:bg-muted hover:text-primary-foreground dark:hover:bg-muted/30 absolute left-[-15px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border flex items-center justify-center bg-background"
        >
          <ChevronLeft className="w-6 h-6  text-primary" />
        </button>

        <button
          onClick={() => scroll(youtubeMiniSwiperRef.current, "right")}
          className="cursor-pointer hover:bg-muted hover:text-primary-foreground dark:hover:bg-muted/30 absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border flex items-center justify-center bg-background"
        >
          <ChevronRight className="w-6 h-6 text-primary" />
        </button>
      </div>
    </div>
  );
};
export default YouTube;
