(function () {
  "use strict";
  var C = window.CONFIG;
  var $ = function (id) { return document.getElementById(id); };
  var p2 = function (n) { return String(n).padStart(2, "0"); };
  var EVENT = new Date(C.date);

  /* ---------- Điền dữ liệu từ config ---------- */
  document.title = "Thư mời tốt nghiệp · " + C.name;
  $("coverName").textContent = C.name;
  $("heroName").textContent = C.name;
  $("schoolTxt").textContent = C.school;
  $("yearTxt").textContent = C.schoolYear || "";
  $("heroPhoto").src = C.heroPhoto;
  $("venue").textContent = C.venue;
  $("addr").textContent = C.address;
  $("dress").textContent = C.dressCode;
  $("mapFrame").src = "https://maps.google.com/maps?q=" + encodeURIComponent(C.mapQuery) + "&z=16&output=embed";
  $("mapLink").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.mapQuery);
  $("ctCall").href = "tel:" + C.phone; $("ctPhone").textContent = C.phone;
  $("ctZalo").href = "https://zalo.me/" + C.zalo; $("ctZaloTxt").textContent = "zalo.me/" + C.zalo;
  if (C.messenger) { $("ctMess").href = "https://m.me/" + C.messenger; $("ctMess").hidden = false; }
  $("audio").src = C.music;

  // Gửi thiệp riêng cho từng người: index.html?ten=Lan
  var guest = (new URLSearchParams(location.search).get("ten") || "").trim().slice(0, 60);
  if (guest) {
    $("fName").value = guest;
    $("greet").textContent = "Trân trọng kính mời " + guest + " đến dự lễ tốt nghiệp của";
  }

  /* ---------- Ngày + lịch ---------- */
  var DOW = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  $("dow").textContent = DOW[EVENT.getDay()];
  $("dmy").textContent = p2(EVENT.getDate()) + "." + p2(EVENT.getMonth() + 1) + "." + EVENT.getFullYear();
  $("timeTxt").textContent = "Vào lúc " + p2(EVENT.getHours()) + ":" + p2(EVENT.getMinutes());
  (function calendar() {
    var y = EVENT.getFullYear(), m = EVENT.getMonth();
    $("calMonth").textContent = "Tháng " + (m + 1) + " / " + y;
    var first = (new Date(y, m, 1).getDay() + 6) % 7;     // tuần bắt đầu từ Thứ Hai
    var days = new Date(y, m + 1, 0).getDate();
    var html = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(function (d) { return '<div class="h">' + d + "</div>"; }).join("");
    for (var i = 0; i < first; i++) html += "<div></div>";
    for (var d = 1; d <= days; d++) html += '<div class="d' + (d === EVENT.getDate() ? " on" : "") + '">' + d + "</div>";
    $("cal").innerHTML = html;
  })();

  /* ---------- Đếm ngược ---------- */
  function tick() {
    var diff = Math.max(0, EVENT - new Date());
    $("cd-d").textContent = p2(Math.floor(diff / 864e5));
    $("cd-h").textContent = p2(Math.floor(diff / 36e5) % 24);
    $("cd-m").textContent = p2(Math.floor(diff / 6e4) % 60);
    $("cd-s").textContent = p2(Math.floor(diff / 1e3) % 60);
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Chương trình ---------- */
  var esc = function (t) {
    return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  };
  $("timeline").innerHTML = (C.program || []).map(function (s) {
    return '<div class="tl"><div class="time">' + esc(s.time) + '</div><div><h3>' + esc(s.title) + "</h3><p>" + esc(s.desc) + "</p></div></div>";
  }).join("");

  /* ---------- Album + lightbox ---------- */
  $("album").innerHTML = C.album.map(function (src, i) {
    return '<div class="pl"><img src="' + esc(src) + '" alt="Ảnh ' + (i + 1) + '" loading="lazy"></div>';
  }).join("");
  var lb = $("lightbox");
  $("album").addEventListener("click", function (e) {
    var img = e.target.closest(".pl img");
    if (img) { lb.querySelector("img").src = img.src; lb.classList.add("open"); }
  });
  lb.addEventListener("click", function () { lb.classList.remove("open"); });

  /* ---------- Liên hệ ---------- */
  $("ctToggle").addEventListener("click", function () { $("ctBox").classList.toggle("open"); });

  /* ---------- Hiện dần khi cuộn ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });

  /* ---------- Nhạc + mở thiệp ---------- */
  var audio = $("audio"), mb = $("music");
  function setPlaying(on) { mb.classList.toggle("playing", on); }
  mb.addEventListener("click", function () {
    if (audio.paused) { audio.play().then(function () { setPlaying(true); }).catch(function () {}); }
    else { audio.pause(); setPlaying(false); }
  });
  $("openBtn").addEventListener("click", function () {
    $("cover").classList.add("open");
    document.body.classList.remove("locked");
    audio.volume = 0.7;
    audio.play().then(function () { setPlaying(true); }).catch(function () {});   // bấm nút nên trình duyệt cho phép phát nhạc
    setTimeout(function () { $("cover").style.display = "none"; }, 1100);
  });

  /* ---------- Hiệu ứng tim bay ---------- */
  function heartBurst(el) {
    var r = el.getBoundingClientRect();
    for (var i = 0; i < 10; i++) {
      var h = document.createElement("div");
      h.textContent = ["💗", "💖", "🌸", "✨"][i % 4];
      h.style.cssText = "position:fixed;left:" + (r.left + r.width / 2) + "px;top:" + r.top + "px;font-size:" + (14 + Math.random() * 14) + "px;z-index:150;pointer-events:none;transition:all 1.2s ease-out;opacity:1";
      document.body.appendChild(h);
      (function (node) {
        requestAnimationFrame(function () {
          node.style.transform = "translate(" + ((Math.random() - 0.5) * 160) + "px," + (-80 - Math.random() * 120) + "px) rotate(" + ((Math.random() - 0.5) * 60) + "deg)";
          node.style.opacity = 0;
        });
        setTimeout(function () { node.remove(); }, 1300);
      })(h);
    }
  }

  /* =====================================================================
     📧 GỬI XÁC NHẬN QUA GMAIL
     ===================================================================== */
  var form = $("rsvpForm"), msgBox = $("formMsg"), sendBtn = $("sendBtn");
  var ejs = C.emailjs || {};
  var useEmailJS = !!(ejs.enabled && ejs.serviceId && ejs.templateId && ejs.publicKey);
  var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  $("fMsg").addEventListener("input", function (e) { $("msgCount").textContent = e.target.value.length; });
  $("sendHint").textContent = useEmailJS
    ? "Thư xác nhận sẽ được gửi tự động đến gia đình."
    : (isMobile ? "Bấm gửi để mở ứng dụng email — bạn chỉ cần nhấn “Gửi” trong thư." : "Bấm gửi để mở Gmail với thư đã điền sẵn — bạn chỉ cần nhấn “Gửi” trong Gmail.");

  function show(cls, html) { msgBox.className = cls; msgBox.innerHTML = html; }

  function buildMail(d) {
    var subject = "[Thiệp mời tốt nghiệp] " + d.name + " - " + d.attendance;
    var lines = [
      "Xin chào " + C.shortName + ",",
      "",
      "Mình là " + d.name + ". Mình xin phản hồi thiệp mời lễ tốt nghiệp:",
      "",
      "• Phản hồi: " + d.attendance,
      "• Số người tham dự: " + d.guests,
      "• Số điện thoại: " + (d.phone || "(không để lại)"),
      "• Thời gian: " + $("dow").textContent + ", " + $("dmy").textContent + " lúc " + p2(EVENT.getHours()) + ":" + p2(EVENT.getMinutes()),
      "• Địa điểm: " + C.venue,
      ""
    ];
    if (d.message) { lines.push("Lời chúc:", d.message, ""); }
    lines.push("Thân mến,", d.name);
    return { subject: subject, body: lines.join("\n") };
  }

  function mailLinks(mail) {
    var to = encodeURIComponent(C.receiverEmail);
    var su = encodeURIComponent(mail.subject), bd = encodeURIComponent(mail.body);
    return {
      gmail: "https://mail.google.com/mail/?view=cm&fs=1&to=" + to + "&su=" + su + "&body=" + bd,
      mailto: "mailto:" + C.receiverEmail + "?subject=" + su + "&body=" + bd
    };
  }

  function openCompose(mail) {
    var l = mailLinks(mail);
    if (isMobile) { location.href = l.mailto; }
    else {
      var w = window.open(l.gmail, "_blank", "noopener");
      if (!w) { location.href = l.mailto; }
    }
    show("info", "Đã mở thư soạn sẵn 💌 Bạn chỉ cần nhấn <b>Gửi</b> để hoàn tất nhé!<br>Nếu cửa sổ không hiện, bấm <a href=\"" + l.gmail + "\" target=\"_blank\" rel=\"noopener\">mở Gmail</a> hoặc <a href=\"" + l.mailto + "\">mở ứng dụng email</a>.");
  }

  function sendEmailJS(d) {
    return fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: ejs.serviceId,
        template_id: ejs.templateId,
        user_id: ejs.publicKey,
        template_params: {
          to_email: C.receiverEmail,
          guest_name: d.name,
          phone: d.phone || "(không để lại)",
          attendance: d.attendance,
          guests: d.guests,
          message: d.message || "(không có lời chúc)",
          event_name: "Lễ tốt nghiệp " + C.name,
          event_date: $("dow").textContent + ", " + $("dmy").textContent,
          venue: C.venue
        }
      })
    }).then(function (r) { if (!r.ok) { throw new Error("EmailJS " + r.status); } });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("fName").value.trim();
    if (!name) { $("fName").focus(); show("err", "Bạn nhớ nhập tên để mình biết bạn là ai nhé 💗"); return; }
    var d = {
      name: name,
      phone: $("fPhone").value.trim(),
      guests: $("fGuests").options[$("fGuests").selectedIndex].text,
      attendance: document.querySelector("input[name=att]:checked").value,
      message: $("fMsg").value.trim()
    };
    var mail = buildMail(d);
    heartBurst(sendBtn);

    if (useEmailJS) {
      sendBtn.disabled = true; sendBtn.textContent = "Đang gửi...";
      sendEmailJS(d).then(function () {
        show("ok", "Cảm ơn bạn! Xác nhận đã được gửi thành công 💛");
        form.reset(); $("msgCount").textContent = "0";
      }).catch(function () {
        var l = mailLinks(mail);
        show("err", "Chưa gửi tự động được. Bạn thử gửi bằng cách khác nhé: <a href=\"" + l.gmail + "\" target=\"_blank\" rel=\"noopener\">mở Gmail</a> · <a href=\"" + l.mailto + "\">ứng dụng email</a>");
      }).then(function () { sendBtn.disabled = false; sendBtn.textContent = "✉️ Gửi xác nhận"; });
    } else {
      openCompose(mail);
    }
  });

  /* =====================================================================
     ❄️ TUYẾT RƠI (chỉnh số lượng: FLAKES)
     ===================================================================== */
  (function snow() {
    var FLAKES = window.innerWidth < 600 ? 60 : 100;
    var c = $("snow"), ctx = c.getContext("2d");
    var W, H, flakes = [];
    function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
    resize(); window.addEventListener("resize", resize);
    var tints = ["255,170,195", "255,205,220", "210,225,255", "255,255,255"];
    function make(initial) {
      return {
        x: Math.random() * W, y: initial ? Math.random() * H : -10,
        r: 1.5 + Math.random() * 4.2, vy: 0.5 + Math.random() * 1.4,
        sway: Math.random() * Math.PI * 2, swaySpeed: 0.005 + Math.random() * 0.02, swayAmp: 0.4 + Math.random() * 0.9,
        tint: tints[(Math.random() * tints.length) | 0], a: 0.55 + Math.random() * 0.4
      };
    }
    for (var i = 0; i < FLAKES; i++) flakes.push(make(true));
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        f.sway += f.swaySpeed; f.x += Math.sin(f.sway) * f.swayAmp; f.y += f.vy;
        if (f.y > H + 10 || f.x < -20 || f.x > W + 20) { flakes[i] = f = make(false); }
        var g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 1.8);
        g.addColorStop(0, "rgba(255,255,255," + f.a + ")");
        g.addColorStop(0.45, "rgba(" + f.tint + "," + f.a + ")");
        g.addColorStop(1, "rgba(" + f.tint + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 1.8, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) requestAnimationFrame(draw);
    }
    draw();
  })();
})();
