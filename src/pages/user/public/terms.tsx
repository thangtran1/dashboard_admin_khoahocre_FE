import { Button, Col, Input, Row, Typography, Collapse } from "antd";
import { useRouter } from "@/router/hooks";
import Logo from "@/ui/logo";
import {
    FileText,
    Shield,
    Scale,
    AlertCircle,
    Users,
    Lock,
    CreditCard,
    Truck,
    RefreshCw,
    MessageCircle,
    ArrowRight,
    CheckCircle,
    Calendar,
    BookOpen
} from "lucide-react";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const termsSections = [
    {
        icon: BookOpen,
        title: "1. Giới Thiệu & Điều Khoản Chung",
        content: [
            {
                subtitle: "1.1 Chào mừng",
                text: "Chào mừng bạn đến với Shopcart TVT! Bằng việc truy cập và sử dụng website của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này."
            },
            {
                subtitle: "1.2 Phạm vi áp dụng",
                text: "Các điều khoản này áp dụng cho tất cả người dùng, bao gồm khách truy cập, khách hàng đã đăng ký và bất kỳ ai sử dụng dịch vụ của chúng tôi."
            },
            {
                subtitle: "1.3 Cập nhật điều khoản",
                text: "Chúng tôi có quyền cập nhật điều khoản bất cứ lúc nào. Phiên bản mới nhất sẽ được đăng tải trên trang này với ngày có hiệu lực rõ ràng."
            }
        ]
    },
    {
        icon: Shield,
        title: "2. Quyền Sở Hữu & Bản Quyền",
        content: [
            {
                subtitle: "2.1 Nội dung website",
                text: "Tất cả nội dung trên website bao gồm văn bản, hình ảnh, logo, đồ họa, video và phần mềm đều thuộc quyền sở hữu của Shopcart TVT hoặc các đối tác được cấp phép."
            },
            {
                subtitle: "2.2 Sử dụng nội dung",
                text: "Bạn không được sao chép, phân phối, sửa đổi hoặc sử dụng bất kỳ nội dung nào từ website cho mục đích thương mại mà không có sự đồng ý bằng văn bản."
            },
            {
                subtitle: "2.3 Chia sẻ liên kết",
                text: "Việc chia sẻ liên kết đến website của chúng tôi được cho phép, miễn là không gây hiểu lầm hoặc gây hại đến thương hiệu."
            }
        ]
    },
    {
        icon: Users,
        title: "3. Tài Khoản Người Dùng",
        content: [
            {
                subtitle: "3.1 Đăng ký tài khoản",
                text: "Để sử dụng đầy đủ tính năng, bạn cần đăng ký tài khoản với thông tin chính xác và cập nhật. Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình."
            },
            {
                subtitle: "3.2 Trách nhiệm tài khoản",
                text: "Mọi hoạt động từ tài khoản của bạn đều được xem là do bạn thực hiện. Hãy thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép."
            },
            {
                subtitle: "3.3 Chấm dứt tài khoản",
                text: "Chúng tôi có quyền tạm ngưng hoặc chấm dứt tài khoản nếu phát hiện vi phạm điều khoản hoặc hành vi gian lận."
            }
        ]
    },
    {
        icon: CreditCard,
        title: "4. Thanh Toán & Giá Cả",
        content: [
            {
                subtitle: "4.1 Giá sản phẩm",
                text: "Giá hiển thị trên website đã bao gồm VAT (trừ khi có ghi chú khác). Giá có thể thay đổi mà không cần thông báo trước."
            },
            {
                subtitle: "4.2 Phương thức thanh toán",
                text: "Chúng tôi chấp nhận nhiều phương thức thanh toán: COD, chuyển khoản, thẻ tín dụng/ghi nợ, ví điện tử và trả góp 0%."
            },
            {
                subtitle: "4.3 Bảo mật thanh toán",
                text: "Mọi giao dịch được mã hóa SSL 256-bit và tuân thủ tiêu chuẩn PCI DSS để đảm bảo an toàn tuyệt đối."
            }
        ]
    },
    {
        icon: Truck,
        title: "5. Giao Hàng & Vận Chuyển",
        content: [
            {
                subtitle: "5.1 Phạm vi giao hàng",
                text: "Chúng tôi giao hàng toàn quốc. Thời gian giao hàng từ 1-7 ngày làm việc tùy thuộc vào địa điểm."
            },
            {
                subtitle: "5.2 Phí vận chuyển",
                text: "Phí vận chuyển được tính dựa trên trọng lượng và khoảng cách. Đơn hàng từ 500,000đ được miễn phí vận chuyển."
            },
            {
                subtitle: "5.3 Kiểm tra hàng",
                text: "Bạn có quyền kiểm tra sản phẩm trước khi nhận. Nếu sản phẩm không đúng hoặc bị hư hỏng, vui lòng từ chối nhận hàng."
            }
        ]
    },
    {
        icon: RefreshCw,
        title: "6. Đổi Trả & Hoàn Tiền",
        content: [
            {
                subtitle: "6.1 Thời hạn đổi trả",
                text: "Bạn có 30 ngày để yêu cầu đổi/trả sản phẩm kể từ ngày nhận hàng, với điều kiện sản phẩm còn nguyên tem, nhãn và chưa qua sử dụng."
            },
            {
                subtitle: "6.2 Quy trình hoàn tiền",
                text: "Sau khi yêu cầu được duyệt và nhận lại sản phẩm, tiền hoàn sẽ được xử lý trong 3-5 ngày làm việc."
            },
            {
                subtitle: "6.3 Sản phẩm không đổi trả",
                text: "Một số sản phẩm như đồ lót, mỹ phẩm đã mở seal, sản phẩm theo yêu cầu riêng không áp dụng đổi trả."
            }
        ]
    },
    {
        icon: Lock,
        title: "7. Bảo Mật & Quyền Riêng Tư",
        content: [
            {
                subtitle: "7.1 Thu thập thông tin",
                text: "Chúng tôi thu thập thông tin cần thiết để xử lý đơn hàng và cải thiện dịch vụ. Thông tin được bảo mật theo chính sách riêng tư."
            },
            {
                subtitle: "7.2 Sử dụng thông tin",
                text: "Thông tin của bạn chỉ được sử dụng cho mục đích đã nêu và không được chia sẻ với bên thứ ba ngoài đối tác vận chuyển."
            },
            {
                subtitle: "7.3 Cookie",
                text: "Website sử dụng cookie để cải thiện trải nghiệm người dùng. Bạn có thể tắt cookie trong cài đặt trình duyệt."
            }
        ]
    },
    {
        icon: Scale,
        title: "8. Giới Hạn Trách Nhiệm",
        content: [
            {
                subtitle: "8.1 Trách nhiệm của chúng tôi",
                text: "Shopcart TVT cam kết cung cấp sản phẩm chất lượng và dịch vụ tốt nhất, nhưng không chịu trách nhiệm cho những tổn thất ngoài tầm kiểm soát."
            },
            {
                subtitle: "8.2 Sử dụng hợp pháp",
                text: "Bạn cam kết sử dụng website và dịch vụ cho mục đích hợp pháp. Mọi hành vi vi phạm pháp luật sẽ bị từ chối phục vụ."
            },
            {
                subtitle: "8.3 Giải quyết tranh chấp",
                text: "Mọi tranh chấp sẽ được giải quyết theo pháp luật Việt Nam. Chúng tôi ưu tiên thương lượng và hòa giải trước khi đưa ra tòa án."
            }
        ]
    }
];

const quickStats = [
    { label: "Ngày có hiệu lực", value: "01/01/2023" },
    { label: "Cập nhật lần cuối", value: "05/12/2025" },
    { label: "Phiên bản", value: "3.0" },
    { label: "Ngôn ngữ", value: "Tiếng Việt" },
];

export default function TermsPage() {
    const navigate = useRouter();

    return (
        <div>
            <Row gutter={[16, 16]}>
                {/* Main content */}
                <Col xs={24} lg={16}>
                    {/* Hero Section */}
                    <div className="rounded-xl p-4 border border-border bg-gradient-to-r from-primary/10 to-primary/5 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                <FileText className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <Title level={2} className="!text-primary font-extrabold mb-0">
                                    Điều Khoản Sử Dụng
                                </Title>
                                <Paragraph className="!text-muted-foreground mb-0">
                                    Thương hiệu Shopcart TVT
                                </Paragraph>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full text-sm">
                                <Calendar className="w-4 h-4 text-primary" />
                                <Text>Cập nhật: 05/12/2025</Text>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <Text>Có hiệu lực từ: 01/01/2023</Text>
                            </div>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="rounded-xl p-4 border border-border mb-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <Title level={4} className="font-bold mb-2">Lưu Ý Quan Trọng</Title>
                                <Paragraph className="!text-muted-foreground mb-0">
                                    Vui lòng đọc kỹ các điều khoản và điều kiện dưới đây trước khi sử dụng dịch vụ của chúng tôi.
                                    Bằng việc truy cập hoặc sử dụng website Shopcart TVT, bạn đồng ý bị ràng buộc bởi các điều khoản này.
                                    Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản, vui lòng không sử dụng dịch vụ của chúng tôi.
                                </Paragraph>
                            </div>
                        </div>
                    </div>

                    {/* Terms Sections */}
                    <div className="rounded-xl border border-border overflow-hidden">
                        <Collapse
                            accordion
                            expandIconPosition="end"
                            className="bg-background"
                            bordered={false}
                            defaultActiveKey={['0']}
                        >
                            {termsSections.map((section, index) => {
                                const Icon = section.icon;
                                return (
                                    <Panel
                                        key={index}
                                        header={
                                            <div className="flex items-center gap-3 py-2">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <Icon className="w-5 h-5 text-primary" />
                                                </div>
                                                <Text className="font-semibold text-base">{section.title}</Text>
                                            </div>
                                        }
                                        className="border-b border-border last:border-b-0"
                                    >
                                        <div className="pl-13 space-y-4">
                                            {section.content.map((item, idx) => (
                                                <div key={idx} className="pl-4 border-l-2 border-primary/30">
                                                    <Text className="font-medium block mb-1">{item.subtitle}</Text>
                                                    <Paragraph className="!text-muted-foreground mb-0 leading-relaxed">
                                                        {item.text}
                                                    </Paragraph>
                                                </div>
                                            ))}
                                        </div>
                                    </Panel>
                                );
                            })}
                        </Collapse>
                    </div>

                    {/* Contact Section */}
                    <div className="rounded-xl p-4 border border-border mt-6">
                        <Title level={4} className="font-bold mb-4 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-primary" />
                            Liên Hệ & Hỗ Trợ
                        </Title>
                        <Paragraph className="!text-muted-foreground mb-4">
                            Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản và Điều kiện này, vui lòng liên hệ với chúng tôi:
                        </Paragraph>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <div className="p-4 bg-muted/30 rounded-lg">
                                    <Text className="font-medium block">Email hỗ trợ:</Text>
                                    <Text className="text-primary">support@shopcart.vn</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={12}>
                                <div className="p-4 bg-muted/30 rounded-lg">
                                    <Text className="font-medium block">Hotline:</Text>
                                    <Text className="text-primary">1900 1234 56</Text>
                                </div>
                            </Col>
                        </Row>
                        <div className="flex justify-center mt-6">
                            <Button
                                type="primary"
                                size="large"
                                icon={<ArrowRight className="w-4 h-4" />}
                                onClick={() => navigate.push("/contact")}
                                className="rounded-lg"
                            >
                                Liên Hệ Ngay
                            </Button>
                        </div>
                    </div>
                </Col>

                {/* Sidebar */}
                <Col xs={24} lg={8}>
                    <div className="sticky top-4 space-y-4">
                        {/* Document Info */}
                        <div className="border border-border p-4 rounded-2xl">
                            <Title level={4} className="font-bold mb-4">
                                Thông Tin Tài Liệu
                            </Title>
                            <div className="space-y-3">
                                {quickStats.map(({ label, value }) => (
                                    <div key={label} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                                        <Text className="!text-muted-foreground">{label}</Text>
                                        <Text className="font-medium text-primary">{value}</Text>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Navigation */}
                        <div className="border border-border p-4 rounded-2xl">
                            <Title level={4} className="font-bold mb-4">
                                Mục Lục
                            </Title>
                            <div className="space-y-2">
                                {termsSections.map((section, index) => (
                                    <div
                                        key={index}
                                        className="p-2 hover:bg-muted/30 rounded-lg cursor-pointer transition-all text-sm"
                                    >
                                        <Text className="!text-muted-foreground hover:text-primary">
                                            {section.title}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Related Links */}
                        <div className="border border-border p-4 rounded-2xl">
                            <Title level={4} className="font-bold mb-4">
                                Trang Liên Quan
                            </Title>
                            <div className="space-y-2">
                                {[
                                    { label: "Chính sách bảo mật", link: "/privacy" },
                                    { label: "Câu hỏi thường gặp", link: "/faqs" },
                                    { label: "Trung tâm hỗ trợ", link: "/help" },
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
                        <div className="border border-border p-4 rounded-2xl flex flex-col items-center space-y-4">
                            <Title level={4} className="font-extrabold text-center">
                                Đăng Ký Nhận Tin
                            </Title>
                            <div className="w-20 h-1 bg-primary rounded-full" />
                            <Paragraph className="text-center !text-muted-foreground">
                                Nhận thông báo khi có cập nhật điều khoản mới.
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
