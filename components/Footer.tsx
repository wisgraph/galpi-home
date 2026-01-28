import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 text-sm">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 dark:text-slate-500">
            &copy; {new Date().getFullYear()} 갈피. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">이용약관</Link>
            <Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">개인정보처리방침</Link>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <Github size={18} />
            </a>
            <a href="mailto:support@galpi.app" className="p-2 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>
        <div className="text-center mt-8 text-slate-400 dark:text-slate-600 text-xs">
          Built with Rust in Seoul 🇰🇷
        </div>
      </div>
    </footer>
  );
};

export default Footer;