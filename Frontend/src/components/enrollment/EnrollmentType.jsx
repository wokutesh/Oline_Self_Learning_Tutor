import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const EnrollmentType = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{t('enroll.selectType')}</h2>
          <p className="mt-2 text-lg text-gray-600">{t('enroll.selectTypeDescription')}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Student Enrollment Card */}
          <Link
            to="/enroll/student"
            className="relative block p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-k12-blue">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{t('enroll.studentTitle')}</h3>
              <p className="mt-2 text-gray-600">{t('enroll.studentDescription')}</p>
            </div>
          </Link>

          {/* Parent Enrollment Card */}
          <Link
            to="/enroll/parent"
            className="relative block p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-k12-blue">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{t('enroll.parentTitle')}</h3>
              <p className="mt-2 text-gray-600">{t('enroll.parentDescription')}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentType; 