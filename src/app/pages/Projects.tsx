import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { projects, primaryCategories, subCategories, getProjectsByCategory } from '../../data/projects';

export default function ProjectsPage() {
  const [selectedPrimary, setSelectedPrimary] = useState('all');
  const [selectedSub, setSelectedSub] = useState('all');

  const filteredProjects = useMemo(() => {
    return getProjectsByCategory(selectedPrimary, selectedSub);
  }, [selectedPrimary, selectedSub]);

  const currentSubCategories = selectedPrimary !== 'all' ? subCategories[selectedPrimary] || [] : [];

  const handlePrimaryChange = (category: string) => {
    setSelectedPrimary(category);
    setSelectedSub('all');
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            My <span className="text-primary">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of my work spanning web development, mobile apps, AI, and more
          </p>
        </motion.div>

        {/* Primary Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {primaryCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedPrimary === category.id ? 'default' : 'outline'}
                onClick={() => handlePrimaryChange(category.id)}
                className={selectedPrimary === category.id ? 'bg-primary text-primary-foreground' : ''}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Sub Category Filter */}
        {currentSubCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {currentSubCategories.map((subCat) => (
                <Button
                  key={subCat.id}
                  variant={selectedSub === subCat.id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedSub(subCat.id)}
                  className={selectedSub === subCat.id ? 'bg-accent' : ''}
                >
                  {subCat.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-4 right-4 bg-primary">
                    {project.subCategory}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.shortDescription}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.techStack.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Link to={`/projects/${project.slug}`}>
                    <Button variant="default" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon">
                          <Github className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-muted-foreground">
              No projects found in this category
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
