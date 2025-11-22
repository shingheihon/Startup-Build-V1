import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, Activity, ArrowRight, CheckCircle, Clock, ChevronRight, CheckSquare, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import headerBg from '../assets/header-bg.png';

const Dashboard = () => {
  const [securityScore, setSecurityScore] = useState(0);
  const targetScore = 72;

  // Goal Score - User's target (will be configurable in settings later)
  const [goalScore, setGoalScore] = useState(90);

  // Action Plan State
  const [actionItems, setActionItems] = useState([
    {
      id: 1,
      issue: 'SQL Injection in Customer Portal',
      severity: 'Critical',
      actionPlan: 'Implement parameterized queries and input validation immediately',
      priority: 'High'
    },
    {
      id: 2,
      issue: 'Cross-Site Scripting (XSS) in Admin Dashboard',
      severity: 'High',
      actionPlan: 'Sanitize all user inputs and implement Content Security Policy',
      priority: 'High'
    },
    {
      id: 3,
      issue: 'Broken Authentication in API Gateway',
      severity: 'High',
      actionPlan: 'Update authentication mechanism and enforce MFA',
      priority: 'High'
    },
    {
      id: 4,
      issue: 'Outdated SSL/TLS Certificate',
      severity: 'High',
      actionPlan: 'Renew SSL certificate and update to TLS 1.3',
      priority: 'Medium'
    },
    {
      id: 5,
      issue: 'Weak Password Policy',
      severity: 'Medium',
      actionPlan: 'Enforce stronger password requirements and rotation policy',
      priority: 'Medium'
    },
  ]);

  // Animate security score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setSecurityScore(targetScore);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleActionComplete = (id) => {
    // Remove the item after a small delay for animation
    setTimeout(() => {
      setActionItems(prev => prev.filter(item => item.id !== id));
    }, 300);
  };

  // Determine score color
  const getScoreColor = (score) => {
    if (score < 60) return '#ef4444'; // Red
    if (score < 80) return '#f59e0b'; // Amber
    return '#22c55e'; // Green
  };

  const scoreColor = getScoreColor(targetScore);

  const recentActivity = [
    { id: 1, title: 'Full System Scan', status: 'Completed', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
    { id: 2, title: 'New Vulnerability Detected', status: 'Critical', time: '5 hours ago', icon: AlertTriangle, color: 'text-red-500' },
    { id: 3, title: 'SSL Certificate Renewal', status: 'Pending', time: '1 day ago', icon: Clock, color: 'text-yellow-500' },
    { id: 4, title: 'User Policy Updated', status: 'Info', time: '2 days ago', icon: Activity, color: 'text-blue-500' },
    { id: 5, title: 'Firewall Rules Changed', status: 'Warning', time: '3 days ago', icon: AlertTriangle, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Good Morning Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-900 via-charcoal to-sage-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden min-h-[180px] flex flex-col justify-center"
      >
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url(${headerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-1"></div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-3 tracking-tight text-white drop-shadow-md">
            {getGreeting()}, Shing Hei! <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-gray-200 text-lg font-medium drop-shadow-sm">
            Here's your security information for today.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats, Risk Score & Action Plan */}
        <div className="lg:col-span-2 space-y-8">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Security Score Gauge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl border border-warm-grey shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center relative min-h-[320px]"
            >
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-4 text-center w-full">Security Score</h3>

              {/* Semi-Circle Gauge */}
              <div className="relative w-56 h-28 mb-4">
                {/* Calculate goal position once for reuse */}
                {(() => {
                  const angle = -180 + (goalScore * 1.8); // Map 0-100 to -180 to 0 degrees
                  const radians = (angle * Math.PI) / 180;
                  const arcX = 100 + 80 * Math.cos(radians);
                  const arcY = 100 + 80 * Math.sin(radians);
                  const lineLength = 30;
                  const lineEndX = 100 + (80 + lineLength) * Math.cos(radians);
                  const lineEndY = 100 + (80 + lineLength) * Math.sin(radians);

                  // Convert SVG coordinates to div positioning
                  // SVG viewBox is 200x100, container is w-56 (224px) x h-28 (112px)
                  const scaleX = 224 / 200;
                  const scaleY = 112 / 100;
                  const boxLeft = lineEndX * scaleX;
                  const boxTop = lineEndY * scaleY;

                  return (
                    <>
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100">
                        {/* Background Arc */}
                        <path
                          d="M 20 100 A 80 80 0 0 1 180 100"
                          fill="none"
                          stroke="#f3f4f6"
                          strokeWidth="16"
                          strokeLinecap="round"
                        />
                        {/* Progress Arc */}
                        <motion.path
                          d="M 20 100 A 80 80 0 0 1 180 100"
                          fill="none"
                          stroke={scoreColor}
                          strokeWidth="16"
                          strokeLinecap="round"
                          strokeDasharray="251.2"
                          strokeDashoffset="251.2"
                          initial={{ strokeDashoffset: 251.2 }}
                          animate={{ strokeDashoffset: 251.2 - (251.2 * securityScore) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />

                        {/* Goal Marker */}
                        <g>
                          {/* Marker Line */}
                          <line
                            x1={arcX}
                            y1={arcY}
                            x2={lineEndX}
                            y2={lineEndY}
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeDasharray="4,2"
                          />
                          {/* Marker Dot */}
                          <circle
                            cx={arcX}
                            cy={arcY}
                            r="5"
                            fill="#10b981"
                            stroke="white"
                            strokeWidth="2"
                          />
                        </g>
                      </svg>

                      {/* Goal Box - Positioned at line end, extending outward */}
                      <div
                        className="absolute flex items-center"
                        style={{
                          left: `${boxLeft}px`,
                          top: `${boxTop}px`,
                          transform: goalScore >= 50 ? 'translate(0, -50%)' : 'translate(-100%, -50%)'
                        }}
                      >
                        <div className="flex items-center">
                          <div className="bg-green-500 text-white text-sm font-bold px-3 py-1.5 rounded shadow-md mr-2">
                            {goalScore}
                          </div>
                          <div className="text-xs font-medium text-gray-600 whitespace-nowrap">
                            My Goal
                          </div>
                        </div>
                      </div>

                      {/* Score Text */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center translate-y-2">
                        <span className="text-5xl font-bold text-charcoal block leading-none tracking-tight">{targetScore}</span>
                        <span className="text-sm text-gray-400 font-medium">/100</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="flex items-center space-x-2 mt-4 bg-green-50 px-3 py-1 rounded-full">
                <span className="text-green-700 text-xs font-bold">+5%</span>
                <span className="text-xs text-green-800 font-medium">since yesterday</span>
              </div>
            </motion.div>

            {/* Issues Grid (Redesigned) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl border border-warm-grey shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-[320px]"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-charcoal text-lg font-bold">Issues</h3>
                <Link to="/app/issues" className="text-sage-600 text-sm font-medium hover:text-sage-700 flex items-center">
                  See all <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold text-charcoal">12</span>
              </div>

              <div className="grid grid-cols-2 gap-4 flex-1">
                {/* Critical */}
                <div className="bg-red-50 rounded-lg p-4 flex flex-col justify-between">
                  <span className="text-sm font-bold text-charcoal">Critical</span>
                  <span className="text-2xl font-bold text-red-600">1</span>
                </div>
                {/* High */}
                <div className="bg-orange-50 rounded-lg p-4 flex flex-col justify-between">
                  <span className="text-sm font-bold text-charcoal">High</span>
                  <span className="text-2xl font-bold text-orange-500">3</span>
                </div>
                {/* Medium */}
                <div className="bg-yellow-50 rounded-lg p-4 flex flex-col justify-between">
                  <span className="text-sm font-bold text-charcoal">Medium</span>
                  <span className="text-2xl font-bold text-yellow-500">1</span>
                </div>
                {/* Low */}
                <div className="bg-sky-50 rounded-lg p-4 flex flex-col justify-between">
                  <span className="text-sm font-bold text-charcoal">Low</span>
                  <span className="text-2xl font-bold text-sky-600">7</span>
                </div>
              </div>
            </motion.div>
          </div>



          {/* Action Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-warm-grey shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-warm-grey bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-xl font-bold text-charcoal flex items-center">
                <CheckSquare className="w-5 h-5 mr-2 text-sage-600" />
                Action Plan
              </h2>
              <p className="text-sm text-gray-600 mt-1">Tasks to improve your security posture</p>
            </div>

            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {actionItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => handleActionComplete(item.id)}
                        className="mt-1 text-gray-400 hover:text-sage-600 transition-colors"
                      >
                        <Square className="w-5 h-5" />
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-bold text-gray-900">{item.issue}</h3>
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{item.actionPlan}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {actionItems.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-3" />
                  <p className="font-medium">All actions completed! Great job.</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-warm-grey text-center">
              <Link
                to="/app/action-plan"
                className="text-sm font-medium text-charcoal hover:text-sage-600 transition-colors inline-flex items-center"
              >
                View Full Action Plan
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-warm-grey shadow-sm h-full flex flex-col"
          >
            <div className="p-6 border-b border-warm-grey">
              <h2 className="text-xl font-bold text-charcoal">Recent Activity</h2>
            </div>

            <div className="p-4 space-y-4 flex-1 overflow-y-auto max-h-[600px]">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-full bg-gray-50 flex-shrink-0 ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{activity.title}</h4>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${activity.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        activity.status === 'Critical' ? 'bg-red-100 text-red-700' :
                          activity.status === 'Warning' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                        }`}>
                        {activity.status}
                      </span>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-warm-grey bg-gray-50 rounded-b-xl mt-auto">
              <button className="w-full py-2 text-sm font-medium text-charcoal hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-gray-200">
                View All Activity
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;