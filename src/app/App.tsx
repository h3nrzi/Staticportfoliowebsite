import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { useTheme } from 'next-themes';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { Menu, Moon, Sun, Github, Linkedin, Twitter, Mail, Home as HomeIcon, User, Briefcase, Code, FileText, MessageSquare, BookOpen, Shield, LogIn, LogOut, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';

// Import auth
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';

// Import pages (we'll create these)
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ProjectsPage from './pages/Projects';
import ProjectDetailPage from './pages/ProjectDetail';
import SkillsPage from './pages/Skills';
import ResumePage from './pages/Resume';
import ContactPage from './pages/Contact';
import BlogPage from './pages/Blog';
import BlogDetailPage from './pages/BlogDetail';
import NotFoundPage from './pages/NotFound';
import ProfilePage from './pages/Profile';

// Import auth pages
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AdminPage from './pages/Admin';

// Navigation component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/about', label: 'About', icon: User },
    { path: '/projects', label: 'Projects', icon: Briefcase },
    { path: '/skills', label: 'Skills', icon: Code },
    { path: '/resume', label: 'Resume', icon: FileText },
    { path: '/contact', label: 'Contact', icon: MessageSquare },
    { path: '/blog', label: 'Blog', icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              &lt;JD /&gt;
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? 'default' : 'ghost'}
                  className={isActive(item.path) ? 'bg-primary text-primary-foreground' : ''}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {/* Admin link if user is admin */}
            {profile?.role === 'admin' && (
              <Link to="/admin">
                <Button
                  variant={isActive('/admin') ? 'default' : 'ghost'}
                  className={isActive('/admin') ? 'bg-primary text-primary-foreground' : ''}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Admin
                </Button>
              </Link>
            )}
            
            {/* Profile link if user is logged in */}
            {user && (
              <Link to="/profile">
                <Button
                  variant={isActive('/profile') ? 'default' : 'ghost'}
                  className={isActive('/profile') ? 'bg-primary text-primary-foreground' : ''}
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
            )}
            
            {/* Login/Logout button */}
            {user ? (
              <Button variant="outline" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outline">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive(item.path)
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-lg">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Footer component
function Footer() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:john@example.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} John Doe. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

// Layout wrapper
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

// Main App component
export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Toaster position="top-right" />
          <Routes>
            {/* Auth routes without Layout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected admin route with Layout */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <AdminPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Main routes with Layout */}
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
            <Route path="/projects/:slug" element={<Layout><ProjectDetailPage /></Layout>} />
            <Route path="/skills" element={<Layout><SkillsPage /></Layout>} />
            <Route path="/resume" element={<Layout><ResumePage /></Layout>} />
            <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
            <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
            <Route path="/blog/:slug" element={<Layout><BlogDetailPage /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
            <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}