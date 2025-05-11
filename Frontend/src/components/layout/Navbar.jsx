import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SEARCHABLE_PAGES = [
  { title: 'Home', path: '/' },
  { title: 'Enroll', path: '/enroll' },
  { title: 'Enrollment Success', path: '/enrollment-success' },
  { title: 'Login', path: '/login' },
  { title: 'Forgot Password', path: '/forgot-password' },
  { title: 'Support', path: '/support' },
  { title: 'Resources', path: '/resources' },
  { title: 'Student Experience', path: '/student-experience' },
  { title: 'Curriculum & Standards', path: '/academic-excellence/curriculum' },
  { title: 'Accreditation & Awards', path: '/academic-excellence/accreditation' },
  { title: 'Advanced Programs', path: '/academic-excellence/advanced-programs' },
  { title: 'Student Achievements', path: '/academic-excellence/achievements' },
  { title: 'School Locator', path: '/find-a-school/locator' },
  { title: 'School Types', path: '/find-a-school/types' },
  { title: 'Enrollment Process', path: '/find-a-school/enrollment' },
  { title: 'Find a School FAQ', path: '/find-a-school/faq' },
];

// Add a mapping from path to translation key
const PAGE_TRANSLATION_KEYS = {
  '/': 'nav.home',
  '/enroll': 'nav.enroll',
  '/enrollment-success': 'enrollSuccess.title',
  '/login': 'nav.login',
  '/forgot-password': 'forgotPassword.title',
  '/support': 'nav.support',
  '/contact': 'contact.title',
  '/careers': 'nav.careers',
  '/resources': 'nav.resources',
  '/student-experience': 'nav.studentExperience',
  '/academic-excellence/curriculum': 'curriculum.title',
  '/academic-excellence/accreditation': 'accreditation.title',
  '/academic-excellence/advanced-programs': 'advancedPrograms.title',
  '/academic-excellence/achievements': 'achievements.title',
  '/find-a-school/locator': 'schoolLocator.title',
  '/find-a-school/types': 'schoolTypes.title',
  '/find-a-school/enrollment': 'enrollment.title',
  '/find-a-school/faq': 'faq.title',
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFindSchoolOpen, setIsFindSchoolOpen] = useState(false);
  const [isAcademicOpen, setIsAcademicOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const findSchoolRef = useRef(null);
  const academicRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        isSearchOpen
      ) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
      if (
        findSchoolRef.current &&
        !findSchoolRef.current.contains(event.target) &&
        academicRef.current &&
        !academicRef.current.contains(event.target)
      ) {
        setIsFindSchoolOpen(false);
        setIsAcademicOpen(false);
      } else if (
        findSchoolRef.current &&
        !findSchoolRef.current.contains(event.target)
      ) {
        setIsFindSchoolOpen(false);
      } else if (
        academicRef.current &&
        !academicRef.current.contains(event.target)
      ) {
        setIsAcademicOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen]);

  const filteredPages = SEARCHABLE_PAGES.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredPages.length > 0) {
      navigate(filteredPages[0].path);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="w-full shadow-sm">
      {/* Top announcement bar */}
      <div className="bg-k12-blue text-white text-center py-2 px-4">
        <p className="text-sm font-medium">
          Enrollment for the 2024-2025 school year is open!{' '}
          <Link to="/enroll" className="underline hover:text-k12-yellow">
            {t('nav.enroll')}
          </Link>
        </p>
      </div>

      {/* Top navigation */}
      <div className="bg-white border-b border-gray-100 px-4">
        <div className="container mx-auto flex justify-end space-x-6 py-2 items-center">
          {/* <Link to="/careers" className="text-sm hover:text-k12-blue">{t('nav.careers')}</Link>
          <Link to="/contact" className="text-sm hover:text-k12-blue">{t('contact.title')}</Link> */}
          <Link to="/support" className="text-sm hover:text-k12-blue">{t('nav.support')}</Link>
          <Link to="/login" className="text-sm font-medium text-k12-blue hover:text-k12-dark-blue">{t('nav.login')}</Link>
          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              className="flex items-center text-sm font-medium px-2 py-1 rounded hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsLangOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={isLangOpen}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t('nav.lang')}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg z-50">
                <button
                  className={`block w-full text-left px-4 py-2 hover:bg-k12-blue hover:text-white ${i18n.language === 'en' ? 'font-bold' : ''}`}
                  onClick={() => { i18n.changeLanguage('en'); setIsLangOpen(false); }}
                >English</button>
                <button
                  className={`block w-full text-left px-4 py-2 hover:bg-k12-blue hover:text-white ${i18n.language === 'om' ? 'font-bold' : ''}`}
                  onClick={() => { i18n.changeLanguage('om'); setIsLangOpen(false); }}
                >Afan Oromo</button>
                <button
                  className={`block w-full text-left px-4 py-2 hover:bg-k12-blue hover:text-white ${i18n.language === 'am' ? 'font-bold' : ''}`}
                  onClick={() => { i18n.changeLanguage('am'); setIsLangOpen(false); }}
                >Amharic</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white px-4 py-4 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/self-learner-logo.svg" alt="Self Learner Logo" className="h-12" />
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Find a School Dropdown */}
            <div
              className="relative"
              ref={findSchoolRef}
              onMouseEnter={() => setIsFindSchoolOpen(true)}
              onMouseLeave={() => setIsFindSchoolOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 font-display font-medium hover:text-k12-blue focus:outline-none ${isFindSchoolOpen ? 'text-k12-blue' : ''}`}
                type="button"
                onClick={() => setIsFindSchoolOpen((open) => !open)}
                aria-expanded={isFindSchoolOpen}
                aria-haspopup="true"
              >
                <span>{t('nav.findSchool')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                className={`absolute left-0 mt-2 w-64 bg-white border border-gray-100 rounded-lg shadow-lg z-20 transition-opacity ${isFindSchoolOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                {/* <Link to="/find-a-school/locator" className="block px-6 py-3 hover:bg-gray-50 font-medium text-gray-700">{t('schoolLocator.title')}</Link>
                <Link to="/find-a-school/types" className="block px-6 py-3 hover:bg-gray-50 font-medium text-gray-700">{t('schoolTypes.title')}</Link> */}
                <Link to="/find-a-school/enrollment" className="block px-6 py-3 hover:bg-gray-50 font-medium text-gray-700">{t('enrollment.title')}</Link>
                <Link to="/find-a-school/faq" className="block px-6 py-3 hover:bg-gray-50 font-medium text-gray-700">{t('faq.title')}</Link>
              </div>
            </div>
            {/* Academic Excellence Dropdown */}
            <div
              className="relative"
              ref={academicRef}
              onMouseEnter={() => setIsAcademicOpen(true)}
              onMouseLeave={() => setIsAcademicOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 font-display font-medium hover:text-k12-blue focus:outline-none ${isAcademicOpen ? 'text-k12-blue' : ''}`}
                type="button"
                onClick={() => setIsAcademicOpen((open) => !open)}
                aria-expanded={isAcademicOpen}
                aria-haspopup="true"
              >
                <span>{t('nav.academicExcellence')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button> 
              {/* Dropdown menu */}
              <div
                className={`absolute left-0 mt-2 w-64 bg-white border border-gray-100 rounded-lg shadow-lg z-20 transition-opacity ${isAcademicOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                <Link to="/academic-excellence/curriculum" className="block px-6 py-3 hover:bg-gray-50 font-medium text-gray-700">{t('curriculum.title')}</Link>
                <Link to="/academic-excellence/accreditation" className="block px-6 py-3 hover:bg-gray-50 font-medium text-gray-700">{t('accreditation.title')}</Link>
                <Link to="/academic-excellence/advanced-programs" className="block px-6 py-3 hover:bg-gray-50 font-medium text-gray-700">{t('advancedPrograms.title')}</Link>
                <Link to="/academic-excellence/achievements" className="block px-6 py-3 hover:bg-gray-50 font-medium text-gray-700">{t('achievements.title')}</Link>
              </div>
            </div>
            {/* <div className="group relative">
              <Link to="/student-experience" className="flex items-center space-x-1 font-display font-medium hover:text-k12-blue">
                <span>{t('nav.studentExperience')}</span>
              </Link>
            </div> */}
            <Link to="/resources" className="font-display font-medium hover:text-k12-blue">{t('nav.resources')}</Link>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link
              to="/enroll"
              className="px-6 py-3 bg-k12-orange text-white font-display font-medium rounded-md hover:bg-opacity-90 transition-colors"
            >
              {t('enrollNow')}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="pt-20 pb-6 px-4 space-y-6">
            {/* Find a School Section */}
            <div>
              <button
                className="flex items-center justify-between w-full text-lg font-medium text-gray-900"
                onClick={() => setIsFindSchoolOpen(!isFindSchoolOpen)}
              >
                <span>{t('nav.findSchool')}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${isFindSchoolOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`mt-2 space-y-2 ${isFindSchoolOpen ? 'block' : 'hidden'}`}>
                <Link
                  to="/find-a-school/enrollment"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('enrollment.title')}
                </Link>
                <Link
                  to="/find-a-school/faq"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('faq.title')}
                </Link>
              </div>
            </div>

            {/* Academic Excellence Section */}
            <div>
              <button
                className="flex items-center justify-between w-full text-lg font-medium text-gray-900"
                onClick={() => setIsAcademicOpen(!isAcademicOpen)}
              >
                <span>{t('nav.academicExcellence')}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${isAcademicOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`mt-2 space-y-2 ${isAcademicOpen ? 'block' : 'hidden'}`}>
                <Link
                  to="/academic-excellence/curriculum"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('curriculum.title')}
                </Link>
                <Link
                  to="/academic-excellence/accreditation"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('accreditation.title')}
                </Link>
                <Link
                  to="/academic-excellence/advanced-programs"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('advancedPrograms.title')}
                </Link>
                <Link
                  to="/academic-excellence/achievements"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('achievements.title')}
                </Link>
              </div>
            </div>

            {/* Resources Link */}
            <Link
              to="/resources"
              className="block text-lg font-medium text-gray-900 hover:text-k12-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.resources')}
            </Link>

            {/* Support and Login Links */}
            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/support"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.support')}
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.login')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 