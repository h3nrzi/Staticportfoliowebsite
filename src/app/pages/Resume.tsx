import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Download, Briefcase, GraduationCap, Award } from 'lucide-react';

export default function ResumePage() {
  const experience = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      period: '2021 - Present',
      description: 'Leading development of cloud-native applications and mentoring junior developers.',
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      period: '2019 - 2021',
      description: 'Built scalable web applications using React, Node.js, and AWS infrastructure.',
    },
    {
      title: 'Software Developer',
      company: 'Digital Agency',
      period: '2017 - 2019',
      description: 'Developed custom web solutions for enterprise clients.',
    },
  ];

  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'University of Technology',
      year: '2017',
    },
    {
      degree: 'Bachelor of Science in Software Engineering',
      school: 'State University',
      year: '2015',
    },
  ];

  const certifications = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional',
    'Kubernetes Administrator (CKA)',
    'TensorFlow Developer Certificate',
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              My <span className="text-primary">Resume</span>
            </h1>
            <Button size="lg" className="group">
              <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Download PDF
            </Button>
          </motion.div>

          <div className="space-y-12">
            {/* Experience */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-primary" />
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-semibold">{job.company}</span> • {job.period}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{job.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>

            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-primary" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{edu.degree}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {edu.school} • {edu.year}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </motion.section>

            {/* Certifications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="h-8 w-8 text-primary" />
                Certifications
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
