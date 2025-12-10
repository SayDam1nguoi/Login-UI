# Hướng dẫn Deploy lên Internet

## Cách 1: Deploy lên Render.com (MIỄN PHÍ)

Render.com cung cấp hosting miễn phí với domain thật (ví dụ: `your-app.onrender.com`)

### Các bước:

1. **Tạo tài khoản Render**
   - Truy cập: https://render.com
   - Đăng ký tài khoản (có thể dùng GitHub)

2. **Push code lên GitHub**
   - Tạo repository mới trên GitHub
   - Push code của bạn lên:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

3. **Deploy trên Render**
   - Đăng nhập Render.com
   - Click "New +" → "Web Service"
   - Kết nối GitHub repository
   - Cấu hình:
     - Name: tên-app-cua-ban
     - Environment: Node
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Click "Create Web Service"

4. **Nhận domain**
   - Sau vài phút, bạn sẽ có domain: `https://ten-app-cua-ban.onrender.com`

---

## Cách 2: Deploy lên Vercel (MIỄN PHÍ)

### Các bước:

1. **Cài đặt Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Làm theo hướng dẫn
   - Nhận domain: `https://your-app.vercel.app`

---

## Cách 3: Deploy lên Railway.app (MIỄN PHÍ)

1. Truy cập: https://railway.app
2. Đăng nhập bằng GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Chọn repository
5. Railway tự động detect và deploy
6. Nhận domain: `https://your-app.up.railway.app`

---

## Cách 4: Sử dụng Ngrok (Tạm thời - cho test)

Ngrok tạo URL công khai tạm thời từ localhost:

1. **Cài đặt Ngrok**
   - Tải tại: https://ngrok.com/download
   - Giải nén và đăng ký tài khoản

2. **Chạy server local**
   ```bash
   npm start
   ```

3. **Tạo tunnel**
   ```bash
   ngrok http 3000
   ```

4. **Nhận URL**
   - Ngrok sẽ cho bạn URL như: `https://abc123.ngrok.io`
   - URL này có thể chia sẻ cho người khác
   - **Lưu ý**: URL này chỉ tồn tại khi ngrok đang chạy

---

## Khuyến nghị

- **Render.com**: Tốt nhất cho production, miễn phí, domain vĩnh viễn
- **Vercel**: Nhanh, dễ dùng, phù hợp cho frontend + API đơn giản
- **Railway**: Dễ setup, có database miễn phí
- **Ngrok**: Chỉ dùng để test/demo tạm thời

---

## Lưu ý quan trọng

1. **Database**: SQLite sẽ bị reset mỗi khi deploy lại trên Render/Vercel. Nên chuyển sang:
   - PostgreSQL (Render cung cấp miễn phí)
   - MongoDB Atlas (miễn phí)
   - MySQL trên PlanetScale (miễn phí)

2. **Environment Variables**: Đặt PORT trong settings của hosting platform

3. **HTTPS**: Tất cả các platform trên đều tự động cung cấp HTTPS miễn phí
