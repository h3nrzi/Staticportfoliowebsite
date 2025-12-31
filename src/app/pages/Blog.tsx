import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      title: 'Building Scalable Microservices with Node.js',
      excerpt: 'Learn how to architect and deploy microservices that can handle millions of requests...',
      date: '2024-12-15',
      tags: ['Node.js', 'Architecture', 'Microservices'],
    },
    {
      title: 'Machine Learning in Production: Best Practices',
      excerpt: 'A comprehensive guide to deploying ML models in production environments...',
      date: '2024-12-01',
      tags: ['AI', 'MLOps', 'Python'],
    },
    {
      title: 'React Performance Optimization Techniques',
      excerpt: 'Advanced techniques to make your React applications blazingly fast...',
      date: '2024-11-20',
      tags: ['React', 'Performance', 'JavaScript'],
    },
    {
      title: 'Kubernetes for Beginners: A Practical Guide',
      excerpt: 'Everything you need to know to get started with Kubernetes container orchestration...',
      date: '2024-11-05',
      tags: ['Kubernetes', 'DevOps', 'Docker'],
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Tech <span className="text-primary">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on software development
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
