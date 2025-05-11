import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentAPI, teacherAPI, parentAPI } from '../services/api';

// Student hooks
export const useStudentData = (queryKey, fetchFn, options = {}) => {
  return useQuery({
    queryKey: ['student', queryKey],
    queryFn: fetchFn,
    ...options,
  });
};

export const useStudentProfile = () => {
  return useStudentData('profile', studentAPI.getProfile);
};

export const useStudentCourses = () => {
  return useStudentData('courses', studentAPI.getCourses);
};

export const useStudentAssessments = () => {
  return useStudentData('assessments', studentAPI.getAssessments);
};

// Teacher hooks
export const useTeacherData = (queryKey, fetchFn, options = {}) => {
  return useQuery({
    queryKey: ['teacher', queryKey],
    queryFn: fetchFn,
    ...options,
  });
};

export const useTeacherProfile = () => {
  return useTeacherData('profile', teacherAPI.getProfile);
};

export const useTeacherClasses = () => {
  return useTeacherData('classes', teacherAPI.getClasses);
};

export const useTeacherContent = () => {
  return useTeacherData('content', teacherAPI.getContent);
};

// Parent hooks
export const useParentData = (queryKey, fetchFn, options = {}) => {
  return useQuery({
    queryKey: ['parent', queryKey],
    queryFn: fetchFn,
    ...options,
  });
};

export const useParentProfile = () => {
  return useParentData('profile', parentAPI.getProfile);
};

export const useParentChildren = () => {
  return useParentData('children', parentAPI.getChildren);
};

export const useParentChildrenProgress = () => {
  return useParentData('childrenProgress', parentAPI.getChildrenProgress);
};

// Generic mutation hook
export const useDataMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
}; 