import { Button, Col, Input, Row, Typography, Form } from "antd";
import { useRouter } from "@/router/hooks";
import Logo from "@/ui/logo";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    Globe,
    Facebook,
    Youtube,
    Instagram,
    ArrowRight,
    CheckCircle,
    Headphones
} from "lucide-react";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "sonner";

const { Title, Paragraph, Text } = Typography;

const contactInfo = [
    {
        icon: Phone,
        title: "Hotline",
        value: "1900 1234 56",
        subValue: "Miễn phí cuộc gọi",
        color: "bg-green-500/10 text-green-600",
        hoverColor: "hover:bg-green-500/20"
    },
    {
        icon: Mail,
        title: "Email",
        value: "support@shopcart.vn",
        subValue: "Phản hồi trong 24h",
        color: "bg-blue-500/10 text-blue-600",
        hoverColor: "hover:bg-blue-500/20"
    },
    {
        icon: MapPin,
        title: "Địa chỉ",
        value: "123 Nguyễn Huệ, Quận 1",
        subValue: "TP. Hồ Chí Minh, Việt Nam",
        color: "bg-orange-500/10 text-orange-600",
        hoverColor: "hover:bg-orange-500/20"
    },
    {
        icon: Clock,
        title: "Giờ làm việc",
        value: "8:00 - 21:00",
        subValue: "Thứ 2 - Chủ nhật",
        color: "bg-purple-500/10 text-purple-600",
        hoverColor: "hover:bg-purple-500/20"
    },
];

const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "https://facebook.com", color: "bg-blue-600" },
    { icon: Youtube, name: "Youtube", url: "https://youtube.com", color: "bg-red-600" },
    { icon: Instagram, name: "Instagram", url: "https://instagram.com", color: "bg-pink-600" },
    { icon: Globe, name: "Website", url: "https://vanthang.io.vn", color: "bg-primary" },
];

const quickLinks = [
    { label: "Câu hỏi thường gặp", link: "/faqs" },
    { label: "Trung tâm hỗ trợ", link: "/help" },
    { label: "Điều khoản sử dụng", link: "/terms" },
    { label: "Về chúng tôi", link: "/about" },
];

const features = [
    "Phản hồi nhanh chóng trong 24h",
    "Đội ngũ hỗ trợ chuyên nghiệp",
    "Giải đáp mọi thắc mắc",
    "Hỗ trợ đa kênh 24/7"
];

export default function Contact() {
    const navigate = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại sớm nhất.");
            form.resetFields();
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
                                <MessageSquare className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <Title level={2} className="!text-primary font-extrabold mb-0">
                                    Liên Hệ Với Chúng Tôi
                                </Title>
                                <Paragraph className="!text-muted-foreground mb-0">
                                    Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn
                                </Paragraph>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <Text className="!text-muted-foreground">{feature}</Text>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-xl p-6 border border-border">
                        <Title level={4} className="font-bold mb-2 flex items-center gap-2">
                            <Send className="w-5 h-5 text-primary" />
                            Gửi Tin Nhắn Cho Chúng Tôi
                        </Title>
                        <Paragraph className="!text-muted-foreground mb-6">
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
                                        <Input size="large" placeholder="Nhập họ và tên của bạn" className="rounded-lg" />
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
                                <Input size="large" placeholder="Nhập tiêu đề tin nhắn" className="rounded-lg" />
                            </Form.Item>

                            <Form.Item
                                name="message"
                                label="Nội dung tin nhắn"
                                rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
                            >
                                <TextArea
                                    rows={5}
                                    placeholder="Nhập nội dung tin nhắn của bạn..."
                                    className="rounded-lg"
                                />
                            </Form.Item>

                            <div className="flex justify-end gap-3">
                                <Button size="large" onClick={() => form.resetFields()} className="rounded-lg">
                                    Xóa nội dung
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    loading={loading}
                                    icon={<Send className="w-4 h-4" />}
                                    className="rounded-lg"
                                >
                                    Gửi tin nhắn
                                </Button>
                            </div>
                        </Form>
                    </div>

                    {/* Map Section */}
                    <div className="rounded-xl p-4 border border-border mt-6">
                        <Title level={4} className="font-bold mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            Vị Trí Của Chúng Tôi
                        </Title>
                        <div className="rounded-xl overflow-hidden border border-border">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.896245889863!2d108.20216637470624!3d16.054407884625524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792d2b4ff%3A0xa084d0b12304c3d!2zSMOibiBDaOG7hyDEkOG7qWMgRGFuYW5nLCBWaWV0bmFt!5e0!3m2!1svi!2s!4v1701788400000!5m2!1svi!2s
"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps"
                            />
                        </div>
                    </div>
                </Col>

                {/* Sidebar */}
                <Col xs={24} lg={8}>
                    <div className="sticky top-4 space-y-4">
                        {/* Social Links */}
                        <div className="border border-border p-4 rounded-2xl">
                            <Title level={4} className="font-bold mb-4">
                                Kết Nối Với Chúng Tôi
                            </Title>
                            <div className="grid grid-cols-2 gap-3">
                                {socialLinks.map(({ icon: Icon, name, url, color }) => (
                                    <a
                                        key={name}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 p-3 rounded-lg ${color} text-white hover:opacity-90 transition-all`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <Text className="text-white font-medium text-sm">{name}</Text>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="border border-border p-4 rounded-2xl">
                            <Title level={4} className="font-bold mb-4">
                                Liên Kết Hữu Ích
                            </Title>
                            <div className="space-y-2">
                                {quickLinks.map(({ label, link }) => (
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

                        {/* Support CTA */}
                        <div className="border border-primary/30 bg-primary/5 p-6 rounded-2xl text-center">
                            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                                <Headphones className="w-7 h-7 text-primary" />
                            </div>
                            <Title level={4} className="font-semibold mb-2">
                                Cần Hỗ Trợ Ngay?
                            </Title>
                            <Paragraph className="!text-muted-foreground mb-4">
                                Gọi ngay hotline để được tư vấn miễn phí
                            </Paragraph>
                            <Button
                                type="primary"
                                size="large"
                                icon={<Phone className="w-4 h-4" />}
                                className="rounded-lg"
                                block
                            >
                                1900 1234 56
                            </Button>
                        </div>

                        {/* Newsletter */}
                        <div className="border border-primary/30 p-4 rounded-2xl flex flex-col items-center space-y-4">
                            <Title level={4} className="font-extrabold text-center">
                                Đăng Ký Nhận Tin
                            </Title>
                            <div className="w-20 h-1 bg-primary rounded-full" />
                            <Paragraph className="text-center !text-muted-foreground">
                                Nhận thông tin mới nhất về sản phẩm và ưu đãi.
                            </Paragraph>
                            <Input
                                size="large"
                                placeholder="Nhập email của bạn"
                                type="email"
                                className="w-full rounded-lg"
                            />
                            <Button type="primary" size="large" block className="rounded-lg mt-2">
                                Đăng Ký
                            </Button>
                            <Text className="text-sm !text-muted-foreground text-center">
                                Bằng việc đăng ký, bạn đồng ý với chính sách của <Logo />.
                            </Text>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
