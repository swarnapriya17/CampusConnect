import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { Megaphone, Plus, Edit2, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import Modal, { ConfirmDialog } from '../components/Modal';
import Input, { Select, Textarea } from '../components/Input';

export function AdminAnnouncements() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deletingAnc, setDeletingAnc] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Academic',
    priority: 'Medium',
    author: 'Office of Academic Affairs'
  });

  const categories = ['Academic', 'Examination', 'General', 'Placement', 'Event', 'Important'];

  const filteredAnnouncements = announcements.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      addToast('Please enter title and description.', 'error');
      return;
    }
    addAnnouncement(formData);
    addToast('Notice published successfully!', 'success');
    setIsAddOpen(false);
    setFormData({ title: '', description: '', category: 'Academic', priority: 'Medium', author: 'Office of Academic Affairs' });
  };

  const handleDeleteConfirm = () => {
    deleteAnnouncement(deletingAnc.id);
    addToast('Announcement notice removed.', 'info');
    setDeletingAnc(null);
  };

  const columns = [
    { title: 'Date Posted', key: 'date' },
    { title: 'Notice Title', key: 'title', render: (val) => <strong>{val}</strong> },
    { title: 'Category', key: 'category', render: (val) => <span className="badge badge-primary">{val}</span> },
    { title: 'Priority', key: 'priority', render: (val) => <Badge variant={val === 'High' ? 'danger' : 'neutral'}>{val}</Badge> },
    { title: 'Author / Dept', key: 'author' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, row) => (
        <Button variant="danger" size="sm" icon={Trash2} onClick={() => setDeletingAnc(row)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Announcement Publishing Management"
        subtitle="Broadcast campus notices, circulars, exam alerts, and placement news."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search announcement title..." />
            <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsAddOpen(true)}>
              Publish Notice
            </Button>
          </div>
        }
      />

      <Table columns={columns} data={filteredAnnouncements} keyField="id" />

      {/* Create Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Publish Campus Announcement"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddSubmit}>Publish Notice</Button>
          </>
        }
      >
        <form onSubmit={handleAddSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Select label="Category" options={categories} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
            <Select label="Priority Level" options={['Low', 'Medium', 'High']} value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} required />
          </div>
          <Input label="Notice Title" placeholder="e.g. Mid-Term Examination Schedule Released" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          <Textarea label="Notice Description & Details" rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
          <Input label="Author Department / Designation" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingAnc}
        onClose={() => setDeletingAnc(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Announcement"
        message={`Are you sure you want to delete notice '${deletingAnc?.title}'?`}
        confirmText="Remove Notice"
      />
    </div>
  );
}

export default AdminAnnouncements;
