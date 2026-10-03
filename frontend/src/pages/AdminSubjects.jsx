import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { BookOpen, Plus, Edit2, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import Modal, { ConfirmDialog } from '../components/Modal';
import Input, { Select } from '../components/Input';

export function AdminSubjects() {
  const { subjects, addSubject, updateSubject, deleteSubject } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [deletingSubject, setDeletingSubject] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    faculty: '',
    credits: 3,
    semester: 'Semester 6',
    department: 'Computer Science & Engineering',
    schedule: 'Mon, Wed 10:00 AM'
  });

  const filteredSubjects = subjects.filter(
    (s) =>
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.faculty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.name) {
      addToast('Please enter subject code and title.', 'error');
      return;
    }
    addSubject(formData);
    addToast(`Subject ${formData.code} added successfully!`, 'success');
    setIsAddOpen(false);
    setFormData({ code: '', name: '', faculty: '', credits: 3, semester: 'Semester 6', department: 'Computer Science & Engineering', schedule: 'Mon, Wed 10:00 AM' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateSubject(editingSubject.id, editingSubject);
    addToast('Subject details updated.', 'success');
    setEditingSubject(null);
  };

  const handleDeleteConfirm = () => {
    deleteSubject(deletingSubject.id);
    addToast(`Subject ${deletingSubject.code} removed.`, 'info');
    setDeletingSubject(null);
  };

  const columns = [
    { title: 'Code', key: 'code', render: (val) => <strong>{val}</strong> },
    { title: 'Subject Title', key: 'name' },
    { title: 'Assigned Instructor', key: 'faculty' },
    { title: 'Credits', key: 'credits', render: (val) => <Badge variant="primary">{val} Credits</Badge> },
    { title: 'Semester', key: 'semester' },
    { title: 'Weekly Schedule', key: 'schedule' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button variant="outline" size="sm" icon={Edit2} onClick={() => setEditingSubject({ ...row })}>
            Edit
          </Button>
          <Button variant="danger" size="sm" icon={Trash2} onClick={() => setDeletingSubject(row)}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Subject & Curriculum Management"
        subtitle="Configure department courses, credit allocations, and faculty assignments."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search subject code..." />
            <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsAddOpen(true)}>
              Add New Subject
            </Button>
          </div>
        }
      />

      <Table columns={columns} data={filteredSubjects} keyField="id" />

      {/* Add Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Academic Subject"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddSubmit}>Save Subject</Button>
          </>
        }
      >
        <form onSubmit={handleAddSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Input label="Subject Code" placeholder="e.g. CS306" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} required />
            <Input label="Credits" type="number" value={formData.credits} onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 3 })} required />
          </div>
          <Input label="Subject Title" placeholder="e.g. Artificial Intelligence" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <Input label="Faculty Instructor" placeholder="Prof. Sarah Jenkins" value={formData.faculty} onChange={(e) => setFormData({ ...formData, faculty: e.target.value })} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Select label="Semester" options={['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8']} value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: e.target.value })} />
            <Input label="Schedule" placeholder="Tue, Thu 10:00 AM" value={formData.schedule} onChange={(e) => setFormData({ ...formData, schedule: e.target.value })} />
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      {editingSubject && (
        <Modal
          isOpen={!!editingSubject}
          onClose={() => setEditingSubject(null)}
          title={`Edit Subject: ${editingSubject.code}`}
          footer={
            <>
              <Button variant="outline" onClick={() => setEditingSubject(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleEditSubmit}>Update Subject</Button>
            </>
          }
        >
          <form onSubmit={handleEditSubmit}>
            <Input label="Subject Code" value={editingSubject.code} onChange={(e) => setEditingSubject({ ...editingSubject, code: e.target.value })} required />
            <Input label="Subject Title" value={editingSubject.name} onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })} required />
            <Input label="Faculty Instructor" value={editingSubject.faculty} onChange={(e) => setEditingSubject({ ...editingSubject, faculty: e.target.value })} required />
          </form>
        </Modal>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingSubject}
        onClose={() => setDeletingSubject(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Subject"
        message={`Are you sure you want to remove ${deletingSubject?.code} — ${deletingSubject?.name}?`}
        confirmText="Remove Subject"
      />
    </div>
  );
}

export default AdminSubjects;
