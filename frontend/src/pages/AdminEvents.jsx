import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { Calendar, Plus, Edit2, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import Modal, { ConfirmDialog } from '../components/Modal';
import Input, { Select, Textarea } from '../components/Input';

export function AdminEvents() {
  const { events, addEvent, deleteEvent } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deletingEvt, setDeletingEvt] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    date: '2026-11-20',
    time: '10:00 AM - 04:00 PM',
    location: 'Main University Auditorium',
    organizer: 'Department of Student Affairs',
    category: 'Technical',
    description: '',
    capacity: 300
  });

  const categories = ['Academic', 'Cultural', 'Technical', 'Sports'];

  const filteredEvents = events.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location) {
      addToast('Please enter event name and location.', 'error');
      return;
    }
    addEvent(formData);
    addToast(`Event '${formData.name}' created successfully!`, 'success');
    setIsAddOpen(false);
    setFormData({ name: '', date: '2026-11-20', time: '10:00 AM - 04:00 PM', location: 'Main Auditorium', organizer: 'Student Affairs', category: 'Technical', description: '', capacity: 300 });
  };

  const handleDeleteConfirm = () => {
    deleteEvent(deletingEvt.id);
    addToast('Campus event cancelled/removed.', 'info');
    setDeletingEvt(null);
  };

  const columns = [
    { title: 'Date & Time', key: 'date', render: (val, row) => <div><strong>{val}</strong><br/><span style={{ fontSize: '11px', color: 'var(--color-slate-500)' }}>{row.time}</span></div> },
    { title: 'Event Name', key: 'name', render: (val) => <strong>{val}</strong> },
    { title: 'Category', key: 'category', render: (val) => <span className="badge badge-primary">{val}</span> },
    { title: 'Venue Location', key: 'location' },
    { title: 'Organizer', key: 'organizer' },
    { title: 'Status', key: 'timeStatus', render: (val) => <Badge variant={val === 'Upcoming' ? 'success' : 'neutral'}>{val}</Badge> },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, row) => (
        <Button variant="danger" size="sm" icon={Trash2} onClick={() => setDeletingEvt(row)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Campus Event Schedule Management"
        subtitle="Organize, publish, and schedule institutional conferences, cultural events, and hackathons."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search event name..." />
            <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsAddOpen(true)}>
              Schedule New Event
            </Button>
          </div>
        }
      />

      <Table columns={columns} data={filteredEvents} keyField="id" />

      {/* Create Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Schedule New Campus Event"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddSubmit}>Publish Event</Button>
          </>
        }
      >
        <form onSubmit={handleAddSubmit}>
          <Input label="Event Name" placeholder="e.g. AI & Robotics Symposium" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Select label="Category" options={categories} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
            <Input label="Capacity Limit" type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 300 })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Input label="Event Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
            <Input label="Time Schedule" placeholder="10:00 AM - 04:00 PM" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />
          </div>
          <Input label="Venue / Location" placeholder="Auditorium Block A" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
          <Input label="Organizer Entity" value={formData.organizer} onChange={(e) => setFormData({ ...formData, organizer: e.target.value })} />
          <Textarea label="Event Overview & Details" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingEvt}
        onClose={() => setDeletingEvt(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Event"
        message={`Are you sure you want to remove event '${deletingEvt?.name}'?`}
        confirmText="Remove Event"
      />
    </div>
  );
}

export default AdminEvents;
