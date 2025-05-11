import { create } from 'zustand';
import { 
  mockParents, 
  getParentChildren, 
  getPendingVerifications, 
  verifyChild,
  getChildProgress,
  getChildAlerts
} from '../data/mockParents';
import useAuthStore from './authStore';

const useParentStore = create((set, get) => ({
  // Parent Profile
  profile: null,
  setProfile: (profile) => set({ profile }),

  // Children Management
  children: [],
  currentChild: null,
  pendingVerifications: [],
  setChildren: (children) => set({ children }),
  setCurrentChild: (child) => set({ currentChild: child }),
  setPendingVerifications: (verifications) => set({ pendingVerifications: verifications }),

  // Load parent data
  loadParentData: () => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const parent = mockParents.find(p => p.email === user.email);
    if (!parent) return;

    set({ profile: parent });
    set({ children: getParentChildren(user.email) });
    set({ pendingVerifications: getPendingVerifications(user.email) });
  },

  // Verify child
  verifyChild: (verificationCode) => {
    const { user } = useAuthStore.getState();
    if (!user) return false;

    const success = verifyChild(user.email, verificationCode);
    if (success) {
      get().loadParentData();
    }
    return success;
  },

  // Children Progress
  childrenProgress: {},
  setChildrenProgress: (progress) => set({ childrenProgress: progress }),

  // Load child progress
  loadChildProgress: (childId) => {
    const progress = getChildProgress(childId);
    if (progress) {
      set(state => ({
        childrenProgress: {
          ...state.childrenProgress,
          [childId]: progress
        }
      }));
    }
    return progress;
  },

  // Alerts & Notifications
  alerts: [],
  setAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) => 
    set((state) => ({ 
      alerts: [...state.alerts, alert] 
    })),
  clearAlerts: () => set({ alerts: [] }),

  // Load child alerts
  loadChildAlerts: (childId) => {
    const alerts = getChildAlerts(childId);
    set({ alerts });
    return alerts;
  },

  // Communication
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => 
    set((state) => ({ 
      messages: [...state.messages, message] 
    })),

  // Calendar & Events
  events: [],
  setEvents: (events) => set({ events }),

  // Loading States
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useParentStore; 