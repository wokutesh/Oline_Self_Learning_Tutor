import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-k12-blue text-white py-12 mb-8">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-4xl font-display font-bold mb-2">{t('privacy.title')}</h1>
          <p className="text-lg opacity-90">{t('privacy.subtitle')}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-3xl pb-16">
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('privacy.introductionTitle')}</h2>
          <p className="text-gray-700">{t('privacy.introduction')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('privacy.infoTitle')}</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {t('privacy.infoList', { returnObjects: true }).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('privacy.useTitle')}</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {t('privacy.useList', { returnObjects: true }).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('privacy.sharingTitle')}</h2>
          <p className="text-gray-700">{t('privacy.sharing')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('privacy.cookiesTitle')}</h2>
          <p className="text-gray-700">{t('privacy.cookies')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('privacy.securityTitle')}</h2>
          <p className="text-gray-700">{t('privacy.security')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('privacy.childrenTitle')}</h2>
          <p className="text-gray-700">{t('privacy.children')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('privacy.rightsTitle')}</h2>
          <p className="text-gray-700">{t('privacy.rights')}</p>
        </section>
        <section className="mb-8">
          <h2 className="font-bold text-xl mb-2 text-k12-blue">{t('privacy.contactTitle')}</h2>
          <p className="text-gray-700">{t('privacy.contact')} <Link to="/contact" className="text-k12-blue underline hover:text-k12-orange">{t('footer.contactUs')}</Link>.</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy; 