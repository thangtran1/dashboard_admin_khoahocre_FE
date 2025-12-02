"use client";

import { Form, Input, Button } from "antd";
import { toast } from "sonner";
import { Typography } from "antd";
const { Title } = Typography;

export default function Contact() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Submitted:", values);
    toast.success("Liên hệ đã được gửi thành công!");
    form.resetFields();
  };

  return (

    <div>

      <div className="mx-auto max-w-2xl">
      <Title level={3} className="mb-4 text-center">Liên hệ với chúng tôi</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input
            size="large"
            placeholder="Nhập họ tên của bạn"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            size="large"
            placeholder="Nhập email"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Tin nhắn"
          name="message"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <Input.TextArea
            rows={5}
            placeholder="Nhập nội dung cần liên hệ..."
            className="rounded-lg"
          />
        </Form.Item>

        <div className="flex justify-end gap-2">
            <Button size="large" danger >Hủy</Button>
            <Button type="primary" htmlType="submit" size="large" >Gửi liên hệ</Button>
        </div>
      </Form>
      </div>
      </div>
  );
}
