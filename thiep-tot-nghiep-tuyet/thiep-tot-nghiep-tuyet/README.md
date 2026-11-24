# 🎓 Thiệp mời tốt nghiệp online — Nguyễn Thị Tuyết

Website tĩnh (HTML/CSS/JS thuần, không cần cài đặt hay máy chủ) gồm: bìa "Mở thiệp", nhạc nền, tuyết rơi, ảnh polaroid, lịch + bản đồ, đếm ngược, chương trình, album ảnh, form xác nhận tham dự gửi qua Gmail.

- **Sự kiện:** Lễ tốt nghiệp — Nguyễn Thị Tuyết
- **Địa điểm:** Trường THPT Hoài Đức B, Hoài Đức, Hà Nội
- **Ngày:** 20/12/2026

## 📁 Cấu trúc

```
thiep-tot-nghiep-tuyet/
├── index.html        # trang chính
├── css/style.css     # giao diện
├── js/config.js      # ⭐ FILE DUY NHẤT CẦN SỬA (thông tin, email, ảnh, nhạc)
├── js/main.js        # logic (đếm ngược, tuyết, nhạc, gửi mail...)
├── images/           # hero.jpg, album-1..5.jpg, og.jpg, favicon.png
└── music/nhac.mp3    # nhạc nền
```

## ▶️ Chạy thử bằng Visual Studio Code

1. Mở thư mục `thiep-tot-nghiep-tuyet` bằng VS Code (File → Open Folder).
2. Cài tiện ích **Live Server** (Ritwick Dey).
3. Chuột phải `index.html` → **Open with Live Server**.

Cũng có thể nhấp đúp `index.html` để mở thẳng bằng trình duyệt.

## ✏️ 3 việc cần làm trước khi gửi thiệp

Mở `js/config.js` và sửa:

1. **`receiverEmail`** → Gmail của bạn (nơi nhận thư xác nhận). *Mặc định đang là email giả, bắt buộc đổi.*
2. **`phone`, `zalo`** (và `messenger` nếu có).
3. Kiểm tra **giờ lễ** (`date`, đang để 08:00), **địa chỉ chi tiết** của trường và **chương trình trong ngày** (`program`) cho đúng thực tế.

## 🖼️ Thay ảnh thật

Ảnh hiện tại là ảnh minh họa. Để dùng ảnh thật, chép ảnh của bạn vào thư mục `images/` và **ghi đè** các file cùng tên:

| File | Gợi ý |
|---|---|
| `hero.jpg` | ảnh chân dung, tỉ lệ dọc 4:5 (vd 800×1000) |
| `album-1.jpg … album-5.jpg` | ảnh vuông 800×800 |
| `og.jpg` | ảnh xem trước khi chia sẻ link (1200×630) |

Muốn thêm/bớt ảnh album, sửa mảng `album` trong `config.js`.

## 🎵 Đổi nhạc

Nhạc hiện tại là bản piano nhẹ tự sáng tác, không vướng bản quyền. Muốn dùng bài khác, chép file mp3 vào `music/` rồi sửa `music:` trong `config.js`. (Chỉ dùng bài bạn có quyền sử dụng nếu đăng web công khai.)

Trình duyệt chỉ cho phát nhạc sau khi người xem tương tác, nên nhạc sẽ tự phát khi khách bấm **"Mở thiệp"**.

## 📧 Nhận thư xác nhận qua Gmail

Web tĩnh không có máy chủ nên có 2 cách:

### Cách 1 — Mặc định, không cần cài gì
Khi khách bấm **Gửi xác nhận**, trang mở sẵn **Gmail soạn thư** (trên điện thoại là ứng dụng email) với nội dung đã điền: tên, số điện thoại, số người, tham dự hay không, lời chúc. Khách chỉ cần bấm **Gửi**.
*Hạn chế:* khách phải tự bấm Gửi trong Gmail của họ (cần đăng nhập email).

### Cách 2 — Tự động gửi bằng EmailJS (miễn phí, khách không cần đăng nhập)
1. Đăng ký tại <https://www.emailjs.com> → **Email Services → Add New Service → Gmail** → đăng nhập Gmail của bạn → lấy **Service ID**.
2. **Email Templates → Create New Template**. Dùng các biến sau trong nội dung:
   - **To Email:** `{{to_email}}`
   - **Subject:** `[Thiệp mời] {{guest_name}} - {{attendance}}`
   - **Content:**
     ```
     Khách: {{guest_name}}
     Điện thoại: {{phone}}
     Phản hồi: {{attendance}}
     Số người: {{guests}}
     Lời chúc: {{message}}
     Sự kiện: {{event_name}} · {{event_date}} · {{venue}}
     ```
   - Lưu lại, lấy **Template ID**.
3. **Account → General** → lấy **Public Key**.
4. Trong `js/config.js` điền:
   ```js
   emailjs: { enabled: true, serviceId: "service_xxx", templateId: "template_xxx", publicKey: "xxxxxxxx" }
   ```
5. Nếu gửi tự động lỗi, trang sẽ tự đưa khách về Cách 1.

> Lưu ý: Public Key của EmailJS nằm trong code web (đó là thiết kế của dịch vụ). Hãy bật giới hạn domain / theo dõi hạn mức trong trang quản trị EmailJS để tránh bị lạm dụng.

## 💌 Gửi thiệp riêng cho từng người

Thêm `?ten=Tên` vào cuối link, ví dụ:

```
https://ten-mien-cua-ban/index.html?ten=Chị%20Lan
```

Lời mời sẽ hiện đúng tên người nhận và tự điền vào form xác nhận.

## 🌐 Đưa lên mạng (miễn phí) để gửi link

- **Netlify Drop:** vào <https://app.netlify.com/drop>, kéo cả thư mục `thiep-tot-nghiep-tuyet` vào → có link ngay.
- **GitHub Pages:** tạo repo, tải toàn bộ file lên, bật Settings → Pages → branch `main`.
- **Vercel / Cloudflare Pages:** kéo thả hoặc kết nối repo tương tự.

Sau khi có link, nếu muốn ảnh xem trước đẹp khi chia sẻ Facebook/Zalo, đổi `og:image` trong `index.html` thành đường dẫn đầy đủ, ví dụ `https://ten-mien-cua-ban/images/og.jpg`.

## ❗ Lưu ý

- Bản đồ dùng Google Maps tìm theo tên trường. Nếu vị trí hiển thị chưa đúng, điền địa chỉ chi tiết vào `mapQuery`.
- Trang cần Internet để tải font chữ và bản đồ; ảnh, nhạc, mã nguồn đều nằm sẵn trong project.
