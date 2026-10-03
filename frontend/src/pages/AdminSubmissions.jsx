import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { FileText, Download, CheckCircle2, Search, Eye } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import { FilterControls } from '../components/ProgressBar';
import Modal from '../components/Modal';

export function AdminSubmissions() {
  const { submissions } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch =
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.fileName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { title: 'Student Name', key: 'studentName', render: (val, row) => <div><strong>{val}</strong><br/><span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)' }}>{row.studentId}</span></div> },
    { title: 'Assignment Title', key: 'assignmentTitle' },
    { title: 'Submitted Date', key: 'submittedDate' },
    { title: 'Submitted File', key: 'fileName', render: (val, row) => <div style={{ fontSize: 'var(--text-xs)' }}>📄 <strong>{val}</strong> ({row.fileSize})</div> },
    { title: 'Status', key: 'status', render: (val) => <Badge variant={val === 'Submitted' ? 'success' : val === 'Late' ? 'danger' : 'warning'}>{val}</Badge> },
    { title: 'Grade Score', key: 'grade', render: (val) => <Badge variant="neutral">{val}</Badge> },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button variant="outline" size="sm" icon={Eye} onClick={() => setSelectedSubmission(row)}>
            View Details
          </Button>
          <Button variant="primary" size="sm" icon={Download} onClick={() => addToast(`Downloading file ${row.fileName}`, 'info')}>
            Download File
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Student Assignment Submissions"
        subtitle="Review uploaded student coursework, inspect metadata, download files, and evaluate grades."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search student name, ID or file..." />
            <FilterControls
              options={['All', 'Submitted', 'Late', 'Pending', 'Overdue']}
              activeFilter={statusFilter}
              onSelectFilter={setStatusFilter}
              label="Status"
            />
          </div>
        }
      />

      <Table columns={columns} data={filteredSubmissions} keyField="id" />

      {/* Submission Details Modal */}
      {selectedSubmission && (
        <Modal
          isOpen={!!selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          title={`Submission Details: ${selectedSubmission.studentName}`}
          footer={
            <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
              Close Detail View
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
            <div><strong>Student:</strong> {selectedSubmission.studentName} ({selectedSubmission.studentId})</div>
            <div><strong>Department:</strong> {selectedSubmission.department}</div>
            <div><strong>Assignment:</strong> {selectedSubmission.assignmentTitle}</div>
            <div><strong>Submitted At:</strong> {selectedSubmission.submittedDate}</div>
            <div><strong>Uploaded File:</strong> {selectedSubmission.fileName} ({selectedSubmission.fileSize})</div>
            <div><strong>Submission Status:</strong> <Badge variant="success">{selectedSubmission.status}</Badge></div>
            {selectedSubmission.feedback && (
              <div style={{ backgroundColor: 'var(--color-slate-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                <strong>Faculty Feedback:</strong> {selectedSubmission.feedback}
              </div>
            )}
            <div style={{ marginTop: 'var(--space-2)' }}>
              <Button variant="primary" size="sm" icon={Download} onClick={() => addToast(`Downloading ${selectedSubmission.fileName}`, 'success')}>
                Download Submitted File ({selectedSubmission.fileSize})
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AdminSubmissions;
