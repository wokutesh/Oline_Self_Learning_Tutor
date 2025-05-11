import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import EnrollmentType from './components/enrollment/EnrollmentType';
import StudentEnrollment from './components/enrollment/StudentEnrollment';
import ParentEnrollment from './components/enrollment/ParentEnrollment';
import EnrollmentSuccess from './components/enrollment/EnrollmentSuccess';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Support from './pages/Support';
import Resources from './pages/Resources';
import Curriculum from './pages/academic-excellence/Curriculum';
import Accreditation from './pages/academic-excellence/Accreditation';
import AdvancedPrograms from './pages/academic-excellence/AdvancedPrograms';
import Achievements from './pages/academic-excellence/Achievements';
import FindEnrollment from './pages/find-a-school/Enrollment';
import FAQ from './pages/find-a-school/FAQ';
import HowItWorks from './pages/HowItWorks';
import Footer from './components/layout/Footer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import StudentLayout from './layouts/StudentLayout';
import TeacherLayout from './layouts/TeacherLayout';
import ParentLayout from './layouts/ParentLayout';
import Dashboard from './pages/student/Dashboard';
import Content from './pages/student/Content';
import Assessments from './pages/student/Assessments';
import TeacherDashboard from './pages/teacher/Dashboard';
import ContentManagement from './pages/teacher/ContentManagement';
import QuizAssignmentManagement from './pages/teacher/QuizAssignmentManagement';
import StudentPerformance from './pages/teacher/StudentPerformance';
import FeedbackManagement from './pages/teacher/FeedbackManagement';
import Announcements from './pages/teacher/Announcements';
import ParentDashboard from './pages/parent/Dashboard';
import ParentChildren from './pages/parent/Children';
import ParentProgress from './pages/parent/Progress';
import ParentAlerts from './pages/parent/Alerts';

function App() {
  return (
    <Router basename="/">
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            
            {/* Student Routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedUserTypes={['student']}>
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="content" element={<Content />} />
              <Route path="assessments" element={<Assessments />} />
            </Route>

            {/* Teacher Routes */}
            <Route
              path="/teacher"
              element={
                <ProtectedRoute allowedUserTypes={['teacher']}>
                  <TeacherLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="content" element={<ContentManagement />} />
              <Route path="quizzes-assignments" element={<QuizAssignmentManagement />} />
              <Route path="student-performance" element={<StudentPerformance />} />
              <Route path="feedback" element={<FeedbackManagement />} />
              <Route path="announcements" element={<Announcements />} />
            </Route>

            {/* Parent Routes */}
            <Route
              path="/parent"
              element={
                <ProtectedRoute allowedUserTypes={['parent']}>
                  <ParentLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<ParentDashboard />} />
              <Route path="children" element={<ParentChildren />} />
              <Route path="progress" element={<ParentProgress />} />
              <Route path="progress/:childId" element={<ParentProgress />} />
              <Route path="alerts" element={<ParentAlerts />} />
            </Route>

            {/* Other Public Routes */}
            <Route path="/enroll" element={<EnrollmentType />} />
            <Route path="/enroll/student" element={<StudentEnrollment />} />
            <Route path="/enroll/parent" element={<ParentEnrollment />} />
            <Route path="/enroll/success" element={<EnrollmentSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/support" element={<Support />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/academic-excellence/curriculum" element={<Curriculum />} />
            <Route path="/academic-excellence/accreditation" element={<Accreditation />} />
            <Route path="/academic-excellence/advanced-programs" element={<AdvancedPrograms />} />
            <Route path="/academic-excellence/achievements" element={<Achievements />} />
            <Route path="/find-a-school/enrollment" element={<FindEnrollment />} />
            <Route path="/find-a-school/faq" element={<FAQ />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
