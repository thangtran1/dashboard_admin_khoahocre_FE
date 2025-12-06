import { Brand } from "@/types";
import Title from "../../../ui/title";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Label } from "@/ui/label";

interface Props {
  brands: Brand[];
  selectedBrand?: string | null;
  setSelectedBrand: (value: string | null) => void;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  const isAllSelected = !selectedBrand;

  return (
    <div className="w-full py-2">
      <Title className="text-base font-bold">Brands</Title>
      <RadioGroup value={selectedBrand || "all"} className="mt-2 space-y-1">
        <div
          onClick={() => setSelectedBrand(null)}
          className="flex items-center space-x-2 hover:cursor-pointer"
        >
          <RadioGroupItem
            value="all"
            id="all-brands"
            className="rounded-sm"
            checked={isAllSelected}
          />
          <Label
            htmlFor="all-brands"
            className={`${isAllSelected ? "font-semibold text-primary" : "font-normal"}`}
          >
            Tất cả thương hiệu
          </Label>
        </div>

        {/* Các brand khác */}
        {brands?.map((brand) => (
          <div
            key={brand?._id}
            onClick={() => setSelectedBrand(brand?.slug?.current as string)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={brand?.slug?.current as string}
              id={brand?.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={brand?.slug?.current}
              className={`${selectedBrand === brand?.slug?.current ? "font-semibold text-primary" : "font-normal"}`}
            >
              {brand?.name}
            </Label>
          </div>
        ))}
        {selectedBrand && (
          <button
            onClick={() => setSelectedBrand(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-primary text-left"
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default BrandList;
