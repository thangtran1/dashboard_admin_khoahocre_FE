"use client";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { Image as ImageType } from "@/types";

interface Props {
  images?: ImageType[];
  isStock?: number | undefined;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <m.div
          key={activeIndex}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[350px] min-h-[300px] border border-border rounded-md group overflow-hidden"
        >
          <img
            src={activeImage?.asset?.url}
            alt="productImage"
            className={`w-full max-h-[350px] min-h-[300px] object-contain group-hover:scale-110 rounded-md ${isStock === 0 ? "opacity-50" : ""
              }`}
          />
        </m.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-20 md:h-24">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`border rounded-md overflow-hidden ${activeIndex === index ? "border-darkColor opacity-100" : "opacity-80"}`}
          >
            <img
              src={image?.asset?.url || "/images/products/product_1.png"}
              alt={`Thumbnail ${index}`}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
