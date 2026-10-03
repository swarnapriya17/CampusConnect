/**
 * CampusConnect — Initial Mock Data Store for Stage 2 Frontend Visualization
 * Fully populated with realistic academic data for Students, Faculty, and Admins.
 */

export const INITIAL_STUDENT_PROFILE = {
  id: 'STU-2026-042',
  name: 'Alex Morgan',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  email: 'alex.morgan@campusconnect.edu',
  phone: '+1 (555) 234-5678',
  department: 'Computer Science & Engineering',
  year: '3rd Year (Junior)',
  section: 'CS-A',
  rollNo: '21CS042',
  advisor: 'Dr. Robert Vance',
  gpa: '3.84'
};

export const INITIAL_SUBJECTS = [
  {
    id: 'sub-1',
    code: 'CS301',
    name: 'Advanced Web Development & Frameworks',
    faculty: 'Prof. Sarah Jenkins',
    facultyEmail: 's.jenkins@campusconnect.edu',
    credits: 4,
    semester: 'Semester 6',
    department: 'Computer Science & Engineering',
    schedule: 'Mon, Wed 10:00 AM - 11:30 AM'
  },
  {
    id: 'sub-2',
    code: 'CS302',
    name: 'Database Management Systems',
    faculty: 'Dr. Michael Chang',
    facultyEmail: 'm.chang@campusconnect.edu',
    credits: 4,
    semester: 'Semester 6',
    department: 'Computer Science & Engineering',
    schedule: 'Tue, Thu 01:30 PM - 03:00 PM'
  },
  {
    id: 'sub-3',
    code: 'CS303',
    name: 'Data Structures & Algorithms II',
    faculty: 'Dr. Elena Rostova',
    facultyEmail: 'e.rostova@campusconnect.edu',
    credits: 3,
    semester: 'Semester 6',
    department: 'Computer Science & Engineering',
    schedule: 'Mon, Fri 02:00 PM - 03:30 PM'
  },
  {
    id: 'sub-4',
    code: 'CS304',
    name: 'Software Engineering & Agile Methodologies',
    faculty: 'Prof. David Miller',
    facultyEmail: 'd.miller@campusconnect.edu',
    credits: 3,
    semester: 'Semester 6',
    department: 'Computer Science & Engineering',
    schedule: 'Wed, Fri 11:30 AM - 01:00 PM'
  },
  {
    id: 'sub-5',
    code: 'CS305',
    name: 'Computer Networks & Security',
    faculty: 'Dr. Aris Thorne',
    facultyEmail: 'a.thorne@campusconnect.edu',
    credits: 4,
    semester: 'Semester 6',
    department: 'Computer Science & Engineering',
    schedule: 'Tue, Thu 09:00 AM - 10:30 AM'
  }
];

export const INITIAL_ATTENDANCE = [
  {
    id: 'att-1',
    subjectId: 'sub-1',
    subjectCode: 'CS301',
    subjectName: 'Advanced Web Development & Frameworks',
    faculty: 'Prof. Sarah Jenkins',
    attendedClasses: 28,
    totalClasses: 30,
    percentage: 93.3,
    status: 'Good' // Good (>=75), Warning (65-74), Low (<65)
  },
  {
    id: 'att-2',
    subjectId: 'sub-2',
    subjectCode: 'CS302',
    subjectName: 'Database Management Systems',
    faculty: 'Dr. Michael Chang',
    attendedClasses: 25,
    totalClasses: 30,
    percentage: 83.3,
    status: 'Good'
  },
  {
    id: 'att-3',
    subjectId: 'sub-3',
    subjectCode: 'CS303',
    subjectName: 'Data Structures & Algorithms II',
    faculty: 'Dr. Elena Rostova',
    attendedClasses: 20,
    totalClasses: 28,
    percentage: 71.4,
    status: 'Warning'
  },
  {
    id: 'att-4',
    subjectId: 'sub-4',
    subjectCode: 'CS304',
    subjectName: 'Software Engineering & Agile Methodologies',
    faculty: 'Prof. David Miller',
    attendedClasses: 26,
    totalClasses: 28,
    percentage: 92.8,
    status: 'Good'
  },
  {
    id: 'att-5',
    subjectId: 'sub-5',
    subjectCode: 'CS305',
    subjectName: 'Computer Networks & Security',
    faculty: 'Dr. Aris Thorne',
    attendedClasses: 15,
    totalClasses: 26,
    percentage: 57.6,
    status: 'Low'
  }
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'asg-101',
    title: 'Full Stack MERN Architecture & REST API Design',
    subjectCode: 'CS301',
    subjectName: 'Advanced Web Development & Frameworks',
    faculty: 'Prof. Sarah Jenkins',
    description: 'Design and implement a scalable Node.js Express REST API with MongoDB Atlas Mongoose models, JWT authentication, and CORS middleware.',
    instructions: '1. Create a clean modular structure (controllers, routes, middleware).\n2. Include full CRUD operations for resources.\n3. Add JWT auth middleware for protected endpoints.\n4. Submit complete code ZIP or PDF document with GitHub link.',
    assignedDate: '2026-09-28',
    dueDate: '2026-10-15',
    maxMarks: 100,
    status: 'Pending', // Pending, Submitted, Late, Overdue
    resubmissionAllowed: true,
    allowedFileTypes: ['.pdf', '.zip', '.docx'],
    maxFileSizeMB: 15
  },
  {
    id: 'asg-102',
    title: 'Relational Schema Normalization & Index Optimization',
    subjectCode: 'CS302',
    subjectName: 'Database Management Systems',
    faculty: 'Dr. Michael Chang',
    description: 'Perform 3NF and BCNF normalization on provided university records database schema. Analyze query execution plans and create optimal indexes.',
    instructions: 'Include SQL DDL scripts, ER diagrams, and normalization steps in your report document.',
    assignedDate: '2026-09-20',
    dueDate: '2026-10-02',
    maxMarks: 50,
    status: 'Submitted',
    resubmissionAllowed: true,
    allowedFileTypes: ['.pdf', '.docx'],
    maxFileSizeMB: 10,
    submissionDetails: {
      submittedAt: '2026-10-01 14:32',
      fileName: 'AlexMorgan_DBMS_Assignment2.pdf',
      fileSize: '3.4 MB',
      fileUrl: '#',
      remarks: 'Submitted initial solution with SQL index query plans.'
    }
  },
  {
    id: 'asg-103',
    title: 'Dynamic Programming & Graph Algorithm Benchmarks',
    subjectCode: 'CS303',
    subjectName: 'Data Structures & Algorithms II',
    faculty: 'Dr. Elena Rostova',
    description: 'Implement Dijkstra, Bellman-Ford, and Floyd-Warshall algorithms. Benchmark performance across sparse and dense graph inputs.',
    instructions: 'Submit Python or C++ source files along with benchmark charts report.',
    assignedDate: '2026-09-15',
    dueDate: '2026-09-30',
    maxMarks: 80,
    status: 'Overdue',
    resubmissionAllowed: false,
    allowedFileTypes: ['.pdf', '.zip'],
    maxFileSizeMB: 20
  },
  {
    id: 'asg-104',
    title: 'Agile Sprint Planning & User Story Mapping',
    subjectCode: 'CS304',
    subjectName: 'Software Engineering & Agile Methodologies',
    faculty: 'Prof. David Miller',
    description: 'Create a comprehensive Agile backlog, epics, user stories with acceptance criteria, and sprint burn-down estimate for a Campus Management portal.',
    instructions: 'Export PDF document from Jira or Trello setup containing user stories.',
    assignedDate: '2026-09-25',
    dueDate: '2026-10-18',
    maxMarks: 60,
    status: 'Pending',
    resubmissionAllowed: true,
    allowedFileTypes: ['.pdf', '.pptx', '.docx'],
    maxFileSizeMB: 10
  }
];

export const INITIAL_SUBMISSIONS = [
  {
    id: 'subm-1',
    assignmentId: 'asg-102',
    assignmentTitle: 'Relational Schema Normalization & Index Optimization',
    studentId: 'STU-2026-042',
    studentName: 'Alex Morgan',
    department: 'Computer Science',
    submittedDate: '2026-10-01 14:32',
    fileName: 'AlexMorgan_DBMS_Assignment2.pdf',
    fileSize: '3.4 MB',
    fileUrl: '#',
    status: 'Submitted', // Submitted, Late, Graded, Overdue
    grade: '48 / 50',
    feedback: 'Excellent normalization breakdown and query plan analysis.'
  },
  {
    id: 'subm-2',
    assignmentId: 'asg-102',
    assignmentTitle: 'Relational Schema Normalization & Index Optimization',
    studentId: 'STU-2026-015',
    studentName: 'Samantha Reed',
    department: 'Computer Science',
    submittedDate: '2026-10-02 09:15',
    fileName: 'S_Reed_DBMS_Assgn2.docx',
    fileSize: '2.1 MB',
    fileUrl: '#',
    status: 'Submitted',
    grade: 'Pending',
    feedback: ''
  },
  {
    id: 'subm-3',
    assignmentId: 'asg-103',
    assignmentTitle: 'Dynamic Programming & Graph Algorithm Benchmarks',
    studentId: 'STU-2026-088',
    studentName: 'Marcus Vance',
    department: 'Computer Science',
    submittedDate: '2026-10-01 18:40',
    fileName: 'GraphAlgorithms_Marcus.zip',
    fileSize: '8.7 MB',
    fileUrl: '#',
    status: 'Late',
    grade: 'Pending',
    feedback: ''
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'anc-1',
    title: 'End-Semester Examination Schedule & Regulations Fall 2026',
    description: 'The final timetable for Fall 2026 End-Semester Examinations has been published. All students are advised to check hall ticket availability on the student portal by Oct 20.',
    date: '2026-10-02',
    category: 'Examination', // Academic, Examination, General, Placement, Event, Important
    priority: 'High', // High, Medium, Low
    author: 'Office of the Controller of Examinations',
    targetRole: 'All'
  },
  {
    id: 'anc-2',
    title: 'Annual Campus Placement Drive — Google & Microsoft Tech Talks',
    description: 'Pre-placement talk and coding challenge registration for Final Year and 3rd Year CSE/ECE students is open. Session scheduled for Oct 12 at Main Auditorium.',
    date: '2026-10-01',
    category: 'Placement',
    priority: 'High',
    author: 'Placement & Career Development Cell',
    targetRole: 'Student'
  },
  {
    id: 'anc-3',
    title: 'Mid-Term Attendance Threshold Warning & Compensation Classes',
    description: 'Students with attendance below 75% in any course must submit medical certificates or attend special weekend remedial lectures before Oct 15.',
    date: '2026-09-29',
    category: 'Academic',
    priority: 'Medium',
    author: 'Academic Affairs Committee',
    targetRole: 'All'
  },
  {
    id: 'anc-4',
    title: 'Campus Central Library Hours Extended for Mid-Terms',
    description: 'The Central Library will remain open until 11:00 PM on weekdays starting Monday. Digital library access is available 24/7.',
    date: '2026-09-27',
    category: 'General',
    priority: 'Low',
    author: 'Chief Librarian',
    targetRole: 'All'
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    name: 'HackConnect 2026 — 24-Hour Annual Inter-College Hackathon',
    date: '2026-10-24',
    time: '09:00 AM - 09:00 AM (Next Day)',
    location: 'Innovation & Incubation Hub, Block B',
    organizer: 'Department of Computer Science & ACM Student Chapter',
    category: 'Technical', // Academic, Cultural, Technical, Sports
    timeStatus: 'Upcoming', // Upcoming, Past
    description: 'Compete in AI, Web3, and Open Source tracks. Cash prizes up to $5,000, mentor sessions, and recruiter networking.',
    rsvped: true,
    capacity: 250
  },
  {
    id: 'evt-2',
    name: 'International Conference on Sustainable AI & Cloud Infrastructure',
    date: '2026-11-05',
    time: '10:00 AM - 05:00 PM',
    location: 'University Grand Auditorium',
    organizer: 'IEEE Student Branch & R&D Cell',
    category: 'Academic',
    timeStatus: 'Upcoming',
    description: 'Keynotes by industry leaders on green computing, distributed systems, and neural network compression.',
    rsvped: false,
    capacity: 500
  },
  {
    id: 'evt-3',
    name: 'Campus Symphony & Cultural Festival Evening',
    date: '2026-11-12',
    time: '05:30 PM - 09:30 PM',
    location: 'Open Air Theatre (OAT)',
    organizer: 'Student Activity Council (SAC)',
    category: 'Cultural',
    timeStatus: 'Upcoming',
    description: 'An evening of live music, theatrical performances, dance competitions, and food stalls.',
    rsvped: false,
    capacity: 1000
  },
  {
    id: 'evt-4',
    name: 'Inter-Departmental Athletics & Sports Tournament',
    date: '2026-09-18',
    time: '08:00 AM - 04:00 PM',
    location: 'University Sports Ground',
    organizer: 'Department of Physical Education',
    category: 'Sports',
    timeStatus: 'Past',
    description: 'Track and field events, soccer finals, and basketball championships.',
    rsvped: true,
    capacity: 800
  }
];

export const INITIAL_REQUESTS = [
  {
    id: 'REQ-2026-104',
    type: 'Academic', // Academic, Infrastructure, Hostel, Library, IT Support, General
    subject: 'Course Credit Overlap Adjustment Request for CS303',
    description: 'Lab session for CS303 conflicts with CS301 tutorial on Wednesdays. Requesting transfer to Wednesday afternoon batch B.',
    priority: 'High', // High, Medium, Low
    date: '2026-09-30',
    status: 'In Progress', // Pending, In Progress, Resolved, Rejected
    response: 'Reviewed by Academic Dean. Waiting for Dept Head approval for Batch B transfer.'
  },
  {
    id: 'REQ-2026-089',
    type: 'IT Support',
    subject: 'Campus Wi-Fi Credentials Reset & MAC Address Binding',
    description: 'Unable to connect secondary laptop to CampusNet-5G SSID after recent password change.',
    priority: 'Medium',
    date: '2026-09-24',
    status: 'Resolved',
    response: 'MAC address added to whitelist. Reset token sent to student email.'
  },
  {
    id: 'REQ-2026-052',
    type: 'Infrastructure',
    subject: 'AC Maintenance in Computer Lab 3',
    description: 'Air conditioning unit in Lab 3 emitting noise and cooling insufficiently during afternoon sessions.',
    priority: 'Low',
    date: '2026-09-15',
    status: 'Resolved',
    response: 'Maintenance team serviced unit on Sept 17.'
  }
];

export const INITIAL_STUDENTS_ADMIN = [
  {
    id: 'STU-2026-042',
    rollNo: '21CS042',
    name: 'Alex Morgan',
    email: 'alex.morgan@campusconnect.edu',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    section: 'A',
    status: 'Active',
    attendance: '82.4%',
    gpa: '3.84'
  },
  {
    id: 'STU-2026-015',
    rollNo: '21CS015',
    name: 'Samantha Reed',
    email: 'samantha.reed@campusconnect.edu',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    section: 'A',
    status: 'Active',
    attendance: '91.0%',
    gpa: '3.92'
  },
  {
    id: 'STU-2026-088',
    rollNo: '21CS088',
    name: 'Marcus Vance',
    email: 'marcus.vance@campusconnect.edu',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    section: 'B',
    status: 'Active',
    attendance: '74.2%',
    gpa: '3.40'
  },
  {
    id: 'STU-2026-102',
    rollNo: '21EC012',
    name: 'Elena Rostova Jr.',
    email: 'elena.jr@campusconnect.edu',
    department: 'Electronics & Communication',
    year: '2nd Year',
    section: 'A',
    status: 'Active',
    attendance: '88.5%',
    gpa: '3.65'
  },
  {
    id: 'STU-2026-140',
    rollNo: '21ME045',
    name: 'David Beck',
    email: 'david.beck@campusconnect.edu',
    department: 'Mechanical Engineering',
    year: '4th Year',
    section: 'A',
    status: 'On Leave',
    attendance: '62.0%',
    gpa: '3.10'
  }
];
