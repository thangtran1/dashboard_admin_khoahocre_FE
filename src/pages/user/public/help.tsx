import { Button, Col, Input, Row, Typography, Form } from "antd";
import { useRouter } from "@/router/hooks";
import {
    Headphones,
    Mail,
    Phone,
    MapPin,
    Clock,
    FileText,
    ShoppingBag,
    Truck,
    CreditCard,
    Shield,
    Send,
    ArrowRight
} from "lucide-react";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import SigninNewletter from "@/components/user/signin-newletter";

const { Title, Paragraph, Text } = Typography;

const contactMethods = [
    {
        icon: Phone,
        title: "Hotline",
        value: "038 921 5396",
        desc: "Miễn phí cuộc gọi",
        color: "bg-green-500/10 text-green-600"
    },
    {
        icon: Mail,
        title: "Email",
        value: "thangtrandz04@gmail.com",
        desc: "Phản hồi trong 24h",
        color: "bg-blue-500/10 text-blue-600"
    },
    {
        icon: MapPin,
        title: "Địa chỉ",
        value: "123 Nguyễn Huệ, Q.1, TP.HCM",
        desc: "Văn phòng chính",
        color: "bg-orange-500/10 text-orange-600"
    },
];

const helpCategories = [
    { icon: ShoppingBag, title: "Đặt hàng", desc: "Hướng dẫn mua sắm", link: "/faqs?category=order" },
    { icon: Truck, title: "Vận chuyển", desc: "Theo dõi đơn hàng", link: "/faqs?category=shipping" },
    { icon: CreditCard, title: "Thanh toán", desc: "Phương thức thanh toán", link: "/faqs?category=payment" },
    { icon: FileText, title: "Đổi trả", desc: "Chính sách hoàn tiền", link: "/faqs?category=return" },
    { icon: Shield, title: "Tài khoản", desc: "Quản lý thông tin", link: "/faqs?category=account" },
    { icon: Headphones, title: "Hỗ trợ khác", desc: "Câu hỏi thường gặp", link: "/faqs" },
];

const workingHours = [
    { day: "Thứ 2 - Thứ 6", hours: "8:00 - 21:00" },
    { day: "Thứ 7", hours: "9:00 - 18:00" },
    { day: "Chủ nhật", hours: "9:00 - 17:00" },
];

export default function Help() {
    const navigate = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            form.resetFields();
            // Show success message
        }, 1500);
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                {/* Main content */}
                <Col xs={24} lg={16}>
                    {/* Hero Section */}
                    <div className="rounded-xl p-4 border border-border bg-gradient-to-r from-primary/10 to-primary/5 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                <Headphones className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <Title level={2} className="!text-primary font-extrabold mb-0">
                                    Trung Tâm Hỗ Trợ
                                </Title>
                                <Paragraph className="!text-muted-foreground mb-0">
                                    Chúng tôi luôn sẵn sàng giúp đỡ bạn
                                </Paragraph>
                            </div>
                        </div>
                    </div>

                    {/* Contact Methods */}
                    <div className="mb-6">
                        <Title level={4} className="font-bold mb-4">
                            Liên Hệ Với Chúng Tôi
                        </Title>
                        <Row gutter={[16, 16]}>
                            {contactMethods.map(({ icon: Icon, title, value, desc, color }) => (
                                <Col xs={24} sm={12} md={8} key={title}>
                                    <div className="p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full">
                                        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-3`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <Text className="font-semibold block">{title}</Text>
                                        <Text className="text-primary font-medium block text-sm">{value}</Text>
                                        <Text className="!text-muted-foreground text-xs">{desc}</Text>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Help Categories */}
                    <div className="mb-6">
                        <Title level={4} className="font-bold mb-4">
                            Bạn Cần Hỗ Trợ Về?
                        </Title>
                        <Row gutter={[16, 16]}>
                            {helpCategories.map(({ icon: Icon, title, desc, link }) => (
                                <Col xs={12} sm={8} key={title}>
                                    <div
                                        className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
                                        onClick={() => navigate.push(link)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                                <Icon className="w-5 h-5 text-primary group-hover:text-white" />
                                            </div>
                                            <div>
                                                <Text className="font-semibold block">{title}</Text>
                                                <Text className="!text-muted-foreground text-xs">{desc}</Text>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-xl p-6 border border-border">
                        <Title level={4} className="font-bold mb-4 flex items-center gap-2">
                            <Send className="w-5 h-5 text-primary" />
                            Gửi Yêu Cầu Hỗ Trợ
                        </Title>
                        <Paragraph className="!text-muted-foreground mb-4">
                            Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
                        </Paragraph>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <Row gutter={16}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="name"
                                        label="Họ và tên"
                                        rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                                    >
                                        <Input size="large" placeholder="Nhập họ và tên" className="rounded-lg" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="phone"
                                        label="Số điện thoại"
                                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                                    >
                                        <Input size="large" placeholder="Nhập số điện thoại" className="rounded-lg" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: "Vui lòng nhập email" },
                                    { type: "email", message: "Email không hợp lệ" }
                                ]}
                            >
                                <Input size="large" placeholder="Nhập địa chỉ email" className="rounded-lg" />
                            </Form.Item>

                            <Form.Item
                                name="subject"
                                label="Tiêu đề"
                                rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                            >
                                <Input size="large" placeholder="Nhập tiêu đề yêu cầu" className="rounded-lg" />
                            </Form.Item>

                            <Form.Item
                                name="message"
                                label="Nội dung"
                                rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Mô tả chi tiết vấn đề của bạn..."
                                    className="rounded-lg"
                                />
                            </Form.Item>

                            <div className="flex justify-end gap-3">
                                <Button size="large" onClick={() => form.resetFields()} className="rounded-lg">
                                    Đặt lại
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    loading={loading}
                                    icon={<Send className="w-4 h-4" />}
                                    className="rounded-lg"
                                >
                                    Gửi yêu cầu
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>

                {/* Sidebar */}
                <Col xs={24} lg={8}>
                    <div className="sticky top-4 space-y-4">
                        {/* Working Hours */}
                        <div className="border border-border p-4 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-primary" />
                                </div>
                                <Title level={4} className="font-bold mb-0">
                                    Giờ Làm Việc
                                </Title>
                            </div>
                            <div className="space-y-2">
                                {workingHours.map(({ day, hours }) => (
                                    <div key={day} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                                        <Text>{day}</Text>
                                        <Text className="font-medium text-primary">{hours}</Text>
                                    </div>
                                ))}
                            </div>
                            <Paragraph className="!text-muted-foreground text-sm mt-4 mb-0">
                                * Hotline và Live Chat hoạt động 24/7 để hỗ trợ bạn.
                            </Paragraph>
                        </div>

                        {/* Quick Links */}
                        <div className="border border-border p-4 rounded-2xl">
                            <Title level={4} className="font-bold mb-4">
                                Liên Kết Nhanh
                            </Title>
                            <div className="space-y-2">
                                {[
                                    { label: "Câu hỏi thường gặp", link: "/faqs" },
                                    { label: "Điều khoản sử dụng", link: "/terms" },
                                    { label: "Chính sách bảo mật", link: "/privacy" },
                                    { label: "Về chúng tôi", link: "/about" },
                                ].map(({ label, link }) => (
                                    <div
                                        key={label}
                                        className="p-3 bg-muted/30 rounded-lg hover:bg-primary/10 cursor-pointer transition-all flex items-center justify-between group"
                                        onClick={() => navigate.push(link)}
                                    >
                                        <Text>{label}</Text>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <SigninNewletter />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
