import React from 'react';
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
import { mockTeachers } from '../../data/mockTeachers';
import { mockCourses } from '../../data/mockCourses';
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

const TeacherDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  
  // Find teacher data based on logged-in user's email
  const teacherData = mockTeachers.find(teacher => teacher.email === user?.email);

  if (!teacherData) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Teacher data not found</p>
      </div>
    );
  }

  // Prepare data for performance chart
  const performanceData = {
    labels: teacherData.coursePerformance.map(cp => cp.course),
    datasets: [
      {
        label: 'Average Score',
        data: teacherData.coursePerformance.map(cp => cp.averageScore),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Completion Rate',
        data: teacherData.coursePerformance.map(cp => cp.completionRate),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Course Performance Overview',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
          <p className="text-2xl font-bold text-gray-900">{teacherData.statistics.totalStudents}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Courses</h3>
          <p className="text-2xl font-bold text-gray-900">{teacherData.statistics.activeCourses}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Average Performance</h3>
          <p className="text-2xl font-bold text-gray-900">{teacherData.statistics.averagePerformance.toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
          <p className="text-2xl font-bold text-gray-900">{teacherData.statistics.completionRate}%</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="h-[400px]">
          <Line options={chartOptions} data={performanceData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {teacherData.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {activity.type === 'content_upload' && (
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  )}
                  {activity.type === 'grade_update' && (
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">
                    {activity.course} - {activity.grade}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
          <div className="space-y-4">
            {teacherData.upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-500">
                    {task.course} - {task.grade}
                  </p>
                  <p className="text-xs text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Performance Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Course Performance Details</h2>
        <div className="space-y-6">
          {teacherData.coursePerformance.map((course) => (
            <div key={course.course} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{course.course}</h3>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Average Score</p>
                    <p className="text-lg font-semibold text-gray-900">{course.averageScore}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-lg font-semibold text-gray-900">{course.completionRate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Students</p>
                    <p className="text-lg font-semibold text-gray-900">{course.studentCount}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.recentAssessments.map((assessment) => (
                  <div key={assessment.id} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900">{assessment.title}</p>
                    <p className="text-sm text-gray-500">
                      Average Score: {assessment.averageScore}%
                    </p>
                    <p className="text-xs text-gray-400">
                      Date: {new Date(assessment.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 