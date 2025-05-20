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
        pagination={{
          clickable: true,
          el: ".custom-pagination-1",
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
          renderBullet: (_, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        slidesPerView={1}
        spaceBetween={10}
      >
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-background border border-boder p-4 h-[500px] md:h-[275px] rounded-3xl md:px-12 py-10 flex flex-col md:flex-row items-center justify-between mx-auto relative">
              <div className="max-w-2xl">
                <Quote className="text-4xl text-gray-600 mb-4" />
                <p className="text-lg  mb-4">{t.content}</p>
                <p className="text-sm font-medium text-gray-700">
                  - {t.author}
                </p>
              </div>
              <img
                src={t.avatar}
                alt={t.author}
                className="w-40 h-40 rounded-full object-cover "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => scroll(testimonialSwiperRef.current, "left")}
        className="absolute left-1 inset-y-0 my-auto z-10 w-10 h-10 rounded-full border border-blue-900 flex items-center justify-center bg-background"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={() => scroll(testimonialSwiperRef.current, "right")}
        className="absolute right-1 inset-y-0 my-auto z-10 w-10 h-10 rounded-full border border-blue-900 flex items-center justify-center bg-background"
      >
        <ArrowRight size={20} />
      </button>
      <div className="custom-pagination-1 mt-4 flex justify-center gap-2" />
    </section>
  );
};
export default Testimonials;
