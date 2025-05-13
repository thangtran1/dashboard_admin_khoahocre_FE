import { Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { testimonials } from "./dataExport";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useRef } from "react";

const Testimonials = () => {
  const testimonialSwiperRef = useRef<SwiperClass | null>(null); // ✔ Testimonials
  const scroll = (swiper: SwiperClass | null, dir: "left" | "right") => {
    if (!swiper) return;
    dir === "left" ? swiper.slidePrev() : swiper.slideNext();
  };
  return (
    <section className="w-full relative">
      <Swiper
        onBeforeInit={(swiper) => {
          testimonialSwiperRef.current = swiper;
        }}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={20}
      >
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-blue-100 rounded-3xl md:px-12 py-10 flex flex-col md:flex-row items-center justify-between mx-auto relative">
              <div className="max-w-2xl">
                <Quote className="text-4xl text-gray-600 mb-4" />
                <p className="text-lg text-gray-800 mb-4">{t.content}</p>
                <p className="text-sm font-medium text-gray-700">
                  - {t.author}
                </p>
              </div>
              <img
                src={t.avatar}
                alt={t.author}
                className="w-40 h-40 rounded-full object-cover mt-8 md:mt-0 md:ml-10"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => scroll(testimonialSwiperRef.current, "left")}
        className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-blue-900 flex items-center justify-center bg-white"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={() => scroll(testimonialSwiperRef.current, "right")}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-blue-900 flex items-center justify-center bg-white"
      >
        <ArrowRight size={20} />
      </button>
    </section>
  );
};
export default Testimonials;
