import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { FileCheck2, Clock, CheckCircle2, AlertCircle, ArrowRight, Filter } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import { FilterControls } from '../components/ProgressBar';

export function StudentAssignments() {
  const { assignments } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  const filteredAssignments = assignments.filter((asg) => {
    const matchesSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.subjectName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || asg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <PageHeader
        title="My Assignments"
        subtitle="Coursework submissions, due dates, instructions, and upload portal."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search assignment title..." />
            <FilterControls
              options={['All', 'Pending', 'Submitted', 'Overdue']}
              activeFilter={statusFilter}
              onSelectFilter={setStatusFilter}
              label="Status"
            />
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)' }}>
        {filteredAssignments.map((asg) => (
          <Card key={asg.id} hover style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                <span className="badge badge-primary">{asg.subjectCode}</span>
                <Badge
                  variant={
                    asg.status === 'Submitted' ? 'success' : asg.status === 'Overdue' ? 'danger' : 'warning'
                  }
                >
                  {asg.status}
                </Badge>
              </div>

              <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-primary-950)', margin: '0 0 6px 0', fontWeight: 'var(--font-weight-semibold)' }}>
                {asg.title}
              </h3>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', margin: '0 0 var(--space-4) 0' }}>
                {asg.subjectName} &bull; {asg.faculty}
              </p>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-700)', marginBottom: 'var(--space-4)', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {asg.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> Due: <strong>{asg.dueDate}</strong>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate(`/student/assignments/${asg.id}`)}
              >
                View Details & Submit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StudentAssignments;
