"use client"

import {
  ChevronRight,
  Home,
  Calendar,
  Clock,
  User,
  Gamepad,
  MessageCircle,
  HelpCircle,
  Star,
  Search,
  Users,
} from "lucide-react"
import { Collapse } from "antd"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-muted border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-red-600">TECH NEWS</h1>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium">
                Trang chủ
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium">
                Tin công nghệ
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium">
                S-Games
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium">
                Tư vấn
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium">
                Trên tay
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-4">
            <div className="bg-muted rounded-lg shadow-sm overflow-hidden">
              <Collapse
                ghost
                defaultActiveKey={[]}
                expandIconPosition="end"
                items={[
                  {
                    key: "home",
                    label: (
                      <div className="flex items-center gap-2 py-1">
                        <Home size={18} className="text-gray-600" />
                        <span className="font-medium">Trang chủ</span>
                      </div>
                    ),
                    showArrow: false,
                  },
                  {
                    key: "tech-news",
                    label: (
                      <div className="flex items-center gap-2 py-1">
                        <Search size={18} className="text-gray-600" />
                        <span className="font-medium">Tin công nghệ</span>
                      </div>
                    ),
                  },
                  {
                    key: "s-games",
                    label: (
                      <div className="flex items-center gap-2 py-1">
                        <Gamepad size={18} className="text-gray-600" />
                        <span className="font-medium">S-Games</span>
                      </div>
                    ),
                  },
                  {
                    key: "tu-van",
                    label: (
                      <div className="flex items-center gap-2 py-1">
                        <MessageCircle size={18} className="text-gray-600" />
                        <span className="font-medium">Tư vấn</span>
                      </div>
                    ),
                  },
                  {
                    key: "tren-tay",
                    label: (
                      <div className="flex items-center gap-2 py-1">
                        <Star size={18} className="text-gray-600" />
                        <span className="font-medium">Trên tay</span>
                      </div>
                    ),
                    children: (
                      <div className="pl-8 space-y-2 pb-2">
                        <a href="#" className="block text-sm text-gray-600 hover:text-red-600">
                          Di động
                        </a>
                        <a href="#" className="block text-sm text-gray-600 hover:text-red-600">
                          Máy tính
                        </a>
                        <a href="#" className="block text-sm text-gray-600 hover:text-red-600">
                          Âm thanh
                        </a>
                        <a href="#" className="block text-sm text-gray-600 hover:text-red-600">
                          Đồ chơi công nghệ
                        </a>
                        <a href="#" className="block text-sm text-gray-600 hover:text-red-600">
                          Gia dụng
                        </a>
                      </div>
                    ),
                  },
                  {
                    key: "danh-gia",
                    label: (
                      <div className="flex items-center gap-2 py-1">
                        <HelpCircle size={18} className="text-gray-600" />
                        <span className="font-medium">Đánh giá</span>
                      </div>
                    ),
                  },
                  {
                    key: "thu-thuat",
                    label: (
                      <div className="flex items-center gap-2 py-1">
                        <MessageCircle size={18} className="text-gray-600" />
                        <span className="font-medium">Thủ thuật - Hỏi đáp</span>
                      </div>
                    ),
                  },
                  {
                    key: "khuyen-mai",
                    label: (
                      <div className="flex items-center gap-2 py-1">
                        <Star size={18} className="text-gray-600" />
                        <span className="font-medium">Khuyến mãi</span>
                      </div>
                    ),
                  },
                  {
                    key: "tuyen-dung",
                    label: (
                      <div className="flex items-center gap-2 py-1">
                        <Users size={18} className="text-gray-600" />
                        <span className="font-medium">Tuyển dụng</span>
                      </div>
                    ),
                  },
                ]}
                className="[&_.ant-collapse-item]:border-b [&_.ant-collapse-item:last-child]:border-b-0 [&_.ant-collapse-header]:px-4 [&_.ant-collapse-header]:py-3 [&_.ant-collapse-content-box]:px-4"
              />
            </div>

            <div className="bg-muted rounded-lg p-4 shadow-sm">
              <h2 className="font-bold text-lg mb-3 border-b pb-2">CHỦ ĐỀ HOT</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-600 text-foreground text-xs rounded-full">
                  #Đấu Trường Chân Lý mùa 16
                </span>
                <span className="px-3 py-1 bg-orange-500 text-foreground text-xs rounded-full">#Apple iPhone 17</span>
                <span className="px-3 py-1 bg-pink-600 text-foreground text-xs rounded-full">#OPPO Find X9 Series</span>
                <span className="px-3 py-1 bg-blue-400 text-foreground text-xs rounded-full">#Apple iOS 26</span>
                <span className="px-3 py-1 bg-indigo-600 text-foreground text-xs rounded-full">#Xiaomi HyperOS 3</span>
                <span className="px-3 py-1 bg-green-600 text-foreground text-xs rounded-full">#Xiaomi 17 Pro Max</span>
                <span className="px-3 py-1 bg-purple-600 text-foreground text-xs rounded-full">#Công cụ AI</span>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2">THỦ THUẬT - MẸO HAY</h2>
                <a href="#" className="text-red-600 flex items-center gap-1 text-sm font-medium hover:underline">
                  Xem thêm <ChevronRight size={16} />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ArticleCard
                  image="/images/image.png"
                  title="Hướng dẫn cách khắc phục lỗi sai thông tin cư trú trên VNeID"
                  author="KILIG"
                  time="12/12/2025 16:57"
                />
                <ArticleCard
                  image="/team-running-sports-event-uprace.jpg"
                  title="Hướng dẫn đăng ký tham gia giải Uprace 2025 nhanh chóng"
                  author="Thùy Tiên"
                  time="12/12/2025 16:45"
                />
                <ArticleCard
                  image="/dyson-hair-dryer-purple-pink.jpg"
                  title="Nên mua máy sấy tóc Dyson loại nào? Tìm hiểu ngay"
                  author="SHIRO"
                  time="12/12/2025 16:33"
                />
                <ArticleCard
                  image="/redmi-k90-smartphone-multiple-colors.jpg"
                  title="Redmi K90 có mấy màu? Bí kíp tìm màu hợp mệnh với bạn"
                  author="SHIRO"
                  time="12/12/2025 16:31"
                />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2">SỰ KIỆN</h2>
                <a href="#" className="text-red-600 flex items-center gap-1 text-sm font-medium hover:underline">
                  Xem thêm <ChevronRight size={16} />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <EventCard
                  image="/xiaomi-17-phone-purple-elegant.jpg"
                  title="Sự kiện ra mắt Xiaomi 17 Series"
                  location="Trung Quốc"
                  time="19:00 ngày 25/9"
                />
                <EventCard
                  image="/samsung-galaxy-event-blue-modern.jpg"
                  title="Sự kiện Galaxy"
                  location="Berlin, Đức"
                  time="16:00 ngày 4/9/2025"
                />
                <EventCard
                  image="/apple-logo-colorful-gradient.jpg"
                  title="Sự kiện Apple 'Awe Dropping'"
                  location="Apple Park, California"
                  time="0h ngày 10/9/2025"
                />
                <EventCard
                  image="/huawei-watch-gold-luxury.jpg"
                  title="Sự kiện Huawei Watch GT 6 Series"
                  location="Paris, Pháp"
                  time="19/09/2025"
                />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2">TIN TỨC MỚI NHẤT</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <FeaturedArticle
                    image="/samsung-galaxy-tab-with-keyboard-tablet.jpg"
                    title="Trên tay Samsung Galaxy Tab A11 Plus: Tablet giá rẻ nhưng có Samsung DeX mới, chip Dimensity 7300, giá 7.39 triệu"
                    description="Trên tay Samsung Galaxy Tab A11 Plus , chiếc Galaxy Tab rẻ nhất được hỗ trợ Samsung DeX, nữa hơn màn hình đến từ sản phẩm laptop. Một đây, Samsung sa..."
                    author="Jay Nguyen"
                    time="12/12/2025 14:34"
                    tag="Trên tay"
                  />
                  <NewsItem
                    image="/tapo-security-camera-dual-lens.jpg"
                    title="Trên tay Tapo C545D: Camera 2 mắt telê, theo dõi AI chính xác, giá 1.5 triệu"
                    author="Hải Trần"
                    time="12/12/2025 10:45"
                  />
                  <NewsItem
                    image="/msi-prestige-laptop-sleek-modern.jpg"
                    title="Đánh giá MSI Prestige 14 AI Studio: Sản sale 25 triệu có đáng không? Test kỹ 2 tuần cho câu trả lời"
                    author="Hải Trần"
                    time="11/12/2025 13:50"
                  />
                  <NewsItem
                    image="/coros-apex-4-smartwatch-titanium.jpg"
                    title="Trên tay Coros Apex 4: Thiết kế Titan grade 5 siêu nhẹ, đối thủ của Fenix 8, giá 13.2 triệu đồng"
                    author="Jay Nguyen"
                    time="11/12/2025 11:27"
                  />
                </div>

                <div className="space-y-4">
                  <div className="bg-muted rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-lg mb-3 border-b pb-2">Góc Chọn & Mua</h3>
                    <ShoppingWidget
                      image="/gaming-laptop-rgb-lights.jpg"
                      title="Giá RAM tăng chóng mặt? Đây là laptop gaming 16GB dưới 20 triệu vẫn quá hời để đón năm mới"
                    />
                    <ShoppingWidget
                      image="/cherry-blossom-movie-poster-emotional.jpg"
                      title="'Ông tố' bản phim cơ Cherry lao đốc: Lỗ nặng, đóng nhà má..."
                    />
                    <ShoppingWidget
                      image="/gaming-graphics-card-rtx-modern.jpg"
                      title="Game thủ cuối năm nên mua gì? 4 card đồ họa chơi game..."
                    />
                    <ShoppingWidget
                      image="/galaxy-tab-s11-samsung-tablet-purple.jpg"
                      title="Biến mùa lễ hội thêm 'xịn sò' với Galaxy Tab S11: Mỏng nhẹ..."
                    />
                    <a
                      href="#"
                      className="text-red-600 flex items-center gap-1 text-sm font-medium hover:underline mt-3"
                    >
                      Xem thêm <ChevronRight size={14} />
                    </a>
                  </div>

                  <div className="bg-muted rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-lg mb-3 border-b pb-2">Xu hướng AI</h3>
                    <AITrendWidget image="/gemini-google-ai-education-learning.jpg" title="Gemini for Education" />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2">XEM NHIỀU TUẦN QUA</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <ArticleCard
                  image="/cellphones-store-franchise-business.jpg"
                  title="Truy cập CellphoneS"
                  author="SHIRO"
                  time="12/12/2025 16:33"
                />
                <ArticleCard
                  image="/placeholder.svg?height=160&width=300"
                  title="DTCL mùa 16: Top 5 đội hình"
                  author="KILIG"
                  time="12/12/2025 16:57"
                />
                <ArticleCard
                  image="/placeholder.svg?height=160&width=300"
                  title="Hướng dẫn cách tải game Tiềm"
                  author="Thùy Tiên"
                  time="12/12/2025 16:45"
                />
                <ArticleCard
                  image="/placeholder.svg?height=160&width=300"
                  title="Cận cảnh One UI 8.5 trên"
                  author="SHIRO"
                  time="12/12/2025 16:33"
                />
                <ArticleCard
                  image="/placeholder.svg?height=160&width=300"
                  title="DTCL: Cách mở khóa tất cả"
                  author="SHIRO"
                  time="12/12/2025 16:31"
                />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

function ArticleCard({ image, title, author, time }: { image: string; title: string; author: string; time: string }) {
  return (
    <div className="bg-muted rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img src={image || "/placeholder.svg"} alt={title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <User size={14} />
          <span>{author}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
          <Clock size={14} />
          <span>{time}</span>
        </div>
      </div>
    </div>
  )
}

function EventCard({ image, title, location, time }: { image: string; title: string; location: string; time: string }) {
  return (
    <div className="bg-muted rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img src={image || "/placeholder.svg"} alt={title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Home size={14} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
          <Calendar size={14} />
          <span>{time}</span>
        </div>
      </div>
    </div>
  )
}

function FeaturedArticle({
  image,
  title,
  description,
  author,
  time,
  tag,
}: { image: string; title: string; description: string; author: string; time: string; tag: string }) {
  return (
    <div className="bg-muted rounded-lg overflow-hidden shadow-sm">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-64 object-cover" />
        <span className="absolute top-3 left-3 bg-red-600 text-foreground px-3 py-1 text-xs font-bold rounded">{tag}</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewsItem({ image, title, author, time }: { image: string; title: string; author: string; time: string }) {
  return (
    <div className="bg-muted rounded-lg overflow-hidden shadow-sm flex gap-3 p-3 hover:shadow-md transition-shadow">
      <img src={image || "/placeholder.svg"} alt={title} className="w-32 h-24 object-cover rounded flex-shrink-0" />
      <div className="flex-1">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ShoppingWidget({ image, title }: { image: string; title: string }) {
  return (
    <div className="flex gap-3 mb-3 pb-3 border-b last:border-b-0 last:mb-0 last:pb-0">
      <img src={image || "/placeholder.svg"} alt={title} className="w-20 h-16 object-cover rounded flex-shrink-0" />
      <h4 className="text-xs font-medium line-clamp-3">{title}</h4>
    </div>
  )
}

function AITrendWidget({ image, title }: { image: string; title: string }) {
  return (
    <div>
      <img src={image || "/placeholder.svg"} alt={title} className="w-full h-32 object-cover rounded mb-2" />
      <h4 className="text-sm font-semibold">{title}</h4>
    </div>
  )
}
