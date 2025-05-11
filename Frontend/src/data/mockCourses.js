export const mockCourses = [
  {
    id: 1,
    name: 'Mathematics',
    grade: '10th Grade',
    languages: {
      en: {
        title: 'Mathematics',
        description: 'Advanced mathematics course covering algebra, geometry, and calculus',
        content: [
          {
            id: 1,
            title: 'Introduction to Algebra',
            type: 'video',
            url: 'https://example.com/videos/algebra-intro',
            duration: '45:00',
            description: 'Basic concepts of algebra and equations'
          },
          {
            id: 2,
            title: 'Geometry Fundamentals',
            type: 'document',
            url: 'https://example.com/docs/geometry-fundamentals',
            description: 'Understanding geometric shapes and their properties'
          },
          {
            id: 3,
            title: 'Calculus Basics',
            type: 'quiz',
            url: 'https://example.com/quizzes/calculus-basics',
            description: 'Test your understanding of basic calculus concepts'
          }
        ]
      },
      am: {
        title: 'ሂሳብ',
        description: 'የአልጀብራ፣ ጂኦሜትሪ እና ካልኩለስን የሚሸፍን የላቀ የሂሳብ ኮርስ',
        content: [
          {
            id: 1,
            title: 'የአልጀብራ መግቢያ',
            type: 'video',
            url: 'https://example.com/videos/algebra-intro-am',
            duration: '45:00',
            description: 'የአልጀብራ መሰረታዊ ጽንሰ-ሀሳቦች እና እኩልታዎች'
          },
          {
            id: 2,
            title: 'የጂኦሜትሪ መሰረታዊ ነገሮች',
            type: 'document',
            url: 'https://example.com/docs/geometry-fundamentals-am',
            description: 'የጂኦሜትሪክ ቅርጸቶችን እና ባህሪያቸውን መረዳት'
          },
          {
            id: 3,
            title: 'የካልኩለስ መሰረታዊ ነገሮች',
            type: 'quiz',
            url: 'https://example.com/quizzes/calculus-basics-am',
            description: 'የመሰረታዊ ካልኩለስ ጽንሰ-ሀሳቦችን እውቀትዎን ይፈትኑ'
          }
        ]
      },
      or: {
        title: 'ሂሳብ',
        description: 'አልጀብራ፣ ጂኦሜትሪ እና ካልኩለስን የሚሸፍን የላቀ የሂሳብ ኮርስ',
        content: [
          {
            id: 1,
            title: 'አልጀብራ መግቢያ',
            type: 'video',
            url: 'https://example.com/videos/algebra-intro-or',
            duration: '45:00',
            description: 'የአልጀብራ መሰረታዊ ጽንሰ-ሀሳቦች እና እኩልታዎች'
          },
          {
            id: 2,
            title: 'የጂኦሜትሪ መሰረታዊ ነገሮች',
            type: 'document',
            url: 'https://example.com/docs/geometry-fundamentals-or',
            description: 'የጂኦሜትሪክ ቅርጸቶችን እና ባህሪያቸውን መረዳት'
          },
          {
            id: 3,
            title: 'የካልኩለስ መሰረታዊ ነገሮች',
            type: 'quiz',
            url: 'https://example.com/quizzes/calculus-basics-or',
            description: 'የመሰረታዊ ካልኩለስ ጽንሰ-ሀሳቦችን እውቀትዎን ይፈትኑ'
          }
        ]
      }
    }
  },
  {
    id: 2,
    name: 'Physics',
    grade: '10th Grade',
    languages: {
      en: {
        title: 'Physics',
        description: 'Introduction to classical mechanics, thermodynamics, and electromagnetism',
        content: [
          {
            id: 1,
            title: 'Classical Mechanics',
            type: 'video',
            url: 'https://example.com/videos/mechanics',
            duration: '50:00',
            description: 'Understanding motion, forces, and energy'
          },
          {
            id: 2,
            title: 'Thermodynamics',
            type: 'document',
            url: 'https://example.com/docs/thermodynamics',
            description: 'Study of heat and energy transfer'
          }
        ]
      },
      am: {
        title: 'ፊዚክስ',
        description: 'የክላሲካል ሜካኒክስ፣ ቴርሞዳይናሚክስ እና ኤሌክትሮማግኔቲዝም መግቢያ',
        content: [
          {
            id: 1,
            title: 'ክላሲካል ሜካኒክስ',
            type: 'video',
            url: 'https://example.com/videos/mechanics-am',
            duration: '50:00',
            description: 'እንቅስቃሴ፣ ኃይሎች እና ኢነርጂን መረዳት'
          },
          {
            id: 2,
            title: 'ርሞዳይናሚክስ',
            type: 'document',
            url: 'https://example.com/docs/thermodynamics-am',
            description: 'ሙቀት እና ኢነርጂ ሽግግር ጥናት'
          }
        ]
      },
      or: {
        title: 'ፊዚክስ',
        description: 'ክላሲካል ሜካኒክስ፣ ቴርሞዳይናሚክስ እና ኤሌክትሮማግኔቲዝም መግቢያ',
        content: [
          {
            id: 1,
            title: 'ክላሲካል ሜካኒክስ',
            type: 'video',
            url: 'https://example.com/videos/mechanics-or',
            duration: '50:00',
            description: 'እንቅስቃሴ፣ ኃይሎች እና ኢነርጂን መረዳት'
          },
          {
            id: 2,
            title: 'ርሞዳይናሚክስ',
            type: 'document',
            url: 'https://example.com/docs/thermodynamics-or',
            description: 'ሙቀት እና ኢነርጂ ሽግግር ጥናት'
          }
        ]
      }
    }
  },
  {
    id: 3,
    name: 'Chemistry',
    grade: '10th Grade',
    languages: {
      en: {
        title: 'Chemistry',
        description: 'Study of matter, its properties, and chemical reactions',
        content: [
          {
            id: 1,
            title: 'Atomic Structure',
            type: 'video',
            url: 'https://example.com/videos/atomic-structure',
            duration: '40:00',
            description: 'Understanding atoms and their components'
          },
          {
            id: 2,
            title: 'Chemical Bonding',
            type: 'document',
            url: 'https://example.com/docs/chemical-bonding',
            description: 'Types of chemical bonds and their properties'
          }
        ]
      },
      am: {
        title: 'ኬሚስትሪ',
        description: 'የንጥረ ነገሮች፣ ባህሪያቸው እና የኬሚካል ምላሶች ጥናት',
        content: [
          {
            id: 1,
            title: 'የአቶሚክ መዋቅር',
            type: 'video',
            url: 'https://example.com/videos/atomic-structure-am',
            duration: '40:00',
            description: 'አቶሞችን እና አካላቶቻቸውን መረዳት'
          },
          {
            id: 2,
            title: 'የኬሚካል ቦንዲንግ',
            type: 'document',
            url: 'https://example.com/docs/chemical-bonding-am',
            description: 'የኬሚካል ቦንዶች እና ባህሪያቸው'
          }
        ]
      },
      or: {
        title: 'ኬሚስትሪ',
        description: 'ንጥረ ነገሮች፣ ባህሪያቸው እና የኬሚካል ምላሶች ጥናት',
        content: [
          {
            id: 1,
            title: 'አቶሚክ መዋቅር',
            type: 'video',
            url: 'https://example.com/videos/atomic-structure-or',
            duration: '40:00',
            description: 'አቶሞችን እና አካላቶቻቸውን መረዳት'
          },
          {
            id: 2,
            title: 'ኬሚካል ቦንዲንግ',
            type: 'document',
            url: 'https://example.com/docs/chemical-bonding-or',
            description: 'የኬሚካል ቦንዶች እና ባህሪያቸው'
          }
        ]
      }
    }
  }
]; 