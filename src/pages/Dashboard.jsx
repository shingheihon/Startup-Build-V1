import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, Activity, ArrowRight, CheckCircle, Clock, ChevronRight, CheckSquare, Square, Zap, Lock, Server, Globe, Database, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import headerBg from '../assets/header-bg.png';

const Dashboard = () => {
  const [securityScore, setSecurityScore] = useState(0);
  const targetScore = 72;

  // Goal Score - User's target (will be configurable in settings later)
  const [goalScore, setGoalScore] = useState(85);

  // User Name
  const [userName, setUserName] = useState('Shing Hei');

  // Top 5 Vulnerabilities State
  const [vulnerabilities, setVulnerabilities] = useState([
    {
      id: 1,
      title: 'Heartbleed (CVE-2014-0160)',
      severity: 'Critical',
      description: 'OpenSSL vulnerability allowing memory leak of private keys.',
      asset: 'api.startup.com',
      link: '#'
    },
    {
      id: 2,
      title: 'SQL Injection',
      severity: 'Critical',
      description: 'Unsanitized input allows execution of arbitrary SQL commands.',
      asset: 'startup.com/login',
      link: '#'
    },
    {
      id: 3,
      title: 'Cross-Site Scripting (XSS)',
      severity: 'High',
      description: 'Reflected XSS vulnerability in contact form.',
      asset: 'startup.com/contact',
      link: '#'
    },
    {
      id: 4,
      title: 'Weak SSH Credentials',
      severity: 'High',
      description: 'Default root password detected on SSH service.',
      asset: '104.21.55.2',
      link: '#'
    },
    {
      id: 5,
      title: 'Outdated Apache Version',
      severity: 'Medium',
      description: 'Apache 2.4.49 is vulnerable to path traversal attacks.',
      asset: 'web-server-01',
      link: '#'
    }
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Good Morning Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-charcoal to-sage-900 p-8 shadow-lg border border-gray-800 flex flex-col justify-center">
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none">
            <img src={headerBg} alt="Cybersecurity Background" className="h-full w-full object-cover" />
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-md">
              {getGreeting()}, {userName}
            </h1>
            <p className="text-gray-300 text-lg max-w-xl drop-shadow-sm">
              Here is your daily security overview.
            </p>
          </div>
        </div>

        {/* Current Threat Level Section */}
        <div className="rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-6 shadow-lg flex flex-col justify-center items-center text-center text-white relative overflow-hidden border border-red-500/30">
          {/* Watermark Icon */}
          <div className="absolute -right-6 -bottom-6 opacity-10 transform rotate-12">
            <Shield size={180} className="text-white" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-3 opacity-90">
              <Activity size={16} className="text-red-200 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-100">Current Threat Level</span>
            </div>

            <h2 className="text-5xl font-black mb-3 tracking-tight text-white drop-shadow-sm">
              CRITICAL
            </h2>

            <p className="text-red-100/80 font-medium max-w-xs text-sm leading-relaxed">
              Immediate remediation required to prevent potential security breaches.
            </p>
          </div>
        </div>
      </div>


      {/* Main Content - Two Rows */}
      <div className="space-y-8">

        {/* First Row: Stats Grid + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl border border-warm-grey shadow-sm hover:shadow-md transition-shadow flex flex-col items-center relative min-h-[380px]"
          >
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-6 text-left w-full">Security Score</h3>

            {/* Semi-Circle Gauge Container */}
            <div className="relative w-64 h-40 mb-6">
              {/* Background and Colored Arc */}
              <svg className="w-full h-full" viewBox="0 0 240 120">
                {/* Background Arc (gray) */}
                <path
                  d="M 30 120 A 90 90 0 0 1 210 120"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="24"
                  strokeLinecap="round"
                />
                {/* Animated Colored Arc */}
                <motion.path
                  d="M 30 120 A 90 90 0 0 1 210 120"
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeDasharray={`${(securityScore / 100) * 282.7} 282.7`}
                  initial={{ strokeDasharray: '0 282.7' }}
                  animate={{ strokeDasharray: `${(securityScore / 100) * 282.7} 282.7` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>

              {/* Score in Center */}
              <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
                <motion.div
                  className="text-5xl font-bold text-charcoal"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {securityScore}
                </motion.div>
                <p className="text-gray-400 text-lg mt-0.5">/100</p>
              </div>

              {/* Goal Marker and Line */}
              {(() => {
                const goalAngle = (goalScore / 100) * 180;
                const goalRad = ((goalAngle - 180) * Math.PI) / 180;
                const arcRadius = 90;
                const centerX = 120;
                const centerY = 120;

                // Point on the arc
                const arcX = centerX + arcRadius * Math.cos(goalRad);
                const arcY = centerY + arcRadius * Math.sin(goalRad);

                // Extend line outward
                const lineLength = 40;
                const lineEndX = arcX + lineLength * Math.cos(goalRad);
                const lineEndY = arcY + lineLength * Math.sin(goalRad);

                const isLeftSide = goalAngle < 90;
                const isMiddle = goalScore >= 45 && goalScore <= 55;

                return (
                  <>
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 240 120">
                      {/* Dashed line from arc outward */}
                      <line
                        x1={arcX}
                        y1={arcY}
                        x2={lineEndX}
                        y2={lineEndY}
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      {/* Green dot at line end */}
                      <circle
                        cx={arcX}
                        cy={arcY}
                        r="4"
                        fill="#22c55e"
                      />
                    </svg>
                    {/* Goal Box */}
                    <div
                      className="absolute flex items-center gap-3 pointer-events-none z-10"
                      style={{
                        left: `${(lineEndX / 240) * 100}%`,
                        top: `${((isMiddle ? lineEndY - 8 : lineEndY) / 120) * 100}%`,
                        transform: isMiddle
                          ? 'translate(-50%, -100%)'
                          : isLeftSide ? 'translate(-100%, -50%)' : 'translate(0%, -50%)',
                        flexDirection: isMiddle
                          ? 'column'
                          : isLeftSide ? 'row' : 'row-reverse',
                      }}
                    >
                      <div className={`flex flex-col text-sm font-bold text-gray-500 leading-tight ${isMiddle ? 'text-center' : isLeftSide ? 'text-right' : 'text-left'}`}>
                        <span>My</span>
                        <span>Goal</span>
                      </div>
                      <div className="bg-green-500 text-white font-bold text-lg px-3 py-1.5 rounded-lg shadow-sm relative">
                        {goalScore}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Stats below gauge */}
            <div className="mt-2 px-4 py-2 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-600">+5% since yesterday</p>
            </div>
          </motion.div>

          {/* Issues Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border border-warm-grey shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-[320px]"
          >
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-4">Issues</h3>

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

            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-bold text-charcoal">Total:  </span>
                <span className="text-xl font-bold text-charcoal ml-2">12</span>
              </div>
              <Link to="/app/vulnerabilities" className="text-sm font-medium text-charcoal hover:text-sage-600 transition-colors inline-flex items-center">
                See all
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Actions Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl border border-warm-grey shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-[320px]"
          >
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-6">Quick Actions</h3>

            <div className="flex-1 grid grid-cols-2 gap-4">
              {/* Run a Scan Button */}
              <Link
                to="/app/run-new-scan"
                style={{
                  backgroundColor: '#4a7c59',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  textDecoration: 'none',
                  gap: '12px',
                  border: '2px solid #3d6b4a',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <Shield size={32} style={{ color: 'white' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Run a Scan</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>Start a new security scan</div>
                </div>
              </Link>

              {/* Add Domain Button */}
              <Link
                to="/app/add-domain"
                style={{
                  backgroundColor: '#2d3748',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  textDecoration: 'none',
                  gap: '12px',
                  border: '2px solid #1a202c',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <Globe size={32} style={{ color: 'white' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Add Domain</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>Register a new domain</div>
                </div>
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Second Row: Top 5 Vulnerabilities + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Top 5 Vulnerabilities (spans 2 columns) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="inline-block bg-white rounded-full px-5 py-2 shadow-sm border border-gray-200 mb-6">
                <h3 className="text-sm font-bold text-charcoal uppercase tracking-wide">Your Top 5 Vulnerabilities</h3>
              </div>

              <div className="space-y-4">
                {vulnerabilities.map((vuln) => (
                  <div
                    key={vuln.id}
                    className="bg-white rounded-xl border border-warm-grey p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* Colored Strip */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${vuln.severity === 'Critical' ? 'bg-red-600' :
                        vuln.severity === 'High' ? 'bg-orange-500' :
                          vuln.severity === 'Medium' ? 'bg-yellow-500' :
                            'bg-sky-600'
                      }`} />
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Left: Icon + Info */}
                      <div className="flex items-start gap-4 flex-1">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                          {vuln.title.includes('SQL') ? (
                            <Database size={20} className="text-red-600" />
                          ) : vuln.title.includes('XSS') ? (
                            <Globe size={20} className="text-orange-500" />
                          ) : vuln.title.includes('SSH') ? (
                            <Server size={20} className="text-orange-500" />
                          ) : (
                            <Lock size={20} className="text-red-600" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-charcoal truncate">{vuln.title}</h4>
                            <span
                              className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${vuln.severity === 'Critical'
                                ? 'bg-red-100 text-red-700'
                                : vuln.severity === 'High'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-yellow-100 text-yellow-700'
                                }`}
                            >
                              {vuln.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{vuln.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">Asset:</span>
                            <span className="ml-1">{vuln.asset}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 mt-2 md:mt-0">
                        <button className="px-4 py-2 text-sm font-medium text-charcoal bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center whitespace-nowrap">
                          <Activity size={16} className="mr-2" />
                          Simulate Impact
                        </button>
                        <button className="px-4 py-2 text-sm font-bold text-white bg-charcoal rounded-lg hover:bg-gray-800 transition-colors flex items-center whitespace-nowrap shadow-sm">
                          Fix Now
                          <ArrowRight size={16} className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Recent Activity */}
          <div className="lg:col-span-1">
            <div className="inline-block bg-white rounded-full px-5 py-2 shadow-sm border border-gray-200 mb-6 mt-1">
              <h3 className="text-sm font-bold text-charcoal uppercase tracking-wide">Recent Activity</h3>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl border border-warm-grey shadow-sm h-full flex flex-col mt-1"
            >
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
    </div>
  );
};

export default Dashboard;
