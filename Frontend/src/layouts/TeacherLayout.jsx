import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TeacherLayout = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/teacher/dashboard" className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/self-learner-logo.svg"
                  alt="Self Learner Logo"
                />
                <span className="ml-2 text-xl font-bold text-gray-900">Self Learner</span>
              </Link>
            </div>

            {/* Mobile menu button - Show on mobile and tablet */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation - Show only on large screens */}
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              <Link
                to="/teacher/dashboard"
                className={`${
                  isActive('dashboard')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {t('teacher.nav.dashboard')}
              </Link>
              <Link
                to="/teacher/content"
                className={`${
                  isActive('content')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {t('teacher.nav.content')}
              </Link>
              <Link
                to="/teacher/quizzes-assignments"
                className={`${
                  isActive('quizzes-assignments')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {t('teacher.nav.quizzesAssignments')}
              </Link>
              <Link
                to="/teacher/student-performance"
                className={`${
                  isActive('student-performance')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {t('teacher.nav.studentPerformance')}
              </Link>
              <Link
                to="/teacher/feedback"
                className={`${
                  isActive('feedback')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {t('teacher.nav.feedback')}
              </Link>
              <Link
                to="/teacher/announcements"
                className={`${
                  isActive('announcements')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {t('teacher.nav.announcements')}
              </Link>
            </div>

            {/* Profile Section - Desktop */}
            <div className="hidden lg:flex lg:items-center">
              {/* Notifications */}
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/default-avatar.png"
                    alt="Profile"
                  />
                  <span className="text-sm font-medium text-gray-700">John Doe</span>
                  <svg
                    className={`h-5 w-5 text-gray-400 transform transition-transform ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </button>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log out
                      </Link>
                    </div>
                  </div>
                )}

                {/* Settings Dropdown Menu */}
                {isSettingsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          // Handle change password
                          setIsSettingsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Change Password
                      </button>
                      <div className="px-4 py-2">
                        <p className="text-sm text-gray-500">Language</p>
                        <div className="mt-1 space-y-1">
                          <button
                            onClick={() => changeLanguage('en')}
                            className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            English
                          </button>
                          <button
                            onClick={() => changeLanguage('am')}
                            className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            አማርኛ
                          </button>
                          <button
                            onClick={() => changeLanguage('om')}
                            className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Afaan Oromo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile and Tablet menu */}
        <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/teacher/dashboard"
              className={`${
                isActive('dashboard')
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('teacher.nav.dashboard')}
            </Link>
            <Link
              to="/teacher/content"
              className={`${
                isActive('content')
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('teacher.nav.content')}
            </Link>
            <Link
              to="/teacher/quizzes-assignments"
              className={`${
                isActive('quizzes-assignments')
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('teacher.nav.quizzesAssignments')}
            </Link>
            <Link
              to="/teacher/student-performance"
              className={`${
                isActive('student-performance')
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('teacher.nav.studentPerformance')}
            </Link>
            <Link
              to="/teacher/feedback"
              className={`${
                isActive('feedback')
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('teacher.nav.feedback')}
            </Link>
            <Link
              to="/teacher/announcements"
              className={`${
                isActive('announcements')
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('teacher.nav.announcements')}
            </Link>
          </div>

          {/* Mobile and Tablet Profile Section */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="/default-avatar.png"
                  alt="Profile"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">John Doe</div>
                <div className="text-sm font-medium text-gray-500">Teacher</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Settings
              </button>
              <Link
                to="/login"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log out
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherLayout; 