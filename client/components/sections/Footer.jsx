import React from 'react';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-heading font-bold text-brand-orange mb-2">RealEventz</h2>
            <p className="text-gray-500 text-sm max-w-xs">The World's First Instant Event Planning App.</p>
          </div>
          
          <div className="flex gap-6">
            <a href="https://www.instagram.com/real.eventz?igsh=MTgybG0wYzR3emZuMA==" className="text-gray-400 hover:text-brand-orange transition-colors"><Instagram size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors"><Twitter size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors"><Linkedin size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors"><Mail size={24} /></a>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} RealEventz. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-black">Privacy Policy</a>
            <a href="#" className="hover:text-brand-black">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
