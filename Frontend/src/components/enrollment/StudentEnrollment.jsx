import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const StudentEnrollment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    grade: '',
    gender: '',
    city: '',
    state: '',
    email: '',
    password: '',
    confirmPassword: '',
    language: 'en',
    previousDocument: null
  });
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));

    // Check password match when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      const newPassword = name === 'password' ? value : formData.password;
      const newConfirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      
      if (newPassword && newConfirmPassword && newPassword !== newConfirmPassword) {
        setPasswordError(t('enroll.passwordMismatch'));
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(t('enroll.passwordMismatch'));
      return;
    }
    
    // Generate 6-digit tracking number
    const trackingNumber = Math.floor(100000 + Math.random() * 900000);
    
    try {
      // Here you would typically make an API call to save the student data
      // and send the tracking number email
      
      // For now, we'll just show a success message and redirect
      alert(`Your tracking number is: ${trackingNumber}. Please check your email.`);
      navigate('/enroll/success');
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('There was an error processing your enrollment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{t('enroll.studentTitle')}</h2>
          <p className="mt-2 text-lg text-gray-600">{t('enroll.studentFormDescription')}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                {t('enroll.firstName')}
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-k12-blue focus:ring-k12-blue"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                {t('enroll.lastName')}
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-k12-blue focus:ring-k12-blue"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Birth Date */}
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                {t('enroll.birthDate')}
              </label>
              <input
                type="date"
                name="birthDate"
                id="birthDate"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-k12-blue focus:ring-k12-blue"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>

            {/* Grade */}
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                {t('enroll.grade')}
              </label>
              <select
                name="grade"
                id="grade"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-k12-blue focus:ring-k12-blue"
                value={formData.grade}
                onChange={handleChange}
              >
                <option value="">{t('enroll.selectGrade')}</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {t('enroll.grade', { number: i + 1 })}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                {t('enroll.gender')}
              </label>
              <select
                name="gender"
                id="gender"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-k12-blue focus:ring-k12-blue"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">{t('enroll.selectGender')}</option>
                <option value="male">{t('enroll.male')}</option>
                <option value="female">{t('enroll.female')}</option>
                <option value="other">{t('enroll.other')}</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                {t('enroll.city')}
              </label>
              <input
                type="text"
                name="city"
                id="city"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-k12-blue focus:ring-k12-blue"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                {t('enroll.state')}
              </label>
              <input
                type="text"
                name="state"
                id="state"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-k12-blue focus:ring-k12-blue"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('enroll.email')}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-k12-blue focus:ring-k12-blue"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('enroll.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-k12-blue focus:ring-k12-blue pr-10"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {t('enroll.confirmPassword')}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-k12-blue focus:ring-k12-blue pr-10 ${passwordError ? 'border-red-500' : ''}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            {/* Language */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                {t('enroll.language')}
              </label>
              <select
                name="language"
                id="language"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-k12-blue focus:ring-k12-blue"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="">{t('enroll.selectLanguage')}</option>
                <option value="en">English</option>
                <option value="om">Afan Oromo</option>
                <option value="am">Amharic</option>
              </select>
            </div>

            {/* Previous Document Upload */}
            <div className="sm:col-span-2">
              <label htmlFor="previousDocument" className="block text-sm font-medium text-gray-700">
                {t('enroll.previousDocument')}
              </label>
              <input
                type="file"
                name="previousDocument"
                id="previousDocument"
                required
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-k12-blue file:text-white
                  hover:file:bg-k12-blue-dark"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-k12-blue hover:bg-k12-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-k12-blue"
              disabled={!!passwordError}
            >
              {t('enroll.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentEnrollment; 