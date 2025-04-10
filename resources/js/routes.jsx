import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import PageWrapper from './Components/Pagewrapper';

import Login from './Pages/Auth/Login';
import GameRedirect from './Pages/Student/GameRedirect';

import SuperAdminDashboard from './Pages/SuperAdmin/Dashboard';
import AddUser from './Pages/SuperAdmin/AddUser';
import ManageUsers from './Pages/SuperAdmin/ManageUsers';
import ManageCourses from './Pages/Admin/ManageCourses';
import ViewReports from './Pages/SuperAdmin/ViewReports';
import FileManagement from './Pages/SuperAdmin/FileManagement';
import LearningManagement from './Pages/SuperAdmin/LearningManagement';
import Notifications from './Pages/SuperAdmin/Notifications';
import Settings from './Pages/SuperAdmin/Settings';
import Help from './Pages/SuperAdmin/Help';

import AdminDashboard from './Pages/Admin/Dashboard';
import TeacherDashboard from './Pages/Teacher/Dashboard';
import Quizzes from './Pages/Teacher/Quizzes';
import QuestionBank from './Pages/Teacher/QuestionBank';
import Courses from './Pages/Teacher/Courses';
import Avatars from './Pages/Teacher/Avatars';
import Active from './Pages/Teacher/Active';
import Reports from './Pages/Teacher/Reports';
import Leaderboard from './Pages/Teacher/Leaderboard';
import Participants from './Pages/Teacher/Participants';
import Feedback from './Pages/Teacher/Feedback';
import TeacherHelp from './Pages/Teacher/Help';

export default function AppRoutes({ location }) {
  return (
    <Routes location={location}>
      {/* SUPER ADMIN ROUTES */}
      <Route path="/super_admin/dashboard" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><SuperAdminDashboard /></PageWrapper></ProtectedRoute>} />
      <Route path="/super_admin/add-user" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><AddUser /></PageWrapper></ProtectedRoute>} />
      <Route path="/super_admin/manage-users" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><ManageUsers /></PageWrapper></ProtectedRoute>} />
      <Route path="/super_admin/manage-courses" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><ManageCourses /></PageWrapper></ProtectedRoute>} />
      <Route path="/super_admin/view-reports" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><ViewReports /></PageWrapper></ProtectedRoute>} />
      <Route path="/super_admin/files" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><FileManagement /></PageWrapper></ProtectedRoute>} />
      <Route path="/super_admin/learning-management" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><LearningManagement /></PageWrapper></ProtectedRoute>} />
      <Route path="/super_admin/notifications" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><Notifications /></PageWrapper></ProtectedRoute>} />
      <Route path="/super_admin/settings" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><Settings /></PageWrapper></ProtectedRoute>} />
      <Route path="/super_admin/help" element={<ProtectedRoute allowedRoles={['super_admin']}><PageWrapper><Help /></PageWrapper></ProtectedRoute>} />

      {/* ADMIN ROUTE */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><PageWrapper><AdminDashboard /></PageWrapper></ProtectedRoute>} />

      {/* TEACHER ROUTES */}
      <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><TeacherDashboard /></PageWrapper></ProtectedRoute>} />
      <Route path="/teacher/quizzes" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><Quizzes /></PageWrapper></ProtectedRoute>} />
      <Route path="/teacher/question-bank" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><QuestionBank /></PageWrapper></ProtectedRoute>} />
      <Route path="/teacher/courses" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><Courses /></PageWrapper></ProtectedRoute>} />
      <Route path="/teacher/avatars" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><Avatars /></PageWrapper></ProtectedRoute>} />
      <Route path="/teacher/active" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><Active /></PageWrapper></ProtectedRoute>} />
      <Route path="/teacher/reports" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><Reports /></PageWrapper></ProtectedRoute>} />
      <Route path="/teacher/leaderboard" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><Leaderboard /></PageWrapper></ProtectedRoute>} />
      <Route path="/teacher/participants" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><Participants /></PageWrapper></ProtectedRoute>} />
      <Route path="/teacher/feedback" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><Feedback /></PageWrapper></ProtectedRoute>} />
      <Route path="/teacher/help" element={<ProtectedRoute allowedRoles={['teacher']}><PageWrapper><TeacherHelp /></PageWrapper></ProtectedRoute>} />
    </Routes>
  );
}
