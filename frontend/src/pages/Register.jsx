import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Lock, Building, BookOpen, UserPlus } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Card from '../components/Card';

export function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rollNo: '',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(formData.email, formData.password, 'student');
      addToast('Registration successful! Welcome to CampusConnect.', 'success');
      setLoading(false);
      navigate('/student/dashboard');
    }, 800);
  };

  return (
    <Card style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', margin: '0 0 var(--space-1) 0', color: 'var(--color-primary-950)' }}>
          Create Student Account
        </h2>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', margin: 0 }}>
          Register your details to join your college department portal.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          icon={User}
          placeholder="e.g. Alex Morgan"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          required
        />

        <Input
          label="Student Email"
          type="email"
          icon={Mail}
          placeholder="student@campusconnect.edu"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
          <Input
            label="Roll Number / Student ID"
            icon={BookOpen}
            placeholder="21CS042"
            value={formData.rollNo}
            onChange={(e) => handleChange('rollNo', e.target.value)}
            required
          />

          <Select
            label="Academic Year"
            options={['1st Year', '2nd Year', '3rd Year', '4th Year']}
            value={formData.year}
            onChange={(e) => handleChange('year', e.target.value)}
            required
          />
        </div>

        <Select
          label="Department"
          options={[
            'Computer Science & Engineering',
            'Electronics & Communication',
            'Mechanical Engineering',
            'Civil Engineering',
            'Information Technology'
          ]}
          value={formData.department}
          onChange={(e) => handleChange('department', e.target.value)}
          required
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            icon={Lock}
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          icon={UserPlus}
          isLoading={loading}
          style={{ width: '100%', marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}
        >
          Complete Registration
        </Button>
      </form>

      <div style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-4)' }}>
        Already registered?{' '}
        <Link to="/login" style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary-700)' }}>
          Sign In Here
        </Link>
      </div>
    </Card>
  );
}

export default Register;
