import {SeoData} from '../services/seo.service';

export const SEO_DATA = {
  home: {
    title: 'Home',
    description:
      'Angular Frontend Developer specializing in scalable, performant web applications, with Java Spring Boot experience.',
    keywords: 'Angular, TypeScript, Frontend Developer, Web Development, Java Spring Boot',
    author: 'Marat Martirosyan',
    type: 'website',
  },
  about: {
    title: 'About',
    description: 'Learn more about Marat Martirosyan, an experienced Angular Frontend Developer.',
    keywords: 'About, Marat Martirosyan, Frontend Developer, Angular Developer',
    author: 'Marat Martirosyan',
    type: 'website',
  },
  projects: {
    title: 'Projects',
    description: 'Explore my portfolio of web development projects and applications.',
    keywords: 'Projects, Portfolio, Web Development, Angular Projects',
    author: 'Marat Martirosyan',
    type: 'website',
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with Marat Martirosyan for collaboration opportunities.',
    keywords: 'Contact, Marat Martirosyan, Hire Frontend Developer',
    author: 'Marat Martirosyan',
    type: 'website',
  },
  blog: {
    title: 'Blog',
    description: 'Technical articles and insights on Angular, TypeScript, and web development.',
    keywords: 'Blog, Angular, TypeScript, Web Development, Frontend',
    author: 'Marat Martirosyan',
    type: 'website',
  },
} as const satisfies Record<string, SeoData>;

export type SeoPageKey = keyof typeof SEO_DATA;
