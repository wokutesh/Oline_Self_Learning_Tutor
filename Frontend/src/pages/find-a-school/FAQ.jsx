import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const faqs = t('faq.faqs', { returnObjects: true });
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
          <h1 className="text-4xl font-display font-bold mb-4">{t('faq.title')}</h1>
          <p className="text-xl opacity-90">{t('faq.subtitle')}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-bold text-lg mb-2">{item.q}</h2>
              <p className="text-gray-700">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/enroll" className="inline-block px-8 py-3 bg-k12-blue text-white font-medium rounded-md hover:bg-k12-dark-blue transition-colors">{t('faq.startEnrollment')}</Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 