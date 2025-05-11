import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Enrollment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gradeLevel: '',
    },
    parentInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    schoolPreference: {
      startDate: '',
      programType: '',
      previousSchool: '',
    }
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle final submission
      console.log("Form submitted:", formData);
      // You would typically send this data to your backend here
      navigate("/enrollment-success");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress bar */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between py-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-k12-blue text-white' : 'bg-gray-200'}`}>1</div>
              <div className={`ml-2 font-display font-medium ${step >= 1 ? 'text-k12-blue' : 'text-gray-500'}`}>{t("enroll.progress.studentInfo")}</div>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-k12-blue text-white' : 'bg-gray-200'}`}>2</div>
              <div className={`ml-2 font-display font-medium ${step >= 2 ? 'text-k12-blue' : 'text-gray-500'}`}>{t("enroll.progress.parentInfo")}</div>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-k12-blue text-white' : 'bg-gray-200'}`}>3</div>
              <div className={`ml-2 font-display font-medium ${step >= 3 ? 'text-k12-blue' : 'text-gray-500'}`}>{t("enroll.progress.schoolPreference")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-display font-bold mb-6">
            {step === 1 && t("enroll.studentInfoTitle")}
            {step === 2 && t("enroll.parentInfoTitle")}
            {step === 3 && t("enroll.schoolPreferenceTitle")}
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Student Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("enroll.firstName")}</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                      value={formData.studentInfo.firstName}
                      onChange={(e) => handleInputChange('studentInfo', 'firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("enroll.lastName")}</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                      value={formData.studentInfo.lastName}
                      onChange={(e) => handleInputChange('studentInfo', 'lastName', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t("enroll.dateOfBirth")}</label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                    value={formData.studentInfo.dateOfBirth}
                    onChange={(e) => handleInputChange('studentInfo', 'dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t("enroll.gradeLevel")}</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                    value={formData.studentInfo.gradeLevel}
                    onChange={(e) => handleInputChange('studentInfo', 'gradeLevel', e.target.value)}
                  >
                    <option value="">{t("enroll.selectGradeLevel")}</option>
                    <option value="K">{t("enroll.kindergarten")}</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{t("enroll.grade", { number: i + 1 })}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Parent Information */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("enroll.firstName")}</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                      value={formData.parentInfo.firstName}
                      onChange={(e) => handleInputChange('parentInfo', 'firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("enroll.lastName")}</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                      value={formData.parentInfo.lastName}
                      onChange={(e) => handleInputChange('parentInfo', 'lastName', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t("enroll.email")}</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                    value={formData.parentInfo.email}
                    onChange={(e) => handleInputChange('parentInfo', 'email', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t("enroll.phone")}</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                    value={formData.parentInfo.phone}
                    onChange={(e) => handleInputChange('parentInfo', 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t("enroll.address")}</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                    value={formData.parentInfo.address}
                    onChange={(e) => handleInputChange('parentInfo', 'address', e.target.value)}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("enroll.city")}</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                      value={formData.parentInfo.city}
                      onChange={(e) => handleInputChange('parentInfo', 'city', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("enroll.state")}</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                      value={formData.parentInfo.state}
                      onChange={(e) => handleInputChange('parentInfo', 'state', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("enroll.zipCode")}</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                      value={formData.parentInfo.zipCode}
                      onChange={(e) => handleInputChange('parentInfo', 'zipCode', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: School Preferences */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t("enroll.preferredStartDate")}</label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                    value={formData.schoolPreference.startDate}
                    onChange={(e) => handleInputChange('schoolPreference', 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t("enroll.programType")}</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                    value={formData.schoolPreference.programType}
                    onChange={(e) => handleInputChange('schoolPreference', 'programType', e.target.value)}
                  >
                    <option value="">{t("enroll.selectProgramType")}</option>
                    <option value="full-time">{t("enroll.fullTime")}</option>
                    <option value="part-time">{t("enroll.partTime")}</option>
                    <option value="summer">{t("enroll.summerSchool")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t("enroll.previousSchool")}</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-k12-blue"
                    value={formData.schoolPreference.previousSchool}
                    onChange={(e) => handleInputChange('schoolPreference', 'previousSchool', e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="btn-secondary"
                >
                  {t("enroll.previous")}
                </button>
              )}
              <button
                type="submit"
                className="btn-primary ml-auto"
              >
                {step === 3 ? t("enroll.submitApplication") : t("enroll.next")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Enrollment; 