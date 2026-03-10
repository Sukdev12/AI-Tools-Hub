import React, { useState, useEffect } from 'react';
import { toolsData, categories } from '../data/tools';
import ToolCard from '../components/ToolCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { supabase } from '../config/supabase';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toolStats, setToolStats] = useState({});

  useEffect(() => {
    fetchToolStats();
  }, []);

  const fetchToolStats = async () => {
    try {
      const { data, error } = await supabase
        .from('tool_usage')
        .select('tool_name')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (!error && data) {
        const stats = data.reduce((acc, item) => {
          acc[item.tool_name] = (acc[item.tool_name] || 0) + 1;
          return acc;
        }, {});
        setToolStats(stats);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const filteredTools = toolsData.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              AI Tools Hub
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              20+ Free AI-Powered Content Generation Tools
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Generate summaries, blog titles, social media content, and more with our collection of AI tools
            </p>
          </div>
        </div>
      </section>

      <section className="container-custom py-12">
        <div className="mb-8 space-y-6">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400">No tools found matching your criteria</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-600 dark:text-gray-400">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </div>
            <div id="tools" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 py-12 mt-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">20+</div>
              <div className="text-gray-600 dark:text-gray-400">AI Tools</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">
                {Object.values(toolStats).reduce((a, b) => a + b, 0)}+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Tools Used This Week</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">Free</div>
              <div className="text-gray-600 dark:text-gray-400">Always Free</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
