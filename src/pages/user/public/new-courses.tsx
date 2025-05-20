import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Youtube,
} from "lucide-react";
import { NewCourseData } from "./dataExport";
import { useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { Link } from "react-router";
import { useFavoriteStore } from "@/store/favoriteStore";

const NewCourses = () => {
  const newCourseMiniSwiperRef = useRef<SwiperClass | null>(null);

  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

  const scroll = (swiper: SwiperClass | null, dir: "left" | "right") => {
    if (!swiper) return;
    dir === "left" ? swiper.slidePrev() : swiper.slideNext();
  };
  return (
    <div className="relative w-full py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          <span className="text-success">TOP</span> Khóa Học Mới Nhất
        </h2>
        <Link
          to={`/new-courses`}
          className="text-sm text-blue-600 font-medium hover:underline inline-flex items-center"
        >
          Xem Thêm <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
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
            newCourseMiniSwiperRef.current = swiper;
          }}
        >
          {NewCourseData.map((course, idx) => {
            const isFavorite = favorites.some((f) => f.id === course.id);

            const toggleFavorite = () => {
              if (isFavorite) {
                removeFavorite(course.id);
              } else {
                addFavorite(course);
              }
            };

            return (
              <SwiperSlide key={idx}>
                <div className="bg-muted rounded-lg border shadow p-2 relative overflow-hidden">
                  {/* Icon trái tim */}
                  <button
                    onClick={toggleFavorite}
                    className="absolute top-2 right-2 z-10 bg-white/90 p-1 rounded-full shadow hover:bg-white transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }`}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Hình ảnh */}
                  <img
                    src={course.image}
                    alt="course"
                    className="w-full h-52 sm:h-72 object-cover rounded"
                  />
                  <h3 className="text-base h-14 line-clamp-2 font-semibold mt-2">
                    <Link to={`/new-courses`}> {course.title}</Link>
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
                    className="hover:underline bg-primary cursor-pointer p-2 mt-2 rounded w-full text-base flex items-center justify-center gap-2"
                    to={`/new-courses`}
                  >
                    <Youtube className="w-5 h-5 text-base" /> Vào học ngay
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button
          onClick={() => scroll(newCourseMiniSwiperRef.current, "left")}
          className="cursor-pointer hover:bg-muted hover:text-primary-foreground dark:hover:bg-muted/30 absolute left-[-15px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border flex items-center justify-center bg-background"
        >
          <ChevronLeft className="w-6 h-6  text-primary" />
        </button>

        <button
          onClick={() => scroll(newCourseMiniSwiperRef.current, "right")}
          className="cursor-pointer hover:bg-muted hover:text-primary-foreground dark:hover:bg-muted/30 absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border flex items-center justify-center bg-background"
        >
          <ChevronRight className="w-6 h-6 text-primary" />
        </button>
      </div>
    </div>
  );
};
export default NewCourses;
