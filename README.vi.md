<div align="center"> 
<br> 
<br>
<img src="./src/assets/images/logo.png" height="140" />
<h3> TVT Admin </h3>
  <p>
    <p style="font-size: 14px">
      TVT Admin is a modern admin dashboard template built with React 18, Vite, Ant Design, and TypeScript. It is designed to help developers quickly create powerful admin management systems.
    </p>
    <br />
    <br />
    <a href="#">Preview</a>
    ·
    <a href="#">Discord</a>
    ·
    <a href="#">Document</a>
    <br />
</div>

**English** | [Vietnames](./README.vi.md)

## Tính năng nổi bật

- Xây dựng bằng React 18 và sử dụng hook.
- Sử dụng Vite giúp phát triển nhanh và hỗ trợ hot module replacement.
- Tích hợp Ant Design với bộ UI hiện đại và đa dạng.
- Viết bằng TypeScript giúp an toàn kiểu dữ liệu và tăng hiệu quả phát triển.
- Giao diện responsive, phù hợp với mọi kích thước màn hình.
- Cấu trúc định tuyến linh hoạt, hỗ trợ nested routes.
- Hệ thống phân quyền dựa trên vai trò người dùng.
- Hỗ trợ đa ngôn ngữ, dễ dàng chuyển đổi qua lại.
- Tích hợp các tính năng quản trị cơ bản: quản lý người dùng, vai trò, và phân quyền.
- Cho phép tùy chỉnh giao diện và chủ đề theo nhu cầu.
- Sử dụng MSW và Faker.js để giả lập dữ liệu.
- Quản lý trạng thái bằng Zustand.
- Xử lý truy vấn dữ liệu với React-Query.

## Bắt đầu nhanh

### Tải mã nguồn dự án

```bash
git clone https://github.com/thangtran1/dashboard_admin
```

### Cài đặt thư viện

Trong thư mục gốc dự án, chạy lệnh:

```bash
pnpm install
```

### Start the Development Server

Run the following command to start the development server:

```bash
pnpm dev
```

Truy cập [http://localhost:3000](http://localhost:3000) tại địa chỉ.

### Chạy ứng dụng chế độ phát triển

Build bản Production

```bash
pnpm build
```

## Quy tắc commit

reference[.commitlint.config.js](./commitlint.config.js)

- `feat` Thêm tính năng mới
- `fix` Sửa lỗi
- `refactor` Cải tổ lại mã nguồn
- `revert` Hoàn tác commit trước
- `test` Thêm hoặc cập nhật mã kiểm thử
