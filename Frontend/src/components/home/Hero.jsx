import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-k12-blue to-k12-dark-blue opacity-90" />
      
      {/* Hero Content */}
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl text-white">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/find-a-school/locator"
              className="inline-flex items-center justify-center px-8 py-4 bg-k12-orange text-white font-display font-medium rounded-md hover:bg-opacity-90 transition-colors text-center"
            >
              {t('home.hero.findSchool')}
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-k12-blue font-display font-medium rounded-md hover:bg-opacity-90 transition-colors text-center"
            >
              {t('home.hero.seeHowItWorks')}
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-k12-light-blue rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-k12-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{t('home.features.personalizedLearning.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.personalizedLearning.desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-k12-light-blue rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-k12-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{t('home.features.licensedTeachers.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.licensedTeachers.desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-k12-light-blue rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-k12-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{t('home.features.activeCommunity.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.activeCommunity.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 