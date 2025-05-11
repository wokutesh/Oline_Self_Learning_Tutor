import { mockStudents } from './mockStudents';

// Mock parent data
export const mockParents = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Johnson',
    email: 'john.johnson@example.com',
    phone: '+1234567890',
    linkedChildren: [
      {
        studentId: 1,
        verificationCode: 'ABC123',
        isVerified: true,
        linkedAt: '2024-03-01'
      },
      {
        studentId: 2,
        verificationCode: 'DEF456',
        isVerified: true,
        linkedAt: '2024-03-01'
      }
    ]
  },
  {
    id: 2,
    firstName: 'Mary',
    lastName: 'Smith',
    email: 'mary.smith@example.com',
    phone: '+1987654321',
    linkedChildren: [
      {
        studentId: 3,
        verificationCode: 'GHI789',
        isVerified: false,
        linkedAt: null
      }
    ]
  }
];

// Get parent's linked children data
export const getParentChildren = (parentEmail) => {
  const parent = mockParents.find(p => p.email === parentEmail);
  if (!parent) return [];

  return parent.linkedChildren
    .filter(link => link.isVerified)
    .map(link => {
      const student = mockStudents.find(s => s.id === link.studentId);
      return {
        ...student,
        linkedAt: link.linkedAt
      };
    });
};

// Get parent's pending verification codes
export const getPendingVerifications = (parentEmail) => {
  const parent = mockParents.find(p => p.email === parentEmail);
  if (!parent) return [];

  return parent.linkedChildren
    .filter(link => !link.isVerified)
    .map(link => ({
      studentId: link.studentId,
      verificationCode: link.verificationCode
    }));
};

// Verify child using verification code
export const verifyChild = (parentEmail, verificationCode) => {
  const parent = mockParents.find(p => p.email === parentEmail);
  if (!parent) return false;

  const link = parent.linkedChildren.find(l => l.verificationCode === verificationCode);
  if (!link) return false;

  link.isVerified = true;
  link.linkedAt = new Date().toISOString().split('T')[0];
  return true;
};

// Get child's progress data
export const getChildProgress = (studentId) => {
  const student = mockStudents.find(s => s.id === studentId);
  if (!student) return null;

  return {
    id: student.id,
    name: `${student.firstName} ${student.lastName}`,
    grade: student.grade,
    overallProgress: student.cgpa * 25, // Convert CGPA to percentage
    subjects: student.courses.map(course => ({
      name: course.name,
      progress: course.points * 10, // Convert points to percentage
      completedTopics: Math.floor(Math.random() * 20) + 10,
      totalTopics: 20,
      recentQuizzes: [
        {
          date: '2024-03-15',
          score: Math.floor(Math.random() * 30) + 70,
          topic: 'Recent Topic 1'
        },
        {
          date: '2024-03-10',
          score: Math.floor(Math.random() * 30) + 70,
          topic: 'Recent Topic 2'
        }
      ]
    })),
    activityLog: [
      {
        date: '2024-03-15',
        type: 'quiz',
        subject: student.courses[0].name,
        details: 'Completed Recent Quiz'
      },
      {
        date: '2024-03-14',
        type: 'assignment',
        subject: student.courses[1].name,
        details: 'Submitted Assignment'
      }
    ]
  };
};

// Get child's alerts
export const getChildAlerts = (studentId) => {
  const student = mockStudents.find(s => s.id === studentId);
  if (!student) return [];

  const alerts = [];
  
  // Add performance alerts
  student.courses.forEach(course => {
    if (course.points < 2.0) {
      alerts.push({
        id: Math.random().toString(36).substr(2, 9),
        childId: student.id,
        childName: `${student.firstName} ${student.lastName}`,
        type: 'warning',
        title: 'Low Performance Alert',
        message: `${student.firstName} scored below 70% in ${course.name}`,
        date: '2024-03-13',
        subject: course.name,
        details: {
          quizName: 'Recent Quiz',
          score: Math.floor(course.points * 20),
          passingScore: 70
        }
      });
    }
  });

  // Add achievement alerts
  if (student.cgpa >= 3.7) {
    alerts.push({
      id: Math.random().toString(36).substr(2, 9),
      childId: student.id,
      childName: `${student.firstName} ${student.lastName}`,
      type: 'success',
      title: 'Excellent Performance',
      message: `${student.firstName} is maintaining excellent grades`,
      date: '2024-03-15',
      subject: 'Overall',
      details: {
        achievement: 'Academic Excellence',
        cgpa: student.cgpa.toFixed(2)
      }
    });
  }

  return alerts;
}; 