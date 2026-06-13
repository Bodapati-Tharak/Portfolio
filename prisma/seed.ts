import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── About Section ────────────────────────────────────────────────
  await prisma.aboutSection.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      name: 'Your Name',
      title: 'Full Stack Engineer & AI Enthusiast',
      shortBio: 'Building elegant, high-performance applications at the intersection of design and engineering.',
      bio: `I'm a passionate full-stack developer with 3+ years of experience building scalable web applications. I specialize in React, Next.js, Node.js, and AI/ML integration. I love turning complex problems into clean, intuitive products that users love.

When I'm not coding, you'll find me exploring new technologies, contributing to open source, or mentoring aspiring developers. I believe great software is as much about the experience it creates as the code behind it.`,
      email: 'your.email@gmail.com',
      location: 'Bengaluru, India',
      available: true,
      resumeUrl: 'https://drive.google.com/your-resume-link',
      socialLinks: {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        twitter: 'https://twitter.com/yourusername',
      },
      stats: {
        yearsExperience: 3,
        projectsCompleted: 25,
        openSourceContributions: 10,
        coffeeConsumed: 1200,
      },
    },
  });

  // ─── Skills ───────────────────────────────────────────────────────
  const skills = [
    // Programming
    { name: 'TypeScript', category: 'PROGRAMMING', level: 92, displayOrder: 1 },
    { name: 'Python', category: 'PROGRAMMING', level: 88, displayOrder: 2 },
    { name: 'JavaScript', category: 'PROGRAMMING', level: 95, displayOrder: 3 },
    { name: 'Java', category: 'PROGRAMMING', level: 75, displayOrder: 4 },
    { name: 'C++', category: 'PROGRAMMING', level: 70, displayOrder: 5 },
    // Web Dev
    { name: 'React', category: 'WEB_DEVELOPMENT', level: 95, displayOrder: 1 },
    { name: 'Next.js', category: 'WEB_DEVELOPMENT', level: 92, displayOrder: 2 },
    { name: 'Node.js', category: 'WEB_DEVELOPMENT', level: 88, displayOrder: 3 },
    { name: 'Tailwind CSS', category: 'WEB_DEVELOPMENT', level: 90, displayOrder: 4 },
    { name: 'GraphQL', category: 'WEB_DEVELOPMENT', level: 78, displayOrder: 5 },
    { name: 'Three.js', category: 'WEB_DEVELOPMENT', level: 72, displayOrder: 6 },
    // AI/ML
    { name: 'TensorFlow', category: 'AI_ML', level: 75, displayOrder: 1 },
    { name: 'PyTorch', category: 'AI_ML', level: 72, displayOrder: 2 },
    { name: 'scikit-learn', category: 'AI_ML', level: 80, displayOrder: 3 },
    { name: 'LangChain', category: 'AI_ML', level: 78, displayOrder: 4 },
    { name: 'OpenAI API', category: 'AI_ML', level: 88, displayOrder: 5 },
    // Cloud
    { name: 'AWS', category: 'CLOUD', level: 78, displayOrder: 1 },
    { name: 'Google Cloud', category: 'CLOUD', level: 72, displayOrder: 2 },
    { name: 'Vercel', category: 'CLOUD', level: 92, displayOrder: 3 },
    { name: 'Docker', category: 'CLOUD', level: 80, displayOrder: 4 },
    // Database
    { name: 'PostgreSQL', category: 'DATABASE', level: 88, displayOrder: 1 },
    { name: 'MongoDB', category: 'DATABASE', level: 82, displayOrder: 2 },
    { name: 'Redis', category: 'DATABASE', level: 75, displayOrder: 3 },
    { name: 'Prisma', category: 'DATABASE', level: 90, displayOrder: 4 },
    // Tools
    { name: 'Git & GitHub', category: 'TOOLS', level: 95, displayOrder: 1 },
    { name: 'VS Code', category: 'TOOLS', level: 95, displayOrder: 2 },
    { name: 'Figma', category: 'TOOLS', level: 78, displayOrder: 3 },
    { name: 'Linux', category: 'TOOLS', level: 80, displayOrder: 4 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill as any });
  }
  console.log(`✅ Created ${skills.length} skills`);

  // ─── Projects ─────────────────────────────────────────────────────
  const projects = [
    {
      title: 'AI-Powered Code Review Platform',
      slug: 'ai-code-review-platform',
      description: 'An intelligent code review system that uses GPT-4 to provide detailed, actionable feedback on pull requests with security vulnerability detection.',
      longDescription: 'Built a full-stack platform that integrates with GitHub webhooks to automatically review code on every PR. The system analyzes code quality, detects security vulnerabilities (OWASP Top 10), suggests performance improvements, and learns from accepted/rejected suggestions to improve over time.',
      category: 'AI_ML',
      techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'PostgreSQL', 'Prisma', 'GitHub API', 'Redis', 'Docker'],
      githubUrl: 'https://github.com/yourusername/ai-code-review',
      liveUrl: 'https://ai-code-review.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
        'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&q=80',
      ],
      featured: true,
      displayOrder: 1,
      status: 'COMPLETED' as const,
      features: [
        'Automatic PR analysis via GitHub webhooks',
        'GPT-4 powered code suggestions',
        'Security vulnerability scanner (OWASP Top 10)',
        'Learning from feedback to improve suggestions',
        'Team collaboration with inline comments',
        'Analytics dashboard for code quality trends',
      ],
      challenges: 'The main challenge was keeping response times under 30 seconds for large diffs while maintaining quality. We solved this by chunking diffs and processing in parallel.',
      solutions: 'Implemented a streaming architecture with Redis queues and parallel OpenAI API calls, reducing average review time from 2 minutes to under 15 seconds.',
    },
    {
      title: '3D Portfolio Builder',
      slug: '3d-portfolio-builder',
      description: 'A drag-and-drop portfolio builder with real-time 3D preview, allowing developers and designers to create stunning portfolios without code.',
      longDescription: 'A SaaS platform that allows users to build immersive 3D portfolio websites with a visual editor. Features include component libraries, custom themes, and one-click deployment to custom domains.',
      category: 'WEB_DEVELOPMENT',
      techStack: ['React', 'Three.js', 'React Three Fiber', 'Node.js', 'MongoDB', 'Stripe', 'Cloudinary', 'AWS'],
      githubUrl: 'https://github.com/yourusername/3d-portfolio-builder',
      liveUrl: 'https://3d-portfolio-builder.com',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
        'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80',
      ],
      featured: true,
      displayOrder: 2,
      status: 'COMPLETED' as const,
      features: [
        'Visual drag-and-drop editor',
        'Real-time 3D preview with React Three Fiber',
        '50+ pre-built 3D component library',
        'Custom domain support with SSL',
        'Stripe subscription billing',
        'Analytics for portfolio visitors',
      ],
      challenges: 'Making 3D interactions feel smooth across all devices including mobile was extremely challenging.',
      solutions: 'Implemented LOD (Level of Detail) switching and adaptive quality settings based on device GPU capabilities.',
    },
    {
      title: 'Realtime Collaborative IDE',
      slug: 'realtime-collaborative-ide',
      description: 'A browser-based collaborative code editor with real-time sync, AI autocompletion, and integrated terminal — like VS Code for teams.',
      longDescription: 'Built a full-featured web IDE with Monaco Editor, featuring multi-cursor collaboration via CRDTs (Conflict-free Replicated Data Types), AI-powered autocompletion, a sandboxed execution environment, and integrated video calling.',
      category: 'WEB_DEVELOPMENT',
      techStack: ['React', 'Monaco Editor', 'WebSockets', 'Node.js', 'Y.js (CRDTs)', 'Docker', 'WebRTC', 'Redis'],
      githubUrl: 'https://github.com/yourusername/collab-ide',
      liveUrl: 'https://collab-ide.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80',
      ],
      featured: true,
      displayOrder: 3,
      status: 'COMPLETED' as const,
      features: [
        'Real-time multi-cursor collaboration with CRDTs',
        'AI autocompletion with GitHub Copilot-style UX',
        'Sandboxed code execution (30+ languages)',
        'Integrated video/audio calling via WebRTC',
        'Git version control integration',
        'Custom themes and keybindings',
      ],
      challenges: 'Implementing conflict-free real-time sync across multiple users editing simultaneously was a fundamental challenge.',
      solutions: 'Used Y.js CRDT library for operational transformation, ensuring perfect sync even with high-latency connections.',
    },
    {
      title: 'ML Model Deployment Platform',
      slug: 'ml-model-deployment',
      description: 'A platform for deploying, versioning, and monitoring ML models with auto-scaling, A/B testing, and drift detection.',
      longDescription: 'An end-to-end MLOps platform that lets data scientists deploy models with a single command, automatically handles scaling, monitors for data drift, and provides a REST API + Python SDK for integrations.',
      category: 'AI_ML',
      techStack: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Prometheus', 'Grafana'],
      githubUrl: 'https://github.com/yourusername/ml-deploy',
      liveUrl: 'https://ml-deploy.io',
      thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
      ],
      featured: false,
      displayOrder: 4,
      status: 'COMPLETED' as const,
      features: [
        'One-command model deployment',
        'Automatic horizontal scaling with Kubernetes',
        'A/B testing with traffic splitting',
        'Data drift detection and alerting',
        'Model versioning and rollback',
        'Prometheus/Grafana monitoring dashboard',
      ],
      challenges: 'Detecting subtle data drift without causing false alarms required sophisticated statistical methods.',
      solutions: 'Implemented Kolmogorov-Smirnov and Population Stability Index tests with configurable thresholds.',
    },
    {
      title: 'Fintech Dashboard',
      slug: 'fintech-dashboard',
      description: 'A real-time financial analytics dashboard for retail investors featuring portfolio tracking, predictive analytics, and news sentiment analysis.',
      longDescription: 'Built for a fintech startup, this dashboard provides institutional-grade analytics to retail investors. Features real-time price streaming, AI-powered stock sentiment from news, portfolio risk analysis, and automated rebalancing suggestions.',
      category: 'WEB_DEVELOPMENT',
      techStack: ['Next.js', 'TypeScript', 'D3.js', 'WebSockets', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com/yourusername/fintech-dashboard',
      liveUrl: 'https://fintech-demo.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
      ],
      featured: false,
      displayOrder: 5,
      status: 'COMPLETED' as const,
      features: [
        'Real-time price streaming via WebSockets',
        'AI news sentiment analysis',
        'Portfolio risk heatmaps with D3.js',
        'Automated rebalancing suggestions',
        'Tax loss harvesting calculator',
        'Custom alerts and notifications',
      ],
      challenges: 'Rendering thousands of real-time data points without frame drops required creative optimization.',
      solutions: 'Implemented canvas-based rendering with WebGL acceleration for charts, reducing CPU usage by 70%.',
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project as any });
  }
  console.log(`✅ Created ${projects.length} projects`);

  // ─── Experience ───────────────────────────────────────────────────
  const experiences = [
    {
      company: 'TechCorp Solutions',
      role: 'Senior Full Stack Engineer',
      location: 'Bengaluru, India',
      locationType: 'hybrid',
      startDate: new Date('2023-06-01'),
      current: true,
      description: 'Leading the development of a B2B SaaS platform serving 50,000+ users, architecting microservices and driving 40% performance improvements.',
      responsibilities: [
        'Architected and built a scalable microservices platform handling 10M+ requests/day',
        'Led a team of 5 engineers, conducting code reviews and mentoring junior developers',
        'Reduced page load time by 40% through SSR, caching, and CDN optimization',
        'Integrated AI-powered features including smart search and automated reporting',
        'Established CI/CD pipelines reducing deployment time from 2 hours to 10 minutes',
      ],
      technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes'],
      achievements: [
        'Led migration from monolith to microservices with zero downtime',
        'Increased test coverage from 20% to 85%',
        'Delivered 3 major features 2 weeks ahead of schedule',
      ],
      displayOrder: 1,
    },
    {
      company: 'Startup Labs',
      role: 'Full Stack Developer',
      location: 'Remote',
      locationType: 'remote',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2023-05-31'),
      current: false,
      description: 'Built core product features for an early-stage fintech startup, helping grow from 0 to 10,000 users in 8 months.',
      responsibilities: [
        'Developed the entire frontend from scratch using React and TypeScript',
        'Built RESTful APIs with Node.js and Express, integrating with payment providers',
        'Implemented real-time features using WebSockets for live transaction updates',
        'Set up monitoring and alerting with Datadog, reducing MTTR by 60%',
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe', 'WebSockets', 'Docker'],
      achievements: [
        'Shipped MVP in 3 months as the sole frontend developer',
        'Helped secure Series A funding with product demos',
        '99.9% uptime maintained during rapid growth phase',
      ],
      displayOrder: 2,
    },
    {
      company: 'FreelanceHub',
      role: 'Freelance Web Developer',
      location: 'Remote',
      locationType: 'remote',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-12-31'),
      current: false,
      description: 'Delivered 15+ web projects for clients across e-commerce, healthcare, and education sectors.',
      responsibilities: [
        'Built custom e-commerce solutions with Shopify and WooCommerce integrations',
        'Developed healthcare patient portals with HIPAA compliance',
        'Created educational platforms with video streaming and quiz systems',
        'Provided ongoing maintenance and performance optimization',
      ],
      technologies: ['React', 'Next.js', 'PHP', 'MySQL', 'Stripe', 'AWS S3'],
      achievements: [
        '15+ projects delivered on time with 5-star ratings',
        'Generated $120K+ in client revenue through e-commerce solutions',
        '100% client satisfaction rate',
      ],
      displayOrder: 3,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp as any });
  }
  console.log(`✅ Created ${experiences.length} experience entries`);

  // ─── Education ────────────────────────────────────────────────────
  await prisma.education.create({
    data: {
      college: 'Indian Institute of Technology',
      degree: 'Bachelor of Technology',
      field: 'Computer Science & Engineering',
      cgpa: 8.7,
      maxCgpa: 10.0,
      startYear: 2018,
      endYear: 2022,
      current: false,
      description: 'Focused on algorithms, distributed systems, and machine learning. Graduated in the top 10% of the class.',
      coursework: [
        'Data Structures & Algorithms',
        'Distributed Systems',
        'Machine Learning',
        'Computer Networks',
        'Database Management',
        'Operating Systems',
        'Computer Vision',
        'Natural Language Processing',
      ],
      achievements: [
        'Dean\'s List — All 8 semesters',
        'Best Final Year Project Award',
        'ACM ICPC Regional Finalist',
        'Google Summer of Code 2021 Contributor',
      ],
      displayOrder: 1,
    },
  });
  console.log('✅ Created education entry');

  // ─── Certifications ───────────────────────────────────────────────
  const certs = [
    {
      title: 'AWS Solutions Architect — Professional',
      issuer: 'Amazon Web Services',
      date: new Date('2023-08-15'),
      expiryDate: new Date('2026-08-15'),
      credentialId: 'AWS-SAP-2023-12345',
      credentialUrl: 'https://aws.amazon.com/verification',
      description: 'Advanced certification covering complex AWS architectures, multi-account strategies, and enterprise-scale cloud solutions.',
      skills: ['AWS', 'Cloud Architecture', 'Security', 'Cost Optimization', 'High Availability'],
      displayOrder: 1,
    },
    {
      title: 'Google Professional Data Engineer',
      issuer: 'Google Cloud',
      date: new Date('2023-03-20'),
      expiryDate: new Date('2025-03-20'),
      credentialId: 'GCP-PDE-2023-67890',
      credentialUrl: 'https://cloud.google.com/certification',
      description: 'Certification in designing and building data processing systems on Google Cloud Platform.',
      skills: ['BigQuery', 'Dataflow', 'Pub/Sub', 'Cloud Storage', 'Looker'],
      displayOrder: 2,
    },
    {
      title: 'Meta Front-End Developer',
      issuer: 'Meta (Coursera)',
      date: new Date('2022-11-10'),
      credentialId: 'META-FED-2022-11111',
      credentialUrl: 'https://coursera.org/verify/professional-cert/META-FED',
      description: 'Professional certificate covering React, advanced JavaScript, testing, and modern front-end practices.',
      skills: ['React', 'JavaScript', 'Testing', 'UX Design', 'Responsive CSS'],
      displayOrder: 3,
    },
    {
      title: 'TensorFlow Developer Certificate',
      issuer: 'Google (TensorFlow)',
      date: new Date('2022-06-15'),
      credentialId: 'TF-DEV-2022-22222',
      credentialUrl: 'https://developers.google.com/certification/tensorflow',
      description: 'Certification demonstrating proficiency in building and training neural networks with TensorFlow.',
      skills: ['TensorFlow', 'Computer Vision', 'NLP', 'Time Series', 'Neural Networks'],
      displayOrder: 4,
    },
  ];

  for (const cert of certs) {
    await prisma.certification.create({ data: cert });
  }
  console.log(`✅ Created ${certs.length} certifications`);

  // ─── Achievements ─────────────────────────────────────────────────
  const achievements = [
    {
      title: 'Winner — Smart India Hackathon 2023',
      type: 'HACKATHON' as const,
      description: 'Built an AI-powered crop disease detection system using computer vision. Competed against 500+ teams across India and won the national-level competition with a Rs. 1 Lakh prize.',
      date: new Date('2023-09-15'),
      position: '1st Place (National)',
      organizer: 'Ministry of Education, India',
      url: 'https://sih.gov.in',
      displayOrder: 1,
    },
    {
      title: 'Google Summer of Code 2021',
      type: 'OPEN_SOURCE' as const,
      description: 'Selected as a GSoC contributor for the CNCF (Cloud Native Computing Foundation). Contributed major features to an open-source Kubernetes monitoring tool, with 3 PRs merged to the main codebase.',
      date: new Date('2021-08-20'),
      organizer: 'Google / CNCF',
      url: 'https://summerofcode.withgoogle.com',
      displayOrder: 2,
    },
    {
      title: 'ACM ICPC Asia Regional Finalist',
      type: 'COMPETITION' as const,
      description: 'Ranked in the top 50 teams in the ACM International Collegiate Programming Contest Asia Regional round, competing in advanced algorithms and data structures problems.',
      date: new Date('2021-11-12'),
      position: 'Top 50 Regionally',
      organizer: 'ACM & IIT Kanpur',
      url: 'https://icpc.global',
      displayOrder: 3,
    },
    {
      title: 'Best Technical Paper — IEEE Conference',
      type: 'AWARD' as const,
      description: 'Published and presented a research paper on "Efficient Federated Learning for Edge Devices" at the IEEE International Conference on Machine Learning and Applications. Awarded Best Paper in the AI/ML track.',
      date: new Date('2022-12-08'),
      position: 'Best Paper Award',
      organizer: 'IEEE',
      url: 'https://ieee.org',
      displayOrder: 4,
    },
    {
      title: 'Tech Talk — "Building AI-First Products"',
      type: 'PUBLIC_SPEAKING' as const,
      description: 'Delivered a 45-minute talk on practical AI integration patterns for production applications at BangaloreJS meetup. Attended by 200+ developers.',
      date: new Date('2023-07-22'),
      organizer: 'BangaloreJS Community',
      url: 'https://bangalorejs.org',
      displayOrder: 5,
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({ data: achievement });
  }
  console.log(`✅ Created ${achievements.length} achievements`);

  // ─── Admin User ───────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || await bcrypt.hash('admin123', 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      role: 'ADMIN',
      image: null,
    },
  });
  console.log(`✅ Admin user created: ${adminEmail}`);

  console.log('\n🎉 Database seeded successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Admin Login:');
  console.log(`  URL:      http://localhost:3000/admin/login`);
  console.log(`  Email:    admin@portfolio.com`);
  console.log(`  Password: admin123`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
