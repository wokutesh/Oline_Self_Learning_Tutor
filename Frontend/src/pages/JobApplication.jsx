import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const JobApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: null,
    linkedin: '',
    portfolio: '',
    startDate: '',
    referral: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // In a real application, you would fetch the job details using the id
  const job = {
    id: 1,
    title: 'Online Math Teacher',
    department: 'Teaching',
    location: 'Remote',
    type: 'Full-time'
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the application
    console.log('Application submitted:', formData);
    setSubmitted(true);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-display font-bold mb-4">Job Not Found</h1>
        <Link
          to="/careers"
          className="text-k12-blue hover:text-k12-dark-blue font-medium"
        >
          View All Positions
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex-shrink-0">
            <img src="/k12-logo.svg" alt="K12 Logo" className="h-12" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {!submitted ? (
            <>
              {/* Job Header */}
              <div className="mb-8">
                <Link
                  to="/careers"
                  className="text-k12-blue hover:text-k12-dark-blue font-medium flex items-center mb-4"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to All Positions
                </Link>
                <h1 className="text-3xl font-display font-bold mb-2">{job.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {job.department}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.type}
                  </span>
                </div>
              </div>

              {/* Application Form */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Apply Now</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email Address *
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
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="phone">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Resume and Cover Letter */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="resume">
                        Resume *
                      </label>
                      <input
                        id="resume"
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                        onChange={(e) => handleFileChange('resume', e.target.files[0])}
                      />
                      <p className="mt-1 text-sm text-gray-500">PDF, DOC, or DOCX (Max 5MB)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="coverLetter">
                        Cover Letter
                      </label>
                      <input
                        id="coverLetter"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                        onChange={(e) => handleFileChange('coverLetter', e.target.files[0])}
                      />
                      <p className="mt-1 text-sm text-gray-500">PDF, DOC, or DOCX (Max 5MB)</p>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="linkedin">
                        LinkedIn Profile
                      </label>
                      <input
                        id="linkedin"
                        type="url"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="portfolio">
                        Portfolio/Website
                      </label>
                      <input
                        id="portfolio"
                        type="url"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                        value={formData.portfolio}
                        onChange={(e) => handleInputChange('portfolio', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="startDate">
                        Earliest Start Date *
                      </label>
                      <input
                        id="startDate"
                        type="date"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="referral">
                        How did you hear about us?
                      </label>
                      <input
                        id="referral"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                        value={formData.referral}
                        onChange={(e) => handleInputChange('referral', e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-k12-blue text-white font-medium rounded-md hover:bg-k12-dark-blue transition-colors"
                  >
                    Submit Application
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-k12-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-k12-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Application Submitted!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for applying to {job.title}. We'll review your application and get back to you soon.
              </p>
              <div className="space-x-4">
                <Link
                  to="/careers"
                  className="inline-block px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors"
                >
                  View More Positions
                </Link>
                <Link
                  to="/"
                  className="inline-block px-6 py-2 text-k12-blue hover:text-k12-dark-blue font-medium"
                >
                  Return Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplication; 