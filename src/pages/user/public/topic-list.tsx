import { ArrowRight } from "lucide-react";
import { Categories } from "./dataExport";

const TopicList = () => {
  return (
    <>
      <section className="w-full mx-auto py-8">
        <div className="flex  items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">
            Danh Sách <span className="text-blue-600">Chủ Đề</span>
          </h1>
          <button className="text-sm font-medium text-blue-600 hover:underline inline-flex items-center">
            Xem Thêm <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-6">Bạn đang quan tâm gì?</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Categories.map((cat, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-gray-100 shadow-sm"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-40 object-cover"
              />
              <div className="text-center py-3">
                <h3 className="font-bold hover:underline hover:text-primary cursor-pointer text-lg text-gray-800">
                  {cat.title}
                </h3>
                <p className="text-base cursor-pointer text-primary">
                  {cat.count} Khóa Học
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default TopicList;
