import { useFavoriteStore } from "@/store/favoriteStore";
import Breadcrumbs from "@/utils/Breadcrumb";
import { Heart } from "lucide-react";
import { Link } from "react-router";

const WishList = () => {
  const { favorites, removeFavorite } = useFavoriteStore();

  if (!favorites.length) {
    return (
      <div className="p-6 text-center text-primary">
        Bạn chưa có khóa học yêu thích nào.
      </div>
    );
  }

  return (
    <>
      <div className="p-2 mb-2 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>
      <div className="">
        <h1 className="text-2xl font-bold mb-2">Danh sách yêu thích</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((course) => (
            <div
              key={course.id}
              className="bg-muted border rounded-lg shadow p-2 relative"
            >
              <button
                onClick={() => removeFavorite(course.id)}
                className="absolute top-2 right-2 z-10 bg-white/90 p-1 rounded-full shadow hover:bg-white"
              >
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              </button>
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-52 object-cover rounded"
              />
              <h3 className="font-semibold mt-2 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {course.subTitle}
              </p>
              <div className="flex gap-2 mt-2">
                <span className="text-error line-through">
                  {course.oldPrice}
                </span>
                <span className="text-blue-600 font-bold">{course.price}</span>
              </div>
              <Link
                to="/youtube"
                className="mt-2 inline-block bg-primary text-white text-sm px-4 py-2 rounded w-full text-center"
              >
                Xem khóa học
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WishList;
