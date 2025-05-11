import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useParentStore from '../../store/parentStore';
import useAuthStore from '../../store/authStore';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { 
    children, 
    pendingVerifications,
    loadParentData,
    verifyChild
  } = useParentStore();
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState('');

  useEffect(() => {
    loadParentData();
  }, [loadParentData]);

  const handleVerification = (e) => {
    e.preventDefault();
    setVerificationError('');
    setVerificationSuccess('');

    if (!verificationCode.trim()) {
      setVerificationError('Please enter a verification code');
      return;
    }

    const success = verifyChild(verificationCode);
    if (success) {
      setVerificationSuccess('Child account linked successfully!');
      setVerificationCode('');
    } else {
      setVerificationError('Invalid verification code');
    }
  };

  const renderChildCard = (child) => (
    <div key={child.id} className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{child.firstName} {child.lastName}</h3>
          <p className="text-sm text-gray-500">{child.grade}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-indigo-600">{(child.cgpa * 25).toFixed(1)}%</div>
          <div className="text-sm text-gray-500">Overall Progress</div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Activities</h4>
        <div className="space-y-3">
          {child.courses.slice(0, 2).map((course, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">{course.name}</span>
                <span className="text-gray-500 ml-2">
                  Grade: {course.grade} ({course.points.toFixed(1)} points)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Link
          to={`/parent/progress/${child.id}`}
          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
        >
          View Detailed Progress →
        </Link>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Parent Dashboard</h1>
        <Link
          to="/parent/children"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Link New Child
        </Link>
      </div>

      {/* Verification Form */}
      {pendingVerifications.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Link Child Account</h2>
          <form onSubmit={handleVerification} className="space-y-4">
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter verification code"
                />
              </div>
              {verificationError && (
                <p className="mt-2 text-sm text-red-600">{verificationError}</p>
              )}
              {verificationSuccess && (
                <p className="mt-2 text-sm text-green-600">{verificationSuccess}</p>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Link Account
            </button>
          </form>
        </div>
      )}

      {/* Children Overview */}
      {children.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children.map(renderChildCard)}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No linked children</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by linking your child's account using a verification code.
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/parent/alerts"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6 text-gray-400 mr-3"
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
            <div>
              <h3 className="text-sm font-medium text-gray-900">View All Alerts</h3>
              <p className="text-sm text-gray-500">Check all notifications and alerts</p>
            </div>
          </Link>
          <Link
            to="/parent/progress"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6 text-gray-400 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Progress Reports</h3>
              <p className="text-sm text-gray-500">View detailed progress reports</p>
            </div>
          </Link>
          <Link
            to="/parent/children"
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6 text-gray-400 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Manage Children</h3>
              <p className="text-sm text-gray-500">Add or remove linked accounts</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 