export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  images: string[];
  primaryCategory: 'web' | 'mobile' | 'backend' | 'bots' | 'ai' | 'devops' | 'personal';
  subCategory: string;
  techStack: string[];
  challenge: string;
  solution: string;
  features: string[];
  results: {
    metric: string;
    value: string;
  }[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'ecommerce-platform',
    title: 'NextGen E-Commerce Platform',
    shortDescription: 'Full-stack e-commerce solution with real-time inventory management and AI-powered recommendations',
    fullDescription: 'A comprehensive e-commerce platform built with modern technologies, featuring advanced product search, real-time inventory tracking, and machine learning-driven product recommendations.',
    thumbnail: 'https://images.unsplash.com/photo-1717996563514-e3519f9ef9f7?w=800',
    images: [
      'https://images.unsplash.com/photo-1717996563514-e3519f9ef9f7?w=1200',
      'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200'
    ],
    primaryCategory: 'web',
    subCategory: 'E-commerce',
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS'],
    challenge: 'The client needed a scalable e-commerce platform that could handle thousands of concurrent users while providing personalized shopping experiences. The existing system had performance bottlenecks and poor conversion rates.',
    solution: 'Implemented a microservices architecture with Next.js for the frontend, Node.js backends, and integrated machine learning models for personalized recommendations. Used Redis for caching and PostgreSQL for data persistence.',
    features: [
      'Real-time inventory management across multiple warehouses',
      'AI-powered product recommendations',
      'Advanced search with filters and facets',
      'One-click checkout with multiple payment options',
      'Admin dashboard with analytics',
      'Mobile-responsive design'
    ],
    results: [
      { metric: 'Page Load Time', value: '1.2s' },
      { metric: 'Conversion Rate', value: '+45%' },
      { metric: 'User Engagement', value: '+67%' },
      { metric: 'Revenue Growth', value: '+120%' }
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example'
  },
  {
    id: '2',
    slug: 'fitness-tracking-app',
    title: 'FitTrack Pro - Fitness Tracking App',
    shortDescription: 'Cross-platform mobile app for workout tracking, nutrition logging, and AI coaching',
    fullDescription: 'A comprehensive fitness tracking application that helps users monitor their workouts, track nutrition, and receive personalized AI-driven coaching recommendations.',
    thumbnail: 'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?w=800',
    images: [
      'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?w=1200',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200'
    ],
    primaryCategory: 'mobile',
    subCategory: 'React Native',
    techStack: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow Lite', 'Redux', 'Expo'],
    challenge: 'Users needed a unified platform to track various fitness metrics, but existing apps were either too complex or lacked essential features like offline support and personalized coaching.',
    solution: 'Developed a React Native app with offline-first architecture, integrated TensorFlow Lite for on-device AI predictions, and created an intuitive UI that adapts to user goals and fitness levels.',
    features: [
      'Workout tracking with exercise library',
      'Nutrition logging with barcode scanner',
      'AI-powered personalized workout plans',
      'Progress analytics and insights',
      'Social features for sharing achievements',
      'Offline mode for gym usage'
    ],
    results: [
      { metric: 'Daily Active Users', value: '50K+' },
      { metric: 'App Store Rating', value: '4.8/5.0' },
      { metric: 'Workout Completion', value: '+85%' },
      { metric: 'User Retention', value: '72%' }
    ],
    liveUrl: 'https://apps.apple.com/example',
    githubUrl: 'https://github.com/example'
  },
  {
    id: '3',
    slug: 'api-gateway-system',
    title: 'Enterprise API Gateway',
    shortDescription: 'High-performance API gateway handling 100M+ requests per day with advanced security',
    fullDescription: 'A robust API gateway system designed for enterprise clients, featuring rate limiting, authentication, load balancing, and comprehensive logging.',
    thumbnail: 'https://images.unsplash.com/photo-1762163516269-3c143e04175c?w=800',
    images: [
      'https://images.unsplash.com/photo-1762163516269-3c143e04175c?w=1200',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200'
    ],
    primaryCategory: 'backend',
    subCategory: 'Microservices',
    techStack: ['Node.js', 'Express', 'Kong', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes', 'Prometheus'],
    challenge: 'The organization had multiple legacy services with inconsistent APIs, no centralized authentication, and difficulty scaling during traffic spikes.',
    solution: 'Built a centralized API gateway using Kong and Node.js plugins, implemented JWT-based authentication, deployed on Kubernetes for auto-scaling, and added comprehensive monitoring.',
    features: [
      'Rate limiting and throttling',
      'JWT and OAuth2 authentication',
      'Request/response transformation',
      'API versioning support',
      'Real-time monitoring and analytics',
      'Auto-scaling based on load'
    ],
    results: [
      { metric: 'Request Throughput', value: '100M+/day' },
      { metric: 'Response Time', value: '<50ms' },
      { metric: 'Uptime', value: '99.99%' },
      { metric: 'Cost Reduction', value: '-40%' }
    ],
    githubUrl: 'https://github.com/example'
  },
  {
    id: '4',
    slug: 'discord-moderation-bot',
    title: 'SmartMod - Discord Moderation Bot',
    shortDescription: 'AI-powered Discord bot for automated moderation with custom rules and analytics',
    fullDescription: 'An intelligent Discord moderation bot that uses machine learning to detect toxic behavior, automate moderation tasks, and provide community insights.',
    thumbnail: 'https://images.unsplash.com/photo-1752614671052-92e18f534db1?w=800',
    images: [
      'https://images.unsplash.com/photo-1752614671052-92e18f534db1?w=1200',
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=1200',
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200'
    ],
    primaryCategory: 'bots',
    subCategory: 'Moderation',
    techStack: ['Python', 'Discord.py', 'TensorFlow', 'MongoDB', 'Docker', 'Redis'],
    challenge: 'Large Discord communities struggled with manual moderation, leading to toxic behavior going unchecked and moderator burnout.',
    solution: 'Created an AI-powered bot that learns from moderator actions, automatically detects and filters toxic content, and provides detailed analytics on community health.',
    features: [
      'AI-powered content moderation',
      'Custom auto-mod rules',
      'Spam detection and prevention',
      'User warning system',
      'Moderation analytics dashboard',
      'Role management automation'
    ],
    results: [
      { metric: 'Servers Using', value: '5,000+' },
      { metric: 'Messages Moderated', value: '10M+' },
      { metric: 'Moderator Time Saved', value: '-70%' },
      { metric: 'Community Health', value: '+55%' }
    ],
    liveUrl: 'https://discord.com/example',
    githubUrl: 'https://github.com/example'
  },
  {
    id: '5',
    slug: 'image-recognition-system',
    title: 'Visual AI - Image Recognition Platform',
    shortDescription: 'Computer vision system for automated quality control in manufacturing',
    fullDescription: 'An advanced computer vision system that uses deep learning to detect defects in manufacturing processes, reducing waste and improving product quality.',
    thumbnail: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=800',
    images: [
      'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=1200',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200'
    ],
    primaryCategory: 'ai',
    subCategory: 'Computer Vision',
    techStack: ['Python', 'PyTorch', 'OpenCV', 'FastAPI', 'Docker', 'ONNX', 'CUDA'],
    challenge: 'Manufacturing quality control was slow and error-prone, with human inspectors missing subtle defects, leading to customer complaints and recalls.',
    solution: 'Developed a real-time computer vision system using convolutional neural networks to detect defects with high accuracy, integrated seamlessly with existing production lines.',
    features: [
      'Real-time defect detection',
      'Multiple product line support',
      'Automated alert system',
      'Historical data analysis',
      'Custom model training interface',
      'Edge deployment for low latency'
    ],
    results: [
      { metric: 'Defect Detection', value: '99.2%' },
      { metric: 'False Positives', value: '<0.5%' },
      { metric: 'Inspection Speed', value: '10x faster' },
      { metric: 'Cost Savings', value: '$2M/year' }
    ],
    githubUrl: 'https://github.com/example'
  },
  {
    id: '6',
    slug: 'kubernetes-cicd-pipeline',
    title: 'Cloud-Native CI/CD Platform',
    shortDescription: 'Automated deployment pipeline with Kubernetes, reducing deploy time by 90%',
    fullDescription: 'A comprehensive CI/CD platform built on Kubernetes that automates the entire software delivery lifecycle, from code commit to production deployment.',
    thumbnail: 'https://images.unsplash.com/photo-1683669446069-ab17a5453296?w=800',
    images: [
      'https://images.unsplash.com/photo-1683669446069-ab17a5453296?w=1200',
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200',
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200',
      'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=1200'
    ],
    primaryCategory: 'devops',
    subCategory: 'CI/CD',
    techStack: ['Kubernetes', 'Docker', 'Jenkins', 'ArgoCD', 'Terraform', 'Prometheus', 'Grafana', 'AWS'],
    challenge: 'The organization had manual deployment processes taking hours, frequent deployment failures, and no rollback strategy, causing significant downtime.',
    solution: 'Implemented a GitOps-based CI/CD pipeline using ArgoCD and Kubernetes, with automated testing, canary deployments, and instant rollback capabilities.',
    features: [
      'Automated build and test pipelines',
      'GitOps deployment workflow',
      'Canary and blue-green deployments',
      'Automated rollback on failures',
      'Infrastructure as Code with Terraform',
      'Comprehensive monitoring and alerting'
    ],
    results: [
      { metric: 'Deploy Time', value: '-90%' },
      { metric: 'Deployment Frequency', value: '50x/day' },
      { metric: 'Mean Time to Recovery', value: '<5min' },
      { metric: 'Deployment Failures', value: '-85%' }
    ],
    githubUrl: 'https://github.com/example'
  },
  {
    id: '7',
    slug: 'saas-dashboard',
    title: 'Analytics Dashboard SaaS',
    shortDescription: 'Real-time analytics dashboard with customizable widgets and data visualization',
    fullDescription: 'A powerful SaaS platform providing real-time business analytics with customizable dashboards, automated reports, and predictive insights.',
    thumbnail: 'https://images.unsplash.com/photo-1717996563514-e3519f9ef9f7?w=800',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200'
    ],
    primaryCategory: 'web',
    subCategory: 'SaaS',
    techStack: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    challenge: 'Businesses needed real-time insights into their operations but lacked the technical expertise to build custom analytics solutions.',
    solution: 'Created a white-label SaaS platform with drag-and-drop dashboard builder, pre-built integrations, and real-time data processing using WebSocket connections.',
    features: [
      'Drag-and-drop dashboard builder',
      'Real-time data streaming',
      '50+ pre-built visualizations',
      'Custom data connectors',
      'Automated report generation',
      'Role-based access control'
    ],
    results: [
      { metric: 'Active Customers', value: '1,200+' },
      { metric: 'Data Points/sec', value: '100K+' },
      { metric: 'Dashboard Load Time', value: '<2s' },
      { metric: 'Customer Satisfaction', value: '4.7/5' }
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example'
  },
  {
    id: '8',
    slug: 'chatbot-nlp',
    title: 'Enterprise Chatbot with NLP',
    shortDescription: 'Intelligent chatbot using natural language processing for customer support',
    fullDescription: 'An AI-powered chatbot that understands context and intent, providing human-like responses for customer support across multiple channels.',
    thumbnail: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=800',
    images: [
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
      'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200'
    ],
    primaryCategory: 'ai',
    subCategory: 'NLP',
    techStack: ['Python', 'Transformers', 'FastAPI', 'MongoDB', 'Redis', 'Docker', 'React'],
    challenge: 'Customer support teams were overwhelmed with repetitive queries, leading to long wait times and customer dissatisfaction.',
    solution: 'Developed a transformer-based NLP chatbot that handles common inquiries automatically, escalates complex issues to humans, and learns from interactions.',
    features: [
      'Multi-turn conversation handling',
      'Intent recognition and entity extraction',
      'Multi-language support',
      'Sentiment analysis',
      'Seamless human handoff',
      'Continuous learning from feedback'
    ],
    results: [
      { metric: 'Query Resolution', value: '85%' },
      { metric: 'Response Time', value: '<1s' },
      { metric: 'Customer Satisfaction', value: '+40%' },
      { metric: 'Support Cost', value: '-60%' }
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example'
  },
  {
    id: '9',
    slug: 'ios-social-app',
    title: 'ConnectHub - Social Networking App',
    shortDescription: 'Native iOS social app with video streaming and real-time messaging',
    fullDescription: 'A feature-rich social networking application built natively for iOS, offering video streaming, real-time chat, and community features.',
    thumbnail: 'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?w=800',
    images: [
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200',
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=1200',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200'
    ],
    primaryCategory: 'mobile',
    subCategory: 'iOS Native',
    techStack: ['Swift', 'SwiftUI', 'Firebase', 'WebRTC', 'Core Data', 'CloudKit'],
    challenge: 'Users wanted a social platform that combined the best features of existing apps with better privacy controls and performance.',
    solution: 'Built a native iOS app using SwiftUI with WebRTC for video calls, Firebase for real-time features, and implemented end-to-end encryption for privacy.',
    features: [
      'Live video streaming',
      'Real-time messaging',
      'Stories and feed',
      'End-to-end encryption',
      'Community groups',
      'Content discovery algorithm'
    ],
    results: [
      { metric: 'Downloads', value: '500K+' },
      { metric: 'Daily Active Users', value: '150K' },
      { metric: 'Video Call Quality', value: '1080p@60fps' },
      { metric: 'App Store Rating', value: '4.6/5' }
    ],
    liveUrl: 'https://apps.apple.com/example'
  },
  {
    id: '10',
    slug: 'realtime-collaboration',
    title: 'CodeSync - Real-time Collaboration Tool',
    shortDescription: 'Real-time collaborative coding platform with live cursors and chat',
    fullDescription: 'A collaborative development environment that allows multiple developers to code together in real-time with live cursors, chat, and version control integration.',
    thumbnail: 'https://images.unsplash.com/photo-1717996563514-e3519f9ef9f7?w=800',
    images: [
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200',
      'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1200'
    ],
    primaryCategory: 'personal',
    subCategory: 'Side Project',
    techStack: ['React', 'TypeScript', 'WebSocket', 'Monaco Editor', 'Node.js', 'PostgreSQL'],
    challenge: 'Remote teams struggled with pair programming and code reviews, leading to slower development cycles and communication gaps.',
    solution: 'Created a web-based collaborative IDE with operational transformation for real-time sync, integrated video chat, and Git integration.',
    features: [
      'Real-time collaborative editing',
      'Live cursor tracking',
      'Integrated video chat',
      'Git integration',
      'Syntax highlighting for 50+ languages',
      'Session recording and playback'
    ],
    results: [
      { metric: 'Active Users', value: '10K+' },
      { metric: 'Concurrent Editors', value: '8' },
      { metric: 'Sync Latency', value: '<50ms' },
      { metric: 'GitHub Stars', value: '2.5K' }
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example'
  },
  {
    id: '11',
    slug: 'ml-recommendation-engine',
    title: 'Smart Recommendations Engine',
    shortDescription: 'Machine learning recommendation system increasing user engagement by 80%',
    fullDescription: 'An advanced recommendation engine using collaborative filtering and deep learning to provide personalized content suggestions across multiple platforms.',
    thumbnail: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=800',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200'
    ],
    primaryCategory: 'ai',
    subCategory: 'Recommendation',
    techStack: ['Python', 'TensorFlow', 'Apache Spark', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    challenge: 'The platform had low user engagement with generic content recommendations that didn\'t match user preferences.',
    solution: 'Implemented a hybrid recommendation system combining collaborative filtering, content-based filtering, and deep learning models for personalized suggestions.',
    features: [
      'Real-time personalization',
      'Cold-start problem handling',
      'Multi-modal recommendations',
      'A/B testing framework',
      'Explainable AI insights',
      'Scalable to millions of users'
    ],
    results: [
      { metric: 'User Engagement', value: '+80%' },
      { metric: 'Click-through Rate', value: '+65%' },
      { metric: 'Session Duration', value: '+45%' },
      { metric: 'Model Accuracy', value: '92%' }
    ],
    githubUrl: 'https://github.com/example'
  },
  {
    id: '12',
    slug: 'terraform-multi-cloud',
    title: 'Multi-Cloud Infrastructure Platform',
    shortDescription: 'Terraform-based infrastructure platform managing resources across AWS, Azure, and GCP',
    fullDescription: 'A unified infrastructure management platform using Terraform to provision and manage resources across multiple cloud providers with consistent policies.',
    thumbnail: 'https://images.unsplash.com/photo-1683669446069-ab17a5453296?w=800',
    images: [
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200',
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
      'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=1200'
    ],
    primaryCategory: 'devops',
    subCategory: 'Terraform',
    techStack: ['Terraform', 'AWS', 'Azure', 'GCP', 'Python', 'GitHub Actions', 'Vault'],
    challenge: 'Managing infrastructure across multiple cloud providers was complex, error-prone, and led to configuration drift and security vulnerabilities.',
    solution: 'Built a centralized Terraform platform with modules for common patterns, automated compliance checks, and cost optimization recommendations.',
    features: [
      'Multi-cloud resource provisioning',
      'Automated compliance scanning',
      'Cost optimization recommendations',
      'Drift detection and remediation',
      'Secret management with Vault',
      'Self-service portal for teams'
    ],
    results: [
      { metric: 'Infrastructure as Code', value: '100%' },
      { metric: 'Deployment Time', value: '-75%' },
      { metric: 'Cloud Costs', value: '-35%' },
      { metric: 'Security Compliance', value: '99.8%' }
    ],
    githubUrl: 'https://github.com/example'
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

export const getProjectsByCategory = (category: string, subCategory?: string): Project[] => {
  if (category === 'all') return projects;
  
  let filtered = projects.filter(project => project.primaryCategory === category);
  
  if (subCategory && subCategory !== 'all') {
    filtered = filtered.filter(project => project.subCategory === subCategory);
  }
  
  return filtered;
};

export const primaryCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Applications' },
  { id: 'mobile', label: 'Mobile Applications' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'bots', label: 'Bots' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'devops', label: 'DevOps & Infrastructure' },
  { id: 'personal', label: 'Personal/Experimental' }
];

export const subCategories: Record<string, { id: string; label: string }[]> = {
  web: [
    { id: 'all', label: 'All' },
    { id: 'Corporate Website', label: 'Corporate Website' },
    { id: 'E-commerce', label: 'E-commerce' },
    { id: 'SaaS', label: 'SaaS' },
    { id: 'Dashboard', label: 'Dashboard' },
    { id: 'Landing Page', label: 'Landing Page' },
    { id: 'PWA', label: 'PWA' }
  ],
  mobile: [
    { id: 'all', label: 'All' },
    { id: 'iOS Native', label: 'iOS Native' },
    { id: 'Android Native', label: 'Android Native' },
    { id: 'React Native', label: 'React Native' },
    { id: 'Flutter', label: 'Flutter' }
  ],
  backend: [
    { id: 'all', label: 'All' },
    { id: 'REST API', label: 'REST API' },
    { id: 'GraphQL', label: 'GraphQL' },
    { id: 'Microservices', label: 'Microservices' },
    { id: 'Auth Systems', label: 'Auth Systems' },
    { id: 'Real-time', label: 'Real-time' },
    { id: 'Serverless', label: 'Serverless' }
  ],
  bots: [
    { id: 'all', label: 'All' },
    { id: 'Utility', label: 'Utility' },
    { id: 'Moderation', label: 'Moderation' },
    { id: 'Entertainment', label: 'Entertainment' },
    { id: 'Notification', label: 'Notification' }
  ],
  ai: [
    { id: 'all', label: 'All' },
    { id: 'Computer Vision', label: 'Computer Vision' },
    { id: 'NLP', label: 'NLP' },
    { id: 'Recommendation', label: 'Recommendation' },
    { id: 'Predictive', label: 'Predictive' },
    { id: 'Generative AI', label: 'Generative AI' },
    { id: 'LLM', label: 'LLM' }
  ],
  devops: [
    { id: 'all', label: 'All' },
    { id: 'CI/CD', label: 'CI/CD' },
    { id: 'Cloud Setup', label: 'Cloud Setup' },
    { id: 'Docker/K8s', label: 'Docker/K8s' },
    { id: 'Monitoring', label: 'Monitoring' },
    { id: 'Terraform', label: 'Terraform' }
  ],
  personal: [
    { id: 'all', label: 'All' },
    { id: 'Side Project', label: 'Side Project' },
    { id: 'Hackathon', label: 'Hackathon' },
    { id: 'PoC', label: 'PoC' },
    { id: 'Fun Tool', label: 'Fun Tool' },
    { id: 'Experiment', label: 'Experiment' }
  ]
};
