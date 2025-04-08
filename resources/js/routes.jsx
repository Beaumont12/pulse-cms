import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './Pages/Auth/Login';
import GameRedirect from './Pages/Student/GameRedirect';
import AdminDashboard from './Pages/Admin/Dashboard';
import TeacherDashboard from './Pages/Teacher/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import AddUser from './Pages/SuperAdmin/AddUser';
import ManageUsers from './Pages/SuperAdmin/ManageUsers';
import ManageCourses from './Pages/Admin/ManageCourses';
import ViewReports from './Pages/SuperAdmin/ViewReports';
import FileManagement from './Pages/SuperAdmin/FileManagement';
import LearningManagement from './Pages/SuperAdmin/LearningManagement';
import Notifications from './Pages/SuperAdmin/Notifications';
import Settings from './Pages/SuperAdmin/Settings';
import Help from './Pages/SuperAdmin/Help';
import PageWrapper from './Components/PageWrapper';
import SuperAdminDashboard from './Pages/SuperAdmin/Dashboard';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/student/game" element={<GameRedirect />} />

        {/* SUPER ADMIN ROUTES */}
        <Route path="/superadmin/dashboard" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><SuperAdminDashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/superadmin/add-user" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><AddUser /></PageWrapper></ProtectedRoute>} />
        <Route path="/superadmin/manage-users" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><ManageUsers /></PageWrapper></ProtectedRoute>} />
        <Route path="/superadmin/manage-courses" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><ManageCourses /></PageWrapper></ProtectedRoute>} />
        <Route path="/superadmin/view-reports" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><ViewReports /></PageWrapper></ProtectedRoute>} />
        <Route path="/superadmin/files" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><FileManagement /></PageWrapper></ProtectedRoute>} />
        <Route path="/superadmin/learning-management" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><LearningManagement /></PageWrapper></ProtectedRoute>} />
        <Route path="/superadmin/notifications" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><Notifications /></PageWrapper></ProtectedRoute>} />
        <Route path="/superadmin/settings" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><Settings /></PageWrapper></ProtectedRoute>} />
        <Route path="/superadmin/help" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><Help /></PageWrapper></ProtectedRoute>} />

        {/* ADMIN & TEACHER */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><PageWrapper><AdminDashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><TeacherDashboard /></PageWrapper></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}