import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { BookOpen, User, Calendar, Award, LayoutGrid, List } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge';

export function StudentSubjects() {
  const { subjects } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or table

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.faculty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { title: 'Subject Code', key: 'code', render: (val) => <strong>{val}</strong> },
    { title: 'Subject Name', key: 'name' },
    { title: 'Faculty', key: 'faculty' },
    { title: 'Credits', key: 'credits', render: (val) => <Badge variant="primary">{val} Credits</Badge> },
    { title: 'Semester', key: 'semester' },
    { title: 'Schedule', key: 'schedule' }
  ];

  return (
    <div>
      <PageHeader
        title="Enrolled Subjects"
        subtitle="Course details, faculty instructors, credits, and weekly class schedules."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search subject code or faculty..." />
            <div style={{ display: 'flex', backgroundColor: 'var(--color-slate-100)', padding: '3px', borderRadius: 'var(--radius-md)' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  border: 'none',
                  backgroundColor: viewMode === 'grid' ? '#ffffff' : 'transparent',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <LayoutGrid size={16} style={{ color: viewMode === 'grid' ? 'var(--color-primary-900)' : 'var(--color-slate-500)' }} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                style={{
                  border: 'none',
                  backgroundColor: viewMode === 'table' ? '#ffffff' : 'transparent',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <List size={16} style={{ color: viewMode === 'table' ? 'var(--color-primary-900)' : 'var(--color-slate-500)' }} />
              </button>
            </div>
          </div>
        }
      />

      {viewMode === 'table' ? (
        <Table columns={columns} data={filteredSubjects} keyField="id" />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {filteredSubjects.map((sub) => (
            <Card key={sub.id} hover>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                <span className="badge badge-primary">{sub.code}</span>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-slate-500)' }}>
                  {sub.semester}
                </span>
              </div>

              <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-primary-950)', margin: '0 0 var(--space-3) 0', fontWeight: 'var(--font-weight-semibold)' }}>
                {sub.name}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-slate-600)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <User size={14} style={{ color: 'var(--color-primary-600)' }} />
                  <span><strong>Faculty:</strong> {sub.faculty}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Award size={14} style={{ color: 'var(--color-primary-600)' }} />
                  <span><strong>Credits:</strong> {sub.credits} Course Credits</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Calendar size={14} style={{ color: 'var(--color-primary-600)' }} />
                  <span><strong>Schedule:</strong> {sub.schedule}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentSubjects;
