export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  coverImage: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'building-scalable-microservices-nodejs',
    title: 'Building Scalable Microservices with Node.js',
    excerpt: 'Learn how to architect and deploy microservices that can handle millions of requests...',
    content: `
# Building Scalable Microservices with Node.js

Microservices architecture has become the de facto standard for building large-scale applications. In this comprehensive guide, we'll explore how to build scalable microservices using Node.js.

## Why Microservices?

Microservices offer several advantages:
- **Scalability**: Scale individual services independently
- **Flexibility**: Use different technologies for different services
- **Resilience**: Isolated failures don't bring down the entire system
- **Development Speed**: Teams can work on services independently

## Architecture Principles

### 1. Single Responsibility
Each microservice should do one thing well. This makes services easier to understand, test, and maintain.

### 2. API Gateway
Use an API gateway to route requests to the appropriate microservices. This provides a single entry point and handles cross-cutting concerns.

### 3. Service Discovery
Implement service discovery so services can find and communicate with each other dynamically.

### 4. Database per Service
Each microservice should have its own database to maintain loose coupling.

## Implementation with Node.js

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(3000, () => {
  console.log('Service running on port 3000');
});
\`\`\`

## Best Practices

1. Use message queues for asynchronous communication
2. Implement circuit breakers for fault tolerance
3. Use containerization with Docker
4. Implement proper logging and monitoring
5. Use API versioning

## Conclusion

Microservices architecture requires careful planning and implementation, but the benefits in scalability and maintainability make it worthwhile for large applications.
    `,
    author: 'John Doe',
    date: '2024-12-15',
    tags: ['Node.js', 'Architecture', 'Microservices'],
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
    readTime: '8 min read'
  },
  {
    id: 'blog-2',
    slug: 'machine-learning-production-best-practices',
    title: 'Machine Learning in Production: Best Practices',
    excerpt: 'A comprehensive guide to deploying ML models in production environments...',
    content: `
# Machine Learning in Production: Best Practices

Deploying machine learning models to production is challenging. This guide covers essential best practices for MLOps.

## Key Challenges

- **Model Versioning**: Track different versions of models
- **Data Drift**: Monitor when input data changes over time
- **Scalability**: Handle varying loads efficiently
- **Monitoring**: Track model performance in real-time

## Best Practices

### 1. Model Versioning
Use tools like MLflow or DVC to version your models alongside your code.

### 2. Containerization
Package models in Docker containers for consistent deployment.

### 3. A/B Testing
Test new models alongside existing ones before full rollout.

### 4. Monitoring
Implement comprehensive monitoring for:
- Prediction latency
- Model accuracy
- Data quality
- Resource usage

### 5. Automated Retraining
Set up pipelines to automatically retrain models when performance degrades.

## Conclusion

Successful ML deployment requires treating models as first-class software artifacts with proper CI/CD, monitoring, and governance.
    `,
    author: 'John Doe',
    date: '2024-12-01',
    tags: ['AI', 'MLOps', 'Python'],
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
    readTime: '10 min read'
  },
  {
    id: 'blog-3',
    slug: 'react-performance-optimization-techniques',
    title: 'React Performance Optimization Techniques',
    excerpt: 'Advanced techniques to make your React applications blazingly fast...',
    content: `
# React Performance Optimization Techniques

Performance is crucial for user experience. Let's explore advanced React optimization techniques.

## Common Performance Issues

1. Unnecessary re-renders
2. Large bundle sizes
3. Inefficient list rendering
4. Memory leaks

## Optimization Techniques

### 1. Use React.memo
Prevent unnecessary re-renders of functional components.

\`\`\`jsx
const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
\`\`\`

### 2. useCallback and useMemo
Memoize functions and computed values.

\`\`\`jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const memoizedValue = useMemo(() => 
  computeExpensiveValue(a, b), [a, b]
);
\`\`\`

### 3. Code Splitting
Split your bundle using React.lazy and Suspense.

\`\`\`jsx
const LazyComponent = React.lazy(() => 
  import('./LazyComponent')
);
\`\`\`

### 4. Virtual Scrolling
Use libraries like react-window for large lists.

### 5. Debounce and Throttle
Limit expensive operations like API calls or calculations.

## Conclusion

Performance optimization is an ongoing process. Measure first, then optimize the bottlenecks.
    `,
    author: 'John Doe',
    date: '2024-11-20',
    tags: ['React', 'Performance', 'JavaScript'],
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200',
    readTime: '7 min read'
  },
  {
    id: 'blog-4',
    slug: 'kubernetes-beginners-practical-guide',
    title: 'Kubernetes for Beginners: A Practical Guide',
    excerpt: 'Everything you need to know to get started with Kubernetes container orchestration...',
    content: `
# Kubernetes for Beginners: A Practical Guide

Kubernetes is the industry standard for container orchestration. This guide will get you started.

## What is Kubernetes?

Kubernetes (K8s) is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.

## Core Concepts

### Pods
The smallest deployable unit in Kubernetes. Usually contains one container.

### Services
Exposes pods to network traffic.

### Deployments
Manages the deployment and scaling of pods.

### ConfigMaps and Secrets
Store configuration and sensitive data.

## Getting Started

### 1. Install kubectl
\`\`\`bash
# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
\`\`\`

### 2. Create a Deployment
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 80
\`\`\`

### 3. Expose with a Service
\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
\`\`\`

## Best Practices

1. Use namespaces for organization
2. Implement resource limits
3. Use liveness and readiness probes
4. Implement proper logging
5. Use Helm for package management

## Conclusion

Kubernetes has a steep learning curve, but mastering it is essential for modern DevOps practices.
    `,
    author: 'John Doe',
    date: '2024-11-05',
    tags: ['Kubernetes', 'DevOps', 'Docker'],
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200',
    readTime: '12 min read'
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};
