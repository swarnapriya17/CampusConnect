import React from 'react';
import { useData } from '../context/DataContext';
import { CalendarCheck2, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card, { StatCard } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import Badge from '../components/Badge';

export function StudentAttendance() {
  const { attendance } = useData();

  const totalClassesAttended = attendance.reduce((acc, curr) => acc + curr.attendedClasses, 0);
  const totalClassesConducted = attendance.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const overallPct = ((totalClassesAttended / (totalClassesConducted || 1)) * 100).toFixed(1);

  const lowCount = attendance.filter((a) => a.status === 'Low').length;
  const warningCount = attendance.filter((a) => a.status === 'Warning').length;

  return (
    <div>
      <PageHeader
        title="Attendance Tracker"
        subtitle="Detailed subject-wise class attendance percentage and threshold status."
      />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        <StatCard
          title="Overall Attendance"
          value={`${overallPct}%`}
          subtitle={`${totalClassesAttended} of ${totalClassesConducted} total classes`}
          icon={CalendarCheck2}
          color={parseFloat(overallPct) >= 75 ? 'success' : 'danger'}
        />
        <StatCard
          title="Courses Above 75%"
          value={attendance.filter((a) => a.status === 'Good').length}
          subtitle="Meets exam hall ticket criteria"
          icon={CheckCircle2}
          color="success"
        />
        <StatCard
          title="Shortage Risk Courses"
          value={lowCount + warningCount}
          subtitle={`${lowCount} critical shortages (<65%)`}
          icon={AlertTriangle}
          color={lowCount > 0 ? 'danger' : 'warning'}
        />
      </div>

      {/* Subject Wise Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        {attendance.map((att) => (
          <Card key={att.id} hover>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <span className="badge badge-primary">{att.subjectCode}</span>
              <Badge
                variant={att.status === 'Good' ? 'success' : att.status === 'Warning' ? 'warning' : 'danger'}
              >
                {att.status === 'Good' ? 'Good Standing' : att.status === 'Warning' ? 'Warning (65-74%)' : 'Critical Shortage (<65%)'}
              </Badge>
            </div>

            <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-primary-950)', margin: '0 0 var(--space-1) 0', fontWeight: 'var(--font-weight-semibold)' }}>
              {att.subjectName}
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', margin: '0 0 var(--space-4) 0' }}>
              Instructor: {att.faculty}
            </p>

            {/* Attendance Progress Bar */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <ProgressBar value={att.attendedClasses} max={att.totalClasses} showLabel={false} height="10px" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-slate-600)', borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-3)' }}>
              <div>
                <span>Attended: </span>
                <strong>{att.attendedClasses} / {att.totalClasses} Classes</strong>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)', color: att.status === 'Good' ? 'var(--color-success-700)' : att.status === 'Warning' ? 'var(--color-warning-700)' : 'var(--color-danger-700)' }}>
                {att.percentage}%
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StudentAttendance;
