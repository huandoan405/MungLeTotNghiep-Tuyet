/* =====================================================================
   ✏️  FILE CẤU HÌNH — CHỈ CẦN SỬA FILE NÀY LÀ XONG
   ===================================================================== */
window.CONFIG = {
  // ---- Thông tin buổi lễ ----
  name: "Nguyễn Thị Tuyết",
  shortName: "Tuyết",
  school: "Trường THPT Hoài Đức B",
  schoolYear: "Khóa 2023 – 2026",
  date: "2026-12-20T08:00:00+07:00",   // ngày 20/12/2026, 08:00 sáng (giờ Việt Nam) → sửa giờ nếu khác

  venue: "Trường THPT Hoài Đức B",
  address: "Trường THPT Hoài Đức B, Hoài Đức, Hà Nội",     // 👉 điền địa chỉ chi tiết nếu muốn
  mapQuery: "Trường THPT Hoài Đức B, Hoài Đức, Hà Nội",     // Google Maps sẽ tự tìm theo tên này
  dressCode: "Lịch sự · gam màu trắng, hồng hoặc pastel",

  // ---- Liên hệ ----
  phone: "0388450518",            // 👉 đổi thành số của bạn
  zalo: "0388450518",             // 👉 số Zalo (thường trùng số điện thoại)
  messenger: "Nguyễn Thị Tuyết",                  // 👉 username Messenger, ví dụ "tuyet.nguyen" (để trống thì ẩn nút)

  // ---- Chương trình trong ngày (sửa tự do) ----
  program: [
    { time: "07:30", title: "Đón khách", desc: "Check-in và nhận quà lưu niệm." },
    { time: "08:00", title: "Lễ tốt nghiệp", desc: "Nghi thức chính thức tại hội trường trường." },
    { time: "10:00", title: "Chụp ảnh lưu niệm", desc: "Chụp cùng bạn bè, thầy cô và gia đình." },
    { time: "11:30", title: "Liên hoan nhỏ", desc: "Cùng nhau chung vui và trò chuyện." }
  ],

  // ---- Ảnh (đã có sẵn ảnh minh họa; thay bằng ảnh thật bằng cách ghi đè file cùng tên) ----
  heroPhoto: "images/hero.jpg",
  album: [
    "images/album-1.jpg",
    "images/album-2.jpg",
    "images/album-3.jpg",
    "images/album-4.jpg",
    "images/album-5.jpg"
  ],

  // ---- Nhạc nền ----
  music: "music/cohenvoithanhxuan.mp3",

  /* =====================================================================
     📧 NHẬN THƯ XÁC NHẬN THAM DỰ QUA GMAIL
     ===================================================================== */
  receiverEmail: "huandoan405@gmail.com",   // 👉 BẮT BUỘC: đổi thành Gmail của bạn

  /* Cách 1 (mặc định, không cần cài gì):
       Khi khách bấm "Gửi xác nhận", trang mở sẵn thư Gmail đã điền nội dung,
       khách chỉ cần bấm "Gửi". (Trên điện thoại sẽ mở ứng dụng email.)

     Cách 2 (tự động gửi, khách không cần đăng nhập — dùng EmailJS miễn phí):
       Làm theo hướng dẫn trong README.md, điền 3 mã bên dưới và đổi enabled thành true. */
  emailjs: {
    enabled: false,
    serviceId: "",      // ví dụ: service_abc123
    templateId: "",     // ví dụ: template_xyz789
    publicKey: ""       // ví dụ: AbCdEfGh123456
  }
};
