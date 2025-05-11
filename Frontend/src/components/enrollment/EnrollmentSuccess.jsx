import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const EnrollmentSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('enroll.success')}
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          {t('enroll.successMessage')}
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-k12-blue hover:bg-k12-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-k12-blue"
          >
            {t('enrollSuccess.returnHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentSuccess; 