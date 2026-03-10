import React from 'react';
import { Link } from 'react-router-dom';

const ToolCard = ({ tool }) => {
  return (
    <Link
      to={`/tool/${tool.id}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {tool.icon}
          </div>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
            {tool.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
          {tool.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {tool.description}
        </p>

        <div className="mt-4 flex items-center text-primary-500 dark:text-primary-400 text-sm font-medium">
          <span>Try it now</span>
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
