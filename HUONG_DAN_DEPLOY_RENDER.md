# 🚀 Hướng dẫn Deploy lên Render.com (MIỄN PHÍ & VĨNH VIỄN)

## Bước 1: Chuẩn bị GitHub Repository

### 1.1. Cài đặt Git (nếu chưa có)
- Tải Git tại: https://git-scm.com/download/win
- Cài đặt với các tùy chọn mặc định

### 1.2. Tạo Repository trên GitHub
1. Truy cập: https://github.com
2. Đăng nhập (hoặc đăng ký nếu chưa có tài khoản)
3. Click nút **"+"** góc trên bên phải → **"New repository"**
4. Điền thông tin:
   - Repository name: `dang-ky-tai-khoan` (hoặc tên bạn muốn)
   - Description: "Giao diện đăng ký tài khoản"
   - Chọn **Public**
   - **KHÔNG** tick "Add a README file"
5. Click **"Create repository"**

### 1.3. Push code lên GitHub

Mở Terminal/Command Prompt trong thư mục project và chạy:

```bash
# Khởi tạo Git
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "Initial commit"

# Đổi branch sang main (nếu cần)
git branch -M main

# Thêm remote (thay YOUR_USERNAME và YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push lên GitHub
git push -u origin main
```

**Lưu ý:** Thay `YOUR_USERNAME` và `YOUR_REPO` bằng username GitHub và tên repository của bạn.

---

## Bước 2: Deploy trên Render.com

### 2.1. Tạo tài khoản Render
1. Truy cập: https://render.com
2. Click **"Get Started"** hoặc **"Sign Up"**
3. Chọn **"Sign up with GitHub"** (khuyến nghị)
4. Cho phép Render truy cập GitHub của bạn

### 2.2. Tạo Web Service mới
1. Sau khi đăng nhập, click **"New +"** (góc trên bên phải)
2. Chọn **"Web Service"**
3. Click **"Connect a repository"**
4. Tìm và chọn repository `dang-ky-tai-khoan` của bạn
5. Click **"Connect"**

### 2.3. Cấu hình Web Service

Điền các thông tin sau:

- **Name**: `dang-ky-tai-khoan` (hoặc tên bạn muốn - sẽ là subdomain)
- **Region**: Singapore (gần Việt Nam nhất)
- **Branch**: `main`
- **Root Directory**: để trống
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Chọn **"Free"** (0$/tháng)

### 2.4. Deploy
1. Kéo xuống dưới cùng
2. Click **"Create Web Service"**
3. Đợi 3-5 phút để Render build và deploy

### 2.5. Nhận Domain
Sau khi deploy thành công, bạn sẽ có domain:
```
https://dang-ky-tai-khoan.onrender.com
```
(hoặc tên bạn đã đặt ở bước 2.3)

---

## Bước 3: Kiểm tra

1. Truy cập domain của bạn
2. Thử đăng ký tài khoản
3. Kiểm tra danh sách users tại: `https://your-app.onrender.com/users`

---

## ⚠️ Lưu ý quan trọng

### 1. Free tier của Render
- **Miễn phí vĩnh viễn** nhưng có giới hạn:
  - Server sẽ "ngủ" sau 15 phút không hoạt động
  - Lần truy cập đầu tiên sau khi ngủ sẽ mất 30-60 giây để "đánh thức"
  - 750 giờ/tháng (đủ cho 1 app chạy 24/7)

### 2. Database SQLite
- SQLite trên Render sẽ **BỊ XÓA** mỗi khi:
  - Deploy lại
  - Server restart
  - Sau 7 ngày không hoạt động

**Giải pháp:** Nâng cấp lên PostgreSQL (vẫn miễn phí):

#### Tạo PostgreSQL Database trên Render:
1. Trong Dashboard Render, click **"New +"** → **"PostgreSQL"**
2. Đặt tên: `users-database`
3. Chọn **Free** tier
4. Click **"Create Database"**
5. Copy **Internal Database URL**

#### Cập nhật code để dùng PostgreSQL:
```bash
npm install pg
```

Sau đó tôi sẽ giúp bạn sửa code để kết nối PostgreSQL.

### 3. Cập nhật code
Mỗi khi bạn thay đổi code:
```bash
git add .
git commit -m "Update code"
git push
```
Render sẽ tự động deploy lại.

---

## 🎉 Hoàn tất!

Bây giờ bạn đã có:
- ✅ Domain miễn phí vĩnh viễn: `https://your-app.onrender.com`
- ✅ HTTPS tự động
- ✅ Có thể chia sẻ cho bất kỳ ai
- ✅ Tự động deploy khi push code mới

---

## Câu hỏi thường gặp

**Q: Tại sao lần đầu truy cập lại chậm?**
A: Server free bị "ngủ" sau 15 phút không dùng. Lần đầu cần 30-60s để đánh thức.

**Q: Làm sao để server không ngủ?**
A: Dùng dịch vụ ping như UptimeRobot (miễn phí) để ping server mỗi 5 phút.

**Q: Có thể dùng domain riêng không?**
A: Có, nhưng cần nâng cấp lên plan trả phí ($7/tháng).

**Q: Database bị mất dữ liệu?**
A: SQLite trên Render không persistent. Nên chuyển sang PostgreSQL (vẫn free).

---

## Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. Logs trong Render Dashboard
2. File `.gitignore` đã loại trừ `node_modules/`
3. `package.json` có đầy đủ dependencies
