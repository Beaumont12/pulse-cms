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
import AdminSettings from "./Pages/Admin/AdminSettings";
import AdminHelp from "./Pages/Admin/AdminHelp";

import TeacherDashboard from "./Pages/Teacher/Dashboard";
import Quizzes from "./Pages/Teacher/Quizzes";
import QuestionBank from "./Pages/Teacher/QuestionBank";
import Courses from "./Pages/Teacher/Courses";
import Avatars from "./Pages/Teacher/Avatars";
import Active from "./Pages/Teacher/Active";
import Reports from "./Pages/Teacher/Reports";
import Leaderboard from "./Pages/Teacher/Leaderboard";
import Participants from "./Pages/Teacher/Participants";
import Feedback from "./Pages/Teacher/Feedback";
import TeacherHelp from "./Pages/Teacher/Help";

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
                path="/teacher/quizzes"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <Quizzes />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/question-bank"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <QuestionBank />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/courses"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <Courses />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/avatars"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <Avatars />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/active"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <Active />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/reports"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <Reports />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/leaderboard"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <Leaderboard />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/participants"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <Participants />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/feedback"
                element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <PageWrapper>
                            <Feedback />
                        </PageWrapper>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/help"
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
