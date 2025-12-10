const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Khởi tạo database
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Lỗi kết nối database:', err);
    } else {
        console.log('Đã kết nối database SQLite');
        // Tạo bảng users nếu chưa có
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            birth_date TEXT NOT NULL,
            password TEXT NOT NULL,
            address TEXT NOT NULL,
            registered_at TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Lỗi tạo bảng:', err);
            } else {
                console.log('Bảng users đã sẵn sàng');
            }
        });
    }
});

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Route để xử lý đăng ký
app.post('/register', (req, res) => {
    const userData = req.body;

    // Insert vào database
    const sql = `INSERT INTO users (full_name, username, birth_date, password, address, registered_at) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [
        userData.fullName,
        userData.username,
        userData.birthDate,
        userData.password,
        userData.address,
        userData.registeredAt
    ], function (err) {
        if (err) {
            console.error('Lỗi khi lưu dữ liệu:', err);
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Tên đăng nhập đã tồn tại' });
            }
            return res.status(500).json({ error: 'Không thể lưu dữ liệu' });
        }

        console.log('Đã lưu thông tin người dùng:', userData.username, '- ID:', this.lastID);
        res.json({ success: true, message: 'Đăng ký thành công', userId: this.lastID });
    });
});

// Route để xem danh sách users (tùy chọn)
app.get('/users', (req, res) => {
    db.all('SELECT id, full_name, username, birth_date, address, registered_at FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Không thể lấy dữ liệu' });
        }
        res.json(rows);
    });
});

// Đóng database khi tắt server
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Lỗi đóng database:', err);
        } else {
            console.log('Đã đóng kết nối database');
        }
        process.exit(0);
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
    console.log('Mở trình duyệt và truy cập địa chỉ trên để sử dụng');
});
