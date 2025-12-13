"use client";
import { toast } from "sonner";
import useStore from "@/store/store";
import { useRouter } from "@/router/hooks/use-router";
import { Button } from "antd";

const BuyNowButton = ({ product }: { product: any }) => {
  const { addItem, getItemCount } = useStore();
  const navigate = useRouter();

  const handleBuyNow = () => {
    const itemCount = getItemCount(product._id);

    // Nếu sản phẩm chưa có trong giỏ, thêm vào
    if (itemCount === 0 && product.stock > 0) {
      addItem(product);
      toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
    }

    navigate.push("/checkout");
  };

  return (
    <Button
      type="primary"
      danger
      className="flex-1 min-h-[50px]"
      onClick={handleBuyNow}
    >
      <div>
        <div className="text-foreground">Mua ngay - Giao nhanh</div>
      </div>
    </Button>
  );
};

export default BuyNowButton;
