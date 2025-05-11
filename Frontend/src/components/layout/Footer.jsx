import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-k12-blue text-white pt-12 pb-6 mt-auto relative z-10 shadow-inner">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        {/* Logo & Tagline */}
        <div className="flex-1 mb-8 md:mb-0 flex flex-col items-start">
          <Link to="/" className="mb-4">
            <img src="/self-learner-logo.svg" alt="Self Learner Logo" className="h-10" />
          </Link>
          <p className="text-k12-yellow font-display font-semibold text-lg mb-2">{t('footer.tagline')}</p>
          <p className="text-white text-opacity-80 max-w-xs text-sm">{t('footer.description')}</p>
        </div>
        {/* Navigation */}
        <div className="flex-1 mb-8 md:mb-0">
          <h3 className="font-bold text-lg mb-4 text-k12-yellow">{t('footer.quickLinks')}</h3>
          <ul className="space-y-2 text-white text-opacity-90">
            <li><Link to="/enroll" className="hover:text-k12-yellow transition">{t('nav.enroll')}</Link></li>
            <li><Link to="/how-it-works" className="hover:text-k12-yellow transition">{t('nav.howItWorks')}</Link></li>
            <li><Link to="/find-a-school/locator" className="hover:text-k12-yellow transition">{t('nav.findSchool')}</Link></li>
            <li><Link to="/resources" className="hover:text-k12-yellow transition">{t('nav.resources')}</Link></li>
            <li><Link to="/careers" className="hover:text-k12-yellow transition">{t('nav.careers')}</Link></li>
            <li><Link to="/support" className="hover:text-k12-yellow transition">{t('nav.support')}</Link></li>
          </ul>
        </div>
        {/* Contact & Social */}
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-4 text-k12-yellow">{t('footer.contactUs')}</h3>
          <p className="mb-2 text-white text-opacity-90">{t('footer.address')}</p>
          <p className="mb-2 text-white text-opacity-90">{t('footer.email')}</p>
          <p className="mb-4 text-white text-opacity-90">{t('footer.phone')}</p>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label={t('footer.social.facebook')} className="hover:text-k12-yellow">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label={t('footer.social.twitter')} className="hover:text-k12-yellow">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.09 4.07 7.38 1.64 4.89c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62-.72-.02-1.39-.22-1.98-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.12 2.9 3.99 2.93A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.72 8.72 0 0 0 24 4.59a8.48 8.48 0 0 1-2.54.7z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label={t('footer.social.linkedin')} className="hover:text-k12-yellow">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v4.75z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-10 border-t border-white border-opacity-20 pt-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-white text-opacity-70">{t('footer.copyright', { year })}</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/privacy" className="text-sm hover:text-k12-yellow transition">{t('footer.privacy')}</Link>
          <Link to="/terms" className="text-sm hover:text-k12-yellow transition">{t('footer.terms')}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 