import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🤖</span>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">
                AI Tools Hub
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your one-stop destination for 20+ powerful AI content generation tools.
              Create summaries, blog titles, social media content, and more.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#tools" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  All Tools
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Categories</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">Content</li>
              <li className="text-gray-600 dark:text-gray-400">Social Media</li>
              <li className="text-gray-600 dark:text-gray-400">Marketing</li>
              <li className="text-gray-600 dark:text-gray-400">Business</li>
              <li className="text-gray-600 dark:text-gray-400">Creative</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} AI Tools Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
