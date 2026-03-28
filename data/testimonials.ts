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
    role: 'Senior Director at Newton School',
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
  {
    id: 4,
    name: 'Nipun Katyal',
    role: 'AI Vector Search Engineer at Oracle',
    image:
      'https://media.licdn.com/dms/image/v2/C5103AQF0X2dyoEZGdQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1559472916576?e=1772064000&v=beta&t=qCKtYUARUaM0qC6fRkm2ZKW8CLBrizTOhJM_yKkV3QI',
    linkedin: 'https://www.linkedin.com/in/nipun-katyal/',
    content:
      'I had the pleasure of working with Puru at MathWorks. My peers and I always appreciated the depth with which Puru approached engineering problems as well as his philosophy towards designing solutions. He has a commendable grasp on a variety of domains like natural language processing and audio processing.',
    source: 'linkedin',
  },
  {
    id: 5,
    name: 'Nishchay Anand',
    role: 'Senior Software Engineer',
    image:
      'https://media.licdn.com/dms/image/v2/C4D03AQHJ51KzqnWsPw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1651405634966?e=1772064000&v=beta&t=-kdQEisGNLLjOS4Ch60Ymbe-lJ0wPuicJDFhg9rp-jM',
    linkedin: 'https://www.linkedin.com/in/nishchay-anand-ba3768170/',
    content:
      'I had the privilege of learning from Puru during the System Design Fellowship. He turns each learning session into an approachable conversation, bridging the gap between theory and real-world intuition. His sessions will always leave you smarter, more confident, and genuinely excited to build.',
    source: 'linkedin',
  },
  {
    id: 6,
    name: 'Shiv Singh',
    role: 'Enterprise Architect',
    image:
      'https://media.licdn.com/dms/image/v2/C5103AQErJ7GduGtBCQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1550487747800?e=1772064000&v=beta&t=a9MX0oL3na-8extM8zGK8qh0N09tvqPf9ACJHOGq4ak',
    linkedin: 'https://www.linkedin.com/in/singhshiv/',
    content:
      "I've had the chance to interact with Puru and learn valuable insights into Machine Learning through him. He has a natural ability to simplify complex topics and explain them in a way that makes sense, no matter how technical they are.",
    source: 'linkedin',
  },
  {
    id: 7,
    name: 'Abhinav Srivastava',
    role: 'Consultant at Deloitte',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQHihtHRY-4wVA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718189059201?e=1772064000&v=beta&t=Epj0OQDe_IfJTN_EP11tEMZpBbcRlG2rG50aiTouik0',
    linkedin: 'https://www.linkedin.com/in/abhinav-srivastava-1046601a5/',
    content:
      'Puru has a way of making machine learning feel less like rocket science and more like a conversation. During my time at the LexAI Fellowship, he made topics that usually seem intimidating feel surprisingly manageable.',
    source: 'feedback',
  },
  {
    id: 8,
    name: 'Maneet Kaur Bagga',
    role: 'UX Researcher at MathWorks',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQEj4Jxy36rgyA/profile-displayphoto-shrink_800_800/B56ZmKOkA9IsAc-/0/1758960698380?e=1772064000&v=beta&t=hnr-oMSb9Kdvsq0zr3HrHufNDVKmI88CkIWwRSTY-Bc',
    linkedin: 'https://www.linkedin.com/in/maneet-kaur-bagga-8225701aa/',
    content:
      'His mentoring and teaching abilities are truly outstanding, especially his approach of focusing on practical, industry-applicable knowledge. He equipped me with real-world Machine Learning skills and insights needed to thrive.',
    source: 'feedback',
  },
  {
    id: 9,
    name: 'Riddhi Menroy',
    role: 'Computer Engineering Student at Thapar Institute',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQEdPOomItqr4Q/profile-displayphoto-shrink_800_800/B56ZPkje5CG8Ac-/0/1734706328304?e=1772064000&v=beta&t=CxqzUITkSv8jTNAEaoE1qt6rtbZ72msy4KM2AJ_yXCY',
    linkedin: 'https://www.linkedin.com/in/riddhi-menroy/',
    content:
      "I've had the opportunity to learn from Puru during the Lex AI Fellowship. He breaks down complex concepts, especially the math, into simple, intuitive steps. Even the most abstract ideas feel approachable.",
    source: 'feedback',
  },
  {
    id: 10,
    name: 'Deepak Sharma',
    role: 'Software Engineer',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQFm41sgW-HxBw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696006622890?e=1772064000&v=beta&t=8_mAzU5EkW2UD1_98oliqKpmuhvKCNWCqeH3wkJVHjo',
    linkedin: 'https://www.linkedin.com/in/deepak-sharma-6a7a07121/',
    content:
      'Working with Puru has been one of the most enriching experiences of my journey. His technical depth across system design, AI/ML, and large-scale engineering challenges is truly exceptional. He has a rare ability to simplify complex problems.',
    source: 'linkedin',
  },
  {
    id: 11,
    name: 'Karan Bhutani',
    role: 'Consultant at Deloitte',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQGjdyAf0_x5Dw/profile-displayphoto-crop_800_800/B56ZhehE6yHkAI-/0/1753932387091?e=1772064000&v=beta&t=PeRW2dHaRZqTkKXhLy4T27kCgnKe0Q2SJBJ7777f21s',
    linkedin: 'https://www.linkedin.com/in/karan-bhutani/',
    content:
      "Puru didn't just shape how I write code, he changed how I think about technology and its purpose. Watching him work is like seeing someone translate philosophy into engineering: grounded in first principles, deeply thoughtful.",
    source: 'linkedin',
  },
];
