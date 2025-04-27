import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import PageWrapper from "./Components/Pagewrapper";

import Login from "./Pages/Auth/Login";
import GameRedirect from "./Pages/Student/GameRedirect";

import SuperAdminDashboard from "./Pages/SuperAdmin/SuperAdminDashboard";
import SuperAdminAddUser from "./Pages/SuperAdmin/SuperAdminAddUser";
import SuperAdminManageUsers from "./Pages/SuperAdmin/SuperAdminManageUsers";
import SuperAdminAccountRecovery from "./Pages/SuperAdmin/SuperAdminAccountRecovery";
import SuperAdminUserProgress from "./Pages/SuperAdmin/SuperAdminUserProgress";
import SuperAdminQuizandCourseAnalytics from "./Pages/SuperAdmin/SuperAdminQuizandCourseAnalytics";
import SuperAdminDownloadReports from "./Pages/SuperAdmin/SuperAdminDownloadReports";
import SuperAdminQuizzes from "./Pages/SuperAdmin/SuperAdminQuizzes";
import SuperAdminQuestionBank from "./Pages/SuperAdmin/SuperAdminQuestionBank";
import SuperAdminCourses from "./Pages/SuperAdmin/SuperAdminCourses";
import SuperAdminNotifications from "./Pages/SuperAdmin/SuperAdminNotifications";
import SuperAdminNoticeNotification from "./Pages/SuperAdmin/SuperAdminNoticeNotification";
import SuperAdminSystemMessages from "./Pages/SuperAdmin/SuperAdminSystemMessages";
import SuperAdminSettings from "./Pages/SuperAdmin/SuperAdminSettings";
import SuperAdminHelp from "./Pages/SuperAdmin/SuperAdminHelp";

import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminManageUsers from "./Pages/Admin/AdminManageUsers";
import AdminAddUser from "./Pages/Admin/AdminAddUser";
import AdminAccountRecovery from "./Pages/Admin/AdminAccountRecovery";
import AdminQuizzes from "./Pages/Admin/AdminQuizzes";
import AdminQuestionBank from "./Pages/Admin/AdminQuestionBank";
import AdminCourses from "./Pages/Admin/AdminCourses";
import AdminDownloadReports from "./Pages/Admin/AdminDownloadReports";
import AdminUserProgress from "./Pages/Admin/AdminUserProgress";
import AdminQuizandCourseAnalytics from "./Pages/Admin/AdminQuizandCourseAnalytics";
import AdminNotifications from "./Pages/Admin/AdminNotifications";
import AdminNoticeNotification from "./Pages/Admin/AdminNoticeNotification";
import AdminSystemMessages from "./Pages/Admin/AdminSystemMessages";
import AdminSettings from "./Pages/Admin/AdminSettings";
import AdminHelp from "./Pages/Admin/AdminHelp";

import TeacherDashboard from "./Pages/Teacher/TeacherDashboard";
import TeacherQuizzes from "./Pages/Teacher/TeacherQuizzes";
import TeacherQuestionBank from "./Pages/Teacher/TeacherQuestionBank";
import TeacherCourses from "./Pages/Teacher/TeacherCourses";
import TeacherAvatars from "./Pages/Teacher/TeacherAvatars";
import TeacherActive from "./Pages/Teacher/TeacherActive";
import TeacherReports from "./Pages/Teacher/TeacherReports";
import TeacherLeaderboard from "./Pages/Teacher/TeacherLeaderboard";
import TeacherParticipants from "./Pages/Teacher/TeacherParticipants";
import TeacherFeedback from "./Pages/Teacher/TeacherFeedback";
import TeacherHelp from "./Pages/Teacher/TeacherHelp";


export default function AppRoutes({ location }) {
    return (
        <Routes location={location}>
            {/* SUPER ADMIN ROUTES */}
            <Route
                path="/super_admin/SuperAdminDashboard"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminDashboard />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminAddUser"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminAddUser />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminManageUsers"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminManageUsers />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminAccountRecovery"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminAccountRecovery />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuoerAdminCourses"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminCourses />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminUserProgress"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminUserProgress />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminQuizandCourseAnalytics"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminQuizandCourseAnalytics />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminDownloadReports"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminDownloadReports />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminQuizzes"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminQuizzes />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminQuestionBank"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminQuestionBank />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminCourses"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminCourses />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminNotifications"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminNotifications />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminNoticeNotification"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminNoticeNotification />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminSystemMessages"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminSystemMessages />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminSettings"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminSettings />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/super_admin/SuperAdminHelp"
                element={
                    <ProtectedRoute allowedRoles={["super_admin"]}>
                        <PageWrapper>
                            <SuperAdminHelp />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />

            {/* ADMIN ROUTE */}
            <Route
                path="/admin/AdminDashboard"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminDashboard/>
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
             <Route
                path="/admin/AdminDownloadReports"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminDownloadReports/>
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
             <Route
                path="/admin/AdminHelp"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminHelp />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
             <Route
                path="/admin/AdminManageUsers"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminManageUsers />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/AdminAddUser"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminAddUser />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/AdminAccountRecovery"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminAccountRecovery />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
             <Route
                path="/admin/AdminNotifications"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminNotifications />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/AdminNoticeNotification"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminNoticeNotification />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/AdminSystemMessages"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminSystemMessages />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
             <Route
                path="/admin/AdminQuizzes"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminQuizzes />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
             <Route
                path="/admin/AdminQuestionBank"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminQuestionBank />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
             <Route
                path="/admin/AdminCourses"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminCourses />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
             <Route
                path="/admin/AdminSettings"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminSettings />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
             <Route
                path="/admin/AdminUserProgress"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminUserProgress />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
             <Route
                path="/admin/AdminQuizandCourseAnalytics"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <PageWrapper>
                            <AdminQuizandCourseAnalytics />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
        

            {/* TEACHER ROUTES */}
            <Route
                path="/teacher/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <TeacherDashboard />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/TeacherQuizzes"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <TeacherQuizzes />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/TeacherQuestionBank"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <TeacherQuestionBank />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/TeacherCourses"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <TeacherCourses />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/TeacherAvatars"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <TeacherAvatars />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/TeacherActive"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <TeacherActive />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/TeacherReports"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <TeacherReports />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/TeacherLeaderboard"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <TeacherLeaderboard />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/TeacherParticipants"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <TeacherParticipants />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/TeacherFeedback"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <TeacherFeedback />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/TeacherHelp"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <TeacherHelp />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
