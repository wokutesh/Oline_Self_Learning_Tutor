import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to initiate password reset
    console.log('Password reset requested for:', email);
    setSubmitted(true);
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

      {/* Form Content */}
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-display font-bold mb-2">{t("forgotPassword.title")}</h1>
                  <p className="text-gray-600">
                    {t("forgotPassword.instructions")}
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
                      {t("forgotPassword.email")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary"
                  >
                    {t("forgotPassword.send")}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-k12-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-k12-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">{t("forgotPassword.checkEmail")}</h2>
                <p className="text-gray-600 mb-6">
                  {t("forgotPassword.sentTo")}<br />
                  <span className="font-medium">{email}</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {t("forgotPassword.notReceived")}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-medium text-k12-blue hover:text-k12-dark-blue"
                >
                  {t("forgotPassword.tryDifferent")}
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-k12-blue hover:text-k12-dark-blue"
              >
                {t("forgotPassword.backToSignIn")}
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {t("forgotPassword.needHelp")}{' '}
              <Link
                to="/support"
                className="font-medium text-k12-blue hover:text-k12-dark-blue"
              >
                {t("forgotPassword.contactSupport")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 