// @ts-nocheck
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

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
      bio: `I'm a passionate full-stack developer with 3+ years of experience building scalable web applications. I specialize in React, Next.js, Node.js, and AI/ML integration. I love turning complex problems into clean, intuitive products that users love.\n\nWhen I'm not coding, you'll find me exploring new technologies, contributing to open source, or mentoring aspiring developers. I believe great software is as much about the experience it creates as the code behind it.`,
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
      },
    },
  });
  console.log('✅ About section seeded');

  // ─── Skills ───────────────────────────────────────────────────────
  await prisma.skill.deleteMany();
  const skills = [
    { name: 'TypeScript', category: 'PROGRAMMING', level: 92, displayOrder: 1 },
    { name: 'Python', category: 'PROGRAMMING', level: 88, displayOrder: 2 },
    { name: 'JavaScript', category: 'PROGRAMMING', level: 95, displayOrder: 3 },
    { name: 'Java', category: 'PROGRAMMING', level: 75, displayOrder: 4 },
    { name: 'React', category: 'WEB_DEVELOPMENT', level: 95, displayOrder: 1 },
    { name: 'Next.js', category: 'WEB_DEVELOPMENT', level: 92, displayOrder: 2 },
    { name: 'Node.js', category: 'WEB_DEVELOPMENT', level: 88, displayOrder: 3 },
    { name: 'Tailwind CSS', category: 'WEB_DEVELOPMENT', level: 90, displayOrder: 4 },
    { name: 'GraphQL', category: 'WEB_DEVELOPMENT', level: 78, displayOrder: 5 },
    { name: 'Three.js', category: 'WEB_DEVELOPMENT', level: 72, displayOrder: 6 },
    { name: 'TensorFlow', category: 'AI_ML', level: 75, displayOrder: 1 },
    { name: 'PyTorch', category: 'AI_ML', level: 72, displayOrder: 2 },
    { name: 'LangChain', category: 'AI_ML', level: 78, displayOrder: 3 },
    { name: 'OpenAI API', category: 'AI_ML', level: 88, displayOrder: 4 },
    { name: 'scikit-learn', category: 'AI_ML', level: 80, displayOrder: 5 },
    { name: 'AWS', category: 'CLOUD', level: 78, displayOrder: 1 },
    { name: 'Vercel', category: 'CLOUD', level: 92, displayOrder: 2 },
    { name: 'Docker', category: 'CLOUD', level: 80, displayOrder: 3 },
    { name: 'Google Cloud', category: 'CLOUD', level: 72, displayOrder: 4 },
    { name: 'PostgreSQL', category: 'DATABASE', level: 88, displayOrder: 1 },
    { name: 'MongoDB', category: 'DATABASE', level: 82, displayOrder: 2 },
    { name: 'Redis', category: 'DATABASE', level: 75, displayOrder: 3 },
    { name: 'Prisma', category: 'DATABASE', level: 90, displayOrder: 4 },
    { name: 'Git & GitHub', category: 'TOOLS', level: 95, displayOrder: 1 },
    { name: 'Figma', category: 'TOOLS', level: 78, displayOrder: 2 },
    { name: 'Linux', category: 'TOOLS', level: 80, displayOrder: 3 },
  ];
  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`✅ Created ${skills.length} skills`);

  // ─── Projects ─────────────────────────────────────────────────────
  await prisma.project.deleteMany();
  const projects = [
    {
      title: 'AI-Powered Code Review Platform',
      slug: 'ai-code-review-platform',
      description: 'An intelligent code review system that uses GPT-4 to provide detailed, actionable feedback on pull requests with security vulnerability detection.',
      longDescription: 'Built a full-stack platform that integrates with GitHub webhooks to automatically review code on every PR. The system analyzes code quality, detects security vulnerabilities (OWASP Top 10), suggests performance improvements, and learns from accepted/rejected suggestions over time.',
      category: 'AI_ML',
      techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'PostgreSQL', 'Prisma', 'GitHub API', 'Redis', 'Docker'],
      githubUrl: 'https://github.com/yourusername/ai-code-review',
      liveUrl: 'https://ai-code-review.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80'],
      featured: true,
      displayOrder: 1,
      status: 'COMPLETED',
      features: ['Automatic PR analysis via GitHub webhooks', 'GPT-4 powered code suggestions', 'Security vulnerability scanner', 'Team collaboration with inline comments'],
      challenges: 'Keeping response times under 30s for large diffs while maintaining quality.',
      solutions: 'Streaming architecture with Redis queues and parallel OpenAI API calls.',
    },
    {
      title: '3D Portfolio Builder',
      slug: '3d-portfolio-builder',
      description: 'A drag-and-drop portfolio builder with real-time 3D preview, allowing developers and designers to create stunning portfolios without code.',
      longDescription: 'A SaaS platform that allows users to build immersive 3D portfolio websites with a visual editor. Features include component libraries, custom themes, and one-click deployment to custom domains.',
      category: 'WEB_DEVELOPMENT',
      techStack: ['React', 'Three.js', 'React Three Fiber', 'Node.js', 'MongoDB', 'Stripe', 'Cloudinary'],
      githubUrl: 'https://github.com/yourusername/3d-portfolio-builder',
      liveUrl: 'https://3d-portfolio-builder.com',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'],
      featured: true,
      displayOrder: 2,
      status: 'COMPLETED',
      features: ['Visual drag-and-drop editor', 'Real-time 3D preview', '50+ pre-built 3D components', 'Custom domain support with SSL'],
      challenges: 'Making 3D interactions smooth across all devices including mobile.',
      solutions: 'LOD switching and adaptive quality settings based on device GPU capabilities.',
    },
    {
      title: 'Realtime Collaborative IDE',
      slug: 'realtime-collaborative-ide',
      description: 'A browser-based collaborative code editor with real-time sync, AI autocompletion, and integrated terminal — like VS Code for teams.',
      longDescription: 'Built a full-featured web IDE with Monaco Editor, featuring multi-cursor collaboration via CRDTs, AI-powered autocompletion, a sandboxed execution environment, and integrated video calling.',
      category: 'WEB_DEVELOPMENT',
      techStack: ['React', 'Monaco Editor', 'WebSockets', 'Node.js', 'Y.js', 'Docker', 'WebRTC', 'Redis'],
      githubUrl: 'https://github.com/yourusername/collab-ide',
      liveUrl: 'https://collab-ide.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      images: ['https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80'],
      featured: true,
      displayOrder: 3,
      status: 'COMPLETED',
      features: ['Real-time multi-cursor collaboration', 'AI autocompletion', 'Sandboxed code execution (30+ languages)', 'Integrated video calling via WebRTC'],
      challenges: 'Conflict-free real-time sync across multiple users simultaneously.',
      solutions: 'Used Y.js CRDT library ensuring perfect sync even with high-latency connections.',
    },
    {
      title: 'ML Model Deployment Platform',
      slug: 'ml-model-deployment',
      description: 'A platform for deploying, versioning, and monitoring ML models with auto-scaling, A/B testing, and drift detection.',
      longDescription: 'An end-to-end MLOps platform that lets data scientists deploy models with a single command, automatically handles scaling, monitors for data drift, and provides a REST API + Python SDK.',
      category: 'AI_ML',
      techStack: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Prometheus', 'Grafana'],
      githubUrl: 'https://github.com/yourusername/ml-deploy',
      liveUrl: 'https://ml-deploy.io',
      thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
      images: ['https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80'],
      featured: false,
      displayOrder: 4,
      status: 'COMPLETED',
      features: ['One-command model deployment', 'Auto-scaling with Kubernetes', 'A/B testing with traffic splitting', 'Data drift detection and alerting'],
      challenges: 'Detecting subtle data drift without causing false alarms.',
      solutions: 'KS test and Population Stability Index with configurable thresholds.',
    },
    {
      title: 'Fintech Analytics Dashboard',
      slug: 'fintech-dashboard',
      description: 'A real-time financial analytics dashboard for retail investors with portfolio tracking, predictive analytics, and news sentiment analysis.',
      longDescription: 'Built for a fintech startup, this dashboard provides institutional-grade analytics. Features real-time price streaming, AI news sentiment, portfolio risk analysis, and automated rebalancing suggestions.',
      category: 'WEB_DEVELOPMENT',
      techStack: ['Next.js', 'TypeScript', 'D3.js', 'WebSockets', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com/yourusername/fintech-dashboard',
      liveUrl: 'https://fintech-demo.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      images: ['https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80'],
      featured: false,
      displayOrder: 5,
      status: 'COMPLETED',
      features: ['Real-time price streaming', 'AI news sentiment analysis', 'Portfolio risk heatmaps', 'Automated rebalancing suggestions'],
      challenges: 'Rendering thousands of real-time data points without frame drops.',
      solutions: 'Canvas-based rendering with WebGL acceleration, reducing CPU usage by 70%.',
    },
  ];
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`✅ Created ${projects.length} projects`);

  // ─── Experience ───────────────────────────────────────────────────
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        company: 'TechCorp Solutions',
        role: 'Senior Full Stack Engineer',
        location: 'Bengaluru, India',
        locationType: 'hybrid',
        startDate: new Date('2023-06-01'),
        current: true,
        description: 'Leading development of a B2B SaaS platform serving 50,000+ users, architecting microservices and driving 40% performance improvements.',
        responsibilities: ['Architected scalable microservices handling 10M+ requests/day', 'Led a team of 5 engineers', 'Reduced page load time by 40%', 'Integrated AI-powered features'],
        technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
        achievements: ['Led migration from monolith to microservices with zero downtime', 'Increased test coverage from 20% to 85%'],
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
        description: 'Built core product features for an early-stage fintech startup, growing from 0 to 10,000 users in 8 months.',
        responsibilities: ['Developed entire frontend from scratch', 'Built RESTful APIs with Node.js', 'Real-time features using WebSockets', 'Set up monitoring with Datadog'],
        technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe', 'WebSockets'],
        achievements: ['Shipped MVP in 3 months as sole frontend developer', 'Helped secure Series A funding'],
        displayOrder: 2,
      },
    ],
  });
  console.log('✅ Created experience entries');

  // ─── Education ────────────────────────────────────────────────────
  await prisma.education.deleteMany();
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
      coursework: ['Data Structures & Algorithms', 'Distributed Systems', 'Machine Learning', 'Computer Networks', 'Database Management'],
      achievements: ["Dean's List — All 8 semesters", 'Best Final Year Project Award', 'ACM ICPC Regional Finalist', 'Google Summer of Code 2021'],
      displayOrder: 1,
    },
  });
  console.log('✅ Created education entry');

  // ─── Certifications ───────────────────────────────────────────────
  await prisma.certification.deleteMany();
  await prisma.certification.createMany({
    data: [
      { title: 'AWS Solutions Architect — Professional', issuer: 'Amazon Web Services', date: new Date('2023-08-15'), expiryDate: new Date('2026-08-15'), credentialId: 'AWS-SAP-2023', description: 'Advanced certification covering complex AWS architectures and enterprise-scale cloud solutions.', skills: ['AWS', 'Cloud Architecture', 'Security', 'Cost Optimization'], displayOrder: 1 },
      { title: 'Google Professional Data Engineer', issuer: 'Google Cloud', date: new Date('2023-03-20'), expiryDate: new Date('2025-03-20'), credentialId: 'GCP-PDE-2023', description: 'Certification in designing and building data processing systems on Google Cloud Platform.', skills: ['BigQuery', 'Dataflow', 'Pub/Sub', 'Cloud Storage'], displayOrder: 2 },
      { title: 'Meta Front-End Developer Professional Certificate', issuer: 'Meta (Coursera)', date: new Date('2022-11-10'), credentialId: 'META-FED-2022', description: 'Professional certificate covering React, advanced JavaScript, and modern front-end practices.', skills: ['React', 'JavaScript', 'Testing', 'Responsive CSS'], displayOrder: 3 },
      { title: 'TensorFlow Developer Certificate', issuer: 'Google', date: new Date('2022-06-15'), credentialId: 'TF-DEV-2022', description: 'Demonstrates proficiency in building and training neural networks with TensorFlow.', skills: ['TensorFlow', 'Computer Vision', 'NLP', 'Neural Networks'], displayOrder: 4 },
    ],
  });
  console.log('✅ Created certifications');

  // ─── Achievements ─────────────────────────────────────────────────
  await prisma.achievement.deleteMany();
  await prisma.achievement.createMany({
    data: [
      { title: 'Winner — Smart India Hackathon 2023', type: 'HACKATHON', description: 'Built an AI-powered crop disease detection system. Competed against 500+ teams and won the national-level competition with a Rs. 1 Lakh prize.', date: new Date('2023-09-15'), position: '1st Place (National)', organizer: 'Ministry of Education, India', displayOrder: 1 },
      { title: 'Google Summer of Code 2021', type: 'OPEN_SOURCE', description: 'Selected as a GSoC contributor for CNCF. Contributed major features to an open-source Kubernetes monitoring tool, with 3 PRs merged to the main codebase.', date: new Date('2021-08-20'), organizer: 'Google / CNCF', displayOrder: 2 },
      { title: 'ACM ICPC Asia Regional Finalist', type: 'COMPETITION', description: 'Ranked in the top 50 teams in the ACM ICPC Asia Regional round, competing in advanced algorithms and data structures problems.', date: new Date('2021-11-12'), position: 'Top 50 Regionally', organizer: 'ACM & IIT Kanpur', displayOrder: 3 },
      { title: 'Best Technical Paper — IEEE Conference', type: 'AWARD', description: 'Published paper on "Efficient Federated Learning for Edge Devices". Awarded Best Paper in the AI/ML track at the IEEE International Conference.', date: new Date('2022-12-08'), position: 'Best Paper Award', organizer: 'IEEE', displayOrder: 4 },
      { title: 'Tech Talk — "Building AI-First Products"', type: 'PUBLIC_SPEAKING', description: 'Delivered a 45-minute talk on practical AI integration patterns at BangaloreJS meetup, attended by 200+ developers.', date: new Date('2023-07-22'), organizer: 'BangaloreJS Community', displayOrder: 5 },
    ],
  });
  console.log('✅ Created achievements');

  // ─── Admin User ───────────────────────────────────────────────────
  await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: { email: 'admin@portfolio.com', name: 'Admin', role: 'ADMIN' },
  });
  console.log('✅ Admin user created');

  console.log('\n🎉 Database seeded successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔑 Admin Login:');
  console.log('   URL:      http://localhost:3000/admin/login');
  console.log('   Email:    admin@portfolio.com');
  console.log('   Password: admin123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => { console.error('Seed error:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
