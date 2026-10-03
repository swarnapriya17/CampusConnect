import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { MessageSquareWarning, PlusCircle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input, { Select, Textarea } from '../components/Input';
import SearchBar from '../components/SearchBar';
import { FilterControls } from '../components/ProgressBar';

export function StudentRequests() {
  const { requests, createRequest } = useData();
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [formData, setFormData] = useState({
    type: 'Academic',
    subject: '',
    description: '',
    priority: 'Medium'
  });

  const requestTypes = ['Academic', 'Infrastructure', 'Hostel', 'Library', 'IT Support', 'General'];

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.description.trim()) {
      addToast('Please fill out all required fields.', 'error');
      return;
    }

    const created = createRequest(formData);
    addToast(`Request ${created.id} submitted successfully!`, 'success');
    setIsModalOpen(false);
    setFormData({ type: 'Academic', subject: '', description: '', priority: 'Medium' });
  };

  return (
    <div>
      <PageHeader
        title="Requests & Complaints"
        subtitle="Submit academic, IT, or campus facility grievances and track administrative status."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search request ID or subject..." />
            <FilterControls
              options={['All', 'Pending', 'In Progress', 'Resolved', 'Rejected']}
              activeFilter={statusFilter}
              onSelectFilter={setStatusFilter}
              label="Status"
            />
            <Button variant="primary" size="sm" icon={PlusCircle} onClick={() => setIsModalOpen(true)}>
              Submit New Request
            </Button>
          </div>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filteredRequests.map((req) => (
          <Card key={req.id} hover>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="badge badge-primary">{req.id}</span>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-slate-600)' }}>
                  {req.type} Category
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-400)' }}>
                  &bull; Submitted: {req.date}
                </span>
              </div>

              <Badge
                variant={
                  req.status === 'Resolved'
                    ? 'success'
                    : req.status === 'In Progress'
                    ? 'warning'
                    : req.status === 'Rejected'
                    ? 'danger'
                    : 'neutral'
                }
              >
                {req.status}
              </Badge>
            </div>

            <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-primary-950)', margin: '0 0 var(--space-2) 0', fontWeight: 'var(--font-weight-bold)' }}>
              {req.subject}
            </h3>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-700)', margin: '0 0 var(--space-4) 0', lineHeight: 'var(--line-height-snug)' }}>
              {req.description}
            </p>

            {req.response && (
              <div style={{ backgroundColor: 'var(--color-slate-50)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-primary-600)', fontSize: 'var(--text-xs)' }}>
                <strong style={{ color: 'var(--color-primary-900)' }}>Official Admin Response:</strong>
                <p style={{ color: 'var(--color-slate-700)', margin: '2px 0 0 0' }}>{req.response}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* New Request Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit New Request / Complaint"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit Request Ticket
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Select
              label="Request Category"
              options={requestTypes}
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            />
            <Select
              label="Priority Level"
              options={['Low', 'Medium', 'High']}
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              required
            />
          </div>

          <Input
            label="Request Subject"
            placeholder="Brief subject summary..."
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />

          <Textarea
            label="Detailed Description & Context"
            rows={4}
            placeholder="Provide all relevant details, course codes, or room numbers..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </form>
      </Modal>
    </div>
  );
}

export default StudentRequests;
