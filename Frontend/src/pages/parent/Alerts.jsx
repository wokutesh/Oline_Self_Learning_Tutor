import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useParentStore from '../../store/parentStore';
import useAuthStore from '../../store/authStore';

const Alerts = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { 
    children, 
    alerts,
    loadParentData,
    loadChildAlerts
  } = useParentStore();
  const [selectedChild, setSelectedChild] = useState('all');
  const [alertType, setAlertType] = useState('all');

  useEffect(() => {
    loadParentData();
  }, [loadParentData]);

  useEffect(() => {
    if (selectedChild !== 'all') {
      loadChildAlerts(selectedChild);
    }
  }, [selectedChild, loadChildAlerts]);

  const filteredAlerts = alerts.filter(alert => {
    const childMatch = selectedChild === 'all' || alert.childId === selectedChild;
    const typeMatch = alertType === 'all' || alert.type === alertType;
    return childMatch && typeMatch;
  });

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return (
          <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case 'info':
        return (
          <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'success':
        return (
          <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Alerts & Notifications</h1>
        <div className="flex space-x-4">
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Children</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>{child.firstName} {child.lastName}</option>
            ))}
          </select>
          <select
            value={alertType}
            onChange={(e) => setAlertType(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Types</option>
            <option value="warning">Warnings</option>
            <option value="info">Information</option>
            <option value="success">Achievements</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getAlertIcon(alert.type)}
              </div>
              <div className="ml-3 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{alert.message}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(alert.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Child:</span> {alert.childName}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Subject:</span> {alert.subject}
                  </div>
                  {alert.details && (
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">Details:</span>
                      <ul className="list-disc list-inside mt-1">
                        {Object.entries(alert.details).map(([key, value]) => (
                          <li key={key}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No alerts</h3>
            <p className="mt-1 text-sm text-gray-500">
              There are no alerts matching your current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts; 