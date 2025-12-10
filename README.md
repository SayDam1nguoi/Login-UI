# Giao diện Đăng ký Tài khoản

Ứng dụng web đơn giản để đăng ký tài khoản với các tính năng:
- Nhập thông tin: Họ tên, tên đăng nhập, mật khẩu, địa chỉ
- Tạo ngày sinh ngẫu nhiên (có kiểm tra số ngày hợp lệ cho từng tháng)
- Lưu thông tin vào file users.txt

## Cài đặt

1. Cài đặt Node.js (nếu chưa có)
2. Cài đặt dependencies:
```
npm install
```

## Chạy ứng dụng

```
npm start
```

Sau đó mở trình duyệt và truy cập: http://localhost:3000

## Tính năng

- **Nút Ngẫu nhiên**: Tạo ngày sinh ngẫu nhiên với kiểm tra:
  - Tháng 2: 28 hoặc 29 ngày (năm nhuận)
  - Tháng 4, 6, 9, 11: 30 ngày
  - Các tháng còn lại: 31 ngày
  
- **Lưu dữ liệu**: Thông tin đăng ký được lưu vào file `users.txt`
