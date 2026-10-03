/**
 * Backend Data Store Service (Mongoose-ready Architecture)
 * Provides centralized data access, filtering, pagination, and CRUD handlers.
 */

let students = [
  { id: 'STU-2026-042', rollNo: '21CS042', name: 'Alex Morgan', email: 'alex.morgan@campusconnect.edu', department: 'Computer Science & Engineering', year: '3rd Year', section: 'CS-A', status: 'Active', attendance: '82.4%', gpa: '3.84' },
  { id: 'STU-2026-015', rollNo: '21CS015', name: 'Samantha Reed', email: 'samantha.reed@campusconnect.edu', department: 'Computer Science & Engineering', year: '3rd Year', section: 'CS-A', status: 'Active', attendance: '91.0%', gpa: '3.92' },
  { id: 'STU-2026-088', rollNo: '21CS088', name: 'Marcus Vance', email: 'marcus.vance@campusconnect.edu', department: 'Computer Science & Engineering', year: '3rd Year', section: 'CS-B', status: 'Active', attendance: '74.2%', gpa: '3.40' }
];

let subjects = [
  { id: 'sub-1', code: 'CS301', name: 'Advanced Web Development & Frameworks', faculty: 'Prof. Sarah Jenkins', credits: 4, semester: 'Semester 6', department: 'Computer Science & Engineering', schedule: 'Mon, Wed 10:00 AM' },
  { id: 'sub-2', code: 'CS302', name: 'Database Management Systems', faculty: 'Dr. Michael Chang', credits: 4, semester: 'Semester 6', department: 'Computer Science & Engineering', schedule: 'Tue, Thu 01:30 PM' },
  { id: 'sub-3', code: 'CS303', name: 'Data Structures & Algorithms II', faculty: 'Dr. Elena Rostova', credits: 3, semester: 'Semester 6', department: 'Computer Science & Engineering', schedule: 'Mon, Fri 02:00 PM' }
];

let attendance = [
  { id: 'att-1', studentId: 'STU-2026-042', subjectId: 'sub-1', subjectCode: 'CS301', subjectName: 'Advanced Web Development', faculty: 'Prof. Sarah Jenkins', attendedClasses: 28, totalClasses: 30, percentage: 93.3, status: 'Good' },
  { id: 'att-2', studentId: 'STU-2026-042', subjectId: 'sub-2', subjectCode: 'CS302', subjectName: 'Database Management Systems', faculty: 'Dr. Michael Chang', attendedClasses: 25, totalClasses: 30, percentage: 83.3, status: 'Good' },
  { id: 'att-3', studentId: 'STU-2026-042', subjectId: 'sub-3', subjectCode: 'CS303', subjectName: 'Data Structures & Algorithms II', faculty: 'Dr. Elena Rostova', attendedClasses: 20, totalClasses: 28, percentage: 71.4, status: 'Warning' }
];

let assignments = [
  { id: 'asg-101', title: 'Full Stack MERN Architecture & REST API Design', subjectCode: 'CS301', subjectName: 'Advanced Web Development', faculty: 'Prof. Sarah Jenkins', description: 'Design and implement a scalable Node.js Express REST API.', instructions: 'Modular routes, JWT middleware, Mongoose schemas.', assignedDate: '2026-09-28', dueDate: '2026-10-15', maxMarks: 100, status: 'Pending', resubmissionAllowed: true },
  { id: 'asg-102', title: 'Relational Schema Normalization & Index Optimization', subjectCode: 'CS302', subjectName: 'Database Management Systems', faculty: 'Dr. Michael Chang', description: 'Perform 3NF and BCNF normalization on university records.', instructions: 'Submit SQL query plans.', assignedDate: '2026-09-20', dueDate: '2026-10-02', maxMarks: 50, status: 'Submitted', resubmissionAllowed: true },
  { id: 'asg-103', title: 'Dynamic Programming & Graph Algorithm Benchmarks', subjectCode: 'CS303', subjectName: 'Data Structures & Algorithms II', faculty: 'Dr. Elena Rostova', description: 'Implement Dijkstra and Bellman-Ford graph benchmarks.', instructions: 'Submit Python/C++ code ZIP.', assignedDate: '2026-09-15', dueDate: '2026-09-30', maxMarks: 80, status: 'Overdue', resubmissionAllowed: false }
];

let submissions = [
  { id: 'subm-1', assignmentId: 'asg-102', assignmentTitle: 'Relational Schema Normalization & Index Optimization', studentId: 'STU-2026-042', studentName: 'Alex Morgan', department: 'Computer Science', submittedDate: '2026-10-01 14:32', fileName: 'AlexMorgan_DBMS_Assignment2.pdf', fileSize: '3.4 MB', fileUrl: 'http://localhost:5000/uploads/submissions/AlexMorgan_DBMS_Assignment2.pdf', status: 'Submitted', grade: '48 / 50', feedback: 'Great query plan analysis.' },
  { id: 'subm-2', assignmentId: 'asg-102', assignmentTitle: 'Relational Schema Normalization & Index Optimization', studentId: 'STU-2026-015', studentName: 'Samantha Reed', department: 'Computer Science', submittedDate: '2026-10-02 09:15', fileName: 'S_Reed_DBMS_Assgn2.docx', fileSize: '2.1 MB', fileUrl: 'http://localhost:5000/uploads/submissions/S_Reed_DBMS_Assgn2.docx', status: 'Submitted', grade: 'Pending', feedback: '' }
];

let announcements = [
  { id: 'anc-1', title: 'End-Semester Examination Schedule & Regulations Fall 2026', description: 'The final timetable for Fall 2026 End-Semester Examinations has been published.', date: '2026-10-02', category: 'Examination', priority: 'High', author: 'Office of the Controller of Examinations' },
  { id: 'anc-2', title: 'Annual Campus Placement Drive — Google & Microsoft Tech Talks', description: 'Pre-placement talk registration is open for final year CSE/ECE students.', date: '2026-10-01', category: 'Placement', priority: 'High', author: 'Placement Cell' }
];

let events = [
  { id: 'evt-1', name: 'HackConnect 2026 — 24-Hour Annual Inter-College Hackathon', date: '2026-10-24', time: '09:00 AM', location: 'Innovation Hub Block B', organizer: 'ACM Chapter', category: 'Technical', timeStatus: 'Upcoming', capacity: 250 },
  { id: 'evt-2', name: 'International Conference on Sustainable AI & Cloud Infrastructure', date: '2026-11-05', time: '10:00 AM', location: 'University Grand Auditorium', organizer: 'IEEE Branch', category: 'Academic', timeStatus: 'Upcoming', capacity: 500 }
];

let requests = [
  { id: 'REQ-2026-104', type: 'Academic', subject: 'Course Credit Overlap Adjustment Request for CS303', description: 'Lab session conflicts with tutorial batch.', priority: 'High', date: '2026-09-30', status: 'In Progress', response: 'Under review by Dean.' },
  { id: 'REQ-2026-089', type: 'IT Support', subject: 'Campus Wi-Fi Credentials Reset & MAC Address Binding', description: 'Unable to connect secondary laptop.', priority: 'Medium', date: '2026-09-24', status: 'Resolved', response: 'MAC address added to whitelist.' }
];

module.exports = {
  students,
  subjects,
  attendance,
  assignments,
  submissions,
  announcements,
  events,
  requests
};
