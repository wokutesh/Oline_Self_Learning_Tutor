import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockUsers } from '../data/mockUsers';
import useAuthStore from '../store/authStore';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find user in mock data
    const user = mockUsers.find(
      u => u.email === formData.email && u.password === formData.password
    );

    console.log('Login attempt:', { email: formData.email, userFound: !!user });
    
    if (user) {
      // Login successful
      console.log('User found, logging in:', user);
      login(user, 'mock-token'); // Pass user data and a mock token
      
      // Redirect based on user type
      const redirectPath = {
        student: '/student/dashboard',
        teacher: '/teacher/dashboard',
        parent: '/parent/dashboard'
      }[user.userType] || '/';
      
      console.log('Redirecting to:', redirectPath);
      navigate(redirectPath);
    } else {
      console.log('Login failed: Invalid credentials');
    setError(t("login.invalid"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex-shrink-0">
            <img src="/self-learner-logo.svg" alt="Self Learner Logo" className="h-12" />
          </Link>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display font-bold mb-2">{t("login.welcome")}</h1>
              <p className="text-gray-600">
                {t("login.signInToAccount")}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  {t("login.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  {t("login.password")}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-k12-blue focus:ring-k12-blue border-gray-300 rounded"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    {t("login.rememberMe")}
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-k12-blue hover:text-k12-dark-blue"
                >
                  {t("login.forgotPassword")}
                </Link>
              </div>

              <button
                type="submit"
                className="w-full btn-primary"
              >
                {t("login.signIn")}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t("login.noAccount")}{' '}
                <Link
                  to="/enroll"
                  className="font-medium text-k12-blue hover:text-k12-dark-blue"
                >
                  {t("login.enrollNow")}
                </Link>
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {t("login.needHelp")}{' '}
              <Link
                to="/support"
                className="font-medium text-k12-blue hover:text-k12-dark-blue"
              >
                {t("login.contactSupport")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 