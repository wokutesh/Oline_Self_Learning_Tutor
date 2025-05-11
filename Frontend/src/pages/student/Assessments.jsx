import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Assessments = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('quizzes');

  // Sample assessments data
  const assessments = {
    quizzes: [
      {
        id: 1,
        title: 'Algebra Quiz 1',
        subject: 'Mathematics',
        dueDate: '2024-03-20',
        status: 'pending',
        totalQuestions: 10,
        timeLimit: 30, // minutes
      },
      {
        id: 2,
        title: 'Basic Chemistry Quiz',
        subject: 'Science',
        dueDate: '2024-03-22',
        status: 'completed',
        score: 85,
        totalQuestions: 15,
        timeLimit: 45,
      },
    ],
    assignments: [
      {
        id: 1,
        title: 'Geometry Problem Set',
        subject: 'Mathematics',
        dueDate: '2024-03-25',
        status: 'pending',
        description: 'Complete problems 1-10 from Chapter 5',
      },
      {
        id: 2,
        title: 'Chemistry Lab Report',
        subject: 'Science',
        dueDate: '2024-03-28',
        status: 'submitted',
        feedback: 'Good work! Consider adding more details to your analysis.',
      },
    ],
  };

  const renderAssessmentCard = (assessment, type) => (
    <div key={assessment.id} className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{assessment.title}</h3>
          <p className="text-gray-600">{assessment.subject}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            assessment.status === 'completed' || assessment.status === 'submitted'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {t(`student.assessments.status.${assessment.status}`)}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-600">
          {t('student.assessments.dueDate')}: {assessment.dueDate}
        </p>
        {type === 'quizzes' && (
          <>
            <p className="text-sm text-gray-600">
              {t('student.assessments.questions')}: {assessment.totalQuestions}
            </p>
            <p className="text-sm text-gray-600">
              {t('student.assessments.timeLimit')}: {assessment.timeLimit} {t('student.assessments.minutes')}
            </p>
          </>
        )}
        {assessment.score && (
          <p className="text-sm text-gray-600">
            {t('student.assessments.score')}: {assessment.score}%
          </p>
        )}
        {assessment.feedback && (
          <p className="text-sm text-gray-600">
            {t('student.assessments.feedback')}: {assessment.feedback}
          </p>
        )}
      </div>

      <div className="mt-4">
        {assessment.status === 'pending' ? (
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {type === 'quizzes'
              ? t('student.assessments.startQuiz')
              : t('student.assessments.startAssignment')}
          </button>
        ) : (
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
            {t('student.assessments.viewResults')}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('student.assessments.title')}</h1>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'quizzes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('student.assessments.quizzes')}
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'assignments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('student.assessments.assignments')}
            </button>
          </nav>
        </div>
      </div>

      {/* Assessment List */}
      <div className="space-y-4">
        {assessments[activeTab].map((assessment) =>
          renderAssessmentCard(assessment, activeTab)
        )}
      </div>
    </div>
  );
};

export default Assessments; 