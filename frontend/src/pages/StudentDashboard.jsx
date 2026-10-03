import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  BookOpen,
  CalendarCheck2,
  FileCheck2,
  Calendar,
  Clock,
  ArrowRight,
  Megaphone,
  PlusCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import { StatCard, Card } from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';

export function StudentDashboard() {
  const { user } = useAuth();
  const { subjects, attendance, assignments, announcements, events } = useData();
  const navigate = useNavigate();

  // Metric calculations
  const totalSubjects = subjects.length;
  const overallAttPct = (
    attendance.reduce((acc, curr) => acc + curr.percentage, 0) / (attendance.length || 1)
  ).toFixed(1);

  const pendingAssignments = assignments.filter((a) => a.status === 'Pending').length;
  const upcomingEventsCount = events.filter((e) => e.timeStatus === 'Upcoming').length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div>
      <PageHeader
        title={`${getGreeting()}, ${user?.name || 'Alex Morgan'}`}
        subtitle={`Welcome back to your CampusConnect student workspace. Here is your academic overview.`}
        breadcrumb={false}
      />

      {/* Summary Stat Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-8)'
      }}>
        <StatCard
          title="Total Subjects"
          value={totalSubjects}
          subtitle={`${user?.department || 'Computer Science'}`}
          icon={BookOpen}
          color="primary"
        />
        <StatCard
          title="Overall Attendance"
          value={`${overallAttPct}%`}
          subtitle={parseFloat(overallAttPct) >= 75 ? 'Good Academic Standing' : 'Below 75% Threshold'}
          icon={CalendarCheck2}
          color={parseFloat(overallAttPct) >= 75 ? 'success' : 'warning'}
        />
        <StatCard
          title="Pending Assignments"
          value={pendingAssignments}
          subtitle={`${assignments.length} total assigned`}
          icon={FileCheck2}
          color={pendingAssignments > 0 ? 'warning' : 'success'}
        />
        <StatCard
          title="Upcoming Events"
          value={upcomingEventsCount}
          subtitle="Campus activity schedule"
          icon={Calendar}
          color="primary"
        />
      </div>

      {/* Main Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        
        {/* Upcoming Assignments Card */}
        <Card
          title="Upcoming Assignments"
          subtitle="Action required before due dates"
          action={
            <Link to="/student/assignments" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowRight size={14} />
            </Link>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {assignments.slice(0, 3).map((asg) => (
              <div
                key={asg.id}
                onClick={() => navigate(`/student/assignments/${asg.id}`)}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-slate-50)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary-400)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-subtle)')}
              >
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-slate-900)' }}>
                    {asg.title}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <span>{asg.subjectCode}</span>
                    <span>&bull;</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> Due: {asg.dueDate}
                    </span>
                  </div>
                </div>
                <Badge variant={asg.status === 'Submitted' ? 'success' : asg.status === 'Overdue' ? 'danger' : 'warning'}>
                  {asg.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Announcements Card */}
        <Card
          title="Recent Announcements"
          subtitle="Latest college & department updates"
          action={
            <Link to="/student/announcements" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowRight size={14} />
            </Link>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {announcements.slice(0, 3).map((anc) => (
              <div
                key={anc.id}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-slate-50)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary-700)' }}>
                    {anc.category}
                  </span>
                  <Badge variant={anc.priority === 'High' ? 'danger' : 'neutral'} size="sm">
                    {anc.priority} Priority
                  </Badge>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-slate-900)' }}>
                  {anc.title}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-400)', marginTop: '4px' }}>
                  Posted: {anc.date} &bull; By {anc.author}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Secondary Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Upcoming Events Card */}
        <Card
          title="Upcoming Campus Events"
          subtitle="Conferences, hackathons, and cultural fests"
          action={
            <Link to="/student/events" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowRight size={14} />
            </Link>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {events.filter(e => e.timeStatus === 'Upcoming').slice(0, 2).map((evt) => (
              <div key={evt.id} style={{ padding: 'var(--space-3)', borderLeft: '4px solid var(--color-primary-600)', backgroundColor: 'var(--color-slate-50)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-slate-900)' }}>
                  {evt.name}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-600)', marginTop: '4px' }}>
                  📅 {evt.date} &bull; 📍 {evt.location}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions Panel */}
        <Card title="Quick Actions" subtitle="Frequently used shortcuts">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Button
              variant="outline"
              size="sm"
              icon={CalendarCheck2}
              onClick={() => navigate('/student/attendance')}
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            >
              View Attendance
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={FileCheck2}
              onClick={() => navigate('/student/assignments')}
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            >
              View Assignments
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={Calendar}
              onClick={() => navigate('/student/events')}
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            >
              View Events
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={PlusCircle}
              onClick={() => navigate('/student/requests')}
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            >
              Submit Request
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StudentDashboard;
