const DEMO = {
  teacher: {
    stats: { students: 120, courses: 5, pendingGrading: 23, avgScore: "78%" },
    courses: [
      { name: "Mathematics 101", completion: 92, attendance: 96, score: 82 },
      { name: "Computer Science", completion: 85, attendance: 92, score: 79 },
      { name: "Physics", completion: 78, attendance: 88, score: 74 },
      { name: "English", completion: 88, attendance: 90, score: 81 },
      { name: "Chemistry", completion: 70, attendance: 85, score: 71 }
    ],
    students: [
      { name: "สมชาย ใจดี", score: 92, risk: "low" },
      { name: "สมหญิง รักเรียน", score: 88, risk: "low" },
      { name: "อนันต์ มั่นคง", score: 74, risk: "medium" },
      { name: "บุญมี สุขใจ", score: 65, risk: "medium" },
      { name: "กิตติ พร้อมเลิศ", score: 58, risk: "high" },
      { name: "มานะ ขยันดี", score: 91, risk: "low" },
      { name: "สุดา เร่งรีบ", score: 70, risk: "medium" },
      { name: "ชัย วิริยะ", score: 45, risk: "high" },
      { name: "เพ็ญศรี ใจเย็น", score: 83, risk: "low" },
      { name: "ทศพล แน่วแน่", score: 61, risk: "medium" }
    ]
  },
  student: {
    stats: { received: 12, submitted: 8, pending: 4, latestScore: "8.5/10" },
    assignments: [
      { title: "Lab 1 — HTML Basics", course: "Web Development", due: "20 ก.ย. 2569", status: "submitted", score: "9/10" },
      { title: "Quiz — Python ฟังก์ชัน", course: "การเขียนโปรแกรม", due: "18 ก.ย. 2569", status: "submitted", score: "8/10" },
      { title: "HW 3 — Database Design", course: "ระบบฐานข้อมูล", due: "25 ก.ย. 2569", status: "submitted", score: "8.5/10" },
      { title: "Essay — AI Ethics", course: "ภาษาอังกฤษเพื่อการสื่อสาร", due: "28 ก.ย. 2569", status: "pending", score: null },
      { title: "Lab 2 — CSS Layout", course: "Web Development", due: "01 ต.ค. 2569", status: "pending", score: null },
      { title: "แบบฝึกหัด แคลคูลัส", course: "คณิตศาสตร์วิศวกรรม", due: "30 ก.ย. 2569", status: "pending", score: null },
      { title: "Lab 3 — JavaScript", course: "Web Development", due: "05 ต.ค. 2569", status: "pending", score: null }
    ]
  },
  ai: {
    score: "8/10",
    strengths: ["ตอบคำถามครบถ้วนตามโจทย์", "ลำดับเนื้อหาดี อ่านเข้าใจง่าย"],
    improvements: ["เพิ่มแหล่งอ้างอิงในส่วนท้าย", "ขยายเนื้อหาส่วนสรุปให้ละเอียดขึ้น"],
    feedback: "งานครอบคลุมโจทย์ครบถ้วน มีการเรียงลำดับเนื้อหาที่เป็นระบบ เข้าใจง่าย แต่ควรเพิ่มแหล่งอ้างอิงและสรุปให้ลึกขึ้น"
  },
  parent: {
    stats: { attendance: "95%", avgScore: "82%", pending: 2 },
    alerts: [
      { type: "absent", text: "ขาดเรียนล่าสุด 12 ก.ย. 2569 — วิชาคณิตศาสตร์วิศวกรรม" },
      { type: "overdue", text: "ค้างส่งงาน 2 รายการ: Science HW3 และ Math Quiz" },
      { type: "score", text: "คะแนนเฉลี่ยลดลง 87% → 82% ในระยะ 2 สัปดาห์" }
    ],
    recent: [
      { title: "Lab 1 — HTML Basics", subject: "Web Development", score: "9/10", date: "15 ก.ย. 2569" },
      { title: "Quiz — Python ฟังก์ชัน", subject: "การเขียนโปรแกรม", score: "8/10", date: "10 ก.ย. 2569" },
      { title: "HW 3 — Database Design", subject: "ระบบฐานข้อมูล", score: "8.5/10", date: "05 ก.ย. 2569" }
    ]
  },
  risk: {
    low: 68,
    medium: 38,
    high: 14,
    students: [
      { name: "ชัย วิริยะ", risk: "high", attendance: 62, overdue: 4, score: 45 },
      { name: "กิตติ พร้อมเลิศ", risk: "high", attendance: 70, overdue: 3, score: 58 },
      { name: "ทศพล แน่วแน่", risk: "medium", attendance: 82, overdue: 2, score: 61 },
      { name: "สุดา เร่งรีบ", risk: "medium", attendance: 85, overdue: 1, score: 70 },
      { name: "บุญมี สุขใจ", risk: "medium", attendance: 80, overdue: 1, score: 65 },
      { name: "ส้มโอ นักเรียนนำร่อง", risk: "low", attendance: 95, overdue: 0, score: 82 }
    ]
  },
  analytics: {
    attendanceTrend: [88, 90, 86, 92, 94, 91, 95],
    trendLabels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
    scoreDist: [
      { range: "0-49", count: 5 },
      { range: "50-59", count: 8 },
      { range: "60-69", count: 17 },
      { range: "70-79", count: 30 },
      { range: "80-89", count: 38 },
      { range: "90-100", count: 22 }
    ],
    completion: [
      { name: "Chemistry", value: 70 },
      { name: "Physics", value: 78 },
      { name: "Computer Science", value: 85 },
      { name: "English", value: 88 },
      { name: "Mathematics 101", value: 92 }
    ],
    riskShare: { low: 68, medium: 38, high: 14 }
  },
  classroom: {
    connected: true,
    provider: "Google Classroom",
    courses: [
      { name: "Mathematics 101", assignments: 5, students: 30 }
    ],
    lastSync: "12 ก.ย. 2569 08:30"
  },
  teams: {
    connected: true,
    provider: "Microsoft Teams",
    classes: 3,
    assignments: 12,
    students: 90,
    lastSync: "12 ก.ย. 2569 08:45"
  }
};

const RISK_META = {
  low: { label: "Low Risk", badge: "risk-low" },
  medium: { label: "Medium Risk", badge: "risk-medium" },
  high: { label: "High Risk", badge: "risk-high" }
};

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function badge(label, extraClass) {
  return '<span class="badge ' + (extraClass || "") + '">' + esc(label) + "</span>";
}

function riskBadge(level) {
  const meta = RISK_META[level] || RISK_META.low;
  return badge(meta.label, meta.badge);
}

function statCard(icon, title, value, caption, tint) {
  return (
    '<div class="stat-card">' +
    '<div class="stat-icon ' + esc(tint || "") + '">' + icon + "</div>" +
    '<div><h3 class="stat-value">' + esc(value) + "</h3>" +
    "<p class=\"stat-title\">" + esc(title) + "</p>" +
    '<p class="stat-caption">' + esc(caption || "") + "</p></div>" +
    "</div>"
  );
}

function barRow(label, valueText, pct, barClass) {
  return (
    '<div class="bar-row">' +
    '<span class="bar-label">' + esc(label) + "</span>" +
    '<div class="bar-track"><div class="bar-fill ' + esc(barClass || "") + '" style="width:' + pct + '%"></div></div>' +
    '<span class="bar-value">' + esc(valueText) + "</span>" +
    "</div>"
  );
}

function donut(parts, size, centerVal, centerCap) {
  const total = parts.reduce(function (sum, part) {
    return sum + part.value;
  }, 0);
  let cumulative = 0;
  const stops = parts.map(function (part) {
    const start = (cumulative / total) * 100;
    cumulative += part.value;
    const end = (cumulative / total) * 100;
    return part.color + " " + start.toFixed(1) + "% " + end.toFixed(1) + "%";
  });
  const style =
    "width:" + size + "px;height:" + size + "px;background:conic-gradient(" + stops.join(",") + ")";
  return (
    '<div class="donut" style="' + style + '">' +
    '<div class="donut-center"><span class="val">' + esc(centerVal) + "</span>" +
    '<span class="cap">' + esc(centerCap) + "</span></div>" +
    "</div>"
  );
}

function legend(items) {
  return items
    .map(function (item) {
      return (
        '<span class="legend-item"><span class="legend-dot" style="background:' +
        item.color + '"></span>' + esc(item.label) + "</span>"
      );
    })
    .join("");
}

function areaChart(series, labels) {
  const W = 320;
  const H = 140;
  const P = 10;
  const max = 100;
  const min = 0;
  const step = (W - 2 * P) / (series.length - 1);
  const points = series.map(function (value, index) {
    return [
      P + index * step,
      H - P - ((value - min) / (max - min)) * (H - 2 * P)
    ];
  });
  const line = points
    .map(function (p) {
      return p[0] + "," + p[1];
    })
    .join(" ");
  const area =
    "M" + P + "," + (H - P) + " " + line + " L" + (P + (series.length - 1) * step) + "," + (H - P) + " Z";
  const labelTexts = labels
    .map(function (label, index) {
      return (
        '<text x="' + (P + index * step).toFixed(1) + '" y="' + (H - 3) +
        '" text-anchor="middle" class="chart-label">' + esc(label) + "</text>"
      );
    })
    .join("");
  return (
    '<svg class="area-chart" viewBox="0 0 ' + W + " " + (H + 12) + '" role="img" aria-label="Attendance Trend">' +
    '<defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#0075de" stop-opacity="0.28"/>' +
    '<stop offset="100%" stop-color="#0075de" stop-opacity="0.02"/>' +
    "</linearGradient></defs>" +
    '<path d="' + area + '" fill="url(#areaGrad)"></path>' +
    '<polyline points="' + line + '" fill="none" stroke="#005bab" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"></polyline>' +
    labelTexts +
    "</svg>"
  );
}

function renderTeacherPage() {
  const t = DEMO.teacher;
  const courseBars = t.courses
    .map(function (course) {
      return barRow(course.name, course.completion + "%", course.completion, "fill-blue");
    })
    .join("");
  const attendanceBars = t.courses
    .map(function (course) {
      return barRow(course.name, course.attendance + "%", course.attendance, "fill-teal");
    })
    .join("");
  const scoreBars = t.courses
    .map(function (course) {
      return barRow(course.name, course.score + "%", course.score, "fill-purple");
    })
    .join("");
  const rows = t.students
    .map(function (student, index) {
      return (
        "<tr>" +
        "<td>" + esc(student.name) + "</td>" +
        '<td class="nowrap"><strong>' + esc(student.score) + "</strong> / 100</td>" +
        "<td>" + riskBadge(student.risk) + "</td>" +
        '<td class="nowrap"><a class="link" href="risk.html#' + index + '">ดูรายละเอียด</a></td>' +
        "</tr>"
      );
    })
    .join("");
  return (
    '<section class="stats-card dash-stats">' +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      "นิสิตทั้งหมด", t.stats.students, "+6 จากภาคเรียนที่แล้ว", "tint-blue"
    ) +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3 3.2 0 5.8-1.2 6-2.9V12"/></svg>',
      "รายวิชา", t.stats.courses, "ประจำภาคนี้", "tint-orange"
    ) +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
      "งานค้างตรวจ", t.stats.pendingGrading, "AI ช่วยตรวจให้ได้ 60%", "tint-pink"
    ) +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>',
      "คะแนนเฉลี่ย", t.stats.avgScore, "ทั้ง 5 รายวิชา", "tint-teal"
    ) +
    "</section>" +
    '<p class="demo-tip">ข้อมูลจำลองสำหรับการนำเสนอ — กด <a class="link" href="analytics.html">Analytics Dashboard</a> เพื่อดูกราฟทั้งหมด</p>' +
    '<div class="chart-grid">' +
    '<div class="chart-card"><h2>การส่งงานตามรายวิชา</h2>' + courseBars + "</div>" +
    '<div class="chart-card"><h2>การเข้าเรียนตามรายวิชา</h2>' + attendanceBars + "</div>" +
    '<div class="chart-card"><h2>คะแนนเฉลี่ยตามรายวิชา</h2>' + scoreBars + "</div>" +
    "</div>" +
    '<div class="dash-panel"><div class="panel-head"><h2>รายชื่อนิสิตทั้งหมด</h2><a class="btn btn-primary btn-sm" href="risk.html">วิเคราะห์ความเสี่ยงด้วย AI</a></div>' +
    '<div class="table-wrap"><table class="dash-table"><thead><tr><th>ชื่อ</th><th>คะแนน</th><th>ระดับความเสี่ยง</th><th></th></tr></thead>' +
    "<tbody>" + rows + "</tbody></table></div></div>"
  );
}

function renderStudentPage() {
  const s = DEMO.student;
  const list = s.assignments
    .map(function (item, index) {
      const isPending = item.status !== "submitted";
      const statusBadge = isPending
        ? badge("รอส่ง", "badge-warn")
        : badge("ส่งแล้ว", "badge-green");
      return (
        "<tr data-asg=\"" + index + "\">" +
        "<td><strong>" + esc(item.title) + "</strong><br><span class=\"muted\">" + esc(item.course) + "</span></td>" +
        "<td>" + esc(item.due) + "</td>" +
        '<td class="nowrap">' + statusBadge + "</td>" +
        '<td class="nowrap">' +
        (isPending
          ? '<button type="button" class="btn btn-primary btn-sm" data-upload="' + index + '">ส่งงาน</button>'
          : '<span class="score-pill"><strong>' + esc(item.score) + "</strong></span>") +
        "</td>" +
        "</tr>"
      );
    })
    .join("");
  return (
    '<section class="stats-card dash-stats">' +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
      "งานที่ได้รับ", s.stats.received, "ทุกวิชา ภาคนี้", "tint-blue"
    ) +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
      "ส่งแล้ว", s.stats.submitted, "ตรวจให้คะแนนแล้ว", "tint-teal"
    ) +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
      "งานค้างส่ง", s.stats.pending, "ภายใน 7 วันนี้", "tint-orange"
    ) +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      "คะแนนล่าสุด", s.stats.latestScore, "จาก AI Grading", "tint-pink"
    ) +
    "</section>" +
    '<div class="dash-panel"><div class="panel-head"><h2>งานทั้งหมดของฉัน</h2><a class="link" href="analytics.html">ดูความคืบหน้า</a></div>' +
    '<div class="table-wrap"><table class="dash-table"><thead><tr><th>งาน</th><th>กำหนดส่ง</th><th>สถานะ</th><th></th></tr></thead>' +
    "<tbody id=\"student-asg-list\">" + list + "</tbody></table></div></div>" +
    '<div class="modal-backdrop" id="upload-modal" role="dialog" aria-modal="true" aria-labelledby="upload-title">' +
    '<div class="modal"><button type="button" class="modal-close" id="modal-close" aria-label="ปิด">&times;</button>' +
    "<h2 id=\"upload-title\">ส่งงานผ่าน AI Grading</h2>" +
    '<p class="muted">เลือกไฟล์ผลงานของคุณ (PDF, DOCX, ภาพถ่าย)</p>' +
    '<div class="upload-zone" id="upload-zone"><svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>' +
    '<p>คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่</p>' +
    '<input type="file" id="file-input" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" hidden />' +
    '<p class="file-name" id="file-name"></p></div>' +
    '<div class="loading" id="ai-loading"><span class="dot"></span><span class="dot"></span><span class="dot"></span>' +
    '<p>กำลังวิเคราะห์ผลงานด้วย AI…</p></div>' +
    '<div class="ai-result" id="ai-result"></div>' +
    "</div></div>" +
    '<div class="toast" id="demo-toast" role="status"></div>'
  );
}

function renderAIGrading(ai) {
  return (
    '<div class="ai-score"><span class="num">' + esc(ai.score) + "</span>" +
    '<span class="cap">คะแนนแนะนำจาก AI</span></div>' +
    '<div class="ai-list"><h3>จุดเด่น</h3><ul class="strengths">' +
    ai.strengths.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") +
    "</ul></div>" +
    '<div class="ai-list"><h3>ข้อเสนอแนะ</h3><ul class="improvements">' +
    ai.improvements.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") +
    "</ul></div>" +
    '<p class="muted">' + esc(ai.feedback) + "</p>" +
    '<div class="modal-actions">' +
    '<button type="button" class="btn btn-ghost" id="ai-retry">ลองใหม่</button>' +
    '<button type="button" class="btn btn-primary" id="ai-submit">ยืนยันส่งงาน</button>' +
    "</div>"
  );
}

function renderParentPage() {
  const p = DEMO.parent;
  const alerts = p.alerts
    .map(function (alert) {
      const titles = { absent: "ขาดเรียนล่าสุด", overdue: "งานค้างส่ง", score: "คะแนนลดลง" };
      return (
        '<div class="alert-item"><span class="sticker-icon ' + esc(alert.type) + '"></span>' +
        "<div><strong>" + esc(titles[alert.type] || "แจ้งเตือน") + "</strong>" +
        '<p class="muted">' + esc(alert.text) + "</p></div></div>"
      );
    })
    .join("");
  const recent = p.recent
    .map(function (item) {
      return (
        "<tr><td><strong>" + esc(item.title) + "</strong><br><span class=\"muted\">" + esc(item.subject) + "</span></td>" +
        "<td>" + esc(item.score) + "</td><td>" + esc(item.date) + "</td></tr>"
      );
    })
    .join("");
  return (
    '<section class="stats-card dash-stats">' +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>',
      "การเข้าเรียน", p.stats.attendance, "ของ ส้มโอ", "tint-teal"
    ) +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      "คะแนนเฉลี่ย", p.stats.avgScore, "ทุกวิชาล่าสุด", "tint-blue"
    ) +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
      "งานค้างส่ง", p.stats.pending, "ต้องการติดตาม", "tint-orange"
    ) +
    "</section>" +
    '<div class="dash-panel"><div class="panel-head"><h2>การแจ้งเตือนจาก AI</h2><a class="link" href="risk.html">ดูความเสี่ยงทั้งหมด</a></div>' +
    '<div class="alert-list">' + alerts + "</div></div>" +
    '<div class="dash-panel"><div class="panel-head"><h2>ผลงานที่ส่งล่าสุด</h2></div>' +
    '<div class="table-wrap"><table class="dash-table"><thead><tr><th>ผลงาน</th><th>คะแนน</th><th>วันที่ส่ง</th></tr></thead>' +
    "<tbody>" + recent + "</tbody></table></div></div>"
  );
}

function renderRiskPage() {
  const r = DEMO.risk;
  const total = r.low + r.medium + r.high;
  const parts = [
    { label: "Low Risk", value: r.low, color: "#1aae39" },
    { label: "Medium Risk", value: r.medium, color: "#f5c518" },
    { label: "High Risk", value: r.high, color: "#e5484d" }
  ];
  const rows = r.students
    .map(function (student, index) {
      return (
        "<tr id=\"risk-" + index + "\"><td><strong>" + esc(student.name) + "</strong></td>" +
        "<td>" + riskBadge(student.risk) + "</td>" +
        '<td><div class="mini-row"><span>เข้าเรียน</span>' + barRow("", student.attendance + "%", student.attendance, student.risk) + "</div>" +
        '<div class="mini-row"><span>ค้างส่ง</span>' + barRow("", student.overdue + " งาน", Math.min(100, student.overdue * 25), student.risk) + "</div>" +
        '<div class="mini-row"><span>คะแนน</span>' + barRow("", student.score + "/100", student.score, student.risk) + "</div></td></tr>"
      );
    })
    .join("");
  const share = Math.round((r.high / total) * 100);
  return (
    '<section class="stats-card dash-stats">' +
    statCard('<span class="risk-dot risk-low"></span>', "Low Risk", r.low, "เรียนปกติ", "tint-teal") +
    statCard('<span class="risk-dot risk-medium"></span>', "Medium Risk", r.medium, "ต้องติดตาม", "tint-orange") +
    statCard('<span class="risk-dot risk-high"></span>', "High Risk", r.high, "ต้องดูแลเร่งด่วน", "tint-pink") +
    "</section>" +
    '<p class="demo-tip">AI วิเคราะห์จากข้อมูลน้ำหนัก: คะแนนเฉลี่ย สถานะการส่งงาน และการเข้าเรียน — รองรับข้อมูลจริงเมื่อเชื่อมต่อ Classroom / Teams</p>' +
    '<div class="chart-grid"><div class="chart-card"><h2>สัดส่วนความเสี่ยงของนิสิต 120 คน</h2>' +
    '<div class="donut-wrap">' +
    donut(parts, 200, share + "%", "อยู่ในกลุ่มเสี่ยง") +
    "</div>" +
    "<div class=\"legend\">" + legend(parts) + "</div></div>" +
    '<div class="chart-card"><h2>เกณฑ์การวิเคราะห์</h2>' +
    '<div class="criteria"><h3>เข้าเรียน</h3>' + barRow("≥ 85%", "ปกติ", 85) +
    barRow("70 – 84%", "เสี่ยงปานกลาง", 70, "fill-warn") +
    barRow("< 70%", "เสี่ยงสูง", 40, "fill-danger") + "</div>" +
    '<div class="criteria"><h3>งานค้างส่ง + คะแนน</h3>' +
    '<p class="muted">ค้างส่ง 2 งานขึ้นไป และคะแนนเฉลี่ยต่ำกว่า 60 จะถูกจัดเป็น High Risk</p></div>' +
    "</div></div>" +
    '<div class="dash-panel"><div class="panel-head"><h2>รายชื่อนิสิตที่ต้องเฝ้าระวัง</h2><a class="btn btn-primary btn-sm" href="analytics.html">ดู Analytics</a></div>' +
    '<div class="table-wrap"><table class="dash-table"><thead><tr><th>ชื่อ</th><th>ระดับ</th><th style="min-width:300px">องค์ประกอบ</th></tr></thead>' +
    "<tbody>" + rows + "</tbody></table></div></div>"
  );
}

function renderAnalyticsPage() {
  const a = DEMO.analytics;
  const maxDist = Math.max.apply(null, a.scoreDist.map(function (d) { return d.count; }));
  const distRows = a.scoreDist
    .map(function (d) {
      return barRow(d.range, d.count + " คน", Math.round((d.count / maxDist) * 100), "fill-blue");
    })
    .join("");
  const completionRows = a.completion
    .map(function (c) {
      return barRow(c.name, c.value + "%", c.value, "fill-teal");
    })
    .join("");
  const totalRisk = a.riskShare.low + a.riskShare.medium + a.riskShare.high;
  const parts = [
    { label: "Low Risk", value: a.riskShare.low, color: "#1aae39" },
    { label: "Medium Risk", value: a.riskShare.medium, color: "#f5c518" },
    { label: "High Risk", value: a.riskShare.high, color: "#e5484d" }
  ];
  const highPct = Math.round((a.riskShare.high / totalRisk) * 100);
  return (
    '<div class="chart-grid">' +
    '<div class="chart-card card-wide"><h2>Attendance Trend</h2>' +
    '<p class="muted">อัตราการเข้าเรียนเฉลี่ยรายสัปดาห์ (เทอมนี้)</p>' +
    areaChart(a.attendanceTrend, a.trendLabels) +
    "</div>" +
    '<div class="chart-card"><h2>Distribution ความเสี่ยง</h2>' +
    '<div class="donut-wrap"><div class="donut" style="width:170px;height:170px;background:conic-gradient(#1aae39 0 56.7%,#f5c518 56.7% 88.3%,#e5484d 88.3% 100%)">' +
    '<div class="donut-center"><span class="val">' + highPct + '%</span><span class="cap">นิสิต High Risk</span></div>' +
    "</div></div><div class=\"legend\">" + legend(parts) + "</div></div>" +
    '<div class="chart-card"><h2>Assignment Completion</h2>' +
    '<p class="muted">อัตราการส่งงานตามรายวิชา</p>' + completionRows + "</div>" +
    '<div class="chart-card"><h2>Score Distribution</h2>' +
    '<p class="muted">การกระจายคะแนนของนิสิต 120 คน</p>' + distRows + "</div>" +
    "</div>" +
    '<div class="dash-panel"><div class="panel-head"><h2>สรุปภาพรวมทั้งชั้นเรียน</h2></div>' +
    '<div class="summary-list">' +
    "<div class=\"summary-item\"><span class=\"muted\">อัตราการส่งงานเฉลี่ย</span><strong>82%</strong></div>" +
    "<div class=\"summary-item\"><span class=\"muted\">อัตราการเข้าเรียนเฉลี่ย</span><strong>91%</strong></div>" +
    "<div class=\"summary-item\"><span class=\"muted\">คะแนนเฉลี่ยภาพรวม</span><strong>78%</strong></div>" +
    "<div class=\"summary-item\"><span class=\"muted\">นิสิตที่ต้องเฝ้าระวัง</span><strong class=\"text-danger\">14 คน</strong></div>" +
    "</div></div>"
  );
}

function renderClassroomPage() {
  const c = DEMO.classroom;
  const courseCards = c.courses
    .map(function (course) {
      return (
        '<div class="connect-card">' +
        '<div class="connect-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>' +
        "<div><h2>" + esc(course.name) + "</h2>" +
        '<div class="connect-stats">' +
        statCard("", "Assignments", course.assignments, "เครื่องหมายเลข", "tint-blue") +
        statCard("", "Students", course.students, "นิสิตในคลาส", "tint-teal") +
        "</div></div></div>"
      );
    })
    .join("");
  return (
    '<section class="connect-hero">' +
    '<div class="connect-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>' +
    "<h1>Connected Google Classroom</h1>" +
    '<p class="muted">GET-STUDY เชื่อมต่อกับ Google Classroom เพื่อดึงข้อมูลงานและการส่งงานโดยอัตโนมัติ</p>' +
    '<span class="badge badge-green">สถานะ: ออนไลน์</span>' +
    '<p class="muted">ซิงค์ล่าสุด: ' + esc(c.lastSync) + "</p>" +
    "</section>" +
    '<div class="connect-grid">' + courseCards + "</div>" +
    '<div class="dash-panel"><div class="panel-head"><h2>ความสามารถเมื่อเชื่อมต่อแล้ว</h2></div>' +
    '<ul class="feature-list">' +
    "<li>ดึงรายวิชาและงานจาก Classroom โดยอัตโนมัติ</li>" +
    "<li>สถานะการส่งงานของนิสิตอัปเดตแบบเรียลไทม์</li>" +
    "<li>AI ตรวจงานที่ยังไม่ได้ให้คะแนนและส่ง Feedback กลับ</li>" +
    "<li>ผู้ปกครองเห็นความคืบหน้าผ่าน Dashboard ได้ทันที</li>" +
    "</ul></div>"
  );
}

function renderTeamsPage() {
  const t = DEMO.teams;
  return (
    '<section class="connect-hero">' +
    '<div class="connect-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>' +
    "<h1>Connected Microsoft Teams</h1>" +
    '<p class="muted">GET-STUDY เชื่อมต่อกับ Microsoft Teams เพื่อจัดการการเรียนและการส่งงานผ่าน Teams Classes</p>' +
    '<span class="badge badge-green">สถานะ: ออนไลน์</span>' +
    '<p class="muted">ซิงค์ล่าสุด: ' + esc(t.lastSync) + "</p>" +
    "</section>" +
    '<section class="stats-card dash-stats">' +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>',
      "Teams Classes", t.classes, "คลาสที่เชื่อมแล้ว", "tint-blue"
    ) +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
      "Assignments", t.assignments, "งานที่ดึงมาแล้ว", "tint-teal"
    ) +
    statCard(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      "Students", t.students, "นิสิตทั้งหมด", "tint-orange"
    ) +
    "</section>" +
    '<div class="dash-panel"><div class="panel-head"><h2>ความสามารถเมื่อเชื่อมต่อแล้ว</h2></div>' +
    '<ul class="feature-list">' +
    "<li>ตั้งค่า Teams Classes และแชร์งานเดียวกับ Classroom ได้ในที่เดียว</li>" +
    "<li>นับสถานะการส่งงาน แบบฝึกหัด และการบ้านจากทั้งสองแพลตฟอร์ม</li>" +
    "<li>AI ให้คะแนนแนะนำและข้อเสนอแนะอย่างสม่ำเสมอ</li>" +
    "<li>แจ้งเตือนผู้ปกครองเมื่อพบพฤติกรรมเสี่ยงข้ามแพลตฟอร์ม</li>" +
    "</ul></div>"
  );
}

function pageShell(heading, lead, appHtml) {
  return (
    '<section class="page-head"><span class="eyebrow">GET-STUDY</span>' +
    "<h1>" + esc(heading) + "</h1>" +
    '<p class="page-lead">' + esc(lead) + "</p></section>" +
    appHtml
  );
}

function initStudentDemo() {
  const backdrop = document.getElementById("upload-modal");
  const closeBtn = document.getElementById("modal-close");
  const zone = document.getElementById("upload-zone");
  const fileInput = document.getElementById("file-input");
  const fileName = document.getElementById("file-name");
  const loading = document.getElementById("ai-loading");
  const result = document.getElementById("ai-result");
  const toast = document.getElementById("demo-toast");
  let submittedCount = DEMO.student.stats.submitted;
  let pendingCount = DEMO.student.stats.pending;

  function toastShow(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }

  function setStat(title, value) {
    const cards = document.querySelectorAll(".stat-card");
    cards.forEach(function (card) {
      const titleEl = card.querySelector(".stat-title");
      const valueEl = card.querySelector(".stat-value");
      if (titleEl && titleEl.textContent === title) {
        valueEl.textContent = value;
      }
    });
  }

  function openModal(index) {
    backdrop.dataset.index = String(index);
    fileInput.value = "";
    fileName.textContent = "";
    loading.style.display = "none";
    result.style.display = "none";
    result.innerHTML = "";
    zone.style.display = "block";
    backdrop.classList.add("open");
  }

  function closeModal() {
    backdrop.classList.remove("open");
  }

  function startAnalysis() {
    zone.style.display = "none";
    loading.style.display = "block";
    setTimeout(function () {
      loading.style.display = "none";
      result.innerHTML = renderAIGrading(DEMO.ai);
      result.style.display = "block";
      document.getElementById("ai-retry").addEventListener("click", function () {
        fileInput.value = "";
        fileName.textContent = "";
        result.style.display = "none";
        result.innerHTML = "";
        zone.style.display = "block";
      });
      document.getElementById("ai-submit").addEventListener("click", function () {
        const index = Number(backdrop.dataset.index);
        const row = document.querySelector('tr[data-asg="' + index + '"]');
        if (row) {
          const cells = row.querySelectorAll("td");
          cells[2].innerHTML = '<span class="badge badge-green">ส่งแล้ว</span>';
          cells[3].innerHTML = '<span class="score-pill"><strong>8/10</strong></span>';
        }
        submittedCount += 1;
        pendingCount = Math.max(0, pendingCount - 1);
        setStat("ส่งแล้ว", submittedCount);
        setStat("งานค้างส่ง", pendingCount);
        setStat("คะแนนล่าสุด", "8/10");
        closeModal();
        toastShow("ส่งงานเรียบร้อย — AI ให้คะแนนแนะนำ 8/10");
      });
    }, 1400);
  }

  document.querySelectorAll("[data-upload]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(Number(btn.dataset.upload));
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
  backdrop.addEventListener("click", function (event) {
    if (event.target === backdrop) {
      closeModal();
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && backdrop.classList.contains("open")) {
      closeModal();
    }
  });

  zone.addEventListener("click", function () {
    fileInput.click();
  });
  fileInput.addEventListener("change", function () {
    const file = fileInput.files && fileInput.files[0];
    if (!file) {
      return;
    }
    fileName.textContent = "เลือกไฟล์แล้ว: " + file.name + " (" + Math.round(file.size / 1024) + " KB)";
    startAnalysis();
  });
}