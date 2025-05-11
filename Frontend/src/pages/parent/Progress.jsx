import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import useParentStore from '../../store/parentStore';
import useAuthStore from '../../store/authStore';

const Progress = () => {
  const { t } = useTranslation();
  const { childId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    children, 
    childrenProgress,
    loadParentData,
    loadChildProgress
  } = useParentStore();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    loadParentData();
  }, [loadParentData]);

  useEffect(() => {
    if (childId) {
      loadChildProgress(childId);
    }
  }, [childId, loadChildProgress]);

  // If no childId is provided and there are children, redirect to the first child
  useEffect(() => {
    if (!childId && children.length > 0) {
      navigate(`/parent/progress/${children[0].id}`);
    }
  }, [childId, children, navigate]);

  const childData = childId ? childrenProgress[childId] : null;

  if (!childData) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No child data available</p>
      </div>
    );
  }

  const filteredSubjects = selectedSubject === 'all'
    ? childData.subjects
    : childData.subjects.filter(subject => subject.name === selectedSubject);

  const renderProgressBar = (progress) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-indigo-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  const renderSubjectCard = (subject) => (
    <div key={subject.name} className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
          <p className="text-sm text-gray-500">
            {subject.completedTopics} of {subject.totalTopics} topics completed
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-indigo-600">{subject.progress}%</div>
          <div className="text-sm text-gray-500">Progress</div>
        </div>
      </div>

      {renderProgressBar(subject.progress)}

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Quizzes</h4>
        <div className="space-y-3">
          {subject.recentQuizzes.map((quiz, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">{quiz.topic}</span>
                <span className="text-gray-500 ml-2">Quiz Score: {quiz.score}%</span>
              </div>
              <span className="text-gray-500">{new Date(quiz.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{childData.name}'s Progress</h1>
          <p className="text-sm text-gray-500">{childData.grade}</p>
        </div>
        <div className="flex space-x-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Subjects</option>
            {childData.subjects.map(subject => (
              <option key={subject.name} value={subject.name}>{subject.name}</option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="semester">This Semester</option>
          </select>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h2>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {renderProgressBar(childData.overallProgress)}
          </div>
          <div className="ml-4 text-right">
            <div className="text-2xl font-bold text-indigo-600">{childData.overallProgress}%</div>
            <div className="text-sm text-gray-500">Overall</div>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map(renderSubjectCard)}
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="flow-root">
          <ul className="-mb-8">
            {childData.activityLog.map((activity, index) => (
              <li key={index}>
                <div className="relative pb-8">
                  {index !== childData.activityLog.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center ring-8 ring-white">
                        {activity.type === 'quiz' ? (
                          <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {activity.details} in <span className="font-medium text-gray-900">{activity.subject}</span>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Progress; 