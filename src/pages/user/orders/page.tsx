import OrdersComponent from "@/components/user/OrdersComponent";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/ui/table";
import { Link } from "react-router";
import { Order } from "@/types";

const OrdersPage = () => {
  const orders = [
    {
      orderNumber: "ORD-12345678",
      customerName: "Tran Van Thang",
      customerEmail: "thang@example.com",
      orderDate: "2024-12-10T14:30:00",
      totalAmount: 350000,
      status: "paid",
      items: [
        {
          product: {
            name: "Serum Vitamin C",
            images: [
              {
                asset: { url: "/images/products/product_1.png" }
              }
            ]
          },
          quantity: 1,
          price: 150000
        },
        {
          product: {
            name: "Sữa Rửa Mặt Dịu Nhẹ",
            images: [
              {
                asset: { url: "/images/products/product_3.png" }
              }
            ]
          },
          quantity: 2,
          price: 100000
        },
        {
          product: {
            name: "Serum Vitamin C",
            images: [
              {
                asset: { url: "/images/products/product_1.png" }
              }
            ]
          },
          quantity: 1,
          price: 150000
        },
        {
          product: {
            name: "Sữa Rửa Mặt Dịu Nhẹ",
            images: [
              {
                asset: { url: "/images/products/product_3.png" }
              }
            ]
          },
          quantity: 2,
          price: 100000
        }
      ]
    },
    {
      orderNumber: "ORD-98765432",
      customerName: "Tran Van Thang",
      customerEmail: "thang@example.com",
      orderDate: "2024-12-11T09:15:00",
      totalAmount: 120000,
      totalQuantity: 1,
        status: "pending",
      items: [
        {
          product: {
            name: "Kem Dưỡng Ẩm",
            images: [
              {
                asset: { url: "/images/products/product_3.png" }
              }
            ]
          },
          quantity: 1,
          price: 120000
        }
      ]
    }
  ] as Order[];

  return (
    <div>
        {orders?.length ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Danh sách đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] md:w-auto">
                        Số đơn hàng
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Ngày đặt hàng
                      </TableHead>
                      <TableHead>Tên người đặt</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead>Tổng tiền</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-center">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponent orders={orders} />
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Không có đơn hàng nào
            </h2>
            <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
              Có vẻ như bạn chưa đặt hàng nào. Bắt đầu mua sắm để xem đơn hàng của bạn ở đây!
            </p>
            <Button asChild className="mt-4">
              <Link to="/">Xem sản phẩm</Link>
            </Button>
          </div>
        )}
    </div>
  );
};

export default OrdersPage;
