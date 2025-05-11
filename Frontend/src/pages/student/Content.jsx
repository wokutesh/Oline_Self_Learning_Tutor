import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Content = () => {
  const { t } = useTranslation();
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Sample subjects and topics
  const subjects = {
    mathematics: {
      name: t('student.subjects.mathematics'),
      topics: [
        {
          id: 1,
          title: 'Algebra Basics',
          videoUrl: 'https://example.com/sample-video.mp4',
          pdfUrl: '/sample-notes.pdf',
          isLocked: false,
        },
        {
          id: 2,
          title: 'Geometry',
          videoUrl: 'https://example.com/sample-video2.mp4',
          pdfUrl: '/sample-notes2.pdf',
          isLocked: true,
        },
      ],
    },
    science: {
      name: t('student.subjects.science'),
      topics: [
        {
          id: 3,
          title: 'Basic Chemistry',
          videoUrl: 'https://example.com/sample-video3.mp4',
          pdfUrl: '/sample-notes3.pdf',
          isLocked: false,
        },
      ],
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('student.content.title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Subject Selection */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">{t('student.content.subjects')}</h2>
            <div className="space-y-2">
              {Object.entries(subjects).map(([key, subject]) => (
                <button
                  key={key}
                  onClick={() => setSelectedSubject(key)}
                  className={`w-full text-left px-4 py-2 rounded ${
                    selectedSubject === key
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{subjects[selectedSubject].name}</h2>
            
            {/* Topics List */}
            <div className="space-y-4">
              {subjects[selectedSubject].topics.map((topic) => (
                <div
                  key={topic.id}
                  className={`p-4 rounded-lg border ${
                    topic.isLocked ? 'bg-gray-50' : 'hover:bg-gray-50 cursor-pointer'
                  }`}
                  onClick={() => !topic.isLocked && setSelectedTopic(topic)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{topic.title}</h3>
                    {topic.isLocked ? (
                      <span className="text-red-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-green-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Topic Content */}
            {selectedTopic && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">{selectedTopic.title}</h3>
                <div className="space-y-6">
                  {/* Video Player */}
                  <div className="aspect-w-16 aspect-h-9">
                    <video
                      controls
                      className="w-full h-full rounded-lg"
                      src={selectedTopic.videoUrl}
                    >
                      {t('student.content.videoNotSupported')}
                    </video>
                  </div>

                  {/* PDF Notes */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">{t('student.content.notes')}</h4>
                    <a
                      href={selectedTopic.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {t('student.content.downloadNotes')}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content; 