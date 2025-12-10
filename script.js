// Hàm kiểm tra số ngày trong tháng
function getDaysInMonth(month, year) {
    // Tháng 2 (tháng có 28 hoặc 29 ngày)
    if (month === 2) {
        // Kiểm tra năm nhuận
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            return 29;
        }
        return 28;
    }
    // Các tháng có 30 ngày: 4, 6, 9, 11
    if ([4, 6, 9, 11].includes(month)) {
        return 30;
    }
    // Các tháng còn lại có 31 ngày
    return 31;
}

// Hàm tạo ngày sinh ngẫu nhiên
function generateRandomDate() {
    const year = Math.floor(Math.random() * (2010 - 1950 + 1)) + 1950;
    const month = Math.floor(Math.random() * 12) + 1;
    const maxDay = getDaysInMonth(month, year);
    const day = Math.floor(Math.random() * maxDay) + 1;

    return { day, month, year };
}

// Xử lý nút ngẫu nhiên
document.getElementById('randomDateBtn').addEventListener('click', function () {
    const randomDate = generateRandomDate();
    document.getElementById('day').value = randomDate.day;
    document.getElementById('month').value = randomDate.month;
    document.getElementById('year').value = randomDate.year;
});

// Xử lý form submit
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const messageDiv = document.getElementById('message');

    // Kiểm tra ngày sinh đã được tạo chưa
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    if (!day || !month || !year) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Vui lòng tạo ngày sinh bằng nút Ngẫu nhiên!';
        return;
    }

    // Lấy dữ liệu form
    const formData = {
        fullName: document.getElementById('fullName').value,
        username: document.getElementById('username').value,
        birthDate: `${day}/${month}/${year}`,
        password: document.getElementById('password').value,
        address: document.getElementById('address').value,
        registeredAt: new Date().toLocaleString('vi-VN')
    };

    try {
        // Gửi dữ liệu đến server
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            messageDiv.className = 'message success';
            messageDiv.textContent = 'Đăng ký thành công! Thông tin đã được lưu.';
            document.getElementById('registerForm').reset();
        } else {
            throw new Error('Lỗi khi lưu dữ liệu');
        }
    } catch (error) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Có lỗi xảy ra. Vui lòng thử lại!';
        console.error('Error:', error);
    }
});
