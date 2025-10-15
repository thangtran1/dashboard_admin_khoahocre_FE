import React from "react";
import { Card, Descriptions, Tag } from "antd";
import dayjs from "dayjs";

export default function DatabaseInfoCard({ dbInfo }: { dbInfo: any }) {
  if (!dbInfo) return null;

  return (
    <Card title={`Cơ sở dữ liệu: ${dbInfo.dbName}`} bordered>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Số collection">
          {dbInfo.collectionsCount}
        </Descriptions.Item>
        <Descriptions.Item label="Dung lượng dữ liệu">
          {dbInfo.dataSize}
        </Descriptions.Item>
        <Descriptions.Item label="Dung lượng lưu trữ">
          {dbInfo.storageSize}
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng index">
          {dbInfo.indexes}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian cập nhật" span={2}>
          {dayjs(dbInfo.timestamp).format("HH:mm:ss DD/MM/YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Danh sách collections" span={2}>
          {dbInfo.collections.map((name: string) => (
            <Tag key={name} color="blue" className="mb-1">
              {name}
            </Tag>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
