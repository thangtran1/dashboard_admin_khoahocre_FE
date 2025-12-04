import { Order } from "@/types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import PriceFormatter from "./PriceFormatter";

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-scroll">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground font-semibold">
            Chi tiết đơn hàng – {order.orderNumber}
          </DialogTitle>
        </DialogHeader>

        {/* Thông tin khách hàng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border">
          <div className="space-y-1 text-foreground">
          <p className="text-foreground flex items-center gap-2">
  <span className="underline">Khách hàng:</span> {order.customerName}
</p>
            <p className="text-foreground flex items-center gap-2">
              <span className="underline">Email:</span> {order.customerEmail}
            </p>
            <p className="text-foreground flex items-center gap-2">
              <span className="underline">Số đơn hàng:</span> {order.orderNumber}
            </p>
          </div>

          <div className="space-y-1 text-foreground">
            <p className="text-foreground flex items-center gap-2">
              <span className="underline">Ngày đặt:</span>{" "}
              {order.orderDate &&
                new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p className="text-foreground flex items-center gap-2">
              <span className="underline">Trạng thái:</span>{" "}
              <span className={`px-2 py-1 rounded-full text-xs uppercase font-semibold text-foreground ${
                          order.status === "paid"
                            ? "bg-success"
                            : "bg-warning"
                        }`}>
                {order.status}
              </span>
            </p>
          </div>
        </div>

        {/* Table giữ nguyên */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Giá</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-3 text-foreground">
                  {item?.product?.images && (
                    <img
                      src={
                        item.product.images[0]?.asset?.url ||
                        "/images/products/product_1.png"
                      }
                      alt="productImage"
                      className="w-14 h-14 border rounded-md object-cover"
                    />
                  )}
                  <span className="font-medium">{item.product?.name}</span>
                </TableCell>

                <TableCell className="text-foreground">{item.quantity}</TableCell>

                <TableCell>
                  <PriceFormatter
                    amount={item.price}
                    className="text-foreground font-medium"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-2 border-t pt-4 text-right flex items-center justify-end">
          <div className="w-44 flex flex-col gap-1">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-lg text-foreground font-bold">Tổng tiền: </h3>
              <PriceFormatter
                amount={order?.totalAmount}
                className="text-foreground font-bold"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
