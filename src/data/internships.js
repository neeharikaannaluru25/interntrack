const daysFromToday = (days) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const internships = [
  {
    id: 'northstar-frontend', company: 'Northstar Labs', role: 'Frontend Engineering Intern', location: 'Bengaluru, India', type: 'Hybrid', stipend: '₹25,000 / month', deadline: daysFromToday(5), postedDays: 1,
    skills: ['React', 'JavaScript', 'CSS'], color: 'violet', logo: 'N',
    description: 'Work with product engineers to build accessible, polished interfaces for a growing developer tools platform.',
  },
  {
    id: 'orbit-data', company: 'Orbit Analytics', role: 'Data Analyst Intern', location: 'Remote · India', type: 'Remote', stipend: '₹18,000 / month', deadline: daysFromToday(8), postedDays: 2,
    skills: ['SQL', 'Python', 'Data visualization'], color: 'blue', logo: 'O',
    description: 'Help turn product and customer data into clear insights, dashboards, and experiments for the analytics team.',
  },
  {
    id: 'copper-ux', company: 'Copper & Co.', role: 'Product Design Intern', location: 'Hyderabad, India', type: 'On-site', stipend: '₹20,000 / month', deadline: daysFromToday(4), postedDays: 3,
    skills: ['Figma', 'User research', 'Prototyping'], color: 'orange', logo: 'C',
    description: 'Partner with designers and researchers to explore product problems and turn findings into useful experiences.',
  },
  {
    id: 'greenhouse-backend', company: 'Greenhouse Tech', role: 'Backend Developer Intern', location: 'Pune, India', type: 'Hybrid', stipend: '₹22,000 / month', deadline: daysFromToday(12), postedDays: 4,
    skills: ['Node.js', 'APIs', 'PostgreSQL'], color: 'green', logo: 'G',
    description: 'Build and maintain API features, write tests, and learn how a small engineering team ships reliable software.',
  },
  {
    id: 'brightpath-product', company: 'Brightpath', role: 'Product Management Intern', location: 'Remote · India', type: 'Remote', stipend: '₹15,000 / month', deadline: daysFromToday(10), postedDays: 5,
    skills: ['Research', 'Communication', 'Analytics'], color: 'pink', logo: 'B',
    description: 'Support discovery, prioritize feedback, and help the team turn customer needs into focused product plans.',
  },
  {
    id: 'cloudline-ml', company: 'Cloudline AI', role: 'Machine Learning Intern', location: 'Chennai, India', type: 'On-site', stipend: '₹30,000 / month', deadline: daysFromToday(15), postedDays: 6,
    skills: ['Python', 'Machine learning', 'Pandas'], color: 'indigo', logo: 'C',
    description: 'Explore practical machine learning problems and collaborate on data preparation, experiments, and evaluation.',
  },
  {
    id: 'fieldnote-marketing', company: 'Fieldnote', role: 'Growth Marketing Intern', location: 'Mumbai, India', type: 'Hybrid', stipend: '₹16,000 / month', deadline: daysFromToday(7), postedDays: 8,
    skills: ['Content', 'SEO', 'Communication'], color: 'yellow', logo: 'F',
    description: 'Help plan content and growth experiments, then measure what resonates with students and early-career teams.',
  },
  {
    id: 'safestack-security', company: 'SafeStack', role: 'Cybersecurity Intern', location: 'Remote · India', type: 'Remote', stipend: '₹24,000 / month', deadline: daysFromToday(18), postedDays: 10,
    skills: ['Security basics', 'Linux', 'Networking'], color: 'teal', logo: 'S',
    description: 'Learn security operations with a mentoring team, assist with triage, and document practical findings.',
  },
  {
    id: 'civicloop-business', company: 'CivicLoop', role: 'Business Operations Intern', location: 'Delhi, India', type: 'On-site', stipend: '₹17,500 / month', deadline: daysFromToday(21), postedDays: 12,
    skills: ['Excel', 'Research', 'Organization'], color: 'blue', logo: 'C',
    description: 'Support a mission-driven operations team with research, process notes, and clear weekly reporting.',
  },
  {
    id: 'pixel-mobile', company: 'Pixel Harbor', role: 'Mobile App Intern', location: 'Bengaluru, India', type: 'Hybrid', stipend: '₹23,000 / month', deadline: daysFromToday(25), postedDays: 14,
    skills: ['React Native', 'JavaScript', 'Git'], color: 'violet', logo: 'P',
    description: 'Contribute to a cross-platform app, collaborate on small feature releases, and learn from mobile engineers.',
  },
];

export const applicationStatuses = ['Applied', 'Under Review', 'Interview', 'Selected', 'Rejected'];

export const formatDate = (value) => new Intl.DateTimeFormat('en-IN', {
  day: 'numeric', month: 'short', year: 'numeric',
}).format(new Date(`${value}T12:00:00`));

export const daysUntil = (value) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(`${value}T00:00:00`);
  return Math.ceil((date - today) / 86400000);
};
