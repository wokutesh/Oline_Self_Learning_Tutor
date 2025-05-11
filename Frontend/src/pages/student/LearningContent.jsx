import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mockCourses } from '../../data/mockCourses';
import useAuthStore from '../../store/authStore';

const LearningContent = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  // Find student's enrolled courses based on their grade
  const enrolledCourses = mockCourses.filter(course => course.grade === user?.grade);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedContent(null);
  };

  const handleContentSelect = (content) => {
    setSelectedContent(content);
  };

  const renderContentPreview = () => {
    if (!selectedContent) return null;

    switch (selectedContent.type) {
      case 'video':
        return (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={selectedContent.url}
              title={selectedContent.title}
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        );
      case 'document':
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{selectedContent.title}</h3>
            <p className="text-gray-600 mb-4">{selectedContent.description}</p>
            <a
              href={selectedContent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Document
            </a>
          </div>
        );
      case 'quiz':
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{selectedContent.title}</h3>
            <p className="text-gray-600 mb-4">{selectedContent.description}</p>
            <a
              href={selectedContent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start Quiz
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t('Learning Content')}</h1>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all ${
              selectedCourse?.id === course.id ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
            }`}
            onClick={() => handleCourseSelect(course)}
          >
            <h2 className="text-xl font-semibold mb-2">
              {course.languages[user?.preferredLanguage || 'en'].title}
            </h2>
            <p className="text-gray-600">
              {course.languages[user?.preferredLanguage || 'en'].description}
            </p>
          </div>
        ))}
      </div>

      {/* Course Content */}
      {selectedCourse && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedCourse.languages[user?.preferredLanguage || 'en'].title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Content List */}
            <div className="space-y-4">
              {selectedCourse.languages[user?.preferredLanguage || 'en'].content.map((content) => (
                <div
                  key={content.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedContent?.id === content.id
                      ? 'bg-indigo-50 border border-indigo-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => handleContentSelect(content)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {content.type === 'video' && (
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {content.type === 'document' && (
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {content.type === 'quiz' && (
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
                      <p className="text-sm text-gray-500">{content.description}</p>
                      {content.type === 'video' && content.duration && (
                        <p className="text-sm text-gray-500 mt-1">Duration: {content.duration}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Preview */}
            <div className="bg-gray-50 rounded-lg p-6">
              {selectedContent ? (
                renderContentPreview()
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Select a content item to preview
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningContent; 