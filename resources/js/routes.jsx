import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import GameRedirect from './Pages/Student/GameRedirect';
import SuperDashboard from './Pages/SuperAdmin/Dashboard';
import AdminDashboard from './Pages/Admin/Dashboard';
import TeacherDashboard from './Pages/Teacher/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/student/game" element={<GameRedirect />} />

      {/* Protected Dashboards */}
      <Route
        path="/superadmin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <SuperDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
