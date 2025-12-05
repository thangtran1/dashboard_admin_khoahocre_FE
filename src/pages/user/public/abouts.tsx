import { Button, Col, Input, Row, Typography } from "antd";
import { useRouter } from "@/router/hooks";
import Logo from "@/ui/logo";
import { Users, Target, Award, Heart, CheckCircle, ArrowRight } from "lucide-react";

const { Title, Paragraph, Text } = Typography;

const teamMembers = [
    { name: "Trần Văn Thắng", role: "CEO & Founder", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
    { name: "Nguyễn Văn A", role: "CTO", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
    { name: "Lê Thị B", role: "Marketing Director", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
    { name: "Phạm Văn C", role: "Product Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4" },
];

const values = [
    { icon: Heart, title: "Tận tâm", desc: "Luôn đặt khách hàng làm trọng tâm trong mọi hoạt động" },
    { icon: Award, title: "Chất lượng", desc: "Cam kết mang đến sản phẩm và dịch vụ tốt nhất" },
    { icon: Target, title: "Đổi mới", desc: "Không ngừng sáng tạo và cải tiến mỗi ngày" },
    { icon: Users, title: "Đoàn kết", desc: "Xây dựng đội ngũ mạnh mẽ và gắn kết" },
];

const milestones = [
    { year: "2022", event: "Thành lập công ty" },
    { year: "2023", event: "Ra mắt nền tảng thương mại điện tử" },
    { year: "2024", event: "Đạt 100,000 khách hàng" },
    { year: "2025", event: "Mở rộng thị trường quốc tế" },
    { year: "2026", event: "Tương lai sáng tạo" },
];

export default function AboutUs() {
    const navigate = useRouter();

    return (
        <div>
            <Row gutter={[16, 16]}>
                {/* Main content */}
                <Col xs={24} lg={16}>
                    {/* Hero Section */}
                    <div className="rounded-xl p-4 border border-border bg-gradient-to-r from-primary/10 to-primary/5 mb-6">
                        <Title level={2} className="!text-primary font-extrabold mb-2">
                            Về Chúng Tôi
                        </Title>
                        <Paragraph className="text-lg !text-muted-foreground">
                            Chào mừng bạn đến với <span className="font-semibold text-primary">Shopcart TVT</span> -
                            điểm đến tin cậy cho mọi nhu cầu mua sắm của bạn.
                        </Paragraph>
                    </div>

                    {/* Story Section */}
                    <div className="rounded-xl p-4 border border-border mb-6">
                        <Typography>
                            <Title level={3} className="font-bold flex items-center gap-2">
                                <Target className="w-6 h-6 text-primary" />
                                Câu Chuyện Của Chúng Tôi
                            </Title>
                            <Paragraph className="text-base leading-relaxed">
                                Shopcart TVT được thành lập với sứ mệnh mang đến trải nghiệm mua sắm trực tuyến
                                tuyệt vời nhất cho khách hàng Việt Nam. Xuất phát từ niềm đam mê công nghệ và
                                mong muốn kết nối người tiêu dùng với những sản phẩm chất lượng, chúng tôi đã
                                xây dựng nền tảng thương mại điện tử hiện đại và thân thiện.
                            </Paragraph>
                            <Paragraph className="text-base leading-relaxed">
                                Với đội ngũ nhân viên tận tâm và chuyên nghiệp, chúng tôi cam kết mang đến
                                dịch vụ khách hàng xuất sắc, giao hàng nhanh chóng và chính sách đổi trả linh hoạt.
                            </Paragraph>
                        </Typography>
                    </div>

                    {/* Values Section */}
                    <div className="rounded-xl p-4 border border-border mb-6">
                        <Title level={3} className="font-bold mb-4 flex items-center gap-2">
                            <Heart className="w-6 h-6 text-primary" />
                            Giá Trị Cốt Lõi
                        </Title>
                        <Row gutter={[16, 16]}>
                            {values.map(({ icon: Icon, title, desc }) => (
                                <Col xs={24} sm={12} key={title}>
                                    <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all border border-transparent hover:border-primary/20">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <Text className="font-semibold text-base block">{title}</Text>
                                                <Text className="!text-muted-foreground text-sm">{desc}</Text>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Timeline Section */}
                    <div className="rounded-xl p-4 border border-border mb-6">
                        <Title level={3} className="font-bold mb-4 flex items-center gap-2">
                            <Award className="w-6 h-6 text-primary" />
                            Hành Trình Phát Triển
                        </Title>
                        <div className="space-y-4">
                            {milestones.map(({ year, event }, index) => (
                                <div key={year} className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {year}
                                    </div>
                                    <div className="flex-1 p-3 bg-muted/30 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <Text className="font-medium">{event}</Text>
                                        </div>
                                    </div>
                                    {index < milestones.length - 1 && (
                                        <div className="absolute left-8 w-0.5 h-8 bg-primary/20" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="rounded-xl p-6 border border-border">
                        <Title level={3} className="font-bold mb-4 flex items-center gap-2">
                            <Users className="w-6 h-6 text-primary" />
                            Đội Ngũ Của Chúng Tôi
                        </Title>
                        <Row gutter={[16, 16]}>
                            {teamMembers.map(({ name, role, avatar }) => (
                                <Col xs={12} sm={6} key={name}>
                                    <div className="text-center p-4 rounded-lg hover:bg-muted/30 transition-all">
                                        <img
                                            src={avatar}
                                            alt={name}
                                            className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-primary/20"
                                        />
                                        <Text className="font-semibold block">{name}</Text>
                                        <Text className="!text-muted-foreground text-sm">{role}</Text>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>

                {/* Sidebar */}
                <Col xs={12} lg={8}>
                    <div className="sticky top-4 space-y-4">
                        {/* Newsletter */}
                        <div className="border border-border p-4 rounded-2xl flex flex-col items-center space-y-4">
                            <Title level={4} className="font-extrabold text-center">
                                Kết Nối Với Chúng Tôi
                            </Title>
                            <div className="w-20 h-1 bg-primary rounded-full" />
                            <Paragraph className="text-center !text-muted-foreground">
                                Đăng ký để nhận thông tin mới nhất về sản phẩm và ưu đãi đặc biệt.
                            </Paragraph>
                            <Input
                                size="large"
                                placeholder="Nhập email của bạn"
                                type="email"
                                className="w-full rounded-lg"
                            />
                            <Button type="primary" size="large" block className="rounded-lg mt-2">
                                Đăng Ký Ngay
                            </Button>
                            <Text className="text-sm !text-muted-foreground text-center">
                                Bằng việc đăng ký, bạn đồng ý với Điều khoản dịch vụ của <Logo />.
                            </Text>
                        </div>

                        {/* Quick Stats */}
                        <div className="border border-border p-4 rounded-2xl">
                            <Title level={4} className="font-bold text-center mb-4">
                                Con Số Ấn Tượng
                            </Title>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                                    <Text>Khách hàng</Text>
                                    <Text className="font-bold text-primary">100,000+</Text>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                                    <Text>Sản phẩm</Text>
                                    <Text className="font-bold text-primary">10,000+</Text>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                                    <Text>Đối tác</Text>
                                    <Text className="font-bold text-primary">500+</Text>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                                    <Text>Đánh giá 5 sao</Text>
                                    <Text className="font-bold text-primary">98%</Text>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="border border-primary bg-primary/5 p-4 rounded-2xl text-center">
                            <Title level={4} className="font-bold mb-2">
                                Bạn Cần Hỗ Trợ?
                            </Title>
                            <Paragraph className="!text-muted-foreground mb-4">
                                Đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ bạn 24/7
                            </Paragraph>
                            <Button
                                type="primary"
                                size="large"
                                icon={<ArrowRight className="w-4 h-4" />}
                                onClick={() => navigate.push("/help")}
                                className="rounded-lg"
                            >
                                Liên Hệ Ngay
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
