import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

interface CreateCourseForm {
  title: string;
  subtitle?: string;
  slug: string;
  description?: string;
  price: number;
  oldPrice?: number;
  image?: string;
  category: string;
  badge?: string;
  isFree: boolean;
  isActive: boolean;
  isFeatured: boolean;
  level?: string;
}

const categories = [
  { label: "AI", value: "ai" },
  { label: "Group Buy", value: "group_buy" },
  { label: "New Course", value: "new_course" },
  { label: "Best Seller", value: "best_seller" },
  { label: "Free", value: "free" },
  { label: "Market", value: "market" },
];

const levels = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

const CreateCourse = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateCourseForm>({
    defaultValues: {
      title: "",
      subtitle: "",
      slug: "",
      description: "",
      price: 0,
      oldPrice: 0,
      image: "",
      category: "new_course",
      badge: "",
      isFree: false,
      isActive: true,
      isFeatured: false,
      level: "Beginner",
    },
  });

  const isFree = watch("isFree");

  const onSubmit = async (data: CreateCourseForm) => {
    try {
      if (data.isFree) data.price = 0;
      await axios.post("http://localhost:5000/courses", data);
      alert("Tạo khóa học thành công!");
    } catch (error: any) {
      console.error("Lỗi tạo khóa học:", error.response?.data || error.message);
      alert("Lỗi khi tạo khóa học!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-6"
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tiêu đề <span className="text-red-600">*</span>
        </label>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Tiêu đề là bắt buộc" }}
          render={({ field }) => (
            <input
              {...field}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          )}
        />
        {errors.title && (
          <p className="text-red-600 mt-1 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phụ đề
        </label>
        <Controller
          name="subtitle"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Slug <span className="text-red-600">*</span>
        </label>
        <Controller
          name="slug"
          control={control}
          rules={{ required: "Slug là bắt buộc" }}
          render={({ field }) => (
            <input
              {...field}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.slug
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          )}
        />
        {errors.slug && (
          <p className="text-red-600 mt-1 text-sm">{errors.slug.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Giá <span className="text-red-600">*</span>
        </label>
        <Controller
          name="price"
          control={control}
          rules={{
            required: !isFree ? "Giá là bắt buộc" : false,
            min: { value: 0, message: "Giá không được âm" },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              disabled={isFree}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.price
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          )}
        />
        {errors.price && (
          <p className="text-red-600 mt-1 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Old Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Giá gốc
        </label>
        <Controller
          name="oldPrice"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ảnh đại diện (URL)
        </label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="url"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Danh mục <span className="text-red-600">*</span>
        </label>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Danh mục là bắt buộc" }}
          render={({ field }) => (
            <select
              {...field}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          )}
        />
        {errors.category && (
          <p className="text-red-600 mt-1 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Badge */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nhãn</label>
        <Controller
          name="badge"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        />
      </div>

      {/* Checkbox group */}
      <div className="flex gap-6 mt-4">
        <Controller
          name="isFree"
          control={control}
          render={({ field }) => (
            <label className="inline-flex items-center">
              <input
                {...field}
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Miễn phí</span>
            </label>
          )}
        />
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <label className="inline-flex items-center">
              <input
                {...field}
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Kích hoạt</span>
            </label>
          )}
        />
        <Controller
          name="isFeatured"
          control={control}
          render={({ field }) => (
            <label className="inline-flex items-center">
              <input
                {...field}
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Nổi bật</span>
            </label>
          )}
        />
      </div>

      {/* Level */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Trình độ
        </label>
        <Controller
          name="level"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {levels.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-6 w-full rounded bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        Tạo khóa học
      </button>
    </form>
  );
};

export default CreateCourse;
