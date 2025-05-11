import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdvancedPrograms = () => {
  const { t } = useTranslation();
  const offerings = t('advancedPrograms.offerings', { returnObjects: true });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex-shrink-0">
            <img src="/k12-logo.svg" alt="K12 Logo" className="h-12" />
          </Link>
        </div>
      </div>
      <div className="bg-k12-blue text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-display font-bold mb-4">{t('advancedPrograms.title')}</h1>
          <p className="text-xl opacity-90">{t('advancedPrograms.subtitle')}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-2xl font-display font-bold mb-6">{t('advancedPrograms.offeringsTitle')}</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8">
          {offerings.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-display font-bold mb-6">{t('advancedPrograms.howToEnrollTitle')}</h2>
        <p className="text-gray-700 mb-4">{t('advancedPrograms.howToEnrollDesc')}</p>
        <Link to="/enroll" className="inline-block px-8 py-3 bg-k12-blue text-white font-medium rounded-md hover:bg-k12-dark-blue transition-colors">
          {t('advancedPrograms.startEnrollment')}
        </Link>
      </div>
    </div>
  );
};

export default AdvancedPrograms; 