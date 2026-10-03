import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { Users, UserPlus, Search, Edit2, Trash2, Eye } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import { FilterControls } from '../components/ProgressBar';
import Modal, { ConfirmDialog } from '../components/Modal';
import Input, { Select } from '../components/Input';

export function AdminStudents() {
  const { students, addStudent, updateStudent, deleteStudent } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    email: '',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    section: 'A'
  });

  const departments = ['All', 'Computer Science & Engineering', 'Electronics & Communication', 'Mechanical Engineering'];

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = deptFilter === 'All' || s.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast('Please provide student name and email.', 'error');
      return;
    }
    addStudent(formData);
    addToast('Student registered successfully.', 'success');
    setIsAddOpen(false);
    setFormData({ rollNo: '', name: '', email: '', department: 'Computer Science & Engineering', year: '3rd Year', section: 'A' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateStudent(editingStudent.id, editingStudent);
    addToast('Student record updated.', 'success');
    setEditingStudent(null);
  };

  const handleDeleteConfirm = () => {
    deleteStudent(deletingStudent.id);
    addToast(`Deleted record for ${deletingStudent.name}.`, 'info');
    setDeletingStudent(null);
  };

  const columns = [
    { title: 'Student ID', key: 'id', render: (val) => <strong>{val}</strong> },
    { title: 'Roll No', key: 'rollNo' },
    { title: 'Full Name', key: 'name' },
    { title: 'Email Address', key: 'email' },
    { title: 'Department', key: 'department' },
    { title: 'Year / Sec', key: 'year', render: (val, row) => `${val} (${row.section})` },
    { title: 'Attendance', key: 'attendance', render: (val) => <Badge variant={parseFloat(val) >= 75 ? 'success' : 'danger'}>{val}</Badge> },
    { title: 'Status', key: 'status', render: (val) => <Badge variant={val === 'Active' ? 'success' : 'neutral'}>{val}</Badge> },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button variant="outline" size="sm" icon={Edit2} onClick={() => setEditingStudent({ ...row })}>
            Edit
          </Button>
          <Button variant="danger" size="sm" icon={Trash2} onClick={() => setDeletingStudent(row)}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Student Directory & Governance"
        subtitle="Manage student enrollments, academic status, departments, and records."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search student name or ID..." />
            <FilterControls options={departments} activeFilter={deptFilter} onSelectFilter={setDeptFilter} label="Dept" />
            <Button variant="primary" size="sm" icon={UserPlus} onClick={() => setIsAddOpen(true)}>
              Register New Student
            </Button>
          </div>
        }
      />

      <Table columns={columns} data={filteredStudents} keyField="id" />

      {/* Add Student Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Register New Student"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddSubmit}>Save Student Record</Button>
          </>
        }
      >
        <form onSubmit={handleAddSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Input label="Roll Number" value={formData.rollNo} onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })} required />
            <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <Input label="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <Select label="Department" options={departments.filter(d => d !== 'All')} value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Select label="Year" options={['1st Year', '2nd Year', '3rd Year', '4th Year']} value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
            <Input label="Section" value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })} />
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      {editingStudent && (
        <Modal
          isOpen={!!editingStudent}
          onClose={() => setEditingStudent(null)}
          title={`Edit Record: ${editingStudent.name}`}
          footer={
            <>
              <Button variant="outline" onClick={() => setEditingStudent(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleEditSubmit}>Update Record</Button>
            </>
          }
        >
          <form onSubmit={handleEditSubmit}>
            <Input label="Full Name" value={editingStudent.name} onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })} required />
            <Input label="Email Address" type="email" value={editingStudent.email} onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })} required />
            <Select label="Status" options={['Active', 'On Leave', 'Graduated', 'Suspended']} value={editingStudent.status} onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value })} />
          </form>
        </Modal>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingStudent}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Student Record"
        message={`Are you sure you want to permanently delete record for ${deletingStudent?.name} (${deletingStudent?.id})? This action cannot be undone.`}
        confirmText="Delete Student"
      />
    </div>
  );
}

export default AdminStudents;
