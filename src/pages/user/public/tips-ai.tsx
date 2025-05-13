import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { aiCourses } from "./dataExport";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const TipsAi = () => {
  const aiSwiperRef = useRef<SwiperClass | null>(null); // ✔ AI

  const scroll = (swiper: SwiperClass | null, dir: "left" | "right") => {
    if (!swiper) return;
    dir === "left" ? swiper.slidePrev() : swiper.slideNext();
  };
  return (
    <section className="w-full  py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          <span className="text-blue-600">Bí Kíp Làm Chủ AI</span> Từ A-Z
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(aiSwiperRef.current, "left")}
            className="w-9 h-9 rounded-full border flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll(aiSwiperRef.current, "right")}
            className="w-9 h-9 rounded-full border flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <Swiper
          onBeforeInit={(swiper) => {
            aiSwiperRef.current = swiper;
          }}
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {aiCourses.map((course, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-lg shadow p-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded"
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
      </div>
    </section>
  );
};
export default TipsAi;
