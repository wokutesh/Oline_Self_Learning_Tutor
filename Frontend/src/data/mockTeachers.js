export const mockTeachers = [
  {
    id: 1,
    email: 'teacher@example.com',
    firstName: 'John',
    lastName: 'Teacher',
    role: 'admin',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    grades: ['10th Grade', '11th Grade', '12th Grade'],
    statistics: {
      totalStudents: 150,
      activeCourses: 12,
      averagePerformance: 3.7,
      completionRate: 85
    },
    recentActivities: [
      {
        id: 1,
        type: 'content_upload',
        course: 'Mathematics',
        grade: '10th Grade',
        title: 'Added new quiz: Calculus Basics',
        timestamp: '2024-03-15T10:30:00Z'
      },
      {
        id: 2,
        type: 'grade_update',
        course: 'Physics',
        grade: '11th Grade',
        title: 'Updated grades for Mechanics Quiz',
        timestamp: '2024-03-14T15:45:00Z'
      },
      {
        id: 3,
        type: 'content_upload',
        course: 'Chemistry',
        grade: '10th Grade',
        title: 'Added new video: Atomic Structure',
        timestamp: '2024-03-13T09:15:00Z'
      }
    ],
    upcomingTasks: [
      {
        id: 1,
        title: 'Grade Physics Midterm',
        course: 'Physics',
        grade: '10th Grade',
        dueDate: '2024-03-20T23:59:59Z',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Prepare Chemistry Lab Materials',
        course: 'Chemistry',
        grade: '11th Grade',
        dueDate: '2024-03-22T23:59:59Z',
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Update Mathematics Course Content',
        course: 'Mathematics',
        grade: '12th Grade',
        dueDate: '2024-03-25T23:59:59Z',
        priority: 'low'
      }
    ],
    coursePerformance: [
      {
        course: 'Mathematics',
        grade: '10th Grade',
        averageScore: 85,
        completionRate: 90,
        studentCount: 45,
        recentAssessments: [
          {
            id: 1,
            title: 'Algebra Quiz',
            averageScore: 88,
            date: '2024-03-10'
          },
          {
            id: 2,
            title: 'Geometry Test',
            averageScore: 82,
            date: '2024-03-05'
          }
        ]
      },
      {
        course: 'Physics',
        grade: '10th Grade',
        averageScore: 78,
        completionRate: 85,
        studentCount: 42,
        recentAssessments: [
          {
            id: 1,
            title: 'Mechanics Quiz',
            averageScore: 75,
            date: '2024-03-12'
          },
          {
            id: 2,
            title: 'Thermodynamics Test',
            averageScore: 80,
            date: '2024-03-08'
          }
        ]
      },
      {
        course: 'Chemistry',
        grade: '10th Grade',
        averageScore: 82,
        completionRate: 88,
        studentCount: 40,
        recentAssessments: [
          {
            id: 1,
            title: 'Atomic Structure Quiz',
            averageScore: 85,
            date: '2024-03-11'
          },
          {
            id: 2,
            title: 'Chemical Bonding Test',
            averageScore: 79,
            date: '2024-03-07'
          }
        ]
      }
    ]
  }
]; 