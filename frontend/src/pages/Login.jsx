import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Mail, Lock, UserCheck, LogIn } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

export function Login() {
  const [email, setEmail] = useState('alex.morgan@campusconnect.edu');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState('student'); // student, faculty, admin
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login(email, password, selectedRole);
      addToast(`Welcome back! Logged in as ${selectedRole.toUpperCase()}`, 'success');
      setLoading(false);

      if (selectedRole === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    }, 600);
  };

  return (
    <Card style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', margin: '0 0 var(--space-1) 0', color: 'var(--color-primary-950)' }}>
          Sign In to Portal
        </h2>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', margin: 0 }}>
          Enter your academic credentials to access your workspace.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '4px',
        backgroundColor: 'var(--color-slate-100)',
        padding: '4px',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-6)'
      }}>
        {['student', 'faculty', 'admin'].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => {
              setSelectedRole(r);
              if (r === 'student') setEmail('alex.morgan@campusconnect.edu');
              else if (r === 'faculty') setEmail('s.jenkins@campusconnect.edu');
              else setEmail('admin@campusconnect.edu');
            }}
            style={{
              padding: '6px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              textTransform: 'capitalize',
              cursor: 'pointer',
              backgroundColor: selectedRole === r ? '#ffffff' : 'transparent',
              color: selectedRole === r ? 'var(--color-primary-900)' : 'var(--color-slate-600)',
              boxShadow: selectedRole === r ? 'var(--shadow-xs)' : 'none',
              transition: 'var(--transition-fast)'
            }}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Institutional Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', fontSize: 'var(--text-xs)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-slate-600)', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ borderRadius: '4px' }} />
            <span>Remember me</span>
          </label>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--color-primary-600)', fontWeight: 'var(--font-weight-medium)' }}>
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          icon={LogIn}
          isLoading={loading}
          style={{ width: '100%', marginBottom: 'var(--space-4)' }}
        >
          Sign In to Account
        </Button>
      </form>

      <div style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-4)' }}>
        New Student?{' '}
        <Link to="/register" style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary-700)' }}>
          Register Student Account
        </Link>
      </div>
    </Card>
  );
}

export default Login;
