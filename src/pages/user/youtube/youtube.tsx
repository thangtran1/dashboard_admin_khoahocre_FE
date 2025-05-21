import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Pagination } from "@heroui/react";
import Breadcrumbs from "@/utils/Breadcrumb";
import { Link } from "react-router";
import { SiderBarDetail } from "../public/siderbarDetail";
import { CourseData } from "../public/dataExport";

const YoutubePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const totalPages = Math.ceil(CourseData.length / pageSize);
  const paginatedBlogs = CourseData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="w-full">
      <div className="p-2 mb-2 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>

      <h2 className="text-2xl font-bold mb-6">
        Youtube Kiếm Nghìn $ Mỗi Tháng
      </h2>

      <div className="xl:flex xl:gap-6">
        {/* Grid blog - chiếm 3 cột */}
        <div className="w-full xl:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {paginatedBlogs.map((CourseData, idx) => (
            <div
              key={idx}
              className="bg-background border shadow rounded-lg overflow-hidden"
            >
              <img
                src={CourseData.image}
                alt={CourseData.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-3">
                <h3 className="text-base font-semibold line-clamp-2">
                  <Link to={`/youtube/${CourseData.id}`}>
                    {CourseData.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {CourseData.subTitle}
                </p>
                <div className="text-xs text-gray-500 flex items-center gap-2 mt-2">
                  <span>🏷 {CourseData.oldPrice}</span>
                  <span>📅 {CourseData.price}</span>
                </div>
                <Link
                  to={`/youtube/${CourseData.id}`}
                  state={{ CourseData }}
                  className="text-sm text-blue-600 font-medium hover:underline inline-flex items-center"
                >
                  Xem Thêm <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar - chiếm 1 cột bên phải */}
        <SiderBarDetail />
      </div>

      <div className="text-right mt-5 flex justify-center">
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={(p) => {
            setCurrentPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          showControls
          siblings={1}
          boundaries={1}
          classNames={{
            item: "rounded-full bg-background hover:bg-primary transition",
            prev: "bg-muted  hover:bg-primary rounded-full",
            next: "bg-muted  hover:bg-primary rounded-full",
            ellipsis: "text-gray-400",
          }}
        />
      </div>
    </section>
  );
};

export default YoutubePage;
