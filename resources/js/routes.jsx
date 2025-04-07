import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import GameRedirect from './Pages/Student/GameRedirect';
import SuperDashboard from './Pages/SuperAdmin/Dashboard';
import AdminDashboard from './Pages/Admin/Dashboard';
import TeacherDashboard from './Pages/Teacher/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import ManageUsers from './Pages/SuperAdmin/ManageUsers';
import AddUser from './Pages/SuperAdmin/AddUser';
import ManageCourses from './Pages/SuperAdmin/ManageCourses';
import ViewReports from './Pages/SuperAdmin/ViewReports';
import Settings from './Pages/SuperAdmin/Settings';
import FileManager from './Pages/SuperAdmin/FileManagement';
import LearningManager from './Pages/SuperAdmin/LearningManagement';

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

      {/* Super Admin Pages */}
      <Route
        path="/superadmin/manage-users"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/add-user"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <AddUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/manage-courses"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <ManageCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/view-reports"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <ViewReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/settings"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/files"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <FileManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/learning"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <LearningManager />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
