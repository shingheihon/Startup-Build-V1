import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, Cloud, Bot, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      icon: Search,
      title: 'Passive External Scanning',
      description: 'DNS, SSL, Shodan checks with zero installation'
    },
    {
      icon: Cloud,
      title: 'Cloud Auto-Discovery',
      description: 'Connect AWS, Azure, or Google Cloud to automatically find and scan your assets'
    },
    {
      icon: CheckCircle,
      title: 'Guided Security Assessment',
      description: 'Simple questionnaire that adapts to your answers'
    },
    {
      icon: Bot,
      title: 'AI-Powered Recommendations',
      description: 'Plain-language advice on what to fix first'
    },
    {
      icon: Zap,
      title: 'Cloud Auto-Fill',
      description: 'Connect Microsoft 365 or Google Workspace to pre-fill answers'
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      description: 'Map findings to Cyber Essentials, GDPR, ISO 27001'
    }
  ];

  const cloudIcons = [
    { name: 'AWS', color: 'text-orange-500' },
    { name: 'Azure', color: 'text-blue-500' },
    { name: 'GCP', color: 'text-green-500' },
    { name: 'M365', color: 'text-blue-600' },
    { name: 'Google', color: 'text-red-500' }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white border-b border-warm-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-sage-500" />
              <span className="text-xl font-bold text-charcoal">Startup</span>
            </div>
            <Link
              to="/app"
              className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Section - 60% */}
        <div className="w-full lg:w-3/5 px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight"
            >
              Cybersecurity Clarity for SMEs —{' '}
              <span className="text-sage-500">No Agents, No Complexity</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Understand your cyber posture in 5 minutes. External scans, internal checks, 
              and AI-driven advice — all in one dashboard.
            </motion.p>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 mb-8"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <feature.icon className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-charcoal">{feature.title}</span>
                    <span className="text-gray-600"> – {feature.description}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <Link
                to="/app"
                className="inline-flex items-center px-8 py-4 bg-sage-500 text-white text-lg font-semibold rounded-lg hover:bg-sage-600 transition-colors group"
              >
                See the Live Dashboard
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-2 text-sm text-gray-500"
            >
              <p>✓ Used by 500+ UK SMEs</p>
              <p>✓ No credit card required</p>
              <p>✓ We don't install anything on your systems</p>
              <p>✓ Connect your cloud account for instant verification</p>
            </motion.div>
          </div>
        </div>

        {/* Right Section - 40% */}
        <div className="hidden lg:flex w-2/5 items-center justify-center bg-gradient-to-br from-sage-500/10 to-sage-500/20 p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            {/* Animated Icon Cluster */}
            <div className="grid grid-cols-2 gap-8 items-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg"
              >
                <Shield className="w-10 h-10 text-sage-500" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg"
              >
                <Search className="w-10 h-10 text-blue-500" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg"
              >
                <Bot className="w-10 h-10 text-purple-500" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg"
              >
                <Zap className="w-10 h-10 text-yellow-500" />
              </motion.div>
            </div>

            {/* Cloud Connectors */}
            <div className="mt-8 flex justify-center space-x-4">
              {cloudIcons.map((cloud, index) => (
                <motion.div
                  key={cloud.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className={`px-3 py-1 bg-white rounded-full text-sm font-medium ${cloud.color} shadow-sm`}
                >
                  {cloud.name}
                </motion.div>
              ))}
            </div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-8 bg-white rounded-lg shadow-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-600">Security Score</div>
                <div className="text-2xl font-bold text-sage-500">78/100</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ delay: 2, duration: 1 }}
                  className="bg-sage-500 h-2 rounded-full"
                />
              </div>
              <div className="mt-3 text-xs text-gray-500">
                ↗ Improving trend
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;