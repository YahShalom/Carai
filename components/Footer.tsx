import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-navy-100 dark:border-white/5 bg-silver-100 dark:bg-navy-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-navy-600 dark:text-silver-500 text-sm">
          &copy; {new Date().getFullYear()} Carai Agency. Built with React, Tailwind & Gemini API.
        </p>
      </div>
    </footer>
  );
};

export default Footer;