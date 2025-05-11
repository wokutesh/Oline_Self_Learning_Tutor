import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const timeline = [
  {
    time: '8:30 AM',
    title: 'Log In & Morning Meeting',
    description: 'Students start their day by logging in, checking announcements, and joining a live homeroom session with their teacher and classmates.'
  },
  {
    time: '9:00 AM',
    title: 'Live Lessons',
    description: 'Interactive, teacher-led classes in core subjects like Math, Science, and Language Arts.'
  },
  {
    time: '11:00 AM',
    title: 'Independent Study',
    description: 'Students work on assignments, projects, or adaptive learning activities at their own pace.'
  },
  {
    time: '12:00 PM',
    title: 'Lunch & Break',
    description: 'Time to recharge, eat, and connect with friends in virtual clubs or chat rooms.'
  },
  {
    time: '1:00 PM',
    title: 'Small Group/1:1 Support',
    description: 'Optional sessions for extra help, enrichment, or social-emotional learning.'
  },
  {
    time: '2:00 PM',
    title: 'Clubs & Activities',
    description: 'Students join interest-based clubs, competitions, or creative workshops.'
  },
  {
    time: '3:00 PM',
    title: 'Wrap Up & Reflection',
    description: 'Students review their progress, set goals, and connect with teachers as needed.'
  }
];

const testimonials = [
  {
    name: 'Ava, Grade 7',
    quote: 'I love being able to learn at my own pace and join clubs like coding and art. My teachers are always there when I need help!'
  },
  {
    name: 'Ethan, Grade 10',
    quote: 'The virtual classroom is really interactive. I can ask questions, work in groups, and even present projects online.'
  },
  {
    name: 'Sophia, Parent',
    quote: 'The support from teachers and counselors is amazing. My child is thriving and feels part of a real community.'
  }
];

const features = [
  {
    icon: '💬',
    title: 'Live Chat & Q&A',
    description: 'Students can ask questions in real time and get instant feedback from teachers.'
  },
  {
    icon: '🎥',
    title: 'Recorded Lessons',
    description: 'Missed a class? All lessons are recorded and available for review anytime.'
  },
  {
    icon: '🤝',
    title: 'Group Projects',
    description: 'Collaborate with classmates on fun, challenging projects using digital tools.'
  },
  {
    icon: '🏆',
    title: 'Clubs & Competitions',
    description: 'Join clubs, participate in competitions, and explore new interests.'
  },
  {
    icon: '🧑‍🏫',
    title: '1:1 Teacher Support',
    description: 'Book time with teachers for extra help, guidance, or enrichment.'
  },
  {
    icon: '🌎',
    title: 'Diverse Community',
    description: 'Connect with students from across the country in a safe, inclusive environment.'
  }
];

const StudentExperience = () => {
  const { t } = useTranslation();
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

      {/* Hero Section */}
      <div className="bg-k12-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-display font-bold mb-4">{t('studentExperience.title')}</h1>
            <p className="text-xl opacity-90">
              {t('studentExperience.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Day in the Life Timeline */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-display font-bold mb-8 text-center">{t('studentExperience.dayInLife')}</h2>
        <ol className="relative border-l-4 border-k12-blue">
          {timeline.map((item, idx) => (
            <li key={idx} className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-k12-blue rounded-full -left-4 ring-4 ring-white text-white font-bold">
                {item.time.split(' ')[0]}
              </span>
              <h3 className="font-display font-bold text-lg mb-1 mt-1">{item.title}</h3>
              <p className="text-gray-600 mb-1">{item.description}</p>
              <span className="text-xs text-gray-400">{item.time}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Virtual Classroom Features */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">{t('studentExperience.virtualFeatures')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 text-center shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Voices */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-display font-bold mb-8 text-center">{t('studentExperience.studentVoices')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
              <svg className="w-8 h-8 text-k12-blue mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
              <blockquote className="italic text-gray-700 mb-2">"{t.quote}"</blockquote>
              <span className="text-sm text-gray-500 font-medium">{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Support & Community */}
      <div className="bg-k12-blue text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-display font-bold mb-4">{t('studentExperience.supportCommunity')}</h2>
          <p className="text-lg mb-6">
            {t('studentExperience.supportCommunityDesc')}
          </p>
          <Link
            to="/support"
            className="inline-block px-8 py-3 bg-white text-k12-blue font-medium rounded-md hover:bg-gray-100 transition-colors"
          >
            {t('studentExperience.learnAboutSupport')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentExperience; 