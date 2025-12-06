import Title from "../../../ui/title";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Label } from "@/ui/label";

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $300", value: "200-300" },
  { title: "$300 - $500", value: "300-500" },
  { title: "Over $500", value: "500-10000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: (value: string | null) => void;
}
const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  const isAllSelected = !selectedPrice;

  return (
    <div className="w-full py-4">
      <Title className="text-base font-bold">Price</Title>
      <RadioGroup className="mt-2 space-y-1" value={selectedPrice || "all"}>
        <div
          onClick={() => setSelectedPrice(null)}
          className="flex items-center space-x-2 hover:cursor-pointer"
        >
          <RadioGroupItem
            value="all"
            id="all-prices"
            className="rounded-sm"
            checked={isAllSelected}
          />
          <Label
            htmlFor="all-prices"
            className={`${isAllSelected ? "font-semibold text-primary" : "font-normal"}`}
          >
            Tất cả mức giá
          </Label>
        </div>

        {/* Các mức giá khác */}
        {priceArray?.map((price, index) => (
          <div
            key={index}
            onClick={() => setSelectedPrice(price?.value)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={price.value}
              className={`${selectedPrice === price?.value ? "font-semibold text-primary" : "font-normal"}`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedPrice && (
        <button
          onClick={() => setSelectedPrice(null)}
          className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-primary"
        >
          Reset selection
        </button>
      )}
    </div>
  );
};

export default PriceList;
