/* ตัวเชื่อมต่อแบบจำลองสำหรับ Google Classroom และ Microsoft Teams
   (การเชื่อม OAuth จริงต้องมี backend + Client ID/Secret — เวอร์ชันนี้จำลองให้ใช้ใน Demo) */

const CONNECTOR_CONFIG = {
  google: {
    provider: "google",
    displayName: "Google Classroom",
    heroTitle: "Connected Google Classroom",
    accountLabel: "Google Account",
    connectCta: "Connect Google Account",
    graphNote: "ดึงรายวิชา งานมอบหมาย และรายชื่อนิสิตผ่าน Google Classroom API"
  },
  microsoft: {
    provider: "microsoft",
    displayName: "Microsoft Teams",
    heroTitle: "Connected Microsoft Teams",
    accountLabel: "Microsoft Account",
    connectCta: "Connect Microsoft Account",
    graphNote: "ดึง Classes Assignments และข้อมูลการเข้าเรียนผ่าน Microsoft Graph API"
  }
};

function connectorMeta(config) {
  return getConnection(config.provider);
}

function escConnector(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function connectorCardValue(label, value) {
  return (
    '<div class="connect-stat"><span class="connect-stat-value">' + escConnector(value) + "</span>" +
    '<span class="connect-stat-label">' + escConnector(label) + "</span></div>"
  );
}

function connectorCardHtml(item, isClass) {
  const title = isClass ? item.name : item.code + " — " + item.title;
  return (
    '<div class="connect-card">' +
    '<div class="connect-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>' +
    "<div style=\"flex:1\"><h2>" + escConnector(title) + "</h2>" +
    '<div class="connect-stats">' +
    connectorCardValue("Assignments", item.assignments) +
    connectorCardValue("Students", item.students) +
    "</div></div></div>"
  );
}

function renderConnectorPage(config) {
  const meta = connectorMeta(config);
  if (meta.status !== "connected") {
    return (
      '<section class="connect-prompt">' +
      '<div class="connect-logo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-8-8"/><path d="M20 4l-8 8"/></svg></div>' +
      "<h2>เชื่อมต่อ " + escConnector(config.displayName) + "</h2>" +
      '<p class="page-lead">' + escConnector(config.graphNote) + "</p>" +
      '<div class="connect-form"><label for="conn-account" class="form-label">' +
      escConnector(config.accountLabel) + "</label>" +
      '<div class="connect-form-row"><input id="conn-account" class="form-input" type="email" placeholder="name@gmail.com" />' +
      '<button type="button" id="conn-submit" class="btn btn-primary">' + escConnector(config.connectCta) + "</button></div>" +
      '<p class="muted connect-hint">การเชื่อมต่อนี้เป็นการจำลองสำหรับ Demo (ยังไม่มีการยืนยันตัวตนจริง)</p></div>' +
      '<div class="connect-features">' +
      "<div>✓ ดึงรายวิชา / Class</div><div>✓ ดึงงานมอบหมาย</div><div>✓ ดึงรายชื่อนิสิต</div><div>✓ ซิงค์เข้าฐานข้อมูล</div>" +
      "</div></section>"
    );
  }

  const totals = meta.totals || {};
  const isClass = !!meta.classes;
  const topStatValue = isClass ? totals.classes : totals.courses;
  const topStatLabel = isClass ? "Classes" : "Courses";

  const cards = (isClass ? meta.classes : meta.courses || []).map(function (item) {
    return connectorCardHtml(item, isClass);
  }).join("");

  return (
    '<section class="connect-hero">' +
    '<div class="connect-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>' +
    "<h1>" + escConnector(config.heroTitle) + "</h1>" +
    '<p class="muted">' + escConnector(meta.account || "") + " · ซิงค์ล่าสุด " + escConnector(meta.lastSync || "-") + "</p>" +
    '<span class="badge badge-green">สถานะ: เชื่อมต่อแล้ว</span>' +
    '<div class="connect-actions">' +
    '<button type="button" id="conn-resync" class="btn btn-light btn-sm">ซิงค์ข้อมูลใหม่</button>' +
    '<button type="button" id="conn-disconnect" class="btn btn-ghost btn-sm btn-ghost-dark">ยกเลิกการเชื่อมต่อ</button>' +
    "</div></section>" +
    '<section class="dash-stats">' +
    connectorStat(topStatValue, topStatLabel) +
    connectorStat(totals.assignments, "Assignments") +
    connectorStat(totals.students, "Students") +
    "</section>" +
    '<div class="connect-grid">' + cards + "</div>" +
    '<div class="dash-panel"><div class="panel-head"><h2>ข้อมูลที่ซิงค์เข้าสู่ฐานข้อมูล</h2></div>' +
    '<div class="summary-list">' +
    "<div class=\"summary-item\"><span class=\"muted\">ข้อมูลถูกบันทึกลง localStorage</span><strong>พร้อมใช้งาน</strong></div>" +
    '<div class="summary-item"><span class="muted">ใช้งานต่อได้ใน</span><strong>Dashboard ระบบจริง</strong></div>' +
    "</div>" +
    '<p class="demo-tip">เข้าสู่ระบบด้วย <strong>teacher@ku.th</strong> ที่ <a class="link" href="login.html">dashboard.html</a> เพื่อเห็นข้อมูลที่ซิงค์นี้ในระบบจัดการรายวิชาและตรวจงาน</p>' +
    "</div>"
  );
}

function connectorStat(value, label) {
  return (
    '<div class="stat-card"><div class="stat-value">' + escConnector(value) + "</div>" +
    '<div class="stat-label">' + escConnector(label) + "</div></div>"
  );
}

function initConnector(config, mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) {
    return;
  }
  const submitBtn = document.getElementById("conn-submit");
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const input = document.getElementById("conn-account");
      const email = input.value.trim();
      if (!email || email.indexOf("@") === -1) {
        input.focus();
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = "กำลังเชื่อมต่อและซิงค์…";
      setTimeout(function () {
        const meta = config.provider === "google"
          ? syncFromGoogle(email)
          : syncFromTeams(email);
        submitBtn.disabled = false;
        mount.innerHTML = renderConnectorPage(config);
        initConnector(config, mountId);
        showConnectorToast("เชื่อมต่อและซิงค์เรียบร้อย: " +
          (meta.totals.courses || meta.totals.classes) + " รายวิชา, " +
          meta.totals.assignments + " งาน, " + meta.totals.students + " นิสิต");
      }, 1300);
    });
  }

  const resync = document.getElementById("conn-resync");
  if (resync) {
    resync.addEventListener("click", function () {
      const current = connectorMeta(config);
      const email = current.account || "demo@" + (config.provider === "google" ? "gmail.com" : "hotmail.com");
      const meta = config.provider === "google" ? syncFromGoogle(email) : syncFromTeams(email);
      mount.innerHTML = renderConnectorPage(config);
      initConnector(config, mountId);
      showConnectorToast("ซิงค์ข้อมูลใหม่เรียบร้อย — ไม่สร้างรายวิชา/งานซ้ำ");
    });
  }

  const disconnect = document.getElementById("conn-disconnect");
  if (disconnect) {
    disconnect.addEventListener("click", function () {
      disconnectProvider(config.provider);
      mount.innerHTML = renderConnectorPage(config);
      initConnector(config, mountId);
      showConnectorToast("ยกเลิกการเชื่อมต่อแล้ว");
    });
  }
}

function showConnectorToast(message) {
  let toast = document.getElementById("conn-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "conn-toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}