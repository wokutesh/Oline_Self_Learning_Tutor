import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Support = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const commonQuestions = t('support.questions', { returnObjects: true });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the support request
    console.log('Support request:', formData);
    setSubmitted(true);
  };

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

      {/* Content */}
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">{t('support.title')}</h1>
            <p className="text-xl text-gray-600">
              {t('support.subtitle')}
            </p>
          </div>

          {/* Common Questions */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold mb-6">{t('support.commonQuestions')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {commonQuestions.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-display font-bold text-lg mb-2">{item.question}</h3>
                  <p className="text-gray-600 mb-4">{item.answer}</p>
                  <Link
                    to={item.link}
                    className="text-k12-blue hover:text-k12-dark-blue font-medium"
                  >
                    {t('support.learnMore')}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            {!submitted ? (
              <>
                <h2 className="text-2xl font-display font-bold mb-6">{t('support.contactSupport')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">
                        {t('support.yourName')}
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        {t('support.emailAddress')}
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="subject">
                      {t('support.subject')}
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="message">
                      {t('support.message')}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-k12-blue text-white font-medium rounded-md hover:bg-k12-dark-blue transition-colors"
                  >
                    {t('support.sendMessage')}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-k12-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-k12-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">{t('support.messageSent')}</h2>
                <p className="text-gray-600 mb-6">
                  {t('support.thankYou')}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      subject: '',
                      message: ''
                    });
                  }}
                  className="text-k12-blue hover:text-k12-dark-blue font-medium"
                >
                  {t('support.sendAnother')}
                </button>
              </div>
            )}
          </div>

          {/* Alternative Contact Methods */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-display font-bold text-lg mb-2">{t('support.phoneSupport')}</h3>
              <p className="text-gray-600 mb-2">{t('support.phoneHours')}</p>
              <a
                href="tel:1-800-123-4567"
                className="text-k12-blue hover:text-k12-dark-blue font-medium"
              >
                1-800-123-4567
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-display font-bold text-lg mb-2">{t('support.emailSupport')}</h3>
              <p className="text-gray-600 mb-2">{t('support.emailResponse')}</p>
              <a
                href="mailto:support@k12learning.com"
                className="text-k12-blue hover:text-k12-dark-blue font-medium"
              >
                support@k12learning.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support; 