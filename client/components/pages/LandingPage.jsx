import React, { useEffect, useState } from 'react';
import { Hero } from '../sections/Hero';
import { HowItWorks } from '../sections/HowItWorks';
import { Benefits } from '../sections/Benefits';
import { RegistrationForm } from '../sections/RegistrationForm';
import { Footer } from '../sections/Footer';
import { Button } from '../ui/Button';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [showStickyNav, setShowStickyNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById('registration-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-brand-black bg-brand-cream/20 min-h-screen selection:bg-brand-orange selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-orange origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${showStickyNav ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-2xl font-heading font-bold text-brand-orange cursor-pointer" onClick={() => window.scrollTo(0,0)}>RealEventz</div>
          <div className="flex items-center gap-4">
             {!showStickyNav && (
                <button 
                  onClick={() => navigate('/login')}
                  className="hidden md:block text-brand-black font-medium hover:text-brand-orange transition-colors"
                >
                  Log In
                </button>
             )}
            {(showStickyNav || window.innerWidth < 768) && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <Button onClick={scrollToForm} className="text-sm px-6 py-2">Get Early Access</Button>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <RegistrationForm />
      </main>

      <Footer />
    </div>
  );
};
