const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Load Models
const User = require('./models/User');
const Subject = require('./models/Subject');
const Attendance = require('./models/Attendance');
const Assignment = require('./models/Assignment');
const Submission = require('./models/Submission');
const Announcement = require('./models/Announcement');
const Event = require('./models/Event');
const Request = require('./models/Request');

const seedDatabase = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr || connStr.includes('<username>')) {
      console.error('❌ MONGODB_URI not configured in .env file. Cannot run seed script.');
      process.exit(1);
    }

    console.log('🔄 Connecting to MongoDB Atlas for seeding...');
    await mongoose.connect(connStr);
    console.log('✅ Connected to MongoDB Atlas.');

    // Clear existing collections
    console.log('🧹 Clearing existing collections...');
    await User.deleteMany({});
    await Subject.deleteMany({});
    await Attendance.deleteMany({});
    await Assignment.deleteMany({});
    await Submission.deleteMany({});
    await Announcement.deleteMany({});
    await Event.deleteMany({});
    await Request.deleteMany({});

    // Hash development password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Seed Users
    console.log('👤 Seeding Users...');
    const adminUser = await User.create({
      name: 'Dr. Arthur Vance',
      email: 'admin@campusconnect.edu',
      password: hashedPassword,
      role: 'admin',
      department: 'Academic Administration'
    });

    const facultyUser = await User.create({
      name: 'Prof. Sarah Jenkins',
      email: 's.jenkins@campusconnect.edu',
      password: hashedPassword,
      role: 'faculty',
      department: 'Computer Science & Engineering'
    });

    const studentUser = await User.create({
      name: 'Alex Morgan',
      studentId: 'STU-2026-042',
      email: 'alex.morgan@campusconnect.edu',
      phone: '+1 (555) 234-5678',
      password: hashedPassword,
      role: 'student',
      department: 'Computer Science & Engineering',
      year: '3rd Year',
      section: 'CS-A'
    });

    // 2. Seed Subjects
    console.log('📚 Seeding Subjects...');
    const sub1 = await Subject.create({
      subjectCode: 'CS301',
      subjectName: 'Advanced Web Development & Frameworks',
      faculty: 'Prof. Sarah Jenkins',
      department: 'Computer Science & Engineering',
      semester: 'Semester 6',
      credits: 4,
      schedule: 'Mon, Wed 10:00 AM'
    });

    const sub2 = await Subject.create({
      subjectCode: 'CS302',
      subjectName: 'Database Management Systems',
      faculty: 'Dr. Michael Chang',
      department: 'Computer Science & Engineering',
      semester: 'Semester 6',
      credits: 4,
      schedule: 'Tue, Thu 01:30 PM'
    });

    // 3. Seed Attendance
    console.log('📅 Seeding Attendance...');
    await Attendance.create({
      student: studentUser._id,
      subject: sub1._id,
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      attendedClasses: 28,
      totalClasses: 30
    });

    // 4. Seed Assignments
    console.log('📝 Seeding Assignments...');
    const asg1 = await Assignment.create({
      title: 'Full Stack MERN Architecture & REST API Design',
      description: 'Design and implement a scalable Node.js Express REST API with MongoDB Atlas Mongoose models, JWT authentication, and CORS middleware.',
      instructions: '1. Create clean modular controllers.\n2. Add Mongoose validation.',
      subject: sub1._id,
      subjectCode: 'CS301',
      assignedDate: '2026-09-28',
      dueDate: '2026-10-15',
      maxMarks: 100,
      createdBy: facultyUser._id
    });

    // 5. Seed Submissions
    console.log('📤 Seeding Submissions...');
    await Submission.create({
      assignment: asg1._id,
      student: studentUser._id,
      studentIdStr: 'STU-2026-042',
      studentName: 'Alex Morgan',
      assignmentTitle: 'Full Stack MERN Architecture & REST API Design',
      fileName: 'AlexMorgan_MERN_Submission.pdf',
      fileUrl: 'http://localhost:5000/uploads/submissions/AlexMorgan_MERN_Submission.pdf',
      fileType: 'application/pdf',
      fileSize: '3.4 MB',
      submittedAt: '2026-10-01 14:32',
      status: 'Submitted',
      grade: 'Pending'
    });

    // 6. Seed Announcements
    console.log('📢 Seeding Announcements...');
    await Announcement.create({
      title: 'End-Semester Examination Schedule & Regulations Fall 2026',
      description: 'The final timetable for Fall 2026 End-Semester Examinations has been published.',
      category: 'Examination',
      priority: 'High',
      createdBy: adminUser._id,
      author: 'Controller of Examinations'
    });

    // 7. Seed Events
    console.log('🎉 Seeding Events...');
    await Event.create({
      title: 'HackConnect 2026 — 24-Hour Annual Inter-College Hackathon',
      description: 'Compete in AI and Open Source tracks.',
      date: '2026-10-24',
      time: '09:00 AM',
      location: 'Innovation Hub Block B',
      category: 'Technical',
      organizer: 'ACM Student Chapter',
      capacity: 250
    });

    // 8. Seed Requests
    console.log('🎫 Seeding Grievance Requests...');
    await Request.create({
      student: studentUser._id,
      ticketId: 'REQ-2026-104',
      type: 'Academic',
      subject: 'Course Credit Overlap Adjustment Request for CS303',
      description: 'Lab session conflicts with tutorial batch.',
      priority: 'High',
      status: 'In Progress',
      response: 'Under review by Academic Dean.'
    });

    console.log('✅ Database Seeding Completed Successfully!');
    console.log('\n🔐 Development Credentials Seeded:');
    console.log('   Admin:   admin@campusconnect.edu / password123');
    console.log('   Faculty: s.jenkins@campusconnect.edu / password123');
    console.log('   Student: alex.morgan@campusconnect.edu / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
