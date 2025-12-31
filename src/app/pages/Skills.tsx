import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Code, Database, Cloud, Cpu, Globe, Layers } from 'lucide-react';

export default function SkillsPage() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Globe,
      skills: [
        { name: 'React & Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Vue.js', level: 75 },
      ],
    },
    {
      title: 'Backend Development',
      icon: Database,
      skills: [
        { name: 'Node.js & Express', level: 90 },
        { name: 'Python & FastAPI', level: 85 },
        { name: 'PostgreSQL & MongoDB', level: 80 },
        { name: 'GraphQL & REST APIs', level: 85 },
      ],
    },
    {
      title: 'DevOps & Cloud',
      icon: Cloud,
      skills: [
        { name: 'AWS & Azure', level: 85 },
        { name: 'Docker & Kubernetes', level: 80 },
        { name: 'CI/CD Pipelines', level: 85 },
        { name: 'Terraform', level: 75 },
      ],
    },
    {
      title: 'AI & Machine Learning',
      icon: Cpu,
      skills: [
        { name: 'TensorFlow & PyTorch', level: 80 },
        { name: 'Computer Vision', level: 75 },
        { name: 'NLP', level: 70 },
        { name: 'MLOps', level: 75 },
      ],
    },
    {
      title: 'Mobile Development',
      icon: Code,
      skills: [
        { name: 'React Native', level: 85 },
        { name: 'iOS (Swift)', level: 75 },
        { name: 'Android (Kotlin)', level: 70 },
        { name: 'Flutter', level: 65 },
      ],
    },
    {
      title: 'Architecture & Design',
      icon: Layers,
      skills: [
        { name: 'Microservices', level: 85 },
        { name: 'System Design', level: 90 },
        { name: 'UI/UX Principles', level: 75 },
        { name: 'API Design', level: 85 },
      ],
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
            My <span className="text-primary">Skills</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
