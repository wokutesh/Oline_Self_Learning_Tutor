import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProgressStore = create(
  persist(
    (set) => ({
      progress: {},  // { courseId: { completed: [], currentLesson: null } }
      
      updateProgress: (courseId, lessonId) => 
        set((state) => ({
          progress: {
            ...state.progress,
            [courseId]: {
              ...state.progress[courseId],
              completed: [
                ...(state.progress[courseId]?.completed || []),
                lessonId
              ],
            },
          },
        })),

      setCurrentLesson: (courseId, lessonId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [courseId]: {
              ...state.progress[courseId],
              currentLesson: lessonId,
            },
          },
        })),

      resetProgress: (courseId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [courseId]: {
              completed: [],
              currentLesson: null,
            },
          },
        })),
    }),
    {
      name: 'progress-storage',
    }
  )
)

export default useProgressStore 