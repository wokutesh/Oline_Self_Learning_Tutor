import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        enroll: 'Enroll',
        howItWorks: 'How It Works',
        findSchool: 'Find a School',
        resources: 'Resources',
        careers: 'Careers',
        support: 'Support',
        login: 'Login',
        lang: 'Lang',
        studentExperience: 'Student Experience',
        academicExcellence: 'Academic Excellence',
      },
      enrollNow: 'Enroll Now',
      home: {
        hero: {
          title: 'Online Public School That Fits Your Life',
          subtitle: `K12-powered online public schools provide a tuition-free education that's personalized for your child's needs. Available in many states for grades K–12.`,
          findSchool: 'Find a School',
          seeHowItWorks: 'See How It Works',
        },
        features: {
          title: 'Why Choose K12?',
          personalizedLearning: {
            title: 'Personalized Learning',
            desc: `Curriculum that adapts to your child's needs, helping to build confidence and independence.`,
          },
          licensedTeachers: {
            title: 'State-Licensed Teachers',
            desc: 'Experienced educators dedicated to helping your child reach their full potential.',
          },
          activeCommunity: {
            title: 'Active Community',
            desc: 'Connect with other families through clubs, activities, and field trips.',
          },
        },
      },
      enroll: {
        progress: {
          studentInfo: "Student Info",
          parentInfo: "Parent Info",
          schoolPreference: "School Preference"
        },
        selectType: "Choose Your Enrollment Type",
        selectTypeDescription: "Select whether you want to enroll as a student or as a parent/guardian",
        studentTitle: "Student Enrollment",
        studentDescription: "Enroll as a student to access our online learning platform and start your educational journey",
        parentTitle: "Parent/Guardian Enrollment",
        parentDescription: "Enroll as a parent to monitor your child's progress and access parent resources",
        studentFormDescription: "Please fill out the form below to enroll as a student",
        parentFormDescription: "Please fill out the form below to enroll as a parent/guardian",
        firstName: "First Name",
        lastName: "Last Name",
        name: "Full Name",
        birthDate: "Date of Birth",
        dateFormat: "MM/DD/YYYY",
        grade: "Grade Level",
        selectGrade: "Select Grade Level",
        gender: "Gender",
        selectGender: "Select Gender",
        male: "Male",
        female: "Female",
        other: "Other",
        city: "City",
        state: "State",
        email: "Email Address",
        password: "Password",
        confirmPassword: "Confirm Password",
        passwordMismatch: "Passwords do not match",
        language: "Language",
        selectLanguage: "Select Language",
        previousDocument: "Previous Level Document",
        submit: "Submit Enrollment",
        success: "Enrollment Successful",
        successMessage: "Your enrollment has been submitted successfully. Please check your email for further instructions.",
        error: "Enrollment Error",
        errorMessage: "There was an error processing your enrollment. Please try again."
      },
      enrollSuccess: {
        title: "Application Submitted!",
        thankYou: "Thank you for your interest in K12 online learning. We've received your application and will contact you soon to discuss the next steps.",
        reference: "Application Reference",
        returnHome: "Return to Homepage"
      },
      login: {
        welcome: "Welcome Back",
        signInToAccount: "Sign in to access your K12 account",
        email: "Email Address",
        password: "Password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot your password?",
        signIn: "Sign In",
        invalid: "Invalid email or password. Please try again.",
        noAccount: "Don't have an account?",
        enrollNow: "Enroll Now",
        needHelp: "Need help?",
        contactSupport: "Contact Support"
      },
      forgotPassword: {
        title: "Reset Password",
        instructions: "Enter your email address and we'll send you instructions to reset your password.",
        email: "Email Address",
        send: "Send Reset Instructions",
        checkEmail: "Check Your Email",
        sentTo: "We've sent password reset instructions to:",
        notReceived: "Didn't receive the email? Check your spam folder or try again.",
        tryDifferent: "Try a different email address",
        backToSignIn: "Back to Sign In",
        needHelp: "Need help?",
        contactSupport: "Contact Support"
      },
      support: {
        title: "How Can We Help?",
        subtitle: "Find answers to common questions or reach out to our support team",
        commonQuestions: "Common Questions",
        learnMore: "Learn more →",
        contactSupport: "Contact Support",
        yourName: "Your Name",
        emailAddress: "Email Address",
        subject: "Subject",
        message: "Message",
        sendMessage: "Send Message",
        messageSent: "Message Sent!",
        thankYou: "Thank you for reaching out. We'll get back to you within 24 hours.",
        sendAnother: "Send another message",
        phoneSupport: "Phone Support",
        phoneHours: "Available Monday-Friday, 8am-6pm EST",
        emailSupport: "Email Support",
        emailResponse: "We typically respond within 24 hours",
        questions: [
          {
            question: "How do I enroll my child?",
            answer: "You can enroll your child by clicking the 'Enroll Now' button and following our simple enrollment process.",
            link: "/enroll"
          },
          {
            question: "What grades do you support?",
            answer: "We offer comprehensive K-12 education programs, from kindergarten through 12th grade.",
            link: "/programs"
          },
          {
            question: "How do online classes work?",
            answer: "Our online classes combine live sessions with self-paced learning, supported by experienced teachers.",
            link: "/how-it-works"
          },
          {
            question: "What technology do we need?",
            answer: "Students need a computer with internet access. We provide all necessary learning software.",
            link: "/requirements"
          }
        ]
      },
      contact: {
        title: "Contact Us",
        subtitle: "Have a question about our programs or interested in partnering with us? We'd love to hear from you.",
        sendMessage: "Send Us a Message",
        fullName: "Full Name",
        emailAddress: "Email Address",
        phoneNumber: "Phone Number",
        department: "Department",
        selectDepartment: "Select a Department",
        departments: {
          partnerships: "Business Partnerships",
          careers: "Careers",
          media: "Media Inquiries",
          general: "General Inquiries"
        },
        message: "Message",
        send: "Send Message",
        messageSent: "Message Sent!",
        thankYou: "Thank you for contacting us. We'll get back to you soon.",
        sendAnother: "Send another message",
        offices: "Our Offices",
        quickLinks: "Quick Links",
        careers: "Career Opportunities →",
        partnerships: "Partnership Programs →",
        support: "Technical Support →"
      },
      careers: {
        joinMission: "Join Our Mission",
        joinMissionDesc: "Help shape the future of education by joining our team of passionate educators, innovators, and problem solvers.",
        viewOpenPositions: "View Open Positions",
        whyWorkWithUs: "Why Work With Us?",
        openPositions: "Open Positions",
        allDepartments: "All Departments",
        teaching: "Teaching",
        curriculum: "Curriculum Development",
        tech: "Technology",
        operations: "Operations",
        support: "Student Support",
        location: "Location",
        type: "Type",
        requirements: "Requirements",
        applyNow: "Apply Now",
        benefits: [
          { icon: "🏥", title: "Health & Wellness", description: "Comprehensive medical, dental, and vision coverage for you and your family" },
          { icon: "💰", title: "Competitive Pay", description: "Above-market compensation with regular performance reviews" },
          { icon: "🎓", title: "Professional Development", description: "Continuous learning opportunities and education reimbursement" },
          { icon: "⏰", title: "Work-Life Balance", description: "Flexible scheduling and generous paid time off" },
          { icon: "🏠", title: "Remote Work", description: "Hybrid and fully remote opportunities available" },
          { icon: "🎯", title: "Career Growth", description: "Clear career paths and advancement opportunities" }
        ]
      },
      resources: {
        title: "Learning Resources",
        subtitle: "Explore guides, helpful links, and video tutorials to support your K12 learning journey.",
        featuredGuides: "Featured Guides & Downloads",
        helpfulLinks: "Helpful Links",
        videoTutorials: "Video Tutorials",
        guides: [
          { title: "Parent Handbook", description: "A comprehensive guide for parents on supporting online learning.", type: "PDF" },
          { title: "Student Success Guide", description: "Tips and best practices for students to excel in virtual classrooms.", type: "PDF" },
          { title: "K12 Curriculum Overview", description: "An overview of our K-12 curriculum and learning pathways.", type: "PDF" }
        ],
        links: [
          { title: "U.S. Department of Education", description: "Official site for federal education resources." },
          { title: "Khan Academy", description: "Free online courses, lessons, and practice." },
          { title: "Common Sense Media", description: "Reviews and advice for families on digital learning." }
        ],
        videos: [
          { title: "How Online Learning Works", description: "A quick overview of the online learning experience." },
          { title: "Parent Portal Walkthrough", description: "Step-by-step guide to using the parent portal." }
        ]
      },
      studentExperience: {
        title: "The Student Experience",
        subtitle: "Discover what it's like to learn, connect, and grow at K12 Online Academy.",
        dayInLife: "A Day in the Life",
        virtualFeatures: "Virtual Classroom Features",
        studentVoices: "Student Voices",
        supportCommunity: "Support & Community",
        supportCommunityDesc: "Every student is supported by certified teachers, counselors, and a vibrant online community. Access 1:1 help, join clubs, and make friends from across the country.",
        learnAboutSupport: "Learn About Student Support"
      },
      curriculum: {
        title: "Curriculum & Standards",
        subtitle: "Our curriculum is designed to meet and exceed national and state standards, providing a rigorous and engaging learning experience for every student.",
        whatSetsApart: "What Sets Our Curriculum Apart?",
        apartList: [
          "Aligned with Common Core and state standards",
          "Project-based and inquiry-driven learning",
          "Personalized pathways for every student",
          "STEM, arts, and world languages included",
          "Regular assessments and progress monitoring"
        ],
        gradeOverviews: "Grade-Level Overviews",
        elementary: "Elementary (K-5)",
        elementaryList: [
          "Foundational skills in reading, writing, and math",
          "Hands-on science and social studies",
          "Art, music, and physical education"
        ],
        middle: "Middle School (6-8)",
        middleList: [
          "Deeper exploration of core subjects",
          "Electives in STEM, arts, and languages",
          "Career exploration and life skills"
        ],
        high: "High School (9-12)",
        highList: [
          "College and career readiness",
          "Advanced Placement (AP) and honors courses",
          "Dual enrollment and CTE pathways"
        ]
      },
      accreditation: {
        title: "Accreditation & Awards",
        subtitle: "K12 Online Academy is fully accredited and recognized for excellence in digital education.",
        accreditationsTitle: "Our Accreditations",
        accreditations: [
          "AdvancED/Cognia Accredited",
          "State Department of Education Approved",
          "College Board Approved for AP Courses",
          "NCAA Approved Courses for Student Athletes"
        ],
        awardsTitle: "Awards & Recognition",
        awards: [
          "2023 Best Online School (EdTech Awards)",
          "Excellence in Digital Learning Award",
          "Top STEM Program (National STEM Council)"
        ]
      },
      advancedPrograms: {
        title: "Advanced Programs",
        subtitle: "Challenging and enriching opportunities for high-achieving students, including AP, honors, and dual enrollment options.",
        offeringsTitle: "Our Advanced Offerings",
        offerings: [
          "Advanced Placement (AP) courses in STEM, humanities, and arts",
          "Honors tracks for accelerated learning",
          "Dual enrollment with partner colleges and universities",
          "Gifted & Talented enrichment programs",
          "Personalized academic coaching and mentorship"
        ],
        howToEnrollTitle: "How to Enroll",
        howToEnrollDesc: "Students interested in advanced programs can indicate their interest during enrollment or speak with their academic advisor for placement and eligibility requirements.",
        startEnrollment: "Start Enrollment"
      },
      achievements: {
        title: "Student Achievements",
        subtitle: "Celebrating the outstanding accomplishments of our students in academics, arts, and service.",
        highlightsTitle: "Recent Highlights",
        achievements: [
          { title: "National Science Fair Winner", description: "Our 8th grader, Maya, took first place at the National Science Fair for her innovative renewable energy project." },
          { title: "Math Olympiad Champions", description: "K12 students won the state Math Olympiad for the third consecutive year." },
          { title: "Published Young Author", description: "High school student Alex published a novel that is now part of the school reading list." },
          { title: "Robotics Team Finalists", description: "Our robotics club reached the finals in the National Robotics Challenge." },
          { title: "Community Service Award", description: "Students logged over 5,000 hours of community service last year." }
        ],
        seeMore: "See More Student Stories"
      },
      schoolLocator: {
        title: "School Locator",
        subtitle: "Find K12 partner schools in your area. Search by state or region to discover available options.",
        allStates: "All States",
        searchPlaceholder: "Search by school name or city...",
        availableSchools: "Available Schools",
        noSchools: "No schools found for your search.",
        map: "Map",
        enrollAt: "Enroll at {{school}}"
      },
      schoolTypes: {
        title: "School Types",
        subtitle: "Explore the different types of K12 partner schools available to meet your family's needs.",
        public: {
          title: "Public Schools",
          desc: "Tuition-free, state-certified online public schools serving students in your state. Open to all eligible students."
        },
        private: {
          title: "Private Schools",
          desc: "Accredited, tuition-based online private schools with flexible enrollment and a wide range of courses."
        },
        charter: {
          title: "Charter Schools",
          desc: "Publicly funded, independently operated online schools with innovative programs and unique learning models."
        },
        learnAboutEnrollment: "Learn About Enrollment"
      },
      enrollment: {
        title: "Enrollment Process",
        subtitle: "A simple, step-by-step guide to enrolling in a K12 partner school.",
        howTo: "How to Enroll",
        steps: [
          "Use the School Locator to find available schools in your area.",
          "Review the school types and select the best fit for your student.",
          "Complete the online enrollment application.",
          "Submit required documents (proof of residency, transcripts, etc.).",
          "Attend a virtual orientation session.",
          "Begin your K12 learning journey!"
        ],
        startEnrollment: "Start Enrollment",
        enrollment: {
          title: 'Enrollment',
          description: 'Choose your enrollment type',
          studentTitle: 'Student Enrollment',
          parentTitle: 'Parent Enrollment',
          studentFormDescription: 'Please fill out the form below to enroll as a student',
          parentFormDescription: 'Please fill out the form below to enroll as a parent',
          firstName: 'First Name',
          lastName: 'Last Name',
          birthDate: 'Birth Date',
          grade: 'Grade',
          gender: 'Gender',
          city: 'City',
          state: 'State',
          email: 'Email',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          language: 'Language',
          uploadDocument: 'Upload Previous Level Document',
          parentName: 'Parent Name',
          trackingNumber: 'Tracking Number',
          trackingNumberHelp: 'Enter the 6-digit tracking number sent to your student\'s email',
          submit: 'Submit',
          success: 'Enrollment Successful',
          successMessage: 'Your enrollment has been submitted successfully. Please check your email for further instructions.',
          error: 'Enrollment Error',
          errorMessage: 'There was an error processing your enrollment. Please try again.'
        }
      },
      faq: {
        title: "Find a School FAQ",
        subtitle: "Answers to common questions about finding and enrolling in a K12 partner school.",
        faqs: [
          {
            q: "How do I know if a K12 school is available in my state?",
            a: "Use our School Locator tool to search by state or region. Availability varies by location."
          },
          {
            q: "Are K12 partner schools tuition-free?",
            a: "Many K12 public and charter schools are tuition-free for eligible students. Private schools may charge tuition."
          },
          {
            q: "What documents are required for enrollment?",
            a: "Typically, you'll need proof of residency, birth certificate, and prior school records. Requirements may vary by school."
          },
          {
            q: "Can I transfer from a traditional school mid-year?",
            a: "Yes, many K12 schools accept mid-year transfers. Check with your chosen school for details."
          },
          {
            q: "Is there support for students with special needs?",
            a: "Yes, K12 schools provide support and accommodations for students with IEPs or 504 plans."
          }
        ],
        startEnrollment: "Start Enrollment"
      },
      noResultsFound: "No results found.",
      footer: {
        tagline: "Empowering Every Learner",
        description: "K12 delivers a flexible, accredited online education for students everywhere. Join our vibrant learning community today.",
        quickLinks: "Quick Links",
        contactUs: "Contact Us",
        address: "1234 K12 Lane, Online City, USA",
        email: "Email: info@k12.com",
        phone: "Phone: (123) 456-7890",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        copyright: "© {{year}} K12 Online Learning. All rights reserved.",
        social: {
          facebook: "Facebook",
          twitter: "Twitter",
          linkedin: "LinkedIn"
        }
      },
      privacy: {
        title: "Privacy Policy",
        subtitle: "Your privacy is important to us. Learn how we protect and use your information at K12 Online Learning.",
        introductionTitle: "Introduction",
        introduction: "This Privacy Policy explains how K12 Online Learning (\"K12\", \"we\", \"us\", or \"our\") collects, uses, and protects your personal information when you use our website and services.",
        infoTitle: "Information We Collect",
        infoList: [
          "Personal information you provide (name, contact details, enrollment info, etc.)",
          "Information collected automatically (IP address, browser type, usage data)",
          "Information from cookies and similar technologies"
        ],
        useTitle: "How We Use Information",
        useList: [
          "To provide and improve our educational services",
          "To communicate with you about your account or inquiries",
          "To personalize your experience",
          "To comply with legal obligations"
        ],
        sharingTitle: "Sharing & Disclosure",
        sharing: "We do not sell your personal information. We may share information with trusted partners and service providers as needed to operate our services, or as required by law.",
        cookiesTitle: "Cookies",
        cookies: "We use cookies and similar technologies to enhance your experience, analyze usage, and deliver relevant content. You can manage cookie preferences in your browser settings.",
        securityTitle: "Data Security",
        security: "We implement industry-standard security measures to protect your information. However, no method of transmission over the Internet is 100% secure.",
        childrenTitle: "Children's Privacy",
        children: "We are committed to protecting the privacy of children. We do not knowingly collect personal information from children under 13 without parental consent.",
        rightsTitle: "Your Rights",
        rights: "You have the right to access, update, or delete your personal information. To exercise your rights, please contact us using the information below.",
        contactTitle: "Contact Us",
        contact: "If you have any questions about this Privacy Policy or our data practices, please contact us.",
      },
      terms: {
        title: "Terms of Service",
        subtitle: "Please read these terms carefully before using K12 Online Learning.",
        introductionTitle: "Introduction",
        introduction: "These Terms of Service (\"Terms\") govern your use of the K12 Online Learning website and services (\"Service\"). By accessing or using our Service, you agree to these Terms.",
        acceptanceTitle: "Acceptance of Terms",
        acceptance: "By using our Service, you confirm that you are at least 18 years old or have parental/guardian consent, and that you agree to comply with these Terms and all applicable laws.",
        userRespTitle: "User Responsibilities",
        userRespList: [
          "Provide accurate and complete information during enrollment and use of the Service.",
          "Maintain the confidentiality of your account credentials.",
          "Notify us immediately of any unauthorized use of your account."
        ],
        prohibitedTitle: "Prohibited Activities",
        prohibitedList: [
          "Using the Service for unlawful, harmful, or fraudulent purposes.",
          "Impersonating others or misrepresenting your affiliation.",
          "Attempting to disrupt or compromise the security of the Service."
        ],
        ipTitle: "Intellectual Property",
        ip: "All content, trademarks, and materials on the Service are the property of K12 or its licensors. You may not use, reproduce, or distribute any content without permission.",
        disclaimersTitle: "Disclaimers",
        disclaimers: "The Service is provided 'as is' and 'as available' without warranties of any kind. We do not guarantee that the Service will be error-free or uninterrupted.",
        liabilityTitle: "Limitation of Liability",
        liability: "To the fullest extent permitted by law, K12 is not liable for any damages arising from your use of the Service.",
        changesTitle: "Changes to Terms",
        changes: "We may update these Terms from time to time. Continued use of the Service after changes means you accept the new Terms.",
        contactTitle: "Contact Us",
        contact: "If you have any questions about these Terms, please contact us.",
      },
      student: {
        dashboard: {
          title: "Student Dashboard",
          progress: "Progress Overview",
          subjects: "Subject Completion",
          recentActivities: "Recent Activities"
        },
        content: {
          title: "Learning Content",
          subjects: "Subjects",
          notes: "Study Notes",
          downloadNotes: "Download Notes",
          videoNotSupported: "Your browser does not support the video tag."
        },
        assessments: {
          title: "Quizzes & Assignments",
          quizzes: "Quizzes",
          assignments: "Assignments",
          dueDate: "Due Date",
          questions: "Total Questions",
          timeLimit: "Time Limit",
          minutes: "minutes",
          score: "Score",
          feedback: "Teacher Feedback",
          startQuiz: "Start Quiz",
          startAssignment: "Start Assignment",
          viewResults: "View Results",
          status: {
            pending: "Pending",
            completed: "Completed",
            submitted: "Submitted"
          }
        },
        grades: {
          A: "Grade A",
          B: "Grade B",
          C: "Grade C",
          D: "Grade D",
          F: "Grade F"
        },
        subjects: {
          mathematics: "Mathematics",
          science: "Science",
          language: "Language",
          history: "History"
        }
      },
      teacher: {
        nav: {
          dashboard: "Dashboard",
          content: "Content",
          quizzesAssignments: "Quizzes & Assignments",
          studentPerformance: "Student Performance",
          feedback: "Feedback",
          topics: "Topics",
          announcements: "Announcements"
        },
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
        dashboard: {
          welcome: "Welcome back",
          subtitle: "Here's an overview of your teaching activities",
          recentActivities: "Recent Activities"
        }
      },
      parent: {
        nav: {
          dashboard: "Dashboard",
          children: "Children",
          progress: "Progress",
          alerts: "Alerts"
        },
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
        dashboard: {
          welcome: "Welcome back",
          subtitle: "Here's an overview of your children's activities",
          recentActivities: "Recent Activities"
        }
      },
      admin: {
        nav: {
          dashboard: "Dashboard",
          teachers: "Teachers",
          content: "Content",
          analytics: "Analytics",
          features: "Features",
          users: "Users"
        },
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
        dashboard: {
          welcome: "Welcome back",
          subtitle: "Here's an overview of your administrative activities",
          recentActivities: "Recent Activities"
        }
      }
    },
  },
  om: {
    translation: {
      nav: {
        enroll: 'Galmaaʼi',
        howItWorks: 'Akka hojjatu',
        findSchool: 'Mana Barumsaa Argadhu',
        resources: 'Qabeenya',
        careers: 'Hojiiwwan',
        support: 'Deeggarsa',
        login: 'Seeni',
        lang: 'Afaan',
        studentExperience: 'Tajaajila Barataa',
        academicExcellence: 'Sadarkaa Barnootaa',
      },
      enrollNow: 'Amma Galmaaʼi',
      home: {
        hero: {
          title: "Mana Barnoota Hawaasaa Kan Online Siif Ta'u",
          subtitle: "Mana barnoota hawaasaa kan K12'n deeggaramu barnoota bilisaa fi kan fedhii daa'imman keetiif qophaa'e siif dhiheessa. Naannoolee hedduutti sadarkaa K–12f argama.",
          findSchool: "Mana Barumsaa Argadhu",
          seeHowItWorks: "Akka Hojjatu Ilaali"
        },
        features: {
          personalizedLearning: {
            title: "Barnoota Namootaaf Qophaa'e",
            desc: "Karee barnootaa fedhii daa'imman keetiif qophaa'e, ofitti amanamummaa fi bilisummaa ijaaruuf gargaaru."
          },
          licensedTeachers: {
            title: "Barsiisota Hayyamamaa",
            desc: "Barsiisota muuxannoo qaban kan daa'imman keetiif sadarkaa ol'aanaa gahuuf hojjetan."
          },
          activeCommunity: {
            title: "Hawaasa Hirmaataa",
            desc: "Maatiiwwan biroo wajjin garee, sochii fi imala waliin hirmaadhu."
          }
        }
      },
      enroll: {
        progress: {
          studentInfo: "Odeeffannoo Barataa",
          parentInfo: "Odeeffannoo Maatii",
          schoolPreference: "Filannoo Mana Barumsaa"
        },
        studentInfoTitle: "Odeeffannoo Barataa",
        parentInfoTitle: "Odeeffannoo Maatii/Abbaa Warraa",
        schoolPreferenceTitle: "Filannoo Mana Barumsaa",
        firstName: "Maqaa Duraa",
        lastName: "Maqaa Maatii",
        dateOfBirth: "Guyyaa Dhalootaa",
        gradeLevel: "Sadarkaa Barnootaa",
        selectGradeLevel: "Sadarkaa Barnootaa Filadhu",
        kindergarten: "Mana Barumsaa Duraa",
        grade: "Kutaa {{number}}",
        email: "Imeelii",
        phone: "Bilbila",
        address: "Teessoo",
        city: "Magaalaa",
        state: "Naannoo",
        zipCode: "Lakkoofsa Poostaa",
        preferredStartDate: "Guyyaa Jalqabaa Filatame",
        programType: "Gosa Barnootaa",
        selectProgramType: "Gosa Barnootaa Filadhu",
        fullTime: "Mana Barumsaa Guutuu Yeroo Online",
        partTime: "Koorsoota Kutaa Yeroo",
        summerSchool: "Mana Barumsaa Bonaa",
        previousSchool: "Mana Barumsaa Duraa",
        previous: "Duuba",
        next: "Itti Fufi",
        submitApplication: "Galmee Ergi",
        title: 'Enrollment',
        description: 'Choose your enrollment type',
        studentTitle: 'Student Enrollment',
        parentTitle: 'Parent Enrollment',
        studentFormDescription: 'Please fill out the form below to enroll as a student',
        parentFormDescription: 'Please fill out the form below to enroll as a parent/guardian',
        gender: 'Gender',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        language: 'Language',
        uploadDocument: 'Upload Previous Level Document',
        parentName: 'Parent Name',
        trackingNumber: 'Tracking Number',
        trackingNumberHelp: 'Enter the 6-digit tracking number sent to your student\'s email',
        submit: 'Submit',
        success: 'Enrollment Successful',
        successMessage: 'Your enrollment has been submitted successfully. Please check your email for further instructions.',
        error: 'Enrollment Error',
        errorMessage: 'There was an error processing your enrollment. Please try again.'
      },
      enrollSuccess: {
        title: "Galmee Keessan Ni Milkaa'e!",
        thankYou: "Galatoomaa! Galmee keessan ni argameera. Gara fuulduraatti tarkaanfii itti aanuuf si quunnamna.",
        reference: "Lakk. Galmee",
        returnHome: "Gara Fuula Jalqabaa Deebi'i"
      },
      login: {
        welcome: "Baga Nagaan Dhuftan",
        signInToAccount: "Akkaataa K12 keessanitti seenaa",
        email: "Imeelii",
        password: "Jecha Darbii",
        rememberMe: "Na yaadadhu",
        forgotPassword: "Jecha darbii dagatte?",
        signIn: "Seeni",
        invalid: "Imeelii ykn jecha darbii sirrii miti. Mee irra deebi'ii yaali.",
        noAccount: "Herrega hin qabduu?",
        enrollNow: "Amma Galmaa'i",
        needHelp: "Gargaarsa barbaaddaa?",
        contactSupport: "Deeggarsa quunnamaa"
      },
      forgotPassword: {
        title: "Jecha Darbii Haaromsuu",
        instructions: "Imeelii keessan galchaa, ergaas jecha darbii haaromsuuf qajeelfama ni erra.",
        email: "Imeelii",
        send: "Qajeelfama Ergi",
        checkEmail: "Imeelii Keessan Ilaalaa",
        sentTo: "Qajeelfama haaromsaa gara:",
        notReceived: "Imeelii hin argamne? Faayila spam ilaali ykn irra deebi'i.",
        tryDifferent: "Imeelii biraa yaali",
        backToSignIn: "Gara Seensaatti Deebi'i",
        needHelp: "Gargaarsa barbaaddaa?",
        contactSupport: "Deeggarsa quunnamaa"
      },
      support: {
        title: "Akka Nu Gargaaru Dandeenyu?",
        subtitle: "Gaaffilee yeroo baay'ee gaafataman argadhu yookiin garee deeggarsaa keenya quunnami",
        commonQuestions: "Gaaffilee Yeroo Baay'ee Gaafataman",
        learnMore: "Dabalata Baradhu →",
        contactSupport: "Deeggarsa Quunnamaa",
        yourName: "Maqaa Kee",
        emailAddress: "Imeelii",
        subject: "Mata Duree",
        message: "Ergaa",
        sendMessage: "Ergaa Ergi",
        messageSent: "Ergaan Ergameera!",
        thankYou: "Nu quunnamteef galatoomi. Sa'aatii 24 keessatti siif deebina.",
        sendAnother: "Ergaa biraa ergi",
        phoneSupport: "Deeggarsa Bilbilaa",
        phoneHours: "Wiixata-Jimaata, 8am-6pm EST",
        emailSupport: "Deeggarsa Imeelii",
        emailResponse: "Sa'aatii 24 keessatti deebina",
        questions: [
          {
            question: "Daa'ima koo akkamitti galmeessuu danda'a?",
            answer: "'Amma Galmaa'i' tuqiitii fi kallattii galmee salphaa keenya hordofii daa'ima kee galmeessi.",
            link: "/enroll"
          },
          {
            question: "Sadarkaa kamiif deeggarsa qabdu?",
            answer: "Barnoota guutuu K-12, mana barumsaa dursaa hanga kutaa 12ffaatti kennina.",
            link: "/programs"
          },
          {
            question: "Karoora barnootaa online akkamitti hojjata?",
            answer: "Karoora barnootaa keenyaa online, kutaa yeroo fi ofiin baruu walitti makuun, barsiisota muuxannoo qabanin deeggarama.",
            link: "/how-it-works"
          },
          {
            question: "Tekinoolojii maal nu barbaachisa?",
            answer: "Barattoonni koompitara fi interneeta barbaadu. Sagantaalee barnootaa hunda nu kennina.",
            link: "/requirements"
          }
        ]
      },
      contact: {
        title: "Nu Quunnamaa",
        subtitle: "Sagantaalee keenyaaf gaaffii qabdaa yookiin waliin hojjechuuf fedhii qabdaa? Nu quunnamaa.",
        sendMessage: "Ergaa Nuuf Ergi",
        fullName: "Maqaa Guutuu",
        emailAddress: "Imeelii",
        phoneNumber: "Lakkoofsa Bilbila",
        department: "Kutaa",
        selectDepartment: "Kutaa Filadhu",
        departments: {
          partnerships: "Hojii Waliinii",
          careers: "Hojiiwwan",
          media: "Gaazexaa",
          general: "Gaaffilee Waliigalaa"
        },
        message: "Ergaa",
        send: "Ergaa Ergi",
        messageSent: "Ergaan Ergameera!",
        thankYou: "Nu quunnamteef galatoomi. Itti aansee siif deebina.",
        sendAnother: "Ergaa biraa ergi",
        offices: "Biiroota Keenya",
        quickLinks: "Links Ariifachiisaa",
        careers: "Carraa Hojii →",
        partnerships: "Sagantaalee Hojii Waliinii →",
        support: "Deeggarsa Teknikaa →"
      },
      careers: {
        joinMission: "Kaayyoo Keenya Hirmaadhu",
        joinMissionDesc: "Barnootaaf gara fuulduraatti ceesisuuf barsiisota, qopheessitoota, fi furmaata barbaadattoota hawwata qabnu waliin hojjadhu.",
        viewOpenPositions: "Carraa Hojii Ilaali",
        whyWorkWithUs: "Maaliif Nu Wajjin Hojjatta?",
        openPositions: "Carraa Hojii",
        allDepartments: "Kutaa Hunda",
        teaching: "Barsiisuu",
        curriculum: "Qopheessuu Kurikulumaa",
        tech: "Tekinoolojii",
        operations: "Hojiirra Oolmaa",
        support: "Deeggarsa Barataa",
        location: "Iddoo",
        type: "Gosa",
        requirements: "Barbaachisummaa",
        applyNow: "Amma Galmaayi",
        benefits: [
          { icon: "🏥", title: "Fayyaa fi Nageenya", description: "Fayyaa, ilkaanii fi ijaaf dabalataan maatii keetiif dabalatee" },
          { icon: "💰", title: "Mindaa Dorgomaa", description: "Mindaa ol'aanaa fi xiinxala raawwii yeroo yerootti kennamu" },
          { icon: "🎓", title: "Hirmaannaa Ogummaa", description: "Carraa barnootaa itti fufinsa qabu fi kaffaltii barnootaa" },
          { icon: "⏰", title: "Qindoomina Hojii fi Jireenyaa", description: "Yeroo socho'aa fi boqonnaa gatii qabu" },
          { icon: "🏠", title: "Hojii Fageenya Irraa", description: "Carraa hojii fageenya irraa fi wal makaa jiru" },
          { icon: "🎯", title: "Gudina Ogummaa", description: "Daandiiwwan ogummaa ifaa fi carraa guddinaa" }
        ]
      },
      resources: {
        title: "Qabeenya Barnootaa",
        subtitle: "Kitaabota, links gargaaraa fi viidiyoo leenjii K12 barnootaaf si gargaaru qoradhu.",
        featuredGuides: "Kitaabota filatamoo fi buufatawwan",
        helpfulLinks: "Links Gargaaraa",
        videoTutorials: "Viidiyoo Leenjii",
        guides: [
          { title: "Kitaaba Maatii", description: "Kitaaba guutuu maatii barnoota online deeggaruuf gargaaru.", type: "PDF" },
          { title: "Kitaaba Milkaa'ina Barataa", description: "Barattootaaf gorsa fi mala milkaa'ina barnoota online.", type: "PDF" },
          { title: "K12 Kurikulumii Ibsaa", description: "K12 barnoota fi daandiiwwan barnootaa irratti ibsa waliigalaa.", type: "PDF" }
        ],
        links: [
          { title: "Waajjira Barnoota Ameerikaa", description: "Iddoo mootummaa federaalaa barnootaaf qophaa'e." },
          { title: "Khan Academy", description: "Koorsoota, barnoota fi leenjii bilisaa online." },
          { title: "Common Sense Media", description: "Maatiiwwanaf gorsa fi yaada barnoota dijitaalaa irratti kennu." }
        ],
        videos: [
          { title: "Barnoota Online Akka Hojjatu", description: "Barnoota online irratti ibsa gabaabaa." },
          { title: "Qajeelfama Abbaa Warraa", description: "Qajeelfama abbaa warraa fayyadamuuf tarkaanfii tarkaanfiin." }
        ]
      },
      studentExperience: {
        title: "Tajaajila Barataa",
        subtitle: "K12 Online Academy keessatti barachuu, walqunnamtii fi guddina argachuu maal akka fakkaatu baru.",
        dayInLife: "Guyyaa Keessa Jireenya",
        virtualFeatures: "Amaloota Kutaa Barnootaa Dijitaalaa",
        studentVoices: "Sagalee Barattootaa",
        supportCommunity: "Deeggarsa fi Hawaasa",
        supportCommunityDesc: "Barataan hundi barsiisota hayyamamoo, gorsitoota fi hawaasa online cimaa irraa deeggarsa argata. Gargaarsa 1:1 argadhu, garee seeni, fi hiriyoota biyya guutuu irraa argadhu.",
        learnAboutSupport: "Barbaachisummaa Deeggarsa Barataa Baru"
      },
      curriculum: {
        title: "Kurikulumii fi Sadarkaa",
        subtitle: "Kurikulumii keenya sadarkaa biyya fi naannoo guutuu fi ol ka'aa, barnoota cimaa fi hawwata qabu barataa hundaaf dhiheessa.",
        whatSetsApart: "Kurikulumii Keenya Maal Irraa Fagaata?",
        apartList: [
          "Koree Waliigalaa fi sadarkaa naannoo wajjin walsimu",
          "Barnoota projektii fi gaafii irratti hundaa'e",
          "Daandiiwwan dhuunfaa barataa hundaaf",
          "STEM, artii fi afaanota addunyaa dabalatee",
          "Safartuu fi hordoffii milkaa'ina yeroo yerootti"
        ],
        gradeOverviews: "Ibsaa Sadarkaa Kutaa",
        elementary: "Kutaa Duraa (K-5)",
        elementaryList: [
          "Ogummaa bu'uuraa dubbisuu, barreessuu fi herregaa",
          "Saayinsii fi hawaasummaa harka qalleeyyii",
          "Artii, muuziqaa fi leenjii qaamaa"
        ],
        middle: "Kutaa Giddugaleessaa (6-8)",
        middleList: [
          "Qorannoo bal'aa mata dureewwan ijoo irratti",
          "Filannoo STEM, artii fi afaanota irratti",
          "Qorannoo hojii fi ogummaa jireenyaa"
        ],
        high: "Kutaa Ol'aanaa (9-12)",
        highList: [
          "Qophaa'ina koolejjii fi hojii",
          "Koorsoota AP fi kutaa ol'aanaa",
          "Galmee lamaan fi daandii CTE"
        ]
      },
      accreditation: {
        title: "Mirkaneessaa fi Badhaasa",
        subtitle: "K12 Online Academy guutumaan guutuutti mirkanaa'ee fi sadarkaa olaanaa barnoota dijitaalaa argateera.",
        accreditationsTitle: "Mirkaneessota Keenya",
        accreditations: [
          "AdvancED/Cognia'n Mirkanaa'e",
          "Naannoo fi Mootummaa irraa eeyyamame",
          "AP Koorsootaaf College Board irraa eeyyamame",
          "NCAA'n eeyyamame koorsoota atileetota barattootaaf"
        ],
        awardsTitle: "Badhaasa fi Beekamtii",
        awards: [
          "2023 Mana Barnootaa Online Kan Caalu (EdTech Awards)",
          "Badhaasa Barnoota Dijitaalaa Olaanaa",
          "STEM Program Kan Caalu (National STEM Council)"
        ]
      },
      advancedPrograms: {
        title: "Sagantaalee Ol'aanaa",
        subtitle: "Carraa cimaa fi kan dandeettii ol'aanaa qabaniif, AP, kabaja, fi galmee lamaan dabalatee.",
        offeringsTitle: "Sagantaalee Ol'aanaa Keenya",
        offerings: [
          "Koorsoota Advanced Placement (AP) STEM, hawaasummaa fi artii keessatti",
          "Kutaalee ariifachiisaa barnootaaf kabaja qabaniif",
          "Galmee lamaan waliin koolejjii fi yunivarsiitii waliin",
          "Sagantaalee dandeettii fi kennaa qabaniif gabbisa",
          "Leenjii fi gorsa barnoota dhuunfaa"
        ],
        howToEnrollTitle: "Akka Galmaa'an",
        howToEnrollDesc: "Barattoonni sagantaalee ol'aanaa barbaadan yeroo galmaa'an fedhii isaanii ibsuu ykn gorsaa barnoota isaanii waliin mari'achuu danda'u.",
        startEnrollment: "Galmee Jalqabi"
      },
      achievements: {
        title: "Milkaa'ina Barattootaa",
        subtitle: "Milkaa'ina olaanaa barattoota keenya barnoota, artii fi tajaajila hawaasaa keessatti kabajna.",
        highlightsTitle: "Milkaa'ina Haaraa",
        achievements: [
          { title: "Mo'ataa Fayyadama Saayinsii Biyyaalessaa", description: "Barattuu kutaa 8ffaa, Maya, pirojektii haaraa humna haaromsaa qabduun mo'ataa taate." },
          { title: "Mo'attoota Math Olympiad", description: "Barattoonni K12 waggaa sadii walitti aansee Math Olympiad naannoo mo'atan." },
          { title: "Barreessaa Dargaggoo Maxxanfame", description: "Barataa kutaa ol'aanaa Alex kitaaba barreesse kan amma galmee dubbisuu mana barumsaa keessa jiru ta'e." },
          { title: "Tapha Robootii Xumura Gahe", description: "Gareen robootii keenya tapha robootii biyyaalessaa xumura gahe." },
          { title: "Badhaasa Tajaajila Hawaasaa", description: "Barattoonni waggaa darbe sa'aatii 5,000 oliif tajaajila hawaasaa galmeessan." }
        ],
        seeMore: "Tariikota Barattootaa Dabalataa Ilaali"
      },
      schoolLocator: {
        title: "Mana Barumsaa Argadhu",
        subtitle: "Naannoo keetti mana barumsaa K12 barbaadi. Naannoo ykn naannoo filadhu, filannoo argachuuf.",
        allStates: "Naannolee Hunda",
        searchPlaceholder: "Maqaa mana barumsaa ykn magaalaa barreessi...",
        availableSchools: "Mana Barumsaa Argaman",
        noSchools: "Barbaacha kee irratti mana barumsaa hin argamne.",
        map: "Kaartaa",
        enrollAt: "{{school}} irratti galmaa'i"
      },
      schoolTypes: {
        title: "Gosa Mana Barumsaa",
        subtitle: "Gosa mana barumsaa K12 garaagaraa maatii keetiif mijataa ta'an qoradhu.",
        public: {
          title: "Mana Barumsaa Hawaasaa",
          desc: "Mana barumsaa hawaasaa online, kaffaltii malee, naannoo keetti tajaajilu. Barattoota hundaaf banaa."
        },
        private: {
          title: "Mana Barumsaa Dhuunfaa",
          desc: "Mana barumsaa dhuunfaa online, eyyama qabu, kaffaltii fi galmee salphaa, koorsoota bal'aa qabu."
        },
        charter: {
          title: "Mana Barumsaa Charter",
          desc: "Mana barumsaa online, maallaqa mootummaa irraa argatu, ofiin of bulchu, karoora barnootaa adda addaa qabu."
        },
        learnAboutEnrollment: "Galmee Ilaali"
      },
      enrollment: {
        title: "Hojii Galmee",
        subtitle: "Kallattii salphaa, tarkaanfii tarkaanfiin mana barumsaa K12 galmeessuuf.",
        howTo: "Akka Galmaa'an",
        steps: [
          "Mana Barumsaa Argadhu fayyadami, naannoo keetti mana barumsaa barbaaduuf.",
          "Gosa mana barumsaa ilaali, kan barataa keetiif mijatu filadhu.",
          "Galmee online guuti.",
          "Ragaa barbaachisu ergi (ragaa teessoo, galmee barnootaa, kkf).",
          "Qophii online irratti hirmaadhu.",
          "Barnoota K12 kee jalqabi!"
        ],
        startEnrollment: "Galmee Jalqabi",
        enrollment: {
          title: 'Enrollment',
          description: 'Choose your enrollment type',
          studentTitle: 'Student Enrollment',
          parentTitle: 'Parent Enrollment',
          studentFormDescription: 'Please fill out the form below to enroll as a student',
          parentFormDescription: 'Please fill out the form below to enroll as a parent',
          firstName: 'First Name',
          lastName: 'Last Name',
          birthDate: 'Birth Date',
          grade: 'Grade',
          gender: 'Gender',
          city: 'City',
          state: 'State',
          email: 'Email',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          language: 'Language',
          uploadDocument: 'Upload Previous Level Document',
          parentName: 'Parent Name',
          trackingNumber: 'Tracking Number',
          trackingNumberHelp: 'Enter the 6-digit tracking number sent to your student\'s email',
          submit: 'Submit',
          success: 'Enrollment Successful',
          successMessage: 'Your enrollment has been submitted successfully. Please check your email for further instructions.',
          error: 'Enrollment Error',
          errorMessage: 'There was an error processing your enrollment. Please try again.'
        }
      },
      faq: {
        title: "Gaaffiiwwan Yeroo Baay'ee Gaafataman",
        subtitle: "Deebiiwwan gaaffiiwwan yeroo baay'ee mana barumsaa K12 argachuufi galmeessuuf.",
        faqs: [
          {
            q: "Mana barumsaa K12 naannoo koo keessatti argamuu akkamitti beeka?",
            a: "Mana Barumsaa Argadhu fayyadami, naannoo ykn naannoo filadhu. Argamuu isaa gara naannoo ilaali."
          },
          {
            q: "Mana barumsaa K12 kaffaltii malee ta'uu danda'aa?",
            a: "Mana barumsaa hawaasaa fi charter K12 hedduun barattootaaf kaffaltii malee. Mana barumsaa dhuunfaa kaffaltii qabaachuu danda'a."
          },
          {
            q: "Galmee gochuuf ragaan maal barbaachisa?",
            a: "Yeroo baay'ee ragaa teessoo, ragaa dhalootaa fi galmee barnootaa duraanii barbaachisa. Barbaachisummaa gara mana barumsaa ilaali."
          },
          {
            q: "Barataa giddu galeessaa irraa gara K12tti yeroo barnootaa keessa ce'uu danda'aa?",
            a: "Eeyyee, mana barumsaa K12 hedduun barattoota yeroo barnootaa keessa fudhata. Gara mana barumsaa filatteetti ilaali."
          },
          {
            q: "Barattoota fedhii addaa qabanif deeggarsi jiraa?",
            a: "Eeyyee, mana barumsaa K12 deeggarsa fi mijataa barattoota IEP ykn 504 qabanif kenna."
          }
        ],
        startEnrollment: "Galmee Jalqabi"
      },
      noResultsFound: "Bu'aan hin argamne.",
      footer: {
        tagline: "Barataa Hundumaa Jajjabeessu",
        description: "K12 barnoota online eyyama qabu fi mijataa iddoo hundatti barattootaaf dhiheessa. Hawaasa barnootaa keenyaatti hirmaadhu.",
        quickLinks: "Links Ariifachiisaa",
        contactUs: "Nu Quunnamaa",
        address: "1234 K12 Laanii, Magaalaa Online, Ameerikaa",
        email: "Imeelii: info@k12.com",
        phone: "Bilbila: (123) 456-7890",
        privacy: "Karoora Privacy",
        terms: "Sharraxa Tajaajilaa",
        copyright: "© {{year}} K12 Barnoota Online. Mirgi Qaba.",
        social: {
          facebook: "Facebook",
          twitter: "Twitter",
          linkedin: "LinkedIn"
        }
      },
      privacy: {
        title: "Karoora Privacy",
        subtitle: "Privacy keessan nuuf murteessaadha. Odeeffannoo keessan K12 Online Learning keessatti akkamitti eegnu fi itti fayyadamnu baruuf dubbisaa.",
        introductionTitle: "Seensa",
        introduction: "Karoora Privacy kun K12 Online Learning (\"K12\", \"nutti\", \"keenya\") odeeffannoo dhuunfaa keessan yeroo marsariitii fi tajaajiloota keenya fayyadamtanitti akkamitti sassaabuu, itti fayyadamuu fi eegu akka dandeenyu ibsa.",
        infoTitle: "Odeeffannoo Nu Sassaabnu",
        infoList: [
          "Odeeffannoo dhuunfaa isin kennitan (maqaa, odeeffannoo quunnamtii, odeeffannoo galmee, kkf)",
          "Odeeffannoo ofumaan sassaabamu (IP address, gosa browser, odeeffannoo fayyadamaa)",
          "Odeeffannoo kukiifi tekinoolojiiwwan walfakkaatan irraa sassaabamu"
        ],
        useTitle: "Odeeffannoo Akka Itti Fayyadamnu",
        useList: [
          "Tajaajiloota barnootaa keenyaa kennuuf fi fooyyessuuf",
          "Waliin qunnamuuf ykn gaaffii keessaniif deebii kennuuf",
          "Tajaajila keessan dhuunfaatti fooyyessuuf",
          "Seera eeguu fi raawwachiisuuf"
        ],
        sharingTitle: "Qoodinsa fi Beeksisa",
        sharing: "Odeeffannoo dhuunfaa keessan hin gurgurru. Tajaajiloota keenyaa hojiirra oolchuuf ykn seera eeguu fi raawwachiisuuf hirmaattota amanamoo fi tajaajiltoota waliin qooduu dandeenya.",
        cookiesTitle: "Kukiiwwan",
        cookies: "Kukii fi tekinoolojiiwwan walfakkaatan fayyadamuun tajaajila keessan fooyyessuuf, fayyadama qorachuuf fi qabiyyee barbaachisaa dhiheessuuf. Kukiin keessan settings browser keessan keessatti to'achuu dandeessu.",
        securityTitle: "Odeeffannoo Ittisaa",
        security: "Odeeffannoo keessan eeguuf mala amansiisaa fi amantaa qabu fayyadama. Garuu, karaa interneetii odeeffannoo dabarsuuf 100% nageenya hin jiru.",
        childrenTitle: "Privacy Daa'immanii",
        children: "Privacy daa'imman eeguu irratti cichoomina qabna. Umrii waggaa 13 gadiitiif odeeffannoo hin sassaabnu malee hayyama maatii qabaannaan malee.",
        rightsTitle: "Mirga Keessan",
        rights: "Mirga odeeffannoo dhuunfaa keessan argachuu, haaromsuu ykn haquu qabdu. Mirga keessan fayyadamuuf nu quunnamaa.",
        contactTitle: "Nu Quunnamaa",
        contact: "Karoora Privacy kana ykn hojii odeeffannoo keenyaa irratti gaaffii yoo qabaattan nu quunnamaa.",
      },
      terms: {
        title: "Sharraxa Tajaajilaa",
        subtitle: "K12 Online Learning fayyadamuuf dura sharraxa kana sirriitti dubbisaa.",
        introductionTitle: "Seensa",
        introduction: "Sharraxa Tajaajilaa kun (\"Sharraxa\") marsariitii fi tajaajiloota K12 Online Learning (\"Tajaajila\") fayyadamuun keessan akkaataa itti to'atamu ibsa. Tajaajila keenya fayyadamuun ykn seenuun sharraxa kana ni fudhattani.",
        acceptanceTitle: "Mirkaneessa Sharraxaa",
        acceptance: "Tajaajila keenya fayyadamuun umrii waggaa 18 ol akka taatan ykn hayyama maatii/abbaa warraa qabdan, akkasumas sharraxa kana fi seerota hunda akka eegdan mirkaneessuu keessan ibsuu dha.",
        userRespTitle: "Itti Gaafatamummaa Fayyadamaa",
        userRespList: [
          "Odeeffannoo sirrii fi guutuu galmee fi tajaajila fayyadamuun keessan irratti kennuu",
          "Odeeffannoo herrega keessanii iccitii taasisuu",
          "Herrega keessan yoo seeraan ala fayyadame nu beeksisuu"
        ],
        prohibitedTitle: "Hojiiwwan Dhoorkaman",
        prohibitedList: [
          "Tajaajila seeraan alaa, miidhaa ykn dogoggoraaf fayyadamu",
          "Namoota fakkeessu ykn walitti dhufeenya sobaa dhiheessu",
          "Nageenya tajaajilaa cabsuuf ykn gufachiisuuf yaalu"
        ],
        ipTitle: "Qabeenya Qorannoo",
        ip: "Qabiyyeen, mallattoolee fi qabeenyi marsariitii irratti argaman kan K12 ykn abbootii qabeenyaa isaati. Eeyyama malee fayyadamuun, banuun ykn raabsuun hin hayyamamu.",
        disclaimersTitle: "Ibsa Ittisaa",
        disclaimers: "Tajaajilaan 'akka jirutti' fi 'akka argametti' dhihaata. Dogoggora irraa bilisa ta'uu ykn tajaajilaan hin cituu hin waadaa galle.",
        liabilityTitle: "Daangaa Itti Gaafatamummaa",
        liability: "Seera keessatti hayyamameen alatti, K12 miidhaa tajaajila fayyadamuun isin irra gahuuf itti gaafatama hin qabu.",
        changesTitle: "Haaromsa Sharraxaa",
        changes: "Sharraxa kana yeroo yerootti haaromsuu dandeenya. Haaromsa booda tajaajila itti fufuun sharraxa haarawa fudhachuun keessan agarsiisa.",
        contactTitle: "Nu Quunnamaa",
        contact: "Sharraxa kana irratti gaaffii yoo qabaattan nu quunnamaa.",
      },
      student: {
        dashboard: {
          title: "Daashboordii Barataa",
          progress: "Ijaarsa Jireenyaa",
          subjects: "Xumura Qorannoo",
          recentActivities: "Hojiiwwan Dhiyoo"
        },
        content: {
          title: "Qorannoo Barannoo",
          subjects: "Qorannoo",
          notes: "Galma Barannoo",
          downloadNotes: "Galma Galchaa",
          videoNotSupported: "Brauzarii keessan video tag fudhatu miti."
        },
        assessments: {
          title: "Imalaa fi Hojiiwwan",
          quizzes: "Imalaa",
          assignments: "Hojiiwwan",
          dueDate: "Guyyaa Xumuraa",
          questions: "Gaaffii Waliigalaa",
          timeLimit: "Yeroo Xumuraa",
          minutes: "daqiiqaa",
          score: "Qabiyyee",
          feedback: "Yaada Barreessaa",
          startQuiz: "Imala Jalqabi",
          startAssignment: "Hojii Jalqabi",
          viewResults: "Deebii Ilaalaa",
          status: {
            pending: "Eegaa",
            completed: "Xumurame",
            submitted: "Ergame"
          }
        },
        grades: {
          A: "Sadarkaa A",
          B: "Sadarkaa B",
          C: "Sadarkaa C",
          D: "Sadarkaa D",
          F: "Sadarkaa F"
        },
        subjects: {
          mathematics: "Herrega",
          science: "Saayinsii",
          language: "Afaan",
          history: "Seenaa"
        }
      },
      teacher: {
        nav: {
          dashboard: "Daashboordii",
          content: "Qorannoo",
          quizzesAssignments: "Imalaa fi Hojiiwwan",
          studentPerformance: "Milkaa'ina Barataa",
          feedback: "Yaada Barreessaa",
          topics: "Mata Dureewwan",
          announcements: "Beekumsa"
        },
        profile: "Profaayilii",
        settings: "Qindaawwan",
        logout: "Ba'i",
        dashboard: {
          welcome: "Baga Nagaan Dhuftan",
          subtitle: "Hojiiwwan barsiisaa keessanii ilaaluu",
          recentActivities: "Hojiiwwan Dhiyoo"
        }
      },
      parent: {
        nav: {
          dashboard: "Daashboordii",
          children: "Daa'imman",
          progress: "Guddina",
          alerts: "Beekumsa"
        },
        profile: "Profaayilii",
        settings: "Qindaawwan",
        logout: "Ba'i",
        dashboard: {
          welcome: "Baga Nagaan Dhuftan",
          subtitle: "Hojiiwwan daa'imman keessanii ilaaluu",
          recentActivities: "Hojiiwwan Dhiyoo"
        }
      },
      admin: {
        nav: {
          dashboard: "Daashboordii",
          teachers: "Barsiisota",
          content: "Qorannoo",
          analytics: "Xiinxala",
          features: "Amaloota",
          users: "Fayyadamaa"
        },
        profile: "Profaayilii",
        settings: "Qindaawwan",
        logout: "Ba'i",
        dashboard: {
          welcome: "Baga Nagaan Dhuftan",
          subtitle: "Hojiiwwan bulchaa keessanii ilaaluu",
          recentActivities: "Hojiiwwan Dhiyoo"
        }
      }
    }
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 