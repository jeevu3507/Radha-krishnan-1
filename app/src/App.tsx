import { useState } from 'react';
import Login from './components/Login';
import TeacherPortal from './components/teacher/TeacherPortal';
import AdminPortal from './components/admin/AdminPortal';
import type { Role } from './types';

export default function App() {
  const [role, setRole] = useState<Role | null>(null);

  if (!role) {
    return <Login onSelect={setRole} />;
  }

  if (role === 'TEACHER') {
    return <TeacherPortal onLogout={() => setRole(null)} />;
  }

  return <AdminPortal onLogout={() => setRole(null)} />;
}
