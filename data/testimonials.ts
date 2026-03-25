export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image?: string;
  content: string;
  linkedin?: string;
  postLink?: string;
  source: 'linkedin' | 'feedback';
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Vidhi Gupta',
    role: 'Senior Technical Program Manager at Google',
    image: '/assets/testimonials/vidhi-gupta.jpg',
    content:
      'Today, I spent time understanding one of the most fascinating concepts in AI — Convolution, a key building block in how computers process and understand images.\n\nWhen we look at a picture, our brain effortlessly recognizes faces, colors, and shapes. But for a computer, an image is just a grid of numbers (pixels). To help machines "see," we use a special mathematical operation called Convolution, which allows them to extract meaningful features like edges, textures, and patterns from those pixels.\n\nIt\'s incredible to see how this mathematical idea forms the foundation of how AI models perceive the visual world. And it\'s a core component in the architecture of advanced systems like Google Gemini — enabling it to seamlessly analyze, caption, and reason across complex images and video!\n\nA big thanks to Puru Kathuria for walking me through the concepts so clearly.',
    linkedin: 'https://www.linkedin.com/in/vidhigupta8/',
    postLink:
      'https://www.linkedin.com/posts/vidhigupta8_image-understanding-gemini-api-google-activity-7387171611600166912-QxZu',
    source: 'linkedin',
  },
  {
    id: 2,
    name: 'Soumitra Mishra',
    role: 'Program Coordinator',
    image: '/assets/testimonials/soumitra-mishra.jpg',
    linkedin: 'https://www.linkedin.com/in/soumitra-mishra-59402a41/',
    content:
      'The biggest thing was the ownership Puru and team showed, which was the biggest value add. They were totally onboarded with the ideas, of course, and the rest was totally delegated to Puru\'s team for execution. The execution was superb and students loved it. I would rate the experience 10/5 for sure. Thanks for doing this course.\n\nThe worksheet model, the engagement, and the algorithm visualizations were amazing.\n\nAnyone looking for in-depth AI expertise can definitely get a one-stop deal with Lex AI. They know their stuff and the craft. AI is taking the world by storm, and companies like Lex AI can surely make India ready for the future.',
    source: 'feedback',
  },
  {
    id: 3,
    name: 'Megha Sahni',
    role: 'Associate Software Engineer at JPMorgan Chase',
    image: '/assets/testimonials/megha-sahni.jpg',
    linkedin: 'https://www.linkedin.com/in/mesahni/',
    postLink:
      'https://www.linkedin.com/posts/mesahni_ai-lexailab-ai-activity-7373551806708314112-31gp',
    content:
      'In a world defined by rapid technological shifts, AI education stands at the forefront of transformative change. Puru Kathuria\'s dedication to empowering individuals through education not only prepares them for the evolving job market but also fosters the critical thinking essential for navigating an uncertain future.\n\nHis work is a testament to the power of knowledge in shaping resilient, forward-thinking societies.',
    source: 'linkedin',
  },
];
