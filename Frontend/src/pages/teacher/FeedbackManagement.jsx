import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { mockStudents } from '../../data/mockStudents';

const FeedbackManagement = () => {
  const { t } = useTranslation();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [rating, setRating] = useState(0);

  // Get selected student's email
  const selectedStudentEmail = useMemo(() => {
    const student = mockStudents.find(student => 
      `${student.firstName} ${student.lastName}` === selectedStudent
    );
    return student?.email || '';
  }, [selectedStudent]);

  // Extract unique subjects from mock data
  const subjects = useMemo(() => {
    const uniqueSubjects = new Set();
    mockStudents.forEach(student => {
      student.courses.forEach(course => uniqueSubjects.add(course.name));
    });
    return Array.from(uniqueSubjects);
  }, []);

  const feedbackTypes = [
    'general',
    'assignment',
    'quiz',
    'improvement',
    'praise'
  ];

  // Mock feedback data
  const mockFeedback = [
    {
      id: 1,
      studentId: 'ST001',
      studentName: 'John Doe',
      studentEmail: 'john.doe@example.com',
      grade: 'Grade 10',
      subject: 'Mathematics',
      type: 'assignment',
      content: 'Great work on the algebra assignment! Your problem-solving approach was excellent.',
      rating: 4,
      date: '2024-03-15'
    },
    {
      id: 2,
      studentId: 'ST002',
      studentName: 'Jane Smith',
      studentEmail: 'jane.smith@example.com',
      grade: 'Grade 11',
      subject: 'Physics',
      type: 'quiz',
      content: 'Good understanding of Newton\'s laws. Consider practicing more problems for better time management.',
      rating: 3,
      date: '2024-03-14'
    },
    {
      id: 3,
      studentId: 'ST003',
      studentName: 'Mike Johnson',
      studentEmail: 'mike.johnson@example.com',
      grade: 'Grade 10',
      subject: 'Chemistry',
      type: 'improvement',
      content: 'Your lab report shows great attention to detail. Keep up the good work!',
      rating: 5,
      date: '2024-03-13'
    }
  ];

  const [existingFeedback, setExistingFeedback] = useState(mockFeedback);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedStudentData = mockStudents.find(student => 
      `${student.firstName} ${student.lastName}` === selectedStudent
    );

    const newFeedback = {
      id: existingFeedback.length + 1,
      studentId: selectedStudentData?.id || '',
      studentName: selectedStudent,
      studentEmail: selectedStudentData?.email || '',
      grade: selectedStudentData?.grade || '',
      subject: selectedSubject,
      type: feedbackType,
      content: feedbackContent,
      rating,
      date: new Date().toISOString().split('T')[0]
    };

    setExistingFeedback([newFeedback, ...existingFeedback]);
    
    // Reset form
    setSelectedStudent('');
    setSelectedSubject('');
    setFeedbackType('general');
    setFeedbackContent('');
    setRating(0);
  };

  const handleDelete = (feedbackId) => {
    setExistingFeedback(existingFeedback.filter(feedback => feedback.id !== feedbackId));
  };

  return (
    <div className="space-y-6">
      {/* Feedback Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Provide Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Student</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select Student</option>
                {mockStudents.map((student) => (
                  <option key={student.id} value={`${student.firstName} ${student.lastName}`}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Student Email</label>
              <input
                type="email"
                value={selectedStudentEmail}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Select a student to see their email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                {feedbackTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Feedback Content</label>
            <textarea
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <div className="flex space-x-2 mt-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`p-2 rounded-full ${
                    rating >= value
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>

      {/* Existing Feedback */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Feedback</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {existingFeedback.map((feedback) => (
                <tr key={feedback.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {feedback.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.studentEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {feedback.content}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <svg
                          key={value}
                          className={`h-5 w-5 ${
                            value <= feedback.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(feedback.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedbackManagement; 