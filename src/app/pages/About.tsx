import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';

export default function AboutPage() {
  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TensorFlow'];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Avatar className="w-32 h-32 mx-auto mb-6">
              <AvatarFallback className="text-4xl bg-primary text-primary-foreground">JD</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              About <span className="text-primary">Me</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Software Engineer & Full-Stack Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">My Journey</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I'm a passionate software engineer with over 8 years of experience building scalable web applications,
                    mobile apps, and intelligent systems. My journey in tech started with a curiosity about how things work
                    and evolved into a career dedicated to solving complex problems through code.
                  </p>
                  <p>
                    Throughout my career, I've had the privilege of working with startups and established companies,
                    leading teams, and delivering products that serve millions of users. I specialize in full-stack
                    development, cloud architecture, and machine learning applications.
                  </p>
                  <p>
                    When I'm not coding, you'll find me contributing to open-source projects, writing technical articles,
                    or mentoring aspiring developers. I believe in continuous learning and staying updated with the latest
                    technologies to deliver the best solutions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Tech Stack Highlights</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-base px-4 py-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
