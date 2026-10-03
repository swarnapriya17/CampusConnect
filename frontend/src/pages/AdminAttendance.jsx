import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { CalendarCheck2, Check, X, Save, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { Select } from '../components/Input';

export function AdminAttendance() {
  const { subjects, students, updateAttendanceRecords } = useData();
  const { addToast } = useToast();

  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || 'sub-1');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Student statuses state: { [studentId]: 'Present' | 'Absent' }
  const [studentStatuses, setStudentStatuses] = useState(() => {
    const initial = {};
    students.forEach((s) => { initial[s.id] = 'Present'; });
    return initial;
  });

  const toggleStatus = (studentId) => {
    setStudentStatuses((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const markAll = (status) => {
    const updated = {};
    students.forEach((s) => { updated[s.id] = status; });
    setStudentStatuses(updated);
  };

  const handleSaveAttendance = () => {
    updateAttendanceRecords(selectedSubjectId, selectedDate, studentStatuses);
    const presentCount = Object.values(studentStatuses).filter((s) => s === 'Present').length;
    addToast(`Attendance recorded for ${presentCount} of ${students.length} students on ${selectedDate}.`, 'success');
  };

  const columns = [
    { title: 'Student ID', key: 'id', render: (val) => <strong>{val}</strong> },
    { title: 'Roll No', key: 'rollNo' },
    { title: 'Student Name', key: 'name' },
    { title: 'Department', key: 'department' },
    {
      title: 'Attendance Status',
      key: 'status',
      render: (_, row) => {
        const isPresent = studentStatuses[row.id] === 'Present';
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant={isPresent ? 'success' : 'outline'}
              size="sm"
              icon={Check}
              onClick={() => toggleStatus(row.id)}
            >
              Present
            </Button>
            <Button
              variant={!isPresent ? 'danger' : 'outline'}
              size="sm"
              icon={X}
              onClick={() => toggleStatus(row.id)}
            >
              Absent
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <PageHeader
        title="Attendance Entry Portal"
        subtitle="Record daily class attendance for course lectures and lab sessions."
        actions={
          <Button variant="primary" size="md" icon={Save} onClick={handleSaveAttendance}>
            Save Attendance Records
          </Button>
        }
      />

      {/* Selector Controls Card */}
      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)', alignItems: 'center' }}>
          <Select
            label="Select Subject"
            options={subjects.map((s) => ({ value: s.id, label: `${s.code} — ${s.name}` }))}
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
          />

          <div>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-slate-700)', display: 'block', marginBottom: '6px' }}>
              Lecture Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                fontSize: 'var(--text-sm)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-strong)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: '20px' }}>
            <Button variant="outline" size="sm" onClick={() => markAll('Present')}>
              Mark All Present
            </Button>
            <Button variant="outline" size="sm" onClick={() => markAll('Absent')}>
              Mark All Absent
            </Button>
          </div>
        </div>
      </Card>

      {/* Student List Table */}
      <Table columns={columns} data={students} keyField="id" />
    </div>
  );
}

export default AdminAttendance;
