# 🚀 System Admin Frontend

## Installation

```bash
# Clone the repository
git clone https://github.com/thangtran1/dashboard_admin_khoahocre_FE
cd dashboard_admin

# Install dependencies
pnpm install

# Setup env
pnpm setup-env

# Check connection with BE
pnpm check-backend
```

### Development

```bash
# Start all applications
pnpm dev

```

## 📁 Project Structure

```text
dashboard_admin/
├── src/
│   ├── api/          # Hàm gọi API, service backend
│   ├── assets/       # Hình ảnh, icon, font
│   ├── components/   # Component tái sử dụng
│   ├── contexts/     # React Contexts (Auth, Theme, ...)
│   ├── hooks/        # Custom hooks
│   ├── layouts/      # Layout tổng thể (Admin, Auth, ...)
│   ├── locales/      # Đa ngôn ngữ (i18n)
│   ├── pages/        # Các trang chính của ứng dụng
│   ├── router/       # Định nghĩa router, route config
│   ├── store/        # Global state (Redux, Zustand, ...)
│   ├── styles/       # CSS/Tailwind/SCSS toàn cục
│   ├── theme/        # Cấu hình màu sắc, typography
│   ├── types/        # Khai báo interface/type chung
│   ├── ui/           # Bộ UI cơ bản (Button, Input, Card, ...)
│   └── utils/        # Hàm tiện ích (formatDate, debounce, ...)
│
├── App.tsx           # Thành phần gốc của ứng dụng
├── main.tsx          # Điểm vào chính, khởi tạo React DOM
└── global.css        # CSS toàn cục áp dụng cho dự án

```

## 🛠️ Available Scripts

### Development Commands

```bash
pnpm dev              # Start all apps in development mode
```

## 🏗️ Technology Stack

### Core Technologies

- **Framework**: React.js 19
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS, Antd

### UI & Components

- **UI Library**: Antd (React)
- **State Management**: Zustand, React Query (TanStack Query)
- **Form Handling**: React Hook Form
- **Data Tables**: Antd Table

## 🔧 Configuration

### Port Configuration

- **User Web**: <http://localhost:3000>
- **Admin Web**: <http://localhost:3000/dashboard/workbench>

### Code Style

- Follow the existing code style
- Use TypeScript for all new code

### Commit Convention

This project uses conventional commits:

```bash
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update build process
```

## Sự cố thường gặp – system-admin failed

Khi clone code mới về cập nhật env và kiểm tra kết nối với Backend

Cách xử lý nhanh (khuyến nghị):

Test connection trực tiếp terminal với lệnh:

```bash
pnpm check-backend
```

Mẹo: Hãy liên hệ qua email: thangtrandz04@gmail để biết thêm thông tin or liên hệ trực tiếp qua hotline: 0389215396 hoặc thông qua fanpage: vanthang.io.vn để được hỗ trợ

# 👨‍💻 We are 👨‍💻 The System Admins! 🖥️
