import { Button, Col, Collapse, Input, Row, Typography, Tag } from "antd";
import { useRouter } from "@/router/hooks";
import { HelpCircle, Search, MessageCircle, ShoppingCart, Truck, CreditCard, RefreshCw, Shield } from "lucide-react";
import { useState } from "react";
import SigninNewletter from "@/components/user/signin-newletter";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const faqCategories = [
    { key: "all", label: "Tất cả", icon: HelpCircle, count: 20 },
    { key: "order", label: "Đặt hàng", icon: ShoppingCart, count: 5 },
    { key: "shipping", label: "Vận chuyển", icon: Truck, count: 4 },
    { key: "payment", label: "Thanh toán", icon: CreditCard, count: 4 },
    { key: "return", label: "Đổi trả", icon: RefreshCw, count: 4 },
    { key: "account", label: "Tài khoản", icon: Shield, count: 3 },
];

const faqData = [
    {
        category: "order",
        question: "Làm thế nào để đặt hàng trên Shopcart TVT?",
        answer: "Bạn có thể đặt hàng dễ dàng bằng cách: 1) Chọn sản phẩm yêu thích và thêm vào giỏ hàng, 2) Kiểm tra giỏ hàng và nhấn 'Thanh toán', 3) Điền thông tin giao hàng và chọn phương thức thanh toán, 4) Xác nhận đơn hàng. Đơn hàng sẽ được xử lý ngay sau khi bạn hoàn tất thanh toán."
    },
    {
        category: "order",
        question: "Tôi có thể hủy đơn hàng không?",
        answer: "Bạn có thể hủy đơn hàng trong vòng 2 giờ sau khi đặt hàng nếu đơn chưa được xử lý. Để hủy đơn, vào mục 'Đơn hàng của tôi' trong tài khoản và chọn 'Hủy đơn hàng'. Nếu đơn đã được xử lý, vui lòng liên hệ hotline để được hỗ trợ."
    },
    {
        category: "order",
        question: "Làm sao để theo dõi đơn hàng?",
        answer: "Sau khi đặt hàng thành công, bạn sẽ nhận được email xác nhận kèm mã đơn hàng. Bạn có thể theo dõi trạng thái đơn hàng trong mục 'Đơn hàng của tôi' hoặc sử dụng tính năng 'Tra cứu đơn hàng' trên website."
    },
    {
        category: "order",
        question: "Đơn hàng tối thiểu là bao nhiêu?",
        answer: "Không có giá trị đơn hàng tối thiểu. Tuy nhiên, để được miễn phí vận chuyển, đơn hàng cần có giá trị từ 500,000đ trở lên."
    },
    {
        category: "order",
        question: "Tôi có thể thay đổi địa chỉ giao hàng không?",
        answer: "Bạn có thể thay đổi địa chỉ giao hàng trước khi đơn hàng được giao cho đơn vị vận chuyển. Vui lòng liên hệ hotline hoặc chat trực tiếp để được hỗ trợ thay đổi."
    },
    {
        category: "shipping",
        question: "Thời gian giao hàng là bao lâu?",
        answer: "Thời gian giao hàng phụ thuộc vào vị trí của bạn: Nội thành HCM/Hà Nội: 1-2 ngày làm việc, Các tỉnh thành khác: 3-5 ngày làm việc, Vùng sâu vùng xa: 5-7 ngày làm việc."
    },
    {
        category: "shipping",
        question: "Phí vận chuyển được tính như thế nào?",
        answer: "Phí vận chuyển được tính dựa trên trọng lượng sản phẩm và khoảng cách giao hàng. Đơn hàng từ 500,000đ được miễn phí vận chuyển toàn quốc. Phí vận chuyển sẽ được hiển thị rõ ràng khi bạn checkout."
    },
    {
        category: "shipping",
        question: "Có giao hàng vào cuối tuần không?",
        answer: "Có, chúng tôi giao hàng cả Thứ 7 và Chủ nhật (trừ ngày lễ). Bạn có thể chọn thời gian giao hàng phù hợp khi đặt hàng."
    },
    {
        category: "shipping",
        question: "Tôi có thể nhận hàng tại cửa hàng không?",
        answer: "Hiện tại chúng tôi chỉ hỗ trợ giao hàng tận nơi. Chúng tôi đang phát triển tính năng nhận hàng tại điểm và sẽ thông báo khi có."
    },
    {
        category: "payment",
        question: "Các phương thức thanh toán được chấp nhận?",
        answer: "Chúng tôi chấp nhận nhiều phương thức thanh toán: COD (thanh toán khi nhận hàng), Chuyển khoản ngân hàng, Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB), Ví điện tử (MoMo, ZaloPay, VNPay), Trả góp 0% qua thẻ tín dụng."
    },
    {
        category: "payment",
        question: "Thanh toán có an toàn không?",
        answer: "Tuyệt đối an toàn! Chúng tôi sử dụng công nghệ mã hóa SSL 256-bit để bảo vệ thông tin thanh toán. Mọi giao dịch đều được xử lý qua cổng thanh toán uy tín và tuân thủ tiêu chuẩn PCI DSS."
    },
    {
        category: "payment",
        question: "Làm sao để thanh toán trả góp?",
        answer: "Để thanh toán trả góp 0%, chọn 'Trả góp' khi checkout, sau đó chọn ngân hàng và kỳ hạn phù hợp. Điều kiện: Đơn hàng từ 3,000,000đ và thẻ tín dụng thuộc các ngân hàng đối tác."
    },
    {
        category: "payment",
        question: "Tôi có nhận được hóa đơn VAT không?",
        answer: "Có, chúng tôi xuất hóa đơn VAT cho tất cả đơn hàng. Vui lòng cung cấp thông tin công ty khi đặt hàng nếu bạn cần hóa đơn. Hóa đơn điện tử sẽ được gửi qua email trong vòng 24h."
    },
    {
        category: "return",
        question: "Chính sách đổi trả như thế nào?",
        answer: "Bạn có thể đổi/trả sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng với điều kiện: Sản phẩm còn nguyên tem, nhãn, chưa qua sử dụng, Có hóa đơn mua hàng, Sản phẩm không nằm trong danh mục không được đổi trả."
    },
    {
        category: "return",
        question: "Làm sao để yêu cầu đổi/trả hàng?",
        answer: "Để yêu cầu đổi/trả: 1) Vào 'Đơn hàng của tôi' và chọn đơn cần đổi/trả, 2) Chọn 'Yêu cầu đổi/trả' và điền lý do, 3) Chờ xác nhận từ CSKH (trong vòng 24h), 4) Gửi sản phẩm về kho theo hướng dẫn."
    },
    {
        category: "return",
        question: "Ai chịu phí vận chuyển khi đổi/trả?",
        answer: "Nếu lỗi từ phía Shopcart (hàng lỗi, giao sai), chúng tôi sẽ chịu toàn bộ phí vận chuyển. Nếu đổi/trả do nhu cầu cá nhân, khách hàng sẽ chịu phí vận chuyển 2 chiều."
    },
    {
        category: "return",
        question: "Khi nào tôi nhận được tiền hoàn?",
        answer: "Sau khi yêu cầu đổi/trả được duyệt và chúng tôi nhận được sản phẩm, tiền hoàn sẽ được xử lý trong vòng 3-5 ngày làm việc. Thời gian tiền về tài khoản phụ thuộc vào ngân hàng."
    },
    {
        category: "account",
        question: "Làm sao để tạo tài khoản?",
        answer: "Bạn có thể đăng ký tài khoản bằng email hoặc số điện thoại. Nhấn 'Đăng ký' ở góc trên bên phải, điền thông tin và xác nhận qua OTP. Bạn cũng có thể đăng ký nhanh bằng tài khoản Google hoặc Facebook."
    },
    {
        category: "account",
        question: "Tôi quên mật khẩu, phải làm sao?",
        answer: "Nhấn 'Quên mật khẩu' tại trang đăng nhập, nhập email hoặc số điện thoại đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu qua email hoặc mã OTP qua SMS. Link có hiệu lực trong 24 giờ."
    },
    {
        category: "account",
        question: "Làm sao để xóa tài khoản?",
        answer: "Để xóa tài khoản, vui lòng liên hệ CSKH qua hotline hoặc email. Lưu ý: Sau khi xóa, mọi thông tin đơn hàng, điểm thưởng sẽ bị mất và không thể khôi phục."
    },
];

export default function FAQs() {
    const navigate = useRouter();
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFaqs = faqData.filter(faq => {
        const matchCategory = activeCategory === "all" || faq.category === activeCategory;
        const matchSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <div>
            <Row gutter={[16, 16]}>
                {/* Main content */}
                <Col xs={24} lg={16}>
                    {/* Hero Section */}
                    <div className="rounded-xl p-4 border border-border bg-gradient-to-r from-primary/10 to-primary/5 mb-6">
                        <Title level={2} className="!text-primary font-extrabold mb-2 flex items-center gap-2">
                            <HelpCircle className="w-8 h-8" />
                            Câu Hỏi Thường Gặp
                        </Title>
                        <Paragraph className="text-lg !text-muted-foreground mb-4">
                            Tìm câu trả lời nhanh cho các thắc mắc của bạn về <span className="font-semibold text-primary">Shopcart TVT</span>
                        </Paragraph>

                        {/* Search */}
                        <Input
                            size="large"
                            prefix={<Search className="w-5 h-5 text-muted-foreground" />}
                            placeholder="Tìm kiếm câu hỏi..."
                            className="rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {faqCategories.map(({ key, label, icon: Icon, count }) => (
                            <Button
                                key={key}
                                type={activeCategory === key ? "primary" : "default"}
                                icon={<Icon className="w-4 h-4" />}
                                onClick={() => setActiveCategory(key)}
                                className="rounded-full flex items-center gap-1"
                            >
                                {label}
                                <Tag className={`ml-1 ${activeCategory === key ? "bg-white/20 border-0 text-white" : ""}`}>
                                    {count}
                                </Tag>
                            </Button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="rounded-xl border border-border overflow-hidden">
                        {filteredFaqs.length > 0 ? (
                            <Collapse
                                accordion
                                expandIconPosition="end"
                                className="bg-background"
                                bordered={false}
                            >
                                {filteredFaqs.map((faq, index) => {
                                    const category = faqCategories.find(c => c.key === faq.category);
                                    const Icon = category?.icon || HelpCircle;
                                    return (
                                        <Panel
                                            key={index}
                                            header={
                                                <div className="flex items-center gap-3 py-1">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                        <Icon className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <Text className="font-medium text-base">{faq.question}</Text>
                                                </div>
                                            }
                                            className="border-b border-border last:border-b-0"
                                        >
                                            <div className="pl-11 pb-2">
                                                <Paragraph className="!text-muted-foreground mb-0 leading-relaxed">
                                                    {faq.answer}
                                                </Paragraph>
                                            </div>
                                        </Panel>
                                    );
                                })}
                            </Collapse>
                        ) : (
                            <div className="p-8 text-center">
                                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                <Text className="!text-muted-foreground">
                                    Không tìm thấy câu hỏi phù hợp. Vui lòng thử từ khóa khác.
                                </Text>
                            </div>
                        )}
                    </div>
                </Col>

                {/* Sidebar */}
                <Col xs={24} lg={8}>
                    <div className="sticky top-4 space-y-4">
                        {/* Still need help */}
                        <div className="border border-border p-4 rounded-2xl flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <MessageCircle className="w-8 h-8 text-primary" />
                            </div>
                            <Title level={4} className="font-extrabold text-center mb-0">
                                Vẫn Cần Hỗ Trợ?
                            </Title>
                            <Paragraph className="text-center !text-muted-foreground">
                                Không tìm thấy câu trả lời? Đội ngũ CSKH sẵn sàng giúp đỡ bạn 24/7.
                            </Paragraph>
                            <Button
                                type="primary"
                                size="large"
                                block
                                className="rounded-lg"
                                onClick={() => navigate.push("/help")}
                            >
                                Liên Hệ Hỗ Trợ
                            </Button>
                        </div>

                        {/* Popular topics */}
                        <div className="border border-border p-4 rounded-2xl">
                            <Title level={4} className="font-bold mb-4">
                                Chủ Đề Phổ Biến
                            </Title>
                            <div className="space-y-2">
                                {["Thời gian giao hàng là bao lâu?", "Thanh toán có an toàn không?", "Làm sao để yêu cầu đổi/trả hàng?", "Đổi trả sản phẩm", "Khi nào tôi nhận được tiền hoàn?"].map((topic) => (
                                    <div
                                        key={topic}
                                        className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-all flex items-center justify-between"
                                        onClick={() => setSearchTerm(topic)}
                                    >
                                        <Text>{topic}</Text>
                                        <Search className="w-4 h-4 text-muted-foreground" />
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
