import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Resources = () => {
  const { t } = useTranslation();
  const guides = t('resources.guides', { returnObjects: true });
  const links = t('resources.links', { returnObjects: true });
  const videos = t('resources.videos', { returnObjects: true });

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

      {/* Hero Section */}
      <div className="bg-k12-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-display font-bold mb-4">{t('resources.title')}</h1>
            <p className="text-xl opacity-90">
              {t('resources.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Guides & Downloads */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6">{t('resources.featuredGuides')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {guides.map((guide, idx) => (
                <a
                  key={idx}
                  href={guide.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center mb-3">
                    <svg className="w-6 h-6 text-k12-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V6m0 0l-7 7m7-7l7 7" />
                    </svg>
                    <span className="text-sm text-gray-500">{guide.type}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{guide.title}</h3>
                  <p className="text-gray-600 text-sm">{guide.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Helpful Links */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6">{t('resources.helpfulLinks')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
                >
                  <h3 className="font-display font-bold text-lg mb-2 text-k12-blue hover:text-k12-dark-blue">{link.title}</h3>
                  <p className="text-gray-600 text-sm">{link.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Video Tutorials */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6">{t('resources.videoTutorials')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {videos.map((video, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <iframe
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-56 rounded"
                    ></iframe>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resources; 