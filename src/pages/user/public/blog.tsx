import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { blogs } from "./dataExport";
import { useRef } from "react";
import { Pagination } from "swiper/modules";

const Blog = () => {
  const blogSwiperRef = useRef<SwiperClass | null>(null); // ✔ Blog
  const scroll = (swiper: SwiperClass | null, dir: "left" | "right") => {
    if (!swiper) return;
    dir === "left" ? swiper.slidePrev() : swiper.slideNext();
  };
  return (
    <section className="w-full relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Khóa Học Rẻ <span className="text-blue-600">Bản Tin</span>
        </h2>
        <a
          href="#"
          className="text-sm text-blue-600 font-medium hover:underline inline-flex items-center"
        >
          Xem Thêm <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>

      <Swiper
        onBeforeInit={(swiper) => {
          blogSwiperRef.current = swiper;
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
          renderBullet: (_, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        slidesPerView={3}
        spaceBetween={20}
      >
        {blogs.map((blog, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white border shadow rounded-lg overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-76 object-cover"
              />
              <div className="p-2">
                <h3 className="text-base font-semibold line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm p-2 text-gray-600 mt-1 line-clamp-2">
                  {blog.desc}
                </p>
                <div className="text-xs text-gray-500 flex items-center gap-2 mt-2">
                  <span>🏷 {blog.category}</span>
                  <span>📅 {blog.date}</span>
                </div>
                <a
                  href="#"
                  className="mt-2 inline-flex items-center text-md font-medium text-blue-600 hover:underline"
                >
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => scroll(blogSwiperRef.current, "left")}
        className="left-[-15px] top-1/2 -translate-y-1/2 cursor-pointer hover:bg-muted  hover:text-primary-foreground dark:hover:bg-muted/30 absolute  z-10 w-10 h-10 rounded-full border border-border flex items-center justify-center bg-background"
      >
        <ChevronLeft className="w-6 h-6  text-primary" />
      </button>

      <button
        onClick={() => scroll(blogSwiperRef.current, "right")}
        className="cursor-pointer hover:bg-muted hover:text-primary-foreground dark:hover:bg-muted/30 absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border flex items-center justify-center bg-background"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>
      <div className="custom-pagination mt-4 flex justify-center gap-2" />
    </section>
  );
};
export default Blog;
