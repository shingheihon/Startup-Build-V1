import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Bot, CheckCircle, ArrowRight, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import EverythingYouNeed from '../components/EverythingYouNeed';
import MagicBento from '../components/MagicBento';
import Silk from '../components/Silk';
import UrgencySection from '../components/UrgencySection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import AnimatedStats from '../components/AnimatedStats';
import IntegrationShowcase from '../components/IntegrationShowcase';

const LandingPage = () => {
  const { scrollYProgress } = useScroll();

  const trustedBy = [
    'Acme Corp',
    'Quantum',
    'Echo Valley',
    'Celestial',
    'PULSE',
    'APEX'
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-white" />
              <span className="text-xl font-bold text-white">Startup</span>
            </div>
            <Link
              to="/app"
              className="px-6 py-2.5 bg-white text-charcoal rounded-full hover:bg-gray-100 transition-all shadow-sm hover:shadow-md font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Fixed Silk Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Silk
          speed={3}
          scale={1}
          color="#1e293b"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden z-10">
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Heading - Wider column and pulled up */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 lg:col-span-7 lg:-mt-12"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6 tracking-tight">
                <span className="block mb-2 whitespace-nowrap">Cybersecurity</span>
                <span className="text-white/90 block">Made Simple.</span>
              </h1>
            </motion.div>

            {/* Right: Description & CTA - Narrower column and pushed down */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 relative z-10 lg:col-span-5 lg:mt-52"
            >
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Understand your cyber posture in 5 minutes. External scans, internal checks, and AI-driven advice — all in one dashboard.
              </p>

              <Link
                to="/app"
                className="inline-flex items-center px-8 py-4 bg-white text-charcoal text-lg font-semibold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                Open Prototype
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/50 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Urgency Section */}
      <UrgencySection />

      {/* Everything You Need Section */}
      <EverythingYouNeed />

      {/* Intuitive Interface Section */}
      <section className="relative z-20 py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Intuitive interface
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Celebrate the joy of accomplishment with an app designed to track your progress,
              motivate your efforts, and celebrate your successes, one task at a time.
            </p>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              <div className="space-y-6">
                {/* Mock Dashboard Content */}
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Security Score</div>
                    <div className="text-4xl font-bold text-white">72/100</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-8 h-8 text-sage-400" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Critical Issues', value: '2', color: 'red' },
                    { label: 'Warnings', value: '5', color: 'yellow' },
                    { label: 'Passed', value: '12', color: 'green' }
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                      <div className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center"
            >
              <Bot className="w-12 h-12 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center"
            >
              <Zap className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Magic Bento Grid Section */}
      <section className="relative z-20 py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Powerful features at your fingertips
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to secure your infrastructure, all in one beautiful dashboard.
            </p>
          </motion.div>

          <MagicBento />
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="relative z-20 py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Trusted by industry leaders
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of companies protecting their digital assets with our platform.
            </p>
          </motion.div>

          <AnimatedStats />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-20 py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              What our customers say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it - hear from security leaders who trust us.
            </p>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative z-20 py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Seamless integrations
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with your favorite tools and platforms in just a few clicks.
            </p>
          </motion.div>

          <IntegrationShowcase />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-24 bg-transparent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8 text-sage-100">
              Join 500+ UK SMEs protecting their digital assets with our platform.
            </p>
            <Link
              to="/app"
              className="inline-flex items-center px-8 py-4 bg-white text-sage-600 text-lg font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              Try it for free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-transparent text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-sage-400" />
              <span className="text-lg font-bold">Startup</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Startup. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;