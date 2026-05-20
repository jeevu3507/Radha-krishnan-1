import { useState } from 'react';
import Login from './components/Login';
import TeacherPortal from './components/teacher/TeacherPortal';
import AdminPortal from './components/admin/AdminPortal';
import SuperAdminPanel from './components/superadmin/SuperAdminPanel';
import type { Role } from './types';

export default function App() {
  const [role, setRole] = useState<Role | null>(null);

  if (!role) {
    return <Login onSelect={setRole} />;
  }

  if (role === 'TEACHER') return <TeacherPortal onLogout={() => setRole(null)} />;
  if (role === 'CEO')     return <AdminPortal onLogout={() => setRole(null)} />;
  return <SuperAdminPanel onLogout={() => setRole(null)} />;
}
