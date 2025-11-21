import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, ChevronRight, Shield, Code, Server, Lock } from 'lucide-react';

const RemediationGuides = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      id: 1,
      title: 'Enabling HSTS on Nginx',
      category: 'Web Server',
      difficulty: 'Easy',
      time: '5 mins',
      icon: Server,
      description: 'Learn how to configure HTTP Strict Transport Security to prevent protocol downgrade attacks.',
    },
    {
      id: 2,
      title: 'Preventing SQL Injection in Node.js',
      category: 'Application',
      difficulty: 'Medium',
      time: '15 mins',
      icon: Code,
      description: 'Best practices for using parameterized queries and ORMs to secure database interactions.',
    },
    {
      id: 3,
      title: 'Configuring AWS Security Groups',
      category: 'Cloud',
      difficulty: 'Medium',
      time: '10 mins',
      icon: Shield,
      description: 'How to properly restrict network access to your EC2 instances and RDS databases.',
    },
    {
      id: 4,
      title: 'Implementing Content Security Policy (CSP)',
      category: 'Web Security',
      difficulty: 'Hard',
      time: '30 mins',
      icon: Lock,
      description: 'A comprehensive guide to crafting and deploying a robust CSP header.',
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Remediation Guides</h1>
          <p className="text-gray-600 mt-2">Step-by-step instructions to fix security vulnerabilities.</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-warm-grey p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search guides (e.g., 'SSL', 'XSS', 'Nginx')..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-200 transition-all outline-none text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3 mt-4">
          {['All', 'Web Server', 'Application', 'Cloud', 'Network'].map((cat) => (
            <button key={cat} className="px-4 py-2 rounded-full bg-gray-50 text-gray-600 text-sm font-medium hover:bg-gray-100 border border-gray-200 transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, index) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-warm-grey p-6 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-sage-50 text-sage-600 group-hover:bg-sage-100 transition-colors">
                <guide.icon className="w-6 h-6" />
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${guide.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  guide.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>
                {guide.difficulty}
              </span>
            </div>

            <h3 className="text-lg font-bold text-charcoal mb-2 group-hover:text-sage-600 transition-colors">
              {guide.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {guide.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                {guide.time} read
              </div>
              <div className="flex items-center text-sage-600 font-medium group-hover:translate-x-1 transition-transform">
                Read Guide <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RemediationGuides;
