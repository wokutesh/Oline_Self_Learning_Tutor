import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Terms = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-k12-blue text-white py-12 mb-8">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-4xl font-display font-bold mb-2">{t('terms.title')}</h1>
          <p className="text-lg opacity-90">{t('terms.subtitle')}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-3xl pb-16">
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('terms.introductionTitle')}</h2>
          <p className="text-gray-700">{t('terms.introduction')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('terms.acceptanceTitle')}</h2>
          <p className="text-gray-700">{t('terms.acceptance')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('terms.userRespTitle')}</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {t('terms.userRespList', { returnObjects: true }).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('terms.prohibitedTitle')}</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {t('terms.prohibitedList', { returnObjects: true }).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('terms.ipTitle')}</h2>
          <p className="text-gray-700">{t('terms.ip')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('terms.disclaimersTitle')}</h2>
          <p className="text-gray-700">{t('terms.disclaimers')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('terms.liabilityTitle')}</h2>
          <p className="text-gray-700">{t('terms.liability')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('terms.changesTitle')}</h2>
          <p className="text-gray-700">{t('terms.changes')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('terms.contactTitle')}</h2>
          <p className="text-gray-700">{t('terms.contact')} <Link to="/contact" className="text-k12-blue underline hover:text-k12-orange">{t('footer.contactUs')}</Link>.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms; 