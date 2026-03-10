import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">About AI Tools Hub</h1>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              AI Tools Hub is your one-stop destination for powerful AI-powered content generation tools.
              We provide 20+ free tools to help content creators, marketers, writers, and businesses
              generate high-quality content quickly and efficiently.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Content Creation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Generate summaries, blog titles, and creative content
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Social Media</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Create engaging posts, captions, and hashtags
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Marketing</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Write ad copy, product descriptions, and keywords
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Business</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Generate emails, resumes, and startup ideas
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Why Choose Us?</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>100% Free to use - No hidden costs or subscriptions</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>20+ specialized AI tools for different content needs</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Fast and easy to use interface</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Mobile-friendly responsive design</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Dark mode support for comfortable viewing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
