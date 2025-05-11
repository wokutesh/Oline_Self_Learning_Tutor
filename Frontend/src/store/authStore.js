import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      userType: null, // 'student', 'teacher', or 'parent'
      isAuthenticated: false,
      token: null,

      login: (userData, token) => set({
        user: userData,
        userType: userData.userType,
        token,
        isAuthenticated: true,
      }),

      logout: () => set({
        user: null,
        userType: null,
        isAuthenticated: false,
        token: null,
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore; 