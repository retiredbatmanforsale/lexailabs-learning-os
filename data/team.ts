export interface TeamMember {
  name: string;
  role: string;
  company: string;
  linkedin: string;
  type: 'founder' | 'team' | 'mentor' | 'advisor';
  image?: string;
}

export const team: TeamMember[] = [
  {
    name: 'Puru Kathuria',
    role: 'Founder & Lead Instructor',
    company: 'Lex AI Labs',
    linkedin: 'https://www.linkedin.com/in/purukathuria/',
    type: 'founder',
    image: '/assets/team/puru-kathuria.jpg',
  },
  {
    name: 'Swati Nain',
    role: 'Co-Founder & Operations',
    company: 'Lex AI Labs',
    linkedin: 'https://www.linkedin.com/in/swati-nain/',
    type: 'founder',
    image: '/assets/team/swati-nain.jpg',
  },
  {
    name: 'Rohan Gurve',
    role: 'Software Engineer',
    company: 'Google',
    linkedin: 'https://www.linkedin.com/in/rohan-gurve-0a93931b5/',
    type: 'mentor',
    image: '/assets/team/rohan-gurve.jpg',
  },
  {
    name: 'Nipun Katyal',
    role: 'AI Vector Search Engineer',
    company: 'Oracle',
    linkedin: 'https://www.linkedin.com/in/nipun-katyal/',
    type: 'mentor',
    image: '/assets/team/nipun-katyal.jpg',
  },
  {
    name: 'Ashish Joshi',
    role: 'Senior Engineer',
    company: 'Amazon',
    linkedin: 'https://www.linkedin.com/in/ashiishjoshii/',
    type: 'mentor',
    image: '/assets/team/ashish-joshi.jpg',
  },
  {
    name: 'Nupur Lamba',
    role: 'Data Scientist',
    company: 'MathWorks',
    linkedin: 'https://www.linkedin.com/in/nupur-lamba-47b41811a/',
    type: 'team',
    image: '/assets/team/nupur-lamba.jpg',
  },
  {
    name: 'Sampann Chaudhary',
    role: 'Founder',
    company: 'DGLiger Consulting',
    linkedin: 'https://www.linkedin.com/in/sampannchaudhary/',
    type: 'advisor',
  },
  {
    name: 'Saurabh Chatterjee',
    role: 'Software Engineer',
    company: 'Qualcomm',
    linkedin: 'https://www.linkedin.com/in/saurabh-chatterjee-03b7241a/',
    type: 'mentor',
    image: '/assets/team/saurabh-chatterjee.jpg',
  },
  {
    name: 'Kartik Kulkarni',
    role: 'ML Researcher',
    company: 'Tech',
    linkedin: 'https://www.linkedin.com/in/kulkarnikarthik/',
    type: 'advisor',
    image: '/assets/team/kartik-kulkarni.png',
  },
];
