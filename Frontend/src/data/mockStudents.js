export const mockStudents = [
  {
    id: 1,
    email: 'student@example.com',
    firstName: 'John',
    lastName: 'Student',
    grade: '10th Grade',
    cgpa: 3.8,
    performance: 'Excellent',
    courses: [
      {
        id: 1,
        name: 'Mathematics',
        grade: 'A',
        points: 4.0
      },
      {
        id: 2,
        name: 'Physics',
        grade: 'A-',
        points: 3.7
      },
      {
        id: 3,
        name: 'Chemistry',
        grade: 'B+',
        points: 3.3
      }
    ]
  },
  {
    id: 2,
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    grade: '11th Grade',
    cgpa: 3.5,
    performance: 'Good',
    courses: [
      {
        id: 1,
        name: 'Mathematics',
        grade: 'B+',
        points: 3.3
      },
      {
        id: 2,
        name: 'Physics',
        grade: 'A',
        points: 4.0
      },
      {
        id: 3,
        name: 'Chemistry',
        grade: 'B',
        points: 3.0
      }
    ]
  }
]; 