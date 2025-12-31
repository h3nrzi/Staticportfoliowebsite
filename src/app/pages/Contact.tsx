import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Mail, Linkedin, Github, Twitter, Send } from 'lucide-react';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'john@example.com',
      href: 'mailto:john@example.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/johndoe',
      href: 'https://linkedin.com',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/johndoe',
      href: 'https://github.com',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      value: '@johndoe',
      href: 'https://twitter.com',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I'm always open to new opportunities, collaborations, or just a friendly chat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a href={method.href} target="_blank" rel="noopener noreferrer">
                    <Card className="hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                            <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold">{method.label}</p>
                            <p className="text-sm text-muted-foreground">{method.value}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="pt-12 pb-12">
                <Send className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">Ready to Start a Project?</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Let's discuss how I can help bring your ideas to life with clean, scalable code
                </p>
                <a href="mailto:john@example.com">
                  <Button size="lg" className="group">
                    Send Me an Email
                    <Mail className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
