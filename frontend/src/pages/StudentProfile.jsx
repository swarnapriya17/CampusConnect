import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Phone, Building, BookOpen, Edit2, Shield, Award } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';

export function StudentProfile() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    year: user?.year || '',
    section: user?.section || ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(editForm);
    addToast('Profile details updated successfully.', 'success');
    setIsEditOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="My Profile"
        subtitle="Manage personal, academic, and contact information."
        actions={
          <Button variant="primary" size="sm" icon={Edit2} onClick={() => setIsEditOpen(true)}>
            Edit Profile
          </Button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        {/* Main Info Card */}
        <Card style={{ textAlign: 'center' }}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid var(--color-primary-100)',
              margin: '0 auto var(--space-4) auto'
            }}
          />
          <h2 style={{ fontSize: 'var(--text-xl)', margin: '0 0 4px 0', color: 'var(--color-primary-950)' }}>
            {user?.name}
          </h2>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary-700)', backgroundColor: 'var(--color-primary-50)', padding: '2px 10px', borderRadius: 'var(--radius-full)' }}>
            {user?.id || 'STU-2026-042'} &bull; {user?.rollNo || '21CS042'}
          </span>

          <div style={{ margin: 'var(--space-6) 0 0 0', borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-4)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', textAlign: 'left', fontSize: 'var(--text-xs)' }}>
            <div>
              <span style={{ color: 'var(--color-slate-500)' }}>Current Cumulative GPA</span>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-900)' }}>
                {user?.gpa || '3.84'} / 4.0
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--color-slate-500)' }}>Academic Advisor</span>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-slate-800)', marginTop: '2px' }}>
                {user?.advisor || 'Dr. Robert Vance'}
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Fields Card */}
        <Card title="Academic & Contact Details">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building size={18} />
              </div>
              <div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)' }}>Department</span>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-slate-900)' }}>
                  {user?.department}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={18} />
              </div>
              <div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)' }}>Year & Section</span>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-slate-900)' }}>
                  {user?.year} &bull; Section {user?.section}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={18} />
              </div>
              <div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)' }}>Email Address</span>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-slate-900)' }}>
                  {user?.email}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={18} />
              </div>
              <div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)' }}>Contact Phone</span>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-slate-900)' }}>
                  {user?.phone}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Profile Information"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Profile Changes
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave}>
          <Input
            label="Full Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            required
          />
          <Input
            label="Contact Phone"
            value={editForm.phone}
            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <Input
              label="Academic Year"
              value={editForm.year}
              onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
            />
            <Input
              label="Section"
              value={editForm.section}
              onChange={(e) => setEditForm({ ...editForm, section: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default StudentProfile;
