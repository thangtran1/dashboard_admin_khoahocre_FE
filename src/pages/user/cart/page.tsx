"use client";

import PriceFormatter from "@/components/user/PriceFormatter";
import QuantityButtons from "@/components/user/QuantityButtons";
import Title from "@/ui/title";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Separator } from "@/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { Button } from "@/ui/button";
import useStore from "@/store/store";
import { ShoppingBag, Trash } from "lucide-react";
import { Link } from "react-router";
import {  useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@/router/hooks/use-router";
import ProductSideMenu from "../public/ProductSideMenu";
import { useUserToken } from "@/store/userStore";
import NoAccess from "@/components/user/NoAccess";
import EmptyCart from "@/components/user/EmptyCart";
const CartPage = () => {
  const userToken = useUserToken();
  console.log(userToken, '123123');
  const navigate = useRouter();
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const [addresses, setAddresses] = useState<any[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null);

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const handleCheckout = () => {
    navigate.push("/checkout");
  };
  return (
    <div className="pb-6">
      <div>
        {/* ==== 3 TRẠNG THÁI ==== */}
        {!userToken?.accessToken ? (
          <NoAccess />
        ) : groupedItems?.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* ==== GIỎ HÀNG BÌNH THƯỜNG ==== */}
            <div className="flex items-center gap-2 py-5">
              <ShoppingBag className="text-darkColor" />
              <Title>Shopping Cart</Title>
            </div>
  
            <div className="grid lg:grid-cols-3 md:gap-8">
              <div className="lg:col-span-2 rounded-lg">
                <div className="border rounded-md">
                  {groupedItems?.map(({ product }: { product: any }) => {
                    const itemCount = getItemCount(product?._id);
                    return (
                      <div
                        key={product?._id}
                        className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                      >
                        <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                          {product?.images && (
                            <Link
                              to={`/product/${product?.slug?.current}`}
                              className="border p-0.5 md:p-1 mr-2 rounded-md
                                overflow-hidden group"
                            >
                              <img
                                src={
                                  product?.images[0]?.asset?.url ||
                                  "/images/products/product_1.png"
                                }
                                alt="productImage"
                                className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                              />
                            </Link>
                          )}
  
                          <div className="h-full flex flex-1 flex-col justify-between py-1">
                            <div className="flex flex-col gap-0.5 md:gap-1.5">
                              <h2 className="text-base font-semibold line-clamp-1">
                                {product?.name}
                              </h2>
                              <p className="text-sm capitalize">
                                Variant:{" "}
                                <span className="font-semibold">
                                  {product?.type}
                                </span>
                              </p>
                              <p className="text-sm capitalize">
                                Status:{" "}
                                <span className="font-semibold">
                                  {product?.status}
                                </span>
                              </p>
                            </div>
  
                            <div className="flex items-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <ProductSideMenu
                                      product={product}
                                      className="relative top-0 right-0"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold">
                                    Add to Favorite
                                  </TooltipContent>
                                </Tooltip>
  
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Trash
                                      onClick={() => {
                                        deleteCartProduct(product?._id);
                                        toast.success(
                                          "Product deleted successfully!"
                                        );
                                      }}
                                      className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold bg-red-600">
                                    Delete product
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>
  
                        <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                          <PriceFormatter
                            amount={(product?.price as number) * itemCount}
                            className="font-bold text-lg"
                          />
                          <QuantityButtons product={product} />
                        </div>
                      </div>
                    );
                  })}
  
                  <Button
                    onClick={handleResetCart}
                    className="m-5 font-semibold"
                    variant="destructive"
                  >
                    Reset Cart
                  </Button>
                </div>
              </div>
  
              {/* SIDE SUMMARY */}
              <div>
                <div className="lg:col-span-1">
                  <div className="hidden md:inline-block w-full p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold"
                        />
                      </div>
  
                      <Button
                        className="w-full rounded-full font-semibold"
                        size="lg"
                        disabled={loading}
                        onClick={handleCheckout}
                      >
                        {loading ? "Please wait..." : "Proceed to Checkout"}
                      </Button>
                    </div>
                  </div>
  
                  {addresses && (
                    <div className="rounded-md mt-5">
                      <Card>
                        <CardHeader>
                          <CardTitle>Delivery Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <RadioGroup
                            defaultValue={addresses
                              ?.find((addr: any) => addr.default)
                              ?._id.toString()}
                          >
                            {addresses?.map((address: any) => (
                              <div
                                key={address?._id}
                                onClick={() => setSelectedAddress(address)}
                                className={`flex items-center space-x-2 mb-4 cursor-pointer ${
                                  selectedAddress?._id?.toString() ===
                                    address?._id?.toString() &&
                                  "text-shop_dark_green"
                                }`}
                              >
                                <RadioGroupItem
                                  value={address?._id.toString()}
                                />
                                <Label
                                  htmlFor={`address-${address?._id}`}
                                  className="grid gap-1.5 flex-1"
                                >
                                  <span className="font-semibold">
                                    {address?.name}
                                  </span>
                                  <span className="text-sm text-black/60">
                                    {address.address}, {address.city},{" "}
                                    {address.state} {address.zip}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
  
                          <Button variant="outline" className="w-full mt-4">
                            Add New Address
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
  
              {/* MOBILE SUMMARY */}
              <div className="md:hidden fixed bottom-0 left-0 w-full pt-2">
                <div className="p-4 rounded-lg border mx-4">
                  <h2>Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>SubTotal</span>
                      <PriceFormatter amount={getSubTotalPrice()} />
                    </div>
  
                    <div className="flex items-center justify-between">
                      <span>Discount</span>
                      <PriceFormatter
                        amount={getSubTotalPrice() - getTotalPrice()}
                      />
                    </div>
  
                    <Separator />
  
                    <div className="flex items-center justify-between font-semibold text-lg">
                      <span>Total</span>
                      <PriceFormatter
                        amount={getTotalPrice()}
                        className="text-lg font-bold"
                      />
                    </div>
  
                    <Button
                      className="w-full rounded-full font-semibold"
                      size="lg"
                      disabled={loading}
                      onClick={handleCheckout}
                    >
                      {loading ? "Please wait..." : "Proceed to Checkout"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
};

export default CartPage;
