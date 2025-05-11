import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { mockStudents } from '../../data/mockStudents';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentPerformance = () => {
  const { t } = useTranslation();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedPerformance, setSelectedPerformance] = useState('');

  // Extract unique subjects and grades from mock data
  const subjects = useMemo(() => {
    const uniqueSubjects = new Set();
    mockStudents.forEach(student => {
      student.courses.forEach(course => uniqueSubjects.add(course.name));
    });
    return Array.from(uniqueSubjects);
  }, []);

  const grades = useMemo(() => {
    const uniqueGrades = new Set();
    mockStudents.forEach(student => uniqueGrades.add(student.grade));
    return Array.from(uniqueGrades);
  }, []);

  const performanceLevels = ['Excellent', 'Good', 'Average', 'Below Average'];

  // Filter students based on selected criteria
  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      const matchesGrade = !selectedGrade || student.grade === selectedGrade;
      const matchesPerformance = !selectedPerformance || student.performance === selectedPerformance;
      const matchesSubject = !selectedSubject || student.courses.some(course => course.name === selectedSubject);
      return matchesGrade && matchesPerformance && matchesSubject;
    });
  }, [selectedGrade, selectedPerformance, selectedSubject]);

  // Calculate class average for selected subject
  const classAverage = useMemo(() => {
    if (!selectedSubject) return 0;
    const subjectScores = filteredStudents
      .flatMap(student => student.courses)
      .filter(course => course.name === selectedSubject)
      .map(course => course.points);
    
    return subjectScores.length > 0
      ? (subjectScores.reduce((a, b) => a + b, 0) / subjectScores.length).toFixed(2)
      : 0;
  }, [filteredStudents, selectedSubject]);

  // Generate performance trend data
  const performanceTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Class Average',
        data: [3.5, 3.6, 3.7, 3.8, 3.9],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Generate subject-wise performance data
  const subjectPerformanceData = {
    labels: subjects,
    datasets: [
      {
        label: 'Average Points',
        data: subjects.map(subject => {
          const subjectScores = mockStudents
            .flatMap(student => student.courses)
            .filter(course => course.name === subject)
            .map(course => course.points);
          return subjectScores.length > 0
            ? (subjectScores.reduce((a, b) => a + b, 0) / subjectScores.length).toFixed(2)
            : 0;
        }),
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Grades</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Performance Level</label>
            <select
              value={selectedPerformance}
              onChange={(e) => setSelectedPerformance(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Levels</option>
              {performanceLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-indigo-600">{filteredStudents.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Class Average</h3>
          <p className="text-3xl font-bold text-indigo-600">{classAverage}</p>
          {selectedSubject && <p className="text-sm text-gray-500">in {selectedSubject}</p>}
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Top Performers</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {filteredStudents.filter(student => student.performance === 'Excellent').length}
          </p>
          <p className="text-sm text-gray-500">Students with Excellent performance</p>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Performance Trend</h3>
          <Line data={performanceTrendData} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Subject-wise Performance</h3>
          <Bar data={subjectPerformanceData} />
        </div>
      </div>

      {/* Student Performance Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Student Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CGPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                {subjects.map((subject) => (
                  <th key={subject} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {subject}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.cgpa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.performance === 'Excellent' 
                        ? 'bg-green-100 text-green-800'
                        : student.performance === 'Good'
                        ? 'bg-blue-100 text-blue-800'
                        : student.performance === 'Average'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.performance}
                    </span>
                  </td>
                  {subjects.map((subject) => {
                    const course = student.courses.find(c => c.name === subject);
                    return (
                      <td key={subject} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course ? (
                          <div className="space-y-1">
                            <p>Grade: {course.grade}</p>
                            <p>Points: {course.points}</p>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance; 