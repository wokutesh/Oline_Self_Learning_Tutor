import { create } from 'zustand'

const useCourseStore = create((set) => ({
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,

  setCourses: (courses) => set({ courses }),
  setCurrentCourse: (course) => set({ currentCourse: course }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Actions
  fetchCourses: async () => {
    set({ loading: true, error: null })
    try {
      // Replace with actual API call
      const response = await fetch('/api/courses')
      const courses = await response.json()
      set({ courses, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  fetchCourseById: async (courseId) => {
    set({ loading: true, error: null })
    try {
      // Replace with actual API call
      const response = await fetch(`/api/courses/${courseId}`)
      const course = await response.json()
      set({ currentCourse: course, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
}))

export default useCourseStore 