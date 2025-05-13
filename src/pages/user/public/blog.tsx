import { ArrowRight } from "lucide-react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { blogs } from "./dataExport";
import { useRef } from "react";
import { Pagination } from "swiper/modules";

const Blog = () => {
  const blogSwiperRef = useRef<SwiperClass | null>(null); // ✔ Blog

  return (
    <section className="w-full">
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
        modules={[Pagination]}
        onBeforeInit={(swiper) => {
          blogSwiperRef.current = swiper;
        }}
        pagination={{ clickable: true }}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {blogs.map((blog, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {blog.desc}
                </p>
                <div className="text-xs text-gray-500 flex items-center gap-2 mt-2">
                  <span>🏷 {blog.category}</span>
                  <span>📅 {blog.date}</span>
                </div>
                <a
                  href="#"
                  className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
                >
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default Blog;
