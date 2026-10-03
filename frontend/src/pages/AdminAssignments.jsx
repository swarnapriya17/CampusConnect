import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { FileCheck2, Plus, Edit2, Trash2, Eye, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import Modal, { ConfirmDialog } from '../components/Modal';
import Input, { Select, Textarea } from '../components/Input';

export function AdminAssignments() {
  const { assignments, subjects, addAssignment, updateAssignment, deleteAssignment } = useData();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingAsg, setEditingAsg] = useState(null);
  const [deletingAsg, setDeletingAsg] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subjectCode: subjects[0]?.code || 'CS301',
    subjectName: subjects[0]?.name || 'Advanced Web Development',
    faculty: 'Prof. Sarah Jenkins',
    description: '',
    instructions: '',
    assignedDate: new Date().toISOString().split('T')[0],
    dueDate: '2026-10-25',
    maxMarks: 100
  });

  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.subjectCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      addToast('Please enter title and description.', 'error');
      return;
    }
    const created = addAssignment(formData);
    addToast(`Assignment '${created.title}' created!`, 'success');
    setIsAddOpen(false);
    setFormData({
      title: '',
      subjectCode: subjects[0]?.code || 'CS301',
      subjectName: subjects[0]?.name || 'Advanced Web Development',
      faculty: 'Prof. Sarah Jenkins',
      description: '',
      instructions: '',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: '2026-10-25',
      maxMarks: 100
    });
  };

  const handleDeleteConfirm = () => {
    deleteAssignment(deletingAsg.id);
    addToast(`Assignment '${deletingAsg.title}' deleted.`, 'info');
    setDeletingAsg(null);
  };

  const columns = [
    { title: 'Subject', key: 'subjectCode', render: (val) => <span className="badge badge-primary">{val}</span> },
    { title: 'Assignment Title', key: 'title', render: (val) => <strong>{val}</strong> },
    { title: 'Faculty', key: 'faculty' },
    { title: 'Assigned Date', key: 'assignedDate' },
    { title: 'Due Date', key: 'dueDate' },
    { title: 'Max Marks', key: 'maxMarks', render: (val) => `${val} Points` },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button variant="outline" size="sm" icon={FileText} onClick={() => navigate('/admin/submissions')}>
            Submissions
          </Button>
          <Button variant="danger" size="sm" icon={Trash2} onClick={() => setDeletingAsg(row)}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Course Assignments Management"
        subtitle="Create, edit, and publish coursework tasks and evaluation deadlines."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search assignment title..." />
            <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsAddOpen(true)}>
              Create Assignment
            </Button>
          </div>
        }
      />

      <Table columns={columns} data={filteredAssignments} keyField="id" />

      {/* Create Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Create New Course Assignment"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddSubmit}>Publish Assignment</Button>
          </>
        }
      >
        <form onSubmit={handleAddSubmit}>
          <Select
            label="Target Subject"
            options={subjects.map((s) => ({ value: s.code, label: `${s.code} — ${s.name}` }))}
            value={formData.subjectCode}
            onChange={(e) => {
              const sub = subjects.find((s) => s.code === e.target.value);
              setFormData({ ...formData, subjectCode: e.target.value, subjectName: sub?.name || '' });
            }}
            required
          />

          <Input label="Assignment Title" placeholder="e.g. REST API Architecture Task" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />

          <Textarea label="Short Description" rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />

          <Textarea label="Detailed Instructions" rows={3} value={formData.instructions} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} required />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Input label="Due Date" type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} required />
            <Input label="Max Marks Points" type="number" value={formData.maxMarks} onChange={(e) => setFormData({ ...formData, maxMarks: parseInt(e.target.value) || 100 })} required />
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingAsg}
        onClose={() => setDeletingAsg(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Assignment"
        message={`Are you sure you want to delete '${deletingAsg?.title}'? All related student submission records will be removed.`}
        confirmText="Delete Assignment"
      />
    </div>
  );
}

export default AdminAssignments;
