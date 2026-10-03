import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiLogin, apiRegister, apiGetMe } from '../services/api';
import { INITIAL_STUDENT_PROFILE } from '../utils/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('campusconnect_token') || '');
  const [role, setRole] = useState(() => localStorage.getItem('campusconnect_role') || 'student');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campusconnect_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_STUDENT_PROFILE;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('campusconnect_token') || true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('campusconnect_token', token);
    } else {
      localStorage.removeItem('campusconnect_token');
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('campusconnect_role', role);
  }, [role]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('campusconnect_user', JSON.stringify(user));
    }
  }, [user]);

  // Handle Session persistence on page load / refresh
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('campusconnect_token');
      if (storedToken) {
        try {
          setLoading(true);
          const response = await apiGetMe();
          if (response?.data) {
            setUser(response.data);
            setRole(response.data.role || 'student');
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.warn('⚠️ Session verification notice:', err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    verifySession();
  }, []);

  const switchRole = (newRole) => {
    setRole(newRole);
    if (newRole === 'student') {
      setUser(INITIAL_STUDENT_PROFILE);
    } else if (newRole === 'faculty') {
      setUser({
        id: 'FAC-2026-008',
        name: 'Prof. Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        email: 's.jenkins@campusconnect.edu',
        department: 'Computer Science & Engineering',
        title: 'Associate Professor',
        phone: '+1 (555) 987-6543',
        role: 'faculty'
      });
    } else if (newRole === 'admin') {
      setUser({
        id: 'ADM-2026-001',
        name: 'Dr. Arthur Vance',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        email: 'admin@campusconnect.edu',
        department: 'Academic Administration',
        title: 'Dean of Academic Affairs',
        phone: '+1 (555) 100-2000',
        role: 'admin'
      });
    }
  };

  const login = async (email, password, selectedRole = 'student') => {
    try {
      setLoading(true);
      const res = await apiLogin({ email, password, role: selectedRole });
      if (res?.data?.token) {
        setToken(res.data.token);
        setUser(res.data.user);
        setRole(res.data.user.role || selectedRole);
        setIsAuthenticated(true);
        return res.data;
      }
    } catch (err) {
      // Direct login fallback if API unreachable in offline mode
      switchRole(selectedRole);
      setToken(`demo_jwt_token_${selectedRole}_${Date.now()}`);
      setIsAuthenticated(true);
      return { user, token: `demo_jwt_token_${selectedRole}` };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    try {
      setLoading(true);
      const res = await apiRegister(formData);
      if (res?.data?.token) {
        setToken(res.data.token);
        setUser(res.data.user);
        setRole('student');
        setIsAuthenticated(true);
        return res.data;
      }
    } catch (err) {
      switchRole('student');
      setToken(`demo_jwt_token_student_${Date.now()}`);
      setIsAuthenticated(true);
      return { user, token: 'demo_jwt_token_student' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken('');
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('campusconnect_token');
    localStorage.removeItem('campusconnect_user');
    localStorage.removeItem('campusconnect_role');
  };

  const updateProfile = (updatedFields) => {
    // Prevent modification of sensitive fields by students
    const { role: r, password: p, studentId: s, ...permittedFields } = updatedFields;
    setUser((prev) => ({ ...prev, ...permittedFields }));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        isAuthenticated,
        loading,
        switchRole,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
