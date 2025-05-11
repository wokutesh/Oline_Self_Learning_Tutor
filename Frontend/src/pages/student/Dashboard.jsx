import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { mockStudents } from '../../data/mockStudents';
import useAuthStore from '../../store/authStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getPerformanceStatus = (cgpa) => {
  if (cgpa >= 3.7) return 'Excellent';
  if (cgpa >= 3.3) return 'Good';
  if (cgpa >= 2.7) return 'Satisfactory';
  if (cgpa >= 2.0) return 'Needs Improvement';
  return 'Poor';
};

const getPerformanceColor = (performance) => {
  switch (performance) {
    case 'Excellent':
      return 'text-green-600';
    case 'Good':
      return 'text-blue-600';
    case 'Satisfactory':
      return 'text-yellow-600';
    case 'Needs Improvement':
      return 'text-orange-600';
    case 'Poor':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const StudentDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const chartRef = useRef(null);
  
  // Find student data based on logged-in user's email
  const studentData = mockStudents.find(student => student.email === user?.email);

  if (!studentData) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Student data not found</p>
      </div>
    );
  }

  // Calculate performance status based on CGPA
  const performance = getPerformanceStatus(studentData.cgpa);
  const performanceColor = getPerformanceColor(performance);

  // Sample data for performance trend
  const performanceData = {
    labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
    datasets: [
      {
        label: 'CGPA Trend',
        data: [3.5, 3.6, 3.7, studentData.cgpa],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Academic Performance Trend',
        font: {
          size: 16
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
    },
    scales: {
      y: {
        min: 0,
        max: 4.0,
        ticks: {
          font: {
            size: 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 12
          }
        }
      }
    },
  };

  // Handle window resize to maintain chart stability
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="space-y-6">
      {/* Student Profile Card */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              {studentData.firstName} {studentData.lastName}
            </h1>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Student ID:</span>
                <p className="text-gray-900 break-words">{studentData.email}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Grade Level:</span>
                <p className="text-gray-900">{studentData.grade}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">CGPA:</span>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{studentData.cgpa.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Performance:</span>
              <p className={`text-base sm:text-lg font-semibold ${performanceColor}`}>{performance}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="h-[300px] sm:h-[400px]">
          <Line ref={chartRef} options={chartOptions} data={performanceData} />
        </div>
      </div>

      {/* Current Courses */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Current Courses</h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentData.courses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.name}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.grade}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.points.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 