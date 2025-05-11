import { Link } from 'react-router-dom';

const steps = [
  {
    icon: '📝',
    title: 'Enroll Online',
    description: 'Complete our simple online enrollment form and submit required documents.'
  },
  {
    icon: '🎒',
    title: 'Get Ready',
    description: 'Receive your welcome kit, set up your learning environment, and meet your teachers.'
  },
  {
    icon: '💻',
    title: 'Start Learning',
    description: 'Attend live online classes, access interactive lessons, and complete assignments at your own pace.'
  },
  {
    icon: '🤝',
    title: 'Stay Supported',
    description: 'Connect with teachers, counselors, and a vibrant student community for ongoing support.'
  },
  {
    icon: '🎉',
    title: 'Achieve & Grow',
    description: 'Track your progress, celebrate milestones, and prepare for your next steps.'
  }
];

const faqs = [
  {
    q: 'Do I need special equipment for online learning?',
    a: 'You need a computer or tablet with internet access. We provide guidance on recommended specs.'
  },
  {
    q: 'Are there live classes or is it self-paced?',
    a: 'Our program combines live teacher-led sessions with flexible, self-paced assignments.'
  },
  {
    q: 'How do students interact with teachers and classmates?',
    a: 'Students connect via live video, chat, group projects, and virtual clubs.'
  },
  {
    q: 'Is there support for students with special needs?',
    a: 'Yes, we offer accommodations and support for students with IEPs or 504 plans.'
  }
];

const HowItWorks = () => (
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
        <h1 className="text-4xl font-display font-bold mb-4">How K12 Online Learning Works</h1>
        <p className="text-xl opacity-90">A step-by-step look at the journey from enrollment to achievement in our virtual school community.</p>
      </div>
    </div>

    {/* Video Section */}
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-display font-bold mb-4 text-center">Watch: K12 Online Learning in Action</h2>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            src="https://www.youtube.com/embed/7qmfz6vQYqg"
            title="How K12 Online Learning Works"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-64 rounded"
          ></iframe>
        </div>
        <p className="text-gray-600 text-center">See how students and teachers connect, learn, and grow in our virtual classrooms.</p>
      </div>
    </div>

    {/* Visual Infographic */}
    <div className="container mx-auto px-4 max-w-4xl mb-16">
      <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center">
        <img src="/how-it-works-illustration.svg" alt="How It Works Infographic" className="w-full max-w-xl mb-4" />
        <p className="text-gray-600 text-center">Our process is designed to be simple, supportive, and student-centered every step of the way.</p>
      </div>
    </div>

    {/* Steps Section */}
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid md:grid-cols-5 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-4">{step.icon}</div>
            <h2 className="font-display font-bold text-lg mb-2">{step.title}</h2>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/enroll" className="inline-block px-8 py-3 bg-k12-blue text-white font-medium rounded-md hover:bg-k12-dark-blue transition-colors">Get Started</Link>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-display font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((item, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-lg mb-2">{item.q}</h3>
              <p className="text-gray-700">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorks; 