const STORAGE_KEY = "getstudy_user";

function getCurrentUser() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
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

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ email: email, at: new Date().toISOString() })
  );
  location.href = "index.html";
}

function logout() {
  localStorage.removeItem(STORAGE_KEY);
  location.replace("login.html");
}

function initAuth() {
  if (document.body && document.body.dataset.auth === "protected") {
    requireLogin();
  }
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuth);
} else {
  initAuth();
}