// TODO 데이터 통신 추가하기
export const frontEndRoadmap = [
  // ANCHOR root (= title)
  {
    node: {
      name: 'Front-end',
    },
    parent: null,
  },
  // ANCHOR Internet
  {
    node: {
      name: 'Internet',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'How does the internet work?',
    },
    parent: {
      name: 'Internet',
    },
  },
  {
    node: {
      name: 'What is HTTP?',
    },
    parent: {
      name: 'Internet',
    },
  },
  {
    node: {
      name: 'Browsers and how they work?',
    },
    parent: {
      name: 'Internet',
    },
  },
  {
    node: {
      name: 'DNS and how it works?',
    },
    parent: {
      name: 'Internet',
    },
  },
  {
    node: {
      name: 'What is Domain Name?',
    },
    parent: {
      name: 'Internet',
    },
  },
  {
    node: {
      name: 'What is hosting?',
    },
    parent: {
      name: 'Internet',
    },
  },

  // ANCHOR HTML
  {
    node: {
      name: 'HTML',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Learn the basics',
    },
    parent: {
      name: 'HTML',
    },
  },
  {
    node: {
      name: 'Writing Semantic HTML',
    },
    parent: {
      name: 'HTML',
    },
  },
  {
    node: {
      name: 'Forms and Validations',
    },
    parent: {
      name: 'HTML',
    },
  },
  {
    node: {
      name: 'Conventions and Best Practices',
    },
    parent: {
      name: 'HTML',
    },
  },
  {
    node: {
      name: 'Accessibility',
    },
    parent: {
      name: 'HTML',
    },
  },
  {
    node: {
      name: 'Basics of SEO',
    },
    parent: {
      name: 'HTML',
    },
  },

  // ANCHOR CSS
  {
    node: {
      name: 'CSS',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Learn the basics',
    },
    parent: {
      name: 'CSS',
    },
  },
  {
    node: {
      name: 'Making Layouts',
    },
    parent: {
      name: 'CSS',
    },
  },
  {
    node: {
      name: 'Floats',
    },
    parent: {
      name: 'Making Layouts',
    },
  },
  {
    node: {
      name: 'Positioning',
    },
    parent: {
      name: 'Making Layouts',
    },
  },
  {
    node: {
      name: 'Display',
    },
    parent: {
      name: 'Making Layouts',
    },
  },
  {
    node: {
      name: 'Box Model',
    },
    parent: {
      name: 'Making Layouts',
    },
  },
  {
    node: {
      name: 'CSS Grid',
    },
    parent: {
      name: 'Making Layouts',
    },
  },
  {
    node: {
      name: 'Flex Box',
    },
    parent: {
      name: 'Making Layouts',
    },
  },
  {
    node: {
      name: 'Responsive design and Media Queries',
    },
    parent: {
      name: 'CSS',
    },
  },

  {
    node: {
      name: 'JavaScript',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Version Controll Systems',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Web Security Knowledge',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Package Managers',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'CSS Architecture',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'CSS Preprocessors',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Build Tools',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Pick a Framework',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Modern CSS',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Web Components',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'CSS Frameworks',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Testing your Apps',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Type Checkers',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Progressive Web Apps',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Server Side Rendering',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'GraphQL',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Static Site Generators',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Mobile Applications',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Desktop Applications',
    },
    parent: {
      name: 'Front-end',
    },
  },
  {
    node: {
      name: 'Web Assembly',
    },
    parent: {
      name: 'Front-end',
    },
  },
];

// TODO 1. dispatch write mindmap
// const newMindmap = await dispatch(writeMindmapAsync(values));
// TODO 2. dispatch write root node
// await dispatch(writeNodeAsync(newMindmap._id, { name: newMindmap.title }));
