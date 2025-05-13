import { reasons } from "./dataExport";

const WhyChooseCourse = () => {
  return (
    <section className="bg-gray-100  py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Tại Sao Bạn Nên Lựa Chọn{" "}
          <span className="text-blue-600">Khóa Học Rẻ?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 text-center">
          {reasons.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              {item.icon}
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 whitespace-pre-line">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseCourse;
