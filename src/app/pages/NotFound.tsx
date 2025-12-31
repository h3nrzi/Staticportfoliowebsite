import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-9xl font-bold text-primary mb-8"
          >
            404
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Oops! Looks like you've ventured into uncharted territory. 
            The page you're looking for doesn't exist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="group">
                <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Go Home
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="outline">
                <Search className="mr-2 h-5 w-5" />
                Browse Projects
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
