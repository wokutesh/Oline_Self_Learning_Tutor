import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const QuizAssignmentManagement = () => {
  const { t } = useTranslation();
  const [assessmentType, setAssessmentType] = useState('quiz');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    type: 'multiple_choice',
    options: [''],
    correctAnswer: ''
  });

  // Sample data
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const grades = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const questionTypes = ['multiple_choice', 'true_false', 'short_answer'];

  // Mock content data (this would come from your content management system)
  const availableContent = [
    {
      id: 1,
      title: 'Introduction to Algebra',
      type: 'pdf',
      subject: 'Mathematics',
      grade: 'Grade 9',
      language: 'English',
      url: 'https://example.com/algebra.pdf',
      uploadDate: '2024-03-15',
      status: 'published'
    },
    {
      id: 2,
      title: 'Newton\'s Laws of Motion',
      type: 'video',
      subject: 'Physics',
      grade: 'Grade 10',
      language: 'English',
      url: 'https://example.com/newton-laws.mp4',
      uploadDate: '2024-03-14',
      status: 'published'
    }
  ];

  const [existingAssessments, setExistingAssessments] = useState([
    {
      id: 1,
      title: 'Algebra Quiz 1',
      type: 'quiz',
      subject: 'Mathematics',
      grade: 'Grade 9',
      contentUrl: 'https://example.com/newton-laws.mp4',
      questionCount: 10,
      status: 'draft'
    },
    {
      id: 2,
      title: 'Mechanics Assignment',
      type: 'assignment',
      subject: 'Physics',
      grade: 'Grade 10',
      contentUrl: 'https://example.com/algebra.pdf',
      questionCount: 5,
      status: 'published'
    }
  ]);

  const handleAddQuestion = () => {
    if (currentQuestion.text.trim() === '') return;
    
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      text: '',
      type: 'multiple_choice',
      options: [''],
      correctAnswer: ''
    });
  };

  const handleAddOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, '']
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAssessment = {
      id: existingAssessments.length + 1,
      title,
      type: assessmentType,
      subject: selectedSubject,
      grade: selectedGrade,
      contentUrl,
      questionCount: questions.length,
      status: 'draft'
    };
    
    setExistingAssessments([...existingAssessments, newAssessment]);
    
    // Reset form
    setTitle('');
    setDescription('');
    setContentUrl('');
    setQuestions([]);
    setSelectedSubject('');
    setSelectedGrade('');
  };

  const handleDelete = (id) => {
    setExistingAssessments(existingAssessments.filter(assessment => assessment.id !== id));
  };

  const handleStatusChange = (id) => {
    setExistingAssessments(existingAssessments.map(assessment => 
      assessment.id === id 
        ? { ...assessment, status: assessment.status === 'published' ? 'draft' : 'published' }
        : assessment
    ));
  };

  return (
    <div className="space-y-6">
      {/* Create Assessment Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Assessment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Assessment Type</label>
              <select
                value={assessmentType}
                onChange={(e) => setAssessmentType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {assessmentType === 'quiz' ? 'Video URL' : 'PDF URL'}
            </label>
            <input
              type="url"
              value={contentUrl}
              onChange={(e) => setContentUrl(e.target.value)}
              placeholder={`Enter ${assessmentType === 'quiz' ? 'video' : 'PDF'} URL`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              {assessmentType === 'quiz' 
                ? 'Students must watch this video before taking the quiz'
                : 'Students must read this PDF before completing the assignment'}
            </p>
          </div>

          {/* Question Builder */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Add Questions</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Question Type</label>
                <select
                  value={currentQuestion.type}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {questionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Question Text</label>
                <textarea
                  value={currentQuestion.text}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {currentQuestion.type === 'multiple_choice' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Options</label>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder={`Option ${index + 1}`}
                      />
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={currentQuestion.correctAnswer === option}
                        onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: option })}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Option
                  </button>
                </div>
              )}

              {currentQuestion.type === 'true_false' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="correctAnswer"
                        value="true"
                        checked={currentQuestion.correctAnswer === 'true'}
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2">True</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="correctAnswer"
                        value="false"
                        checked={currentQuestion.correctAnswer === 'false'}
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2">False</span>
                    </label>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleAddQuestion}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Question
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Assessment
            </button>
          </div>
        </form>
      </div>

      {/* Existing Assessments */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Assessments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {existingAssessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {assessment.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assessment.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assessment.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href={assessment.contentUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                      View Content
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assessment.questionCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusChange(assessment.id)}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                        assessment.status === 'published' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}
                    >
                      {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      onClick={() => handleDelete(assessment.id)}
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

export default QuizAssignmentManagement; 