import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Protection Wrappers
import { ProtectedRoute, RoleProtectedRoute } from './components/ProtectedRoute';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import StudentSubjects from './pages/StudentSubjects';
import StudentAttendance from './pages/StudentAttendance';
import StudentAssignments from './pages/StudentAssignments';
import StudentAssignmentDetail from './pages/StudentAssignmentDetail';
import StudentAnnouncements from './pages/StudentAnnouncements';
import StudentEvents from './pages/StudentEvents';
import StudentRequests from './pages/StudentRequests';

// Admin / Faculty Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminStudents from './pages/AdminStudents';
import AdminSubjects from './pages/AdminSubjects';
import AdminAttendance from './pages/AdminAttendance';
import AdminAssignments from './pages/AdminAssignments';
import AdminSubmissions from './pages/AdminSubmissions';
import AdminAnnouncements from './pages/AdminAnnouncements';
import AdminEvents from './pages/AdminEvents';
import AdminRequests from './pages/AdminRequests';

function IndexRedirect() {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role === 'student') return <Navigate to="/student/dashboard" replace />;
  return <Navigate to="/admin/dashboard" replace />;
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Routes>
              {/* Root redirect */}
              <Route path="/" element={<IndexRedirect />} />

              {/* Public Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Protected Workspace Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>

                  {/* Student Protected Portal Routes */}
                  <Route element={<RoleProtectedRoute allowedRoles={['student']} />}>
                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                    <Route path="/student/profile" element={<StudentProfile />} />
                    <Route path="/student/subjects" element={<StudentSubjects />} />
                    <Route path="/student/attendance" element={<StudentAttendance />} />
                    <Route path="/student/assignments" element={<StudentAssignments />} />
                    <Route path="/student/assignments/:id" element={<StudentAssignmentDetail />} />
                    <Route path="/student/announcements" element={<StudentAnnouncements />} />
                    <Route path="/student/events" element={<StudentEvents />} />
                    <Route path="/student/requests" element={<StudentRequests />} />
                  </Route>

                  {/* Admin & Faculty Protected Portal Routes */}
                  <Route element={<RoleProtectedRoute allowedRoles={['admin', 'faculty']} />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/students" element={<AdminStudents />} />
                    <Route path="/admin/subjects" element={<AdminSubjects />} />
                    <Route path="/admin/attendance" element={<AdminAttendance />} />
                    <Route path="/admin/assignments" element={<AdminAssignments />} />
                    <Route path="/admin/submissions" element={<AdminSubmissions />} />
                    <Route path="/admin/announcements" element={<AdminAnnouncements />} />
                    <Route path="/admin/events" element={<AdminEvents />} />
                    <Route path="/admin/requests" element={<AdminRequests />} />
                  </Route>

                </Route>
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<IndexRedirect />} />
            </Routes>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
