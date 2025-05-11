import { create } from 'zustand';

const useStudentStore = create((set) => ({
  // Student Profile
  profile: null,
  setProfile: (profile) => set({ profile }),

  // Course Content
  courses: [],
  currentCourse: null,
  setCourses: (courses) => set({ courses }),
  setCurrentCourse: (course) => set({ currentCourse: course }),

  // Assessments
  assessments: [],
  setAssessments: (assessments) => set({ assessments }),

  // Progress
  progress: {},
  setProgress: (progress) => set({ progress }),

  // Notifications
  notifications: [],
  addNotification: (notification) => 
    set((state) => ({ 
      notifications: [...state.notifications, notification] 
    })),
  clearNotifications: () => set({ notifications: [] }),

  // Loading States
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useStudentStore; 