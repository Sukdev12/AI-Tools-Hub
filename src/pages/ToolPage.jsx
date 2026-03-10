import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toolsData } from '../data/tools';
import { supabase } from '../config/supabase';

const ToolPage = () => {
  const { toolId } = useParams();
  const tool = toolsData.find((t) => t.id === toolId);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!tool) return;
    document.title = `${tool.name} - AI Tools Hub`;
  }, [tool]);

  const trackUsage = async () => {
    try {
      await supabase.from('tool_usage').insert({
        tool_name: tool.name,
        user_session: 'anonymous',
        input_length: input.length
      });
    } catch (err) {
      console.error('Error tracking usage:', err);
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) {
      alert('Please enter some text');
      return;
    }

    setLoading(true);
    setOutput('');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          toolId: tool.id,
          toolName: tool.name,
          input: input.trim()
        })
      });

      const data = await response.json();

      if (data.output) {
        setOutput(data.output);
        await trackUsage();
      } else {
        setOutput('Error generating content. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setOutput('Error generating content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tool not found</h1>
          <Link to="/" className="text-primary-500 hover:text-primary-600">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <Link
          to="/"
          className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all tools
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className={`${tool.color} w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
              {tool.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{tool.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                {tool.category}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Input
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tool.placeholder}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>

            {output && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Output
                  </label>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm font-medium"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{output}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm">
            <strong>Note:</strong> This is a demo application. The AI generation functionality requires backend API integration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
