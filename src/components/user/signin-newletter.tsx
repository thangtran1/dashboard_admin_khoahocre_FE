import Logo from "@/ui/logo";
import { Button, Typography, Form, Input } from "antd";
import { toast } from "sonner";
const { Title, Paragraph, Text } = Typography;

export default function SigninNewletter() {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            await form.validateFields();
            toast.success("Đăng ký thành công");
            form.resetFields();
        } catch (err) {
            // Nếu validation fail, Antd sẽ tự động hiển thị lỗi dưới input
        }
    };

    return (
        <div className="border border-primary/30 p-4 rounded-2xl flex flex-col items-center space-y-4">
            <Title level={4} className="font-extrabold text-center">
                Đăng Ký Nhận Tin
            </Title>
            <div className="w-20 h-1 bg-primary rounded-full" />
            <Paragraph className="text-center !text-muted-foreground">
                Nhận thông tin mới nhất về sản phẩm và ưu đãi.
            </Paragraph>

            <Form form={form} className="w-full">
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email" },
                        { type: "email", message: "Email không hợp lệ" },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Nhập email của bạn"
                        className="w-full rounded-lg"
                    />
                </Form.Item>

                <Button
                    onClick={handleSubmit}
                    type="primary"
                    size="large"
                    block
                    className="rounded-lg"
                >
                    Đăng Ký
                </Button>
            </Form>

            <Text className="text-sm !text-muted-foreground text-center">
                Bằng việc đăng ký, bạn đồng ý với chính sách của <Logo />.
            </Text>
        </div>
    );
}
