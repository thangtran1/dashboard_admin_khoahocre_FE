"use client";

import { Product } from "@/types";
import { Badge } from "@/ui/badge";
import { Collapse } from "antd";
import { ChevronDownIcon } from "lucide-react";

const { Panel } = Collapse;

const ProductCharacteristics = ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  return (
    <Collapse
      accordion
      expandIcon={({ isActive }) => (
        <ChevronDownIcon
          className={`size-4 text-muted-foreground transition-transform duration-200 ${isActive ? "rotate-180" : ""
            }`}
        />
      )}
      className="bg-white border border-border rounded-md shadow-sm"
    >
      <Panel
        header={
          <span className="text-sm font-medium hover:underline">
            {product?.name}: Characteristics
          </span>
        }
        key="1"
        className="text-sm"
      >
        <p className="flex items-center justify-between">
          Thương hiệu:{" "}
          {product?.brand?.name && (
            <span className="font-semibold tracking-wide">{product?.brand?.name}</span>
          )}
        </p>

        <p className="flex items-center mt-1 justify-between">
          Năm sản xuất:{" "}
          <span className="font-semibold tracking-wide">2025</span>
        </p>

        <p className="flex items-center mt-1 justify-between">
          Loại sản phẩm:{" "}
          <span className="font-semibold tracking-wide">
            {product?.category?.name}
          </span>
        </p>

        <p className="flex items-center mt-1 justify-between">
          Tình trạng:{" "}
          {product?.stock && product?.stock > 0 ? <Badge variant="success">Available</Badge> : <Badge variant="error">Out of Stock</Badge>}
        </p>
      </Panel>
    </Collapse>
  );
};

export default ProductCharacteristics;
