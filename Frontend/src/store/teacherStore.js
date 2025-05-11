import { create } from 'zustand';

const useTeacherStore = create((set) => ({
  // Teacher Profile
  profile: null,
  setProfile: (profile) => set({ profile }),

  // Class Management
  classes: [],
  currentClass: null,
  setClasses: (classes) => set({ classes }),
  setCurrentClass: (classData) => set({ currentClass: classData }),

  // Content Management
  content: [],
  setContent: (content) => set({ content }),

  // Student Performance
  studentPerformance: {},
  setStudentPerformance: (performance) => set({ studentPerformance: performance }),

  // Assignments & Quizzes
  assignments: [],
  quizzes: [],
  setAssignments: (assignments) => set({ assignments }),
  setQuizzes: (quizzes) => set({ quizzes }),

  // Announcements
  announcements: [],
  setAnnouncements: (announcements) => set({ announcements }),
  addAnnouncement: (announcement) => 
    set((state) => ({ 
      announcements: [...state.announcements, announcement] 
    })),

  // Feedback
  feedback: [],
  setFeedback: (feedback) => set({ feedback }),

  // Loading States
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useTeacherStore; 