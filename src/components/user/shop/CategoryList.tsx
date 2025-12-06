import { Category } from "@/types";
import Title from "../../../ui/title";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Label } from "@/ui/label";

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: (value: string | null) => void;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  // Khi selectedCategory là null hoặc undefined → "Tất cả" được active
  const isAllSelected = !selectedCategory;

  return (
    <div className="w-full py-3">
      <Title className="text-base font-bold">Product Categories</Title>
      <RadioGroup value={selectedCategory || "all"} className="mt-2 space-y-1">
        <div
          onClick={() => setSelectedCategory(null)}
          className="flex items-center space-x-2 hover:cursor-pointer"
        >
          <RadioGroupItem
            value="all"
            id="all-categories"
            className="rounded-sm"
            checked={isAllSelected}
          />
          <Label
            htmlFor="all-categories"
            className={`${isAllSelected ? "font-semibold text-primary" : "font-normal"}`}
          >
            Tất cả sản phẩm
          </Label>
        </div>

        {/* Các category khác */}
        {categories?.map((category) => (
          <div
            onClick={() => {
              setSelectedCategory(category?.slug?.current as string);
            }}
            key={category?._id}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={category?.slug?.current as string}
              id={category?.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={category?.slug?.current}
              className={`${selectedCategory === category?.slug?.current ? "font-semibold text-primary" : "font-normal"}`}
            >
              {category?.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedCategory && (
        <button
          onClick={() => setSelectedCategory(null)}
          className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-primary text-left"
        >
          Reset selection
        </button>
      )}
    </div>
  );
};

export default CategoryList;
