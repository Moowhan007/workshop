const DB_KEY = "eduflow_db";

const STATUS_META = {
  submitted: { label: "ส่งแล้ว", cls: "badge-submitted" },
  late: { label: "ส่งล่าช้า", cls: "badge-late" },
  missing: { label: "ยังไม่ส่ง", cls: "badge-missing" }
};

const RISK_META = {
  low: { label: "ความเสี่ยงต่ำ", cls: "risk-low" },
  medium: { label: "ความเสี่ยงปานกลาง", cls: "risk-medium" },
  high: { label: "ความเสี่ยงสูง", cls: "risk-high" }
};

function uid(prefix) {
  return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(iso) {
  const date = new Date(iso + "T00:00:00");
  return date.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });
}

function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function ensureDB() {
  const existing = loadDB();
  if (existing && Array.isArray(existing.users)) {
    return existing;
  }
  const db = {
    users: [],
    courses: [],
    assignments: [],
    submissions: [],
    attendance: [],
    connections: {}
  };
  saveDB(db);
  return db;
}

function makeAttendance(studentId, courseId, startDate, presentTotal, total) {
  const rows = [];
  const base = new Date(startDate + "T00:00:00");
  for (let i = 0; i < total; i++) {
    const date = new Date(base);
    date.setDate(base.getDate() + i * 7);
    rows.push({
      id: uid("at"),
      studentId: studentId,
      courseId: courseId,
      date: date.toISOString().slice(0, 10),
      present: i < presentTotal
    });
  }
  return rows;
}

function seedDemoData() {
  const db = {
    users: [
      { id: "u_teacher", email: "teacher@ku.th", role: "teacher", name: "อาจารย์สมชาย" },
      { id: "u_student", email: "student@ku.th", role: "student", name: "นิสิตส้มโอ" },
      { id: "u_student2", email: "student2@ku.th", role: "student", name: "นิสิตแตงโม" },
      { id: "u_student3", email: "student3@ku.th", role: "student", name: "นิสิตมังคุด" },
      { id: "u_parent", email: "parent@ku.th", role: "parent", name: "ผู้ปกครองของนิสิตส้มโอ", linkedStudentEmail: "student@ku.th" }
    ],
    courses: [
      {
        id: "c_prog",
        code: "01418112",
        title: "การเขียนโปรแกรมคอมพิวเตอร์",
        section: "1",
        teacherId: "u_teacher",
        students: ["u_student", "u_student2", "u_student3"]
      },
      {
        id: "c_math",
        code: "01355111",
        title: "แคลคูลัสสำหรับวิศวกร",
        section: "2",
        teacherId: "u_teacher",
        students: ["u_student", "u_student2"]
      }
    ],
    assignments: [
      {
        id: "a1",
        courseId: "c_prog",
        title: "งานที่ 1 — เขียนโปรแกรมคำนวณเกรด",
        description: "เขียนโปรแกรม Python คำนวณเกรดจากคะแนน 3 วิชา",
        dueDate: "2026-09-20",
        points: 100
      },
      {
        id: "a2",
        courseId: "c_prog",
        title: "งานที่ 2 — วนลูปกับรายการข้อมูล",
        description: "แก้โจทย์การวนลูป 5 ข้อ",
        dueDate: "2026-09-10",
        points: 100
      },
      {
        id: "a3",
        courseId: "c_math",
        title: "โจทย์แคลคูลัส ชุดที่ 1",
        description: "แก้โจทย์ลิมิตและอนุพันธ์ บทที่ 1-2",
        dueDate: "2026-09-25",
        points: 50
      }
    ],
    submissions: [
      {
        id: "s1",
        assignmentId: "a1",
        studentId: "u_student",
        submittedAt: "2026-09-15",
        fileName: "grade_calc.py",
        fileType: "text/code",
        score: 92,
        feedback: "โครงสร้างโค้ดชัดเจน ใช้ฟังก์ชันได้ดี ควรเพิ่มการตรวจสอบค่าที่ป้อนเข้า เช่น กรณีค่าติดลบ",
        ai: {
          strengths: ["โค้ดแบ่งเป็นฟังก์ชันนำไปใช้ซ้ำได้", "อ่านง่ายและมีชื่อตัวแปรสื่อความหมาย"],
          improvements: ["เพิ่มการตรวจสอบค่าที่ป้อนเข้า", "เพิ่มการจัดการข้อผิดพลาดเมื่อป้อนข้อมูลผิดรูปแบบ"],
          suggestedScore: 88
        }
      },
      {
        id: "s2",
        assignmentId: "a2",
        studentId: "u_student",
        submittedAt: "2026-09-12",
        fileName: "loops.py",
        fileType: "text/code",
        score: null,
        feedback: "",
        ai: null
      },
      {
        id: "s3",
        assignmentId: "a1",
        studentId: "u_student2",
        submittedAt: "2026-09-16",
        fileName: "gpa.py",
        fileType: "text/code",
        score: 78,
        feedback: "โค้ดทำงานถูกต้อง ควรลดความซ้ำซ้อนของโค้ดลงได้อีก",
        ai: {
          strengths: ["โปรแกรมทำงานได้ถูกต้องตามโจทย์", "โครงสร้างพื้นฐานครบถ้วน"],
          improvements: ["โค้ดบางส่วนซ้ำซ้อน", "แยกส่วนที่ยากต่อการบำรุงรักษา"],
          suggestedScore: 76
        }
      },
      {
        id: "s4",
        assignmentId: "a2",
        studentId: "u_student2",
        submittedAt: "2026-09-09",
        fileName: "loop_hw.py",
        fileType: "text/code",
        score: 64,
        feedback: "วิธีคิดถูก แต่อธิบายและครอบคลุมโจทย์ได้ไม่ครบทุกข้อ",
        ai: {
          strengths: ["ขั้นตอนวิธีโดยรวมถูกต้อง"],
          improvements: ["ครอบคลุมโจทย์ครบทุกข้อ", "แสดงผลลัพธ์ให้เห็นชัดเจนขึ้น"],
          suggestedScore: 62
        }
      },
      {
        id: "s5",
        assignmentId: "a3",
        studentId: "u_student2",
        submittedAt: "2026-09-18",
        fileName: "calc_hw1.pdf",
        fileType: "application/pdf",
        score: 40,
        feedback: "ขั้นตอนวิธีถูก แต่คำตอบหลายข้อพลาดการคิดเครื่องหมาย",
        ai: {
          strengths: ["แสดงวิธีทำเป็นขั้นตอน"],
          improvements: ["ตรวจสอบเครื่องหมายทางคณิตศาสตร์", "ทบทวนการคำนวณก่อนส่ง"],
          suggestedScore: 42
        }
      },
      {
        id: "s6",
        assignmentId: "a2",
        studentId: "u_student3",
        submittedAt: "2026-09-12",
        fileName: "homework2.txt",
        fileType: "text/plain",
        score: null,
        feedback: "",
        ai: null
      }
    ],
    attendance: [
      ...makeAttendance("u_student", "c_prog", "2026-08-01", 7, 10),
      ...makeAttendance("u_student", "c_math", "2026-08-01", 8, 10),
      ...makeAttendance("u_student2", "c_prog", "2026-08-01", 9, 10),
      ...makeAttendance("u_student2", "c_math", "2026-08-01", 9, 10),
      ...makeAttendance("u_student3", "c_prog", "2026-08-01", 5, 10)
    ],
    connections: {
      google: { status: "disconnected" },
      microsoft: { status: "disconnected" }
    }
  };
  saveDB(db);
  return db;
}

function findAll() {
  const db = ensureDB();
  if (!db.users.length) {
    return seedDemoData();
  }
  return db;
}

function findByEmail(db, email) {
  return db.users.find(function (user) {
    return user.email.toLowerCase() === email.toLowerCase();
  }) || null;
}

function createUser(email, role) {
  const db = findAll();
  const existing = findByEmail(db, email);
  if (existing) {
    return existing;
  }
  const user = {
    id: uid("u"),
    email: email,
    role: role,
    name: email.split("@")[0]
  };
  db.users.push(user);
  saveDB(db);
  return user;
}

function createUserWith(db, email, role) {
  const existing = findByEmail(db, email);
  if (existing) {
    return existing;
  }
  const user = {
    id: uid("u"),
    email: email,
    role: role,
    name: email.split("@")[0]
  };
  db.users.push(user);
  return user;
}

function findUserById(db, id) {
  return db.users.find(function (user) {
    return user.id === id;
  }) || null;
}

function coursesByTeacher(db, teacherId) {
  return db.courses.filter(function (course) {
    return course.teacherId === teacherId;
  });
}

function coursesForStudent(db, studentId) {
  return db.courses.filter(function (course) {
    return course.students.indexOf(studentId) !== -1;
  });
}

function assignmentsForCourses(db, courseIds) {
  return db.assignments.filter(function (assignment) {
    return courseIds.indexOf(assignment.courseId) !== -1;
  });
}

function submissionFor(db, assignmentId, studentId) {
  return db.submissions.find(function (submission) {
    return submission.assignmentId === assignmentId && submission.studentId === studentId;
  }) || null;
}

function submissionStatus(assignment, submission) {
  if (!submission) {
    return "missing";
  }
  return submission.submittedAt <= assignment.dueDate ? "submitted" : "late";
}

function courseById(db, courseId) {
  return db.courses.find(function (course) {
    return course.id === courseId;
  }) || null;
}

function attendanceRowsForStudent(db, studentId) {
  return db.attendance.filter(function (row) {
    return row.studentId === studentId;
  });
}

function attendanceRate(db, studentId) {
  const rows = attendanceRowsForStudent(db, studentId);
  if (!rows.length) {
    return { present: 0, total: 0, pct: 0 };
  }
  const present = rows.filter(function (row) {
    return row.present;
  }).length;
  return { present: present, total: rows.length, pct: Math.round((present / rows.length) * 100) };
}

function scoredSubmissionsForStudent(db, studentId) {
  return db.submissions.filter(function (submission) {
    return submission.studentId === studentId && submission.score !== null && submission.score !== undefined;
  });
}

function avgScore(items) {
  if (!items.length) {
    return 0;
  }
  const total = items.reduce(function (sum, item) {
    return sum + item.score;
  }, 0);
  return Math.round((total / items.length) * 10) / 10;
}

function pctRate(part, total) {
  if (!total) {
    return 0;
  }
  return Math.round((part / total) * 100);
}

function assignmentsWithStatusFor(db, studentId) {
  const courses = coursesForStudent(db, studentId);
  const courseIds = courses.map(function (course) {
    return course.id;
  });
  const assignments = assignmentsForCourses(db, courseIds);
  return assignments.map(function (assignment) {
    const submission = submissionFor(db, assignment.id, studentId);
    const status = submissionStatus(assignment, submission);
    return {
      assignment: assignment,
      course: courseById(db, assignment.courseId),
      submission: submission,
      status: status,
      statusLabel: STATUS_META[status].label,
      statusCls: STATUS_META[status].cls
    };
  });
}

function computeRisk(db, studentId) {
  const attendance = attendanceRate(db, studentId);
  const rows = assignmentsWithStatusFor(db, studentId);
  const overdue = rows.filter(function (row) {
    return row.status === "late" || row.status === "missing";
  }).length;
  const scored = scoredSubmissionsForStudent(db, studentId);
  const average = avgScore(scored);

  let points = 0;
  if (attendance.pct < 70) {
    points += 2;
  } else if (attendance.pct < 85) {
    points += 1;
  }
  if (overdue >= 2) {
    points += 2;
  } else if (overdue >= 1) {
    points += 1;
  }
  if (average > 0 && average < 60) {
    points += 2;
  } else if (average > 0 && average < 75) {
    points += 1;
  }

  let level = "low";
  if (points >= 4) {
    level = "high";
  } else if (points >= 2) {
    level = "medium";
  }
  return {
    level: level,
    levelLabel: RISK_META[level].label,
    levelCls: RISK_META[level].cls,
    attendancePct: attendance.pct,
    overdueCount: overdue,
    avgScore: average,
    factors: {
      attendance: attendance.pct,
      overdue: overdue,
      avgScore: average
    }
  };
}

function pendingGradingForTeacher(db, teacherId) {
  const teacherCourses = coursesByTeacher(db, teacherId);
  const courseIds = teacherCourses.map(function (course) {
    return course.id;
  });
  const assignmentIds = db.assignments.filter(function (assignment) {
    return courseIds.indexOf(assignment.courseId) !== -1;
  }).map(function (assignment) {
    return assignment.id;
  });
  return db.submissions.filter(function (submission) {
    return assignmentIds.indexOf(submission.assignmentId) !== -1 &&
      (submission.score === null || submission.score === undefined);
  });
}

function teacherAnalytics(db, teacherId) {
  const courses = coursesByTeacher(db, teacherId);
  const courseIds = courses.map(function (course) {
    return course.id;
  });
  const assignments = assignmentsForCourses(db, courseIds);
  const assignmentIds = assignments.map(function (assignment) {
    return assignment.id;
  });
  const submissions = db.submissions.filter(function (submission) {
    return assignmentIds.indexOf(submission.assignmentId) !== -1;
  });
  const scored = submissions.filter(function (submission) {
    return submission.score !== null && submission.score !== undefined;
  });

  const studentIds = [];
  courses.forEach(function (course) {
    course.students.forEach(function (studentId) {
      if (studentIds.indexOf(studentId) === -1) {
        studentIds.push(studentId);
      }
    });
  });

  const perCourse = courses.map(function (course) {
    const courseAssignmentIds = assignments.filter(function (assignment) {
      return assignment.courseId === course.id;
    }).map(function (assignment) {
      return assignment.id;
    });
    const courseSubmissions = submissions.filter(function (submission) {
      return courseAssignmentIds.indexOf(submission.assignmentId) !== -1;
    });
    const courseScored = courseSubmissions.filter(function (submission) {
      return submission.score !== null && submission.score !== undefined;
    });
    const totalWork = course.students.length * courseAssignmentIds.length;
    const submittedCount = courseSubmissions.reduce(function (count, submission) {
      if (courseAssignmentIds.indexOf(submission.assignmentId) !== -1) {
        return count + 1;
      }
      return count;
    }, 0);
    const riskLevels = course.students.map(function (studentId) {
      return computeRisk(db, studentId).level;
    });
    return {
      course: course,
      submissionRate: pctRate(submittedCount, totalWork),
      avgScore: avgScore(courseScored),
      highRisk: riskLevels.filter(function (level) {
        return level === "high";
      }).length
    };
  });

  const atRiskStudents = studentIds.map(function (studentId) {
    const student = findUserById(db, studentId);
    const risk = computeRisk(db, studentId);
    return { student: student, risk: risk };
  });

  return {
    courses: courses,
    studentCount: studentIds.length,
    assignmentCount: assignments.length,
    submissions: submissions,
    pendingCount: pendingGradingForTeacher(db, teacherId).length,
    avgScore: avgScore(scored),
    perCourse: perCourse,
    atRiskStudents: atRiskStudents
  };
}

function latestScoredSubmission(db, studentId) {
  const scored = scoredSubmissionsForStudent(db, studentId);
  scored.sort(function (a, b) {
    return a.submittedAt < b.submittedAt ? 1 : -1;
  });
  return scored[0] || null;
}

function upcomingAssignments(db, studentId, days) {
  const rows = assignmentsWithStatusFor(db, studentId);
  return rows.filter(function (row) {
    if (row.status === "missing") {
      const diff = (new Date(row.assignment.dueDate + "T00:00:00") - new Date()) / 86400000;
      return diff >= 0 && diff <= days;
    }
    return false;
  });
}

function parentAlerts(db, studentId) {
  const alerts = [];
  const attendance = attendanceRate(db, studentId);
  const rows = assignmentsWithStatusFor(db, studentId);
  const overdue = rows.filter(function (row) {
    return row.status === "missing" || row.status === "late";
  });
  const attendanceRows = attendanceRowsForStudent(db, studentId);
  const latestAbsence = attendanceRows.filter(function (row) {
    return !row.present;
  }).sort(function (a, b) {
    return a.date < b.date ? 1 : -1;
  })[0];
  const latestGraded = latestScoredSubmission(db, studentId);

  if (latestAbsence) {
    alerts.push({ type: "absent", text: "ขาดเรียนล่าสุดวันที่ " + fmtDate(latestAbsence.date) });
  }
  overdue.forEach(function (row) {
    alerts.push({
      type: "overdue",
      text: "ค้างส่งงาน " + row.assignment.title + " (ครบกำหนด " + fmtDate(row.assignment.dueDate) + ")"
    });
  });
  if (latestGraded && latestGraded.score !== null && latestGraded.score < 60) {
    alerts.push({ type: "score", text: "คะแนนล่าสุดต่ำกว่าเกณฑ์ (" + latestGraded.score + "/" + findByAssignment(db, latestGraded.assignmentId).points + ")" });
  }
  return alerts.slice(0, 6);
}

function findByAssignment(db, assignmentId) {
  return db.assignments.find(function (assignment) {
    return assignment.id === assignmentId;
  }) || null;
}

const GEMINI_API_KEY = "";

function analyzeSubmission(text, fileName) {
  if (!GEMINI_API_KEY) {
    return {
      strengths: ["เนื้อหาครบถ้วน", "มีการอธิบายขั้นตอนอย่างชัดเจน"],
      improvements: ["เพิ่มการตรวจสอบขอบเขตข้อมูล", "จัดรูปแบบให้อ่านง่ายขึ้น"],
      suggestedScore: 85,
      feedback: "งานมีความครบถ้วนในภาพรวม ควรปรับเรื่องการตรวจสอบค่าที่ป้อนเข้าและจัดรูปแบบโค้ดเพิ่มเติม"
    };
  }
  return {
    strengths: [],
    improvements: [],
    suggestedScore: null,
    feedback: ""
  };
}

/* =========================================================
   ส่วนขยาย: ระบบบริหารจัดการ (CRUD) รายวิชา งาน การส่งและการตรวจ
   ========================================================= */

function assignmentsForCourse(db, courseId) {
  return db.assignments.filter(function (assignment) {
    return assignment.courseId === courseId;
  });
}

function saveCourse(payload, courseId) {
  const db = findAll();
  if (courseId) {
    const course = courseById(db, courseId);
    if (!course) {
      return null;
    }
    Object.assign(course, payload, { id: course.id });
    saveDB(db);
    return course;
  }
  const course = Object.assign({ id: uid("c"), students: [] }, payload);
  db.courses.push(course);
  saveDB(db);
  return course;
}

function deleteCourse(courseId) {
  const db = findAll();
  const courseAssignmentIds = assignmentsForCourse(db, courseId).map(function (a) {
    return a.id;
  });
  db.courses = db.courses.filter(function (course) {
    return course.id !== courseId;
  });
  db.assignments = db.assignments.filter(function (assignment) {
    return assignment.courseId !== courseId;
  });
  db.submissions = db.submissions.filter(function (submission) {
    return courseAssignmentIds.indexOf(submission.assignmentId) === -1;
  });
  db.attendance = db.attendance.filter(function (row) {
    return row.courseId !== courseId;
  });
  saveDB(db);
}

function addStudentToCourse(courseId, emailOrName) {
  const db = findAll();
  const course = courseById(db, courseId);
  if (!course) {
    return null;
  }
  let email = emailOrName;
  if (typeof email === "string" && email.indexOf("@") === -1) {
    email = email.replace(/\s+/g, "").toLowerCase() + "@student.ku.th";
  }
  let user = createUser(email, "student");
  if (course.students.indexOf(user.id) === -1) {
    course.students.push(user.id);
  }
  if (attendanceRowsForStudent(db, user.id).length === 0) {
    db.attendance.push.apply(db.attendance, makeAttendance(user.id, courseId, "2026-08-01", 9, 10));
  }
  saveDB(db);
  return user;
}

function removeStudentFromCourse(courseId, studentId) {
  const db = findAll();
  const course = courseById(db, courseId);
  if (!course) {
    return;
  }
  course.students = course.students.filter(function (id) {
    return id !== studentId;
  });
  saveDB(db);
}

function saveAssignment(payload, assignmentId) {
  const db = findAll();
  if (assignmentId) {
    const assignment = findByAssignment(db, assignmentId);
    if (!assignment) {
      return null;
    }
    Object.assign(assignment, payload);
    saveDB(db);
    return assignment;
  }
  const assignment = Object.assign({ id: uid("a") }, payload);
  db.assignments.push(assignment);
  saveDB(db);
  return assignment;
}

function deleteAssignment(assignmentId) {
  const db = findAll();
  db.assignments = db.assignments.filter(function (assignment) {
    return assignment.id !== assignmentId;
  });
  db.submissions = db.submissions.filter(function (submission) {
    return submission.assignmentId !== assignmentId;
  });
  saveDB(db);
}

function submissionsForAssignment(db, assignmentId) {
  return db.submissions.filter(function (submission) {
    return submission.assignmentId === assignmentId;
  });
}

const AI_STRENGTHS_POOL = [
  "ตอบคำถามครบถ้วนตามโจทย์",
  "วางโครงสร้างเนื้อหาเป็นลำดับ อ่านเข้าใจง่าย",
  "มีตัวอย่างประกอบการอธิบายในแต่ละขั้นตอน",
  "ใช้ภาษาที่ถูกต้องและกระชับ",
  "โค้ดเป็นระเบียบ แยกส่วนการทำงานชัดเจน",
  "อธิบายวิธีคิดทีละขั้นตอนจนเห็นที่มาของคำตอบ"
];

const AI_IMPROVEMENTS_POOL = [
  "เพิ่มแหล่งอ้างอิงในส่วนท้ายของงาน",
  "ขยายเนื้อหาในส่วนสรุปให้ละเอียดขึ้น",
  "ระบุสมมติฐานหรือขอบเขตของงานให้ชัดเจน",
  "เพิ่มการตรวจสอบข้อผิดพลาดของข้อมูลนำเข้า",
  "จัดรูปแบบการแสดงผลให้อ่านง่ายขึ้น",
  "ทบทวนการคำนวณก่อนส่งเพื่อลดการผิดพลาดเล็กน้อย"
];

function hashString(value) {
  let hash = 0;
  const str = String(value || "");
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function aiGradeSubmission(fileName, fileType, size) {
  const seed = hashString(fileName || "") + Math.max(0, Number(size) || 0);
  const pick = function (pool) {
    return pool.sort(function () {
      return (seed % 7919) - 4000;
    }).slice(0, 2);
  };
  const suggestedScore = Math.min(98, 60 + (seed % 36));
  let feedback = "";
  if (suggestedScore >= 90) {
    feedback = "ผลงานอยู่ในระดับดีเยี่ยม เนื้อหาครบถ้วนและมีคุณภาพสูง ลองยกระดับด้วยการเพิ่มมุมมองหรือตัวอย่างเพิ่มเติม";
  } else if (suggestedScore >= 75) {
    feedback = "ผลงานโดยรวมอยู่ในเกณฑ์ดี หากปรับปรุงตามข้อเสนอแนะจะทำให้งานมีคุณภาพสูงขึ้นไปอีก";
  } else if (suggestedScore >= 60) {
    feedback = "ผลงานพอใช้และผ่านเกณฑ์ แต่ยังต้องเติมเต็มรายละเอียดตามข้อเสนอแนะ เพื่อให้ได้คะแนนที่ดีขึ้น";
  } else {
    feedback = "ควรทบทวนเนื้อหาหลักของวิชาและทำความเข้าใจโจทย์ให้มากขึ้น ก่อนลงมือทำชิ้นถัดไป";
  }
  return {
    strengths: pick(AI_STRENGTHS_POOL),
    improvements: pick(AI_IMPROVEMENTS_POOL),
    suggestedScore: suggestedScore,
    feedback: feedback
  };
}

function submitAssignment(assignmentId, studentId, fileInfo) {
  const db = findAll();
  const assignment = findByAssignment(db, assignmentId);
  if (!assignment) {
    return null;
  }
  const now = todayISO();
  const existing = submissionFor(db, assignmentId, studentId);
  const ai = aiGradeSubmission(fileInfo.name, fileInfo.type, fileInfo.size);
  const data = {
    assignmentId: assignmentId,
    studentId: studentId,
    submittedAt: now,
    fileName: fileInfo.name,
    fileType: fileInfo.type,
    fileSize: fileInfo.size || 0,
    fileData: fileInfo.data || null,
    ai: ai,
    score: null,
    feedback: ""
  };
  if (existing) {
    existing.submittedAt = now;
    existing.fileName = data.fileName;
    existing.fileType = data.fileType;
    existing.fileSize = data.fileSize;
    existing.fileData = data.fileData;
    existing.ai = ai;
    existing.score = null;
    existing.feedback = "";
    saveDB(db);
    return existing;
  }
  data.id = uid("s");
  db.submissions.push(data);
  saveDB(db);
  return data;
}

function gradeSubmission(assignmentId, studentId, score, feedback) {
  const db = findAll();
  const submission = submissionFor(db, assignmentId, studentId);
  if (!submission) {
    return null;
  }
  submission.score = Number(score);
  submission.feedback = String(feedback || "").trim();
  saveDB(db);
  return submission;
}

function getConnection(provider) {
  const db = findAll();
  const connections = db.connections || {};
  return connections[provider] || { status: "disconnected" };
}

function setConnection(provider, status, meta) {
  const db = findAll();
  db.connections = db.connections || {};
  db.connections[provider] = Object.assign({ status: status }, meta || {});
  saveDB(db);
  return db.connections[provider];
}

function riskSummary(db) {
  const studentIds = [];
  db.courses.forEach(function (course) {
    course.students.forEach(function (studentId) {
      if (studentIds.indexOf(studentId) === -1) {
        studentIds.push(studentId);
      }
    });
  });
  const counts = { low: 0, medium: 0, high: 0 };
  const list = studentIds.map(function (studentId) {
    const student = findUserById(db, studentId);
    const risk = computeRisk(db, studentId);
    counts[risk.level] = counts[risk.level] + 1;
    return { student: student, risk: risk };
  });
  return { counts: counts, list: list, total: studentIds.length };
}

function analyticsReport(db, teacherId) {
  const teacher = teacherAnalytics(db, teacherId);
  const teacherCourseIds = teacher.courses.map(function (course) {
    return course.id;
  });

  const attRows = db.attendance.filter(function (row) {
    return teacherCourseIds.indexOf(row.courseId) !== -1;
  });
  const byDate = {};
  attRows.forEach(function (row) {
    if (!byDate[row.date]) {
      byDate[row.date] = { present: 0, total: 0 };
    }
    if (row.present) {
      byDate[row.date].present += 1;
    }
    byDate[row.date].total += 1;
  });
  const sortedDates = Object.keys(byDate).sort().slice(-8);

  const buckets = [
    { range: "0-49", count: 0 },
    { range: "50-59", count: 0 },
    { range: "60-69", count: 0 },
    { range: "70-79", count: 0 },
    { range: "80-89", count: 0 },
    { range: "90-100", count: 0 }
  ];
  const teacherAssignmentIds = db.assignments.filter(function (a) {
    return teacherCourseIds.indexOf(a.courseId) !== -1;
  }).map(function (a) {
    return a.id;
  });
  db.submissions.forEach(function (submission) {
    if (teacherAssignmentIds.indexOf(submission.assignmentId) === -1) {
      return;
    }
    if (submission.score === null || submission.score === undefined) {
      return;
    }
    let index = Math.floor(submission.score / 10);
    index = index < 0 ? 0 : index > 10 ? 10 : index;
    if (index >= 9) {
      buckets[5].count += 1;
    } else if (index >= 8) {
      buckets[4].count += 1;
    } else if (index >= 7) {
      buckets[3].count += 1;
    } else if (index >= 6) {
      buckets[2].count += 1;
    } else if (index >= 5) {
      buckets[1].count += 1;
    } else {
      buckets[0].count += 1;
    }
  });

  const riskShare = riskSummary(db).counts;

  return {
    attendanceTrend: {
      labels: sortedDates.map(function (date, i) {
        return "W" + (i + 1);
      }),
      values: sortedDates.map(function (date) {
        const bucket = byDate[date];
        return bucket.total ? Math.round((bucket.present / bucket.total) * 100) : 0;
      })
    },
    scoreDist: buckets,
    completion: teacher.perCourse.map(function (item) {
      return { name: item.course.code + " " + item.course.title, value: item.submissionRate };
    }),
    courseScores: teacher.perCourse.map(function (item) {
      return { name: item.course.code + " " + item.course.title, value: item.avgScore };
    }),
    riskShare: riskShare,
    avgScore: teacher.avgScore,
    pendingCount: teacher.pendingCount,
    studentCount: teacher.studentCount,
    assignmentCount: teacher.assignmentCount,
    courses: teacher.courses.length
  };
}

function syncFromGoogle(accountEmail) {
  const db = findAll();
  const teacher = db.users.find(function (u) {
    return u.role === "teacher";
  }) || createUserWith(db, "teacher@ku.th", "teacher");

  const externalCourses = [
    { code: "01418112", title: "การเขียนโปรแกรมคอมพิวเตอร์", section: "1", assignments: 4,
      students: ["กิตติ วิริยะ", "มานะ ขยันดี", "สุดา เร่งรีบ", "เพ็ญศรี ใจเย็น"] },
    { code: "01417167", title: "สถิติวิศวกรรม", section: "2", assignments: 3,
      students: ["ชัย แน่วแน่", "ทศพล มั่นคง", "บุญมี สุขใจ"] },
    { code: "01355111", title: "แคลคูลัสสำหรับวิศวกร", section: "1", assignments: 5,
      students: ["ส้มโอ พร้อมเลิศ", "แตงโม รักเรียน", "มังคุด ขยัน"] }
  ];

  let addedCourses = 0;
  let addedAssignments = 0;
  let addedStudents = 0;

  externalCourses.forEach(function (external) {
    let course = db.courses.find(function (c) {
      return c.teacherId === teacher.id && c.code === external.code;
    });
    if (!course) {
      course = {
        id: uid("c"),
        code: external.code,
        title: external.title,
        section: external.section,
        teacherId: teacher.id,
        students: []
      };
      db.courses.push(course);
      addedCourses += 1;
    }
    for (let i = 1; i <= external.assignments; i++) {
      const title = external.title.split(" ")[0] + " ชุดที่ " + i;
      const duplicate = db.assignments.some(function (a) {
        return a.courseId === course.id && a.title === title;
      });
      if (!duplicate) {
        const due = new Date();
        due.setDate(due.getDate() + (10 + i * 3));
        db.assignments.push({
          id: uid("a"),
          courseId: course.id,
          title: title,
          description: "งานที่ซิงค์จาก Google Classroom",
          dueDate: due.toISOString().slice(0, 10),
          points: i % 2 ? 100 : 50
        });
        addedAssignments += 1;
      }
    }
    external.students.forEach(function (name) {
      const email = name + "@classroom.demo";
      let user = findByEmail(db, email);
      if (!user) {
        user = { id: uid("u"), email: email, role: "student", name: name };
        db.users.push(user);
        addedStudents += 1;
      }
      if (course.students.indexOf(user.id) === -1) {
        course.students.push(user.id);
      }
      if (attendanceRowsForStudent(db, user.id).length === 0) {
        db.attendance.push.apply(db.attendance, makeAttendance(user.id, course.id, "2026-08-01", 8, 10));
      }
    });
  });

  const meta = {
    status: "connected",
    account: accountEmail,
    lastSync: new Date().toLocaleString("th-TH"),
    totals: { courses: addedCourses, assignments: addedAssignments, students: addedStudents },
    courses: externalCourses.map(function (external) {
      const syncedCourse = db.courses.find(function (c) {
        return c.teacherId === teacher.id && c.code === external.code;
      });
      return {
        code: external.code,
        title: external.title,
        assignments: syncedCourse ? assignmentsForCourse(db, syncedCourse.id).length : 0,
        students: syncedCourse ? syncedCourse.students.length : 0
      };
    })
  };

  db.connections = db.connections || {};
  db.connections.google = meta;
  saveDB(db);
  return meta;
}

function syncFromTeams(accountEmail) {
  const db = findAll();
  const teacher = db.users.find(function (u) {
    return u.role === "teacher";
  }) || createUserWith(db, "teacher@ku.th", "teacher");

  const externalClasses = [
    { name: "โครงสร้างข้อมูลและอัลกอริทึม", assignments: 4, students: ["ไกรสร ใจดี", "ณัฐวุฒิ พร้อม", "พิมพ์ชนก เรียบร้อย"] },
    { name: "ระบบฐานข้อมูล", assignments: 5, students: ["ศุภกร ขยัน", "ณัชชา มั่นคง", "วราภรณ์ ใจเย็น"] },
    { name: "วิศวกรรมซอฟต์แวร์", assignments: 3, students: ["ธนกร วิริยะ", "จิดาภา สุข", "กันตินันท์ แน่วแน่"] }
  ];

  let addedClasses = 0;
  let addedAssignments = 0;
  let addedStudents = 0;

  externalClasses.forEach(function (external) {
    let course = db.courses.find(function (c) {
      return c.teacherId === teacher.id && c.title === external.name;
    });
    if (!course) {
      course = {
        id: uid("c"),
        code: "MS" + String(db.courses.length + 1).padStart(2, "0"),
        title: external.name,
        section: "T",
        teacherId: teacher.id,
        students: []
      };
      db.courses.push(course);
      addedClasses += 1;
    }
    for (let i = 1; i <= external.assignments; i++) {
      const title = "Assignment " + i + " — " + external.name.split(" ")[0];
      const duplicate = db.assignments.some(function (a) {
        return a.courseId === course.id && a.title === title;
      });
      if (!duplicate) {
        const due = new Date();
        due.setDate(due.getDate() + (7 + i * 2));
        db.assignments.push({
          id: uid("a"),
          courseId: course.id,
          title: title,
          description: "Assignment ดึงผ่าน Microsoft Graph API",
          dueDate: due.toISOString().slice(0, 10),
          points: 100
        });
        addedAssignments += 1;
      }
    }
    external.students.forEach(function (name) {
      const email = name + "@teams.demo";
      let user = findByEmail(db, email);
      if (!user) {
        user = { id: uid("u"), email: email, role: "student", name: name };
        db.users.push(user);
        addedStudents += 1;
      }
      if (course.students.indexOf(user.id) === -1) {
        course.students.push(user.id);
      }
      if (attendanceRowsForStudent(db, user.id).length === 0) {
        db.attendance.push.apply(db.attendance, makeAttendance(user.id, course.id, "2026-08-01", 9, 10));
      }
    });
  });

  const meta = {
    status: "connected",
    account: accountEmail,
    lastSync: new Date().toLocaleString("th-TH"),
    totals: { classes: addedClasses, assignments: addedAssignments, students: addedStudents },
    classes: externalClasses.map(function (external) {
      const syncedCourse = db.courses.find(function (c) {
        return c.teacherId === teacher.id && c.title === external.name;
      });
      return {
        name: external.name,
        assignments: syncedCourse ? assignmentsForCourse(db, syncedCourse.id).length : 0,
        students: syncedCourse ? syncedCourse.students.length : 0
      };
    })
  };

  db.connections = db.connections || {};
  db.connections.microsoft = meta;
  saveDB(db);
  return meta;
}

function disconnectProvider(provider) {
  setConnection(provider, "disconnected");
}