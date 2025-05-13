import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import { CourseData, data } from "./dataExport";
import { useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

const CoursesTop = () => {
  const youtubeMiniSwiperRef = useRef<SwiperClass | null>(null); // ✔ YouTube (phần 2)

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
            0: { slidesPerView: 1.2 },
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
              <div className="bg-white rounded-lg shadow p-4">
                <img
                  src={course.image}
                  alt="course"
                  className="w-full h-52 sm:h-40 object-cover rounded"
                />
                <h3 className="text-base font-semibold mt-2">{course.title}</h3>
                <div className="text-sm text-gray-500 line-through">
                  {course.oldPrice}
                </div>
                <div className="text-blue-600 font-bold">{course.price}</div>
                <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded w-full text-sm">
                  Vào Học Ngay
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => scroll(youtubeMiniSwiperRef.current, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border flex items-center justify-center bg-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll(youtubeMiniSwiperRef.current, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border flex items-center justify-center bg-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
export default CoursesTop;
