import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Curriculum = () => {
  const { t } = useTranslation();
  const apartList = t('curriculum.apartList', { returnObjects: true });
  const elementaryList = t('curriculum.elementaryList', { returnObjects: true });
  const middleList = t('curriculum.middleList', { returnObjects: true });
  const highList = t('curriculum.highList', { returnObjects: true });

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
          <h1 className="text-4xl font-display font-bold mb-4">{t('curriculum.title')}</h1>
          <p className="text-xl opacity-90">{t('curriculum.subtitle')}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-2xl font-display font-bold mb-6">{t('curriculum.whatSetsApart')}</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8">
          {apartList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-display font-bold mb-6">{t('curriculum.gradeOverviews')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold text-lg mb-2">{t('curriculum.elementary')}</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {elementaryList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold text-lg mb-2">{t('curriculum.middle')}</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {middleList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold text-lg mb-2">{t('curriculum.high')}</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {highList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum; 