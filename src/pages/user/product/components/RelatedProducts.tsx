import { Separator } from "@/ui/separator";
import Title from "@/ui/title";
import ProductCard from "../../public/ProductCard";
import { useState, useEffect } from "react";
import { productService } from "@/api/services/product";
import NoProductAvailable from "../../public/NoProductAvailable";

interface RelatedProductsProps {
  product: any;
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
  const productId = product?.id;
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  const fetchRelatedProducts = async () => {
    if (!productId) return;
    const res = await productService.getProductByRelated(productId);
    if (res?.success) setRelatedProducts(res.data || []);
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [product]);

  return (
    <div className="mt-2">
      <Title>Sản phẩm liên quan</Title>
      <p className="text-muted-foreground">Yếu tố để có sản phẩm liên quan: Cùng danh mục | cùng thương hiệu | cùng tags</p>
      <Separator className="my-4" />

      <div className="mt-2">
      {relatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      ) : (
        <NoProductAvailable />
      )}
      </div>
    </div>
  );
}