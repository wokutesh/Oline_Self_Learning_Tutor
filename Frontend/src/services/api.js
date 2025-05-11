import axios from 'axios';
import useAuthStore from '../store/authStore';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password/', { email }),
  resetPassword: (data) => api.post('/auth/reset-password/', data),
};

// Student API calls
export const studentAPI = {
  getProfile: () => api.get('/student/profile/'),
  getCourses: () => api.get('/student/courses/'),
  getAssessments: () => api.get('/student/assessments/'),
  getProgress: () => api.get('/student/progress/'),
  getNotifications: () => api.get('/student/notifications/'),
};

// Teacher API calls
export const teacherAPI = {
  getProfile: () => api.get('/teacher/profile/'),
  getClasses: () => api.get('/teacher/classes/'),
  getContent: () => api.get('/teacher/content/'),
  getStudentPerformance: () => api.get('/teacher/student-performance/'),
  getAssignments: () => api.get('/teacher/assignments/'),
  getQuizzes: () => api.get('/teacher/quizzes/'),
  getAnnouncements: () => api.get('/teacher/announcements/'),
  getFeedback: () => api.get('/teacher/feedback/'),
};

// Parent API calls
export const parentAPI = {
  getProfile: () => api.get('/parent/profile/'),
  getChildren: () => api.get('/parent/children/'),
  getChildrenProgress: () => api.get('/parent/children-progress/'),
  getAlerts: () => api.get('/parent/alerts/'),
  getMessages: () => api.get('/parent/messages/'),
  getEvents: () => api.get('/parent/events/'),
};

export default api; 