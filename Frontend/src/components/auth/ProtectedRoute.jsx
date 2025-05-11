import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ProtectedRoute = ({ children, allowedUserTypes = [] }) => {
  const { isAuthenticated, userType } = useAuthStore();
  const location = useLocation();

  console.log('ProtectedRoute:', { isAuthenticated, userType, allowedUserTypes });

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(userType)) {
    console.log('User type not allowed, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('Access granted, rendering protected content');
  return children;
};

export default ProtectedRoute; 