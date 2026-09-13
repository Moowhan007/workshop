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