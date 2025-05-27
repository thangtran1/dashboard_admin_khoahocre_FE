"use client";

import { buttonCancel, buttonConfirm, inputClass } from "@/utils/use-always";
import { Button, Divider, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export default function CreateCourseForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      slug: "",
      description: "",
      price: 0,
      oldPrice: 0,
      image: "",
      isFree: false,
      isActive: true,
      isFeatured: false,
      level: "beginner",
      introduce: { title: "", subtitle: "", reasons: "" },
      contents: [{ title: "", items: [{ title: "" }] }],
    },
  });

  const categoriesOptions = [
    { value: "ai", label: "AI" },
    { value: "dev", label: "Developer" },
  ];
  const teacherOptions = [
    { value: 13, label: "Teacher 13" },
    { value: 14, label: "Teacher 14" },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);

  const {
    fields: contentFields,
    append,
    remove,
  } = useFieldArray({ control, name: "contents" });

  interface FormData {
    title: string;
    subtitle: string;
    slug: string;
    description: string;
    price: number;
    oldPrice: number;
    image: string;
    isFree: boolean;
    isActive: boolean;
    isFeatured: boolean;
    level: string;
    introduce: { title: string; subtitle: string; reasons: string };
    contents: { title: string; items: { title: string }[] }[];
  }

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      categories: selectedCategories,
      teacherIds: selectedTeachers.map(Number),
      introduce: {
        ...data.introduce,
        reasons: data.introduce.reasons.split("\n"),
      },
    };
    console.log("Payload:", payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-6xl space-y-6 rounded-xl bg-white p-8 shadow-lg"
    >
      <h2 className="text-2xl font-bold">🎓 Tạo khóa học mới</h2>

      {["title", "subtitle", "slug", "image"].map((field) => (
        <div key={field} className="flex flex-col">
          <label className="mb-1 font-medium">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input className={inputClass} {...register(field)} type="text" />
        </div>
      ))}

      <div className="flex flex-col">
        <label className="mb-1 font-medium">Mô tả chi tiết</label>
        <textarea
          rows={6}
          className={inputClass}
          {...register("description")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Giá</label>
          <input
            type="number"
            className={inputClass}
            {...register("price", { valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Giá cũ</label>
          <input
            type="number"
            className={inputClass}
            {...register("oldPrice", { valueAsNumber: true })}
          />
        </div>
      </div>

      <Controller
        control={control}
        name="categories"
        render={({ field }) => (
          <Select
            label="Danh mục"
            placeholder="Chọn danh mục"
            selectionMode="multiple"
            selectedKeys={new Set(field.value || [])}
            onSelectionChange={(keys) => {
              const arr = Array.from(keys);
              field.onChange(arr);
              setSelectedCategories(arr);
            }}
          >
            {categoriesOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="teacherIds"
        render={({ field }) => (
          <Select
            label="Giảng viên"
            placeholder="Chọn giảng viên"
            selectionMode="multiple"
            selectedKeys={new Set(field.value || [])}
            onSelectionChange={(keys) => {
              const arr = Array.from(keys);
              field.onChange(arr);
              setSelectedTeachers(arr.map(String));
            }}
          >
            {teacherOptions.map((option) => (
              <SelectItem key={option.value} id={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <div className="flex gap-4">
        {["isFree", "isActive", "isFeatured"].map((name) => (
          <label key={name} className="flex items-center gap-2">
            <input type="checkbox" className={inputClass} {...register(name)} />{" "}
            {name}
          </label>
        ))}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium">Level</label>
        <select
          {...register("level")}
          className={inputClass}
          defaultValue="beginner"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium">Giới thiệu - Tiêu đề</label>
        <textarea className={inputClass} {...register("introduce.title")} />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium">Giới thiệu - Phụ đề</label>
        <textarea className={inputClass} {...register("introduce.subtitle")} />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium">Lý do (mỗi lý do xuống dòng)</label>
        <textarea
          rows={3}
          className={inputClass}
          {...register("introduce.reasons")}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">📚 Nội dung khóa học</h3>
        {contentFields.map((field, idx) => (
          <div key={field.id} className="space-y-2">
            <Divider />

            <div className="flex flex-col">
              <label className="mb-1 font-medium">{`Tên phần ${
                idx + 1
              }`}</label>

              <div className="flex gap-2">
                <input
                  className={inputClass}
                  {...register(`contents.${idx}.title`)}
                  type="text"
                />
                <Button
                  type="button"
                  className={buttonCancel}
                  onPress={() => remove(idx)}
                >
                  Xóa phần
                </Button>
              </div>
            </div>
            <NestedItems
              control={control}
              nestIndex={idx}
              register={register}
            />
          </div>
        ))}
        <Button
          type="button"
          className={`${buttonConfirm} mt-2`}
          onPress={() => append({ title: "", items: [{ title: "" }] })}
        >
          + Thêm phần mới
        </Button>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className={`${buttonConfirm} w-full`}>
          Tạo khóa học
        </Button>
      </div>
    </form>
  );
}

import { Control, UseFormRegister } from "react-hook-form";

interface NestedItemsProps {
  nestIndex: number;
  control: Control<any>;
  register: UseFormRegister<any>;
}

function NestedItems({ nestIndex, control, register }: NestedItemsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `contents.${nestIndex}.items`,
  });

  return (
    <div className="space-y-2  ml-4">
      {fields.map((field, k) => (
        <div key={field.id} className="flex items-center gap-2">
          <div className="flex flex-col flex-grow">
            <label className="mb-1 font-medium">{`Tên bài ${k + 1}`}</label>
            <div className="flex items-center gap-2">
              <input
                className={inputClass}
                {...register(`contents.${nestIndex}.items.${k}.title`)}
                type="text"
              />
              <Button
                type="button"
                className={buttonCancel}
                onPress={() => remove(k)}
              >
                Xóa
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          type="button"
          className={`${buttonConfirm} mt-2 `}
          onPress={() => append({ title: "" })}
        >
          + Thêm bài học
        </Button>
      </div>
    </div>
  );
}
