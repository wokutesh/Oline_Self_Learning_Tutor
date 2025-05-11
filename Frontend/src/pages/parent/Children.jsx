import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Children = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [linkFormData, setLinkFormData] = useState({
    studentId: '',
    relationship: 'parent',
    verificationCode: ''
  });

  // Sample data
  const linkedChildren = [
    {
      id: 1,
      name: 'Sarah Johnson',
      grade: 'Grade 10',
      relationship: 'Daughter',
      linkedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Michael Johnson',
      grade: 'Grade 8',
      relationship: 'Son',
      linkedDate: '2024-02-01'
    }
  ];

  const handleLinkFormChange = (e) => {
    const { name, value } = e.target;
    setLinkFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual linking logic
    console.log('Linking child:', linkFormData);
    setShowLinkForm(false);
    setLinkFormData({
      studentId: '',
      relationship: 'parent',
      verificationCode: ''
    });
  };

  const handleUnlinkChild = (childId) => {
    // TODO: Implement actual unlinking logic
    console.log('Unlinking child:', childId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Children</h1>
        <button
          onClick={() => setShowLinkForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Link New Child
        </button>
      </div>

      {/* Search Bar */}
      <div className="max-w-lg">
        <div className="relative">
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search children..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Linked Children List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {linkedChildren.map((child) => (
            <li key={child.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{child.name}</div>
                      <div className="text-sm text-gray-500">
                        {child.grade} • {child.relationship}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Linked on {new Date(child.linkedDate).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleUnlinkChild(child.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Unlink
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Link New Child Modal */}
      {showLinkForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Link New Child</h2>
              <button
                onClick={() => setShowLinkForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleLinkSubmit} className="space-y-4">
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  id="studentId"
                  value={linkFormData.studentId}
                  onChange={handleLinkFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                  Relationship
                </label>
                <select
                  name="relationship"
                  id="relationship"
                  value={linkFormData.relationship}
                  onChange={handleLinkFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="parent">Parent</option>
                  <option value="guardian">Guardian</option>
                  <option value="sibling">Sibling</option>
                </select>
              </div>
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <input
                  type="text"
                  name="verificationCode"
                  id="verificationCode"
                  value={linkFormData.verificationCode}
                  onChange={handleLinkFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter the verification code provided by the student
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLinkForm(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Link Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Children; 