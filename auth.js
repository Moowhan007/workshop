const STORAGE_KEY = "getstudy_user";

const ROLES = {
  student: {
    label: "นิสิต",
    title: "เข้าสู่ระบบสำหรับนิสิต",
    lead: "ดูงานทั้งหมด ถาม AI เกี่ยวกับการบ้านและตารางการเรียน"
  },
  teacher: {
    label: "อาจารย์",
    title: "เข้าสู่ระบบสำหรับอาจารย์",
    lead: "จัดการงานและตรวจส่งได้เร็วขึ้นด้วย AI"
  },
  parent: {
    label: "ผู้ปกครอง",
    title: "เข้าสู่ระบบสำหรับผู้ปกครอง",
    lead: "ติดตามความคืบหน้าการส่งงานของบุตรหลาน"
  }
};

function getCurrentUser() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
}

function getRoleFromUrl() {
  const role = new URLSearchParams(location.search).get("role");
  return ROLES[role] ? role : null;
}

function requireLogin() {
  if (!getCurrentUser()) {
    location.replace("login.html");
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("login-email");
  const error = document.getElementById("login-error");
  const email = input.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    error.textContent = "กรุณากรอกอีเมลให้ถูกต้อง เช่น name@ku.th";
    input.focus();
    return;
  }

  const role = getRoleFromUrl() || "student";
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ email: email, role: role, at: new Date().toISOString() })
  );
  location.href = "dashboard.html";
}

function logout() {
  localStorage.removeItem(STORAGE_KEY);
  location.replace("role.html");
}

function applyRoleToLoginPage() {
  const role = getRoleFromUrl();
  if (!role) {
    location.replace("role.html");
    return;
  }
  const info = ROLES[role];
  const title = document.getElementById("login-title");
  const lead = document.getElementById("login-lead");
  if (title) {
    title.textContent = info.title;
  }
  if (lead) {
    lead.textContent = info.lead;
  }
}

function initAuth() {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    applyRoleToLoginPage();
    loginForm.addEventListener("submit", handleLoginSubmit);
    return;
  }
  if (document.body && document.body.dataset.auth === "protected") {
    requireLogin();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuth);
} else {
  initAuth();
}