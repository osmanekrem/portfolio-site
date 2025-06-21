import { Post } from "@/db/schema";

interface SocialProfiles {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

const skills = [
  {
    name: "Web Development",
    skills: [
      "HTML/CSS | SCSS",
      "Tailwind CSS",
      "ReactJS | Next.js",
      "Angular",
      "Node.js",
      "Express.js",
      "Hono.js",
      "REST API",
      "GraphQL",
      "Redux | Zustand",
      "Drizzle ORM",
      "Prisma ORM",
      "Tanstack",
    ],
  },
  {
    name: "Software Engineering / Software Development",
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "Swift",
      "Git",
      "MongoDB",
      "SQL",
      "noSQL",
      "Drizzle ORM",
      "Prisma ORM",
    ],
  },
  {
    name: "Design and Multimedia",
    skills: ["Photoshop", "Premiere Pro", "Blender"],
  },
];

export function generatePersonSchema(social: SocialProfiles = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://osmanekrem.vercel.app/#person",
    name: "Osman Ekrem",
    givenName: "Osman",
    familyName: "Ekrem",
    jobTitle: "Frontend Developer",
    description:
      "Hello there! I'm Osman Ekrem, a passionate frontend developer with a knack for crafting engaging user experiences. Born as the digital age was dawning in late 2006, I've been intertwined with code from my middle school days.",
    url: "https://osmanekrem.vercel.app",
    email: "korkmazosmanekrem@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
      addressLocality: "Türkiye",
    },
    knowsAbout: skills.flatMap((category) =>
      category.skills.map((skill) => skill.replace(" | ", ", "))
    ),
    sameAs: [
      social.github && `https://github.com/${social.github}`,
      social.linkedin && `https://linkedin.com/in/${social.linkedin}`,
      social.twitter && `https://twitter.com/${social.twitter}`,
    ].filter(Boolean),
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://osmanekrem.vercel.app/#website",
    name: "Osman Ekrem Portfolio",
    url: "https://osmanekrem.vercel.app",
    description:
      "Frontend developer portfolio site showcasing web development projects and technical blog posts",
    author: {
      "@type": "Person",
      "@id": "https://osmanekrem.vercel.app/#person",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://osmanekrem.vercel.app/#person",
    },
    inLanguage: "en",
  };
}

export function generateBlogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://osmanekrem.vercel.app/posts#blog",
    name: "Osman Ekrem's Blog",
    description:
      "Technical articles about web development, programming tips, and software engineering insights",
    url: "https://osmanekrem.vercel.app/posts",
    author: {
      "@type": "Person",
      "@id": "https://osmanekrem.vercel.app/#person",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://osmanekrem.vercel.app/#person",
    },
  };
}

export function generateBlogPostSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://osmanekrem.vercel.app/posts/${post.slug}#article`,
    headline: post.title,
    description: post.content.substring(0, 200) + "...", // İlk 200 karakteri açıklama olarak kullan
    author: {
      "@type": "Person",
      "@id": "https://osmanekrem.vercel.app/#person",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://osmanekrem.vercel.app/#person",
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://osmanekrem.vercel.app/posts/${post.slug}`,
    },
    keywords: post.tags,
    articleBody: post.content,
    image: post.image,
    isPartOf: {
      "@type": "Blog",
      "@id": "https://osmanekrem.vercel.app/posts#blog",
    },
  };
}

export function generatePortfolioSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://osmanekrem.vercel.app/portfolio#profilepage",
    name: "Osman Ekrem's Portfolio",
    description:
      "Showcase of web development projects and professional work by Osman Ekrem",
    url: "https://osmanekrem.vercel.app/portfolio",
    mainEntity: {
      "@type": "Person",
      "@id": "https://osmanekrem.vercel.app/#person",
    },
  };
}

// JSON-LD'yi güvenli bir şekilde stringe çeviren yardımcı fonksiyon
export function jsonLdScriptProps(data: any) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML:{
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  }
  };
}
