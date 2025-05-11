import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { mockStudents } from '../../data/mockStudents';

const Announcements = () => {
  const { t } = useTranslation();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [content, setContent] = useState('');

  // Extract unique subjects from mock data
  const subjects = useMemo(() => {
    const uniqueSubjects = new Set();
    mockStudents.forEach(student => {
      student.courses.forEach(course => uniqueSubjects.add(course.name));
    });
    return Array.from(uniqueSubjects);
  }, []);

  // Get selected student's email
  const selectedStudentEmail = useMemo(() => {
    const student = mockStudents.find(student => 
      `${student.firstName} ${student.lastName}` === selectedStudent
    );
    return student?.email || '';
  }, [selectedStudent]);

  // Mock announcements data
  const mockAnnouncements = [
    {
      id: 1,
      studentName: 'John Doe',
      studentEmail: 'john.doe@example.com',
      title: 'Math Quiz Schedule',
      subject: 'Mathematics',
      content: 'There will be a quiz on Algebra next Monday. Please prepare well.',
      date: '2024-03-15'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentEmail: 'jane.smith@example.com',
      title: 'Physics Lab Safety Guidelines',
      subject: 'Physics',
      content: 'Please review the lab safety guidelines before the next practical session.',
      date: '2024-03-14'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      studentEmail: 'mike.johnson@example.com',
      title: 'Chemistry Assignment Submission',
      subject: 'Chemistry',
      content: 'The lab report submission deadline has been extended to next Friday.',
      date: '2024-03-13'
    }
  ];

  const [existingAnnouncements, setExistingAnnouncements] = useState(mockAnnouncements);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      id: existingAnnouncements.length + 1,
      studentName: selectedStudent,
      studentEmail: selectedStudentEmail,
      title,
      subject: selectedSubject,
      content,
      date: new Date().toISOString().split('T')[0]
    };

    setExistingAnnouncements([newAnnouncement, ...existingAnnouncements]);
    
    // Reset form
    setSelectedStudent('');
    setTitle('');
    setSelectedSubject('');
    setContent('');
  };

  const handleDelete = (announcementId) => {
    setExistingAnnouncements(existingAnnouncements.filter(announcement => announcement.id !== announcementId));
  };

  return (
    <div className="space-y-6">
      {/* Create Announcement Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Create Announcement</h2>
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
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Announcement
            </button>
          </div>
        </form>
      </div>

      {/* Existing Announcements */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Announcements</h2>
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
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
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
              {existingAnnouncements.map((announcement) => (
                <tr key={announcement.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {announcement.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {announcement.studentEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {announcement.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {announcement.subject}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {announcement.content}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {announcement.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(announcement.id)}
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

export default Announcements; 