  "use client";

  import useStore from "@/store/store";
  import { useState } from "react";
  import {  DeleteOutlined } from "@ant-design/icons";
  import { Table, Button, Typography, Space, message } from "antd";
  import { Link } from "react-router";
  import PriceFormatter from "./PriceFormatter";
  import AddToCartButton from "./AddToCartButton";
  import { Product } from "@/types";
  import { ColumnType } from "antd/es/table";
import { toast } from "sonner";
import { Heart } from "lucide-react";

  const { Title, Text } = Typography;

  const WishListProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(7);
    const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
    const loadMore = () => {
      setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
    };

    const handleResetWishlist = () => {
      const confirmReset = window.confirm(
        "Are you sure you want to reset your wishlist?"
      );
      if (confirmReset) {
        resetFavorite();
        toast.success("Wishlist reset successfully");
      }
    };

    const handleRemoveProduct = (id: string) => {
      removeFromFavorite(id);
      message.success("Product removed from wishlist");
    };

    const columns = [
      {
        title: "Image",
        dataIndex: "images",
        key: "images",
        render: (images: any, record: any) => (
          <Space >
            <Link to={`/product/${record.slug?.current}`}>
              <img
                src={images?.[0]?.asset?.url || "/images/products/product_1.png"}
                alt="product image"
                className="h-20 w-20 object-contain rounded-md"
              />
            </Link>
            <Text>{record.name}</Text>
          </Space>
        ),
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
          render: (category: any) => (
          <Text>{category?.name}</Text>
        ),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (_: any, record: any) => (
          <PriceFormatter amount={record.price} />
        ),
      },
      {
        title: "Action",
        key: "action",
        align: "center",
        render: (_: any, record: any) => (
          <Space size={14}>
            <AddToCartButton product={record} className="w-full" />
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleRemoveProduct(record._id)}
            />
          </Space>
        ),
      },
    ];

    return (
      <div>
        <Title level={3} className="mb-4">
          Danh sách yêu thích
        </Title>

        {favoriteProduct.length > 0 ? (
          <>
            <Table
              dataSource={favoriteProduct.slice(0, visibleProducts)}
              columns={columns as unknown as ColumnType<Product>[]}
              rowKey={(record: Product) => record._id}
              pagination={false}
            />

            <div className="flex gap-2 mt-4">
              {visibleProducts < favoriteProduct.length && (
                <Button onClick={loadMore}>Load More</Button>
              )}
              {visibleProducts > 10 && (
                <Button onClick={() => setVisibleProducts(10)}>Load Less</Button>
              )}
              <Button danger onClick={handleResetWishlist}>
                Reset Wishlist
              </Button>
            </div>
          </>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center space-y-6 px-4 text-center">
          <div className="relative mb-4">
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-muted-foreground/20" />
            <Heart
              className="h-12 w-12 text-muted-foreground"
              strokeWidth={1.5}
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Danh sách yêu thích của bạn trống
            </h2>
            <p className="text-sm text-muted-foreground">
              Sản phẩm được thêm vào danh sách yêu thích của bạn sẽ hiện ở đây
            </p>
          </div>
          <Button variant="outlined" color="primary">
            <Link to="/shop">Tiếp tục mua sắm</Link>
          </Button>
        </div>
        )}
      </div>
    );
  };

  export default WishListProducts;
