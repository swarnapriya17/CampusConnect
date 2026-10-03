import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { MessageSquareWarning, CheckCircle2, Clock, Edit2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import { FilterControls } from '../components/ProgressBar';
import Modal from '../components/Modal';
import { Select, Textarea } from '../components/Input';

export function AdminRequests() {
  const { requests, updateRequestStatus } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [newStatus, setNewStatus] = useState('In Progress');
  const [responseText, setResponseText] = useState('');

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenReview = (req) => {
    setSelectedRequest(req);
    setNewStatus(req.status);
    setResponseText(req.response || '');
  };

  const handleSaveResolution = (e) => {
    e.preventDefault();
    updateRequestStatus(selectedRequest.id, newStatus, responseText);
    addToast(`Updated status for ${selectedRequest.id} to '${newStatus}'`, 'success');
    setSelectedRequest(null);
  };

  const columns = [
    { title: 'Ticket ID', key: 'id', render: (val) => <span className="badge badge-primary">{val}</span> },
    { title: 'Date Submitted', key: 'date' },
    { title: 'Type', key: 'type' },
    { title: 'Subject Summary', key: 'subject', render: (val) => <strong>{val}</strong> },
    { title: 'Priority', key: 'priority', render: (val) => <Badge variant={val === 'High' ? 'danger' : 'neutral'}>{val}</Badge> },
    { title: 'Current Status', key: 'status', render: (val) => <Badge variant={val === 'Resolved' ? 'success' : val === 'In Progress' ? 'warning' : val === 'Rejected' ? 'danger' : 'neutral'}>{val}</Badge> },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, row) => (
        <Button variant="primary" size="sm" icon={Edit2} onClick={() => handleOpenReview(row)}>
          Review & Resolve
        </Button>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Student Grievance & Request Governance"
        subtitle="Manage student academic inquiries, IT issues, facility complaints, and status resolutions."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search ticket ID or subject..." />
            <FilterControls
              options={['All', 'Pending', 'In Progress', 'Resolved', 'Rejected']}
              activeFilter={statusFilter}
              onSelectFilter={setStatusFilter}
              label="Status"
            />
          </div>
        }
      />

      <Table columns={columns} data={filteredRequests} keyField="id" />

      {/* Review Modal */}
      {selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title={`Review Ticket: ${selectedRequest.id}`}
          footer={
            <>
              <Button variant="outline" onClick={() => setSelectedRequest(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveResolution}>Save Ticket Resolution</Button>
            </>
          }
        >
          <form onSubmit={handleSaveResolution}>
            <div style={{ backgroundColor: 'var(--color-slate-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-xs)' }}>
              <div><strong>Ticket Subject:</strong> {selectedRequest.subject}</div>
              <div style={{ marginTop: '4px' }}><strong>Category & Date:</strong> {selectedRequest.type} &bull; {selectedRequest.date}</div>
              <div style={{ marginTop: '6px', color: 'var(--color-slate-700)' }}><strong>Student Description:</strong> {selectedRequest.description}</div>
            </div>

            <Select
              label="Update Ticket Status"
              options={['Pending', 'In Progress', 'Resolved', 'Rejected']}
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              required
            />

            <Textarea
              label="Official Administration Response Note"
              rows={3}
              placeholder="Enter resolution details, meeting date, or action taken..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              required
            />
          </form>
        </Modal>
      )}
    </div>
  );
}

export default AdminRequests;
