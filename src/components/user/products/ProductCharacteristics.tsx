"use client";

import { Product } from "@/types";
import { getFakeBrandBySlug } from "@/constants/fakeData";
import { Collapse } from "antd";
import { ChevronDownIcon } from "lucide-react";

const { Panel } = Collapse;

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const brand = await getFakeBrandBySlug(product?.brand?.slug?.current as string);

  return (
    <Collapse
      accordion
      expandIcon={({ isActive }) => (
        <ChevronDownIcon
          className={`size-4 text-muted-foreground transition-transform duration-200 ${
            isActive ? "rotate-180" : ""
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
          Brand:{" "}
          {brand && (
            <span className="font-semibold tracking-wide">{brand?.name}</span>
          )}
        </p>

        <p className="flex items-center justify-between">
          Collection:{" "}
          <span className="font-semibold tracking-wide">2025</span>
        </p>

        <p className="flex items-center justify-between">
          Type:{" "}
          <span className="font-semibold tracking-wide">
            {product?.category?.name}
          </span>
        </p>

        <p className="flex items-center justify-between">
          Stock:{" "}
          <span className="font-semibold tracking-wide">
            {product?.stock && product?.stock > 0 ? "Available" : "Out of Stock"}
          </span>
        </p>
      </Panel>
    </Collapse>
  );
};

export default ProductCharacteristics;
