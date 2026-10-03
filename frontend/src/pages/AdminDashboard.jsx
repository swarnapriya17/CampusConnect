import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  Users,
  BookOpen,
  FileCheck2,
  Calendar,
  MessageSquareWarning,
  FileText,
  Plus,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card, { StatCard } from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

export function AdminDashboard() {
  const { user, role } = useAuth();
  const { students, subjects, assignments, submissions, events, requests } = useData();
  const navigate = useNavigate();

  const totalStudents = students.length;
  const totalSubjects = subjects.length;
  const activeAssignments = assignments.filter((a) => a.status !== 'Submitted').length;
  const upcomingEvents = events.filter((e) => e.timeStatus === 'Upcoming').length;
  const pendingRequests = requests.filter((r) => r.status === 'Pending' || r.status === 'In Progress').length;
  const pendingSubmissions = submissions.filter((s) => s.grade === 'Pending').length;

  return (
    <div>
      <PageHeader
        title={`${role === 'faculty' ? 'Faculty Portal' : 'Admin Operations Dashboard'}`}
        subtitle={`Logged in as ${user?.name} (${user?.title || 'System Administrator'}). Academic system overview.`}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="outline" size="sm" icon={FileText} onClick={() => navigate('/admin/submissions')}>
              Review Submissions
            </Button>
            <Button variant="primary" size="sm" icon={Plus} onClick={() => navigate('/admin/assignments')}>
              Create Assignment
            </Button>
          </div>
        }
      />

      {/* Admin Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        <StatCard title="Total Students" value={totalStudents} subtitle="Enrolled in portal" icon={Users} color="primary" />
        <StatCard title="Active Courses" value={totalSubjects} subtitle="Running this semester" icon={BookOpen} color="primary" />
        <StatCard title="Active Assignments" value={activeAssignments} subtitle="Coursework tasks" icon={FileCheck2} color="warning" />
        <StatCard title="Upcoming Events" value={upcomingEvents} subtitle="Campus schedule" icon={Calendar} color="primary" />
        <StatCard title="Pending Requests" value={pendingRequests} subtitle="Grievance tickets" icon={MessageSquareWarning} color={pendingRequests > 0 ? 'danger' : 'success'} />
        <StatCard title="Ungraded Submissions" value={pendingSubmissions} subtitle="Needs faculty review" icon={FileText} color="warning" />
      </div>

      {/* Management Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Ungraded Submissions Preview */}
        <Card
          title="Recent Ungraded Submissions"
          subtitle="Assignments waiting for evaluation"
          action={
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/submissions')}>
              Manage All
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {submissions.slice(0, 3).map((subm) => (
              <div
                key={subm.id}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-slate-50)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-slate-900)' }}>
                    {subm.studentName} ({subm.studentId})
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', marginTop: '2px' }}>
                    {subm.assignmentTitle} &bull; File: {subm.fileName}
                  </div>
                </div>
                <Badge variant={subm.status === 'Late' ? 'danger' : 'warning'}>
                  {subm.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Grievance Requests */}
        <Card
          title="Pending Student Grievances"
          subtitle="Tickets requiring administrative action"
          action={
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/requests')}>
              View Tickets
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {requests.filter(r => r.status !== 'Resolved').slice(0, 3).map((req) => (
              <div
                key={req.id}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-slate-50)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-slate-900)' }}>
                    {req.id}: {req.subject}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', marginTop: '2px' }}>
                    Category: {req.type} &bull; Submitted {req.date}
                  </div>
                </div>
                <Badge variant={req.status === 'In Progress' ? 'warning' : 'neutral'}>
                  {req.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
