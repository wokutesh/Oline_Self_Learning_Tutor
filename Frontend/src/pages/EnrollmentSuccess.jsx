import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EnrollmentSuccess = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="w-16 h-16 bg-k12-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-k12-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold mb-2">{t("enrollSuccess.title")}</h1>
          <p className="text-gray-600 mb-6">
            {t("enrollSuccess.thankYou")}
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              {t("enrollSuccess.reference")}: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <Link
              to="/"
              className="btn-primary w-full"
            >
              {t("enrollSuccess.returnHome")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentSuccess; 