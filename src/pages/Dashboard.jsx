import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Activity, ArrowRight, CheckCircle, Clock, Eye, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [securityScore, setSecurityScore] = useState(0);
  const targetScore = 72;

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

  const stats = [
    {
      label: 'Security Score',
      value: targetScore,
      change: '+5%',
      timeframe: 'since yesterday',
      icon: Shield,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      isGauge: true
    },
    {
      label: 'Critical Issues',
      value: '2',
      change: '-1',
      timeframe: 'since last week',
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      isGauge: false
    },
  ];

  const topVulnerabilities = [
    {
      id: 1,
      vulnerability: 'SQL Injection',
      project: 'Customer Portal',
      severity: 'Critical',
      category: 'A1: Injection',
      severityColor: 'bg-red-100 text-red-700'
    },
    {
      id: 2,
      vulnerability: 'Cross-Site Scripting (XSS)',
      project: 'Admin Dashboard',
      severity: 'High',
      category: 'A2: XSS',
      severityColor: 'bg-orange-100 text-orange-700'
    },
    {
      id: 3,
      vulnerability: 'Broken Authentication',
      project: 'API Gateway',
      severity: 'High',
      category: 'A2: Broken Auth',
      severityColor: 'bg-orange-100 text-orange-700'
    },
    {
      id: 4,
      vulnerability: 'Sensitive Data Exposure',
      project: 'Mobile App Backend',
      severity: 'Medium',
      category: 'A3: Sensitive Data',
      severityColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 5,
      vulnerability: 'Security Misconfiguration',
      project: 'Payment Service',
      severity: 'Medium',
      category: 'A6: Security Misconfig',
      severityColor: 'bg-yellow-100 text-yellow-700'
    },
  ];

  const criticalIssuesWithActions = [
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
  ];

  const recentActivity = [
    { id: 1, title: 'Full System Scan', status: 'Completed', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
    { id: 2, title: 'New Vulnerability Detected', status: 'Critical', time: '5 hours ago', icon: AlertTriangle, color: 'text-red-500' },
    { id: 3, title: 'SSL Certificate Renewal', status: 'Pending', time: '1 day ago', icon: Clock, color: 'text-yellow-500' },
  ];

  // Calculate gauge rotation (0-180 degrees for half circle)
  const getGaugeRotation = (score) => {
    return (score / 100) * 180 - 90; // -90 to 90 degrees
  };

  return (
    <div className="space-y-8">
      {/* Good Morning Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-charcoal via-gray-800 to-sage-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-sage-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">{getGreeting()}, Shing Hei! 👋</h1>
          <p className="text-gray-300 text-lg mb-6">Here's your security information for today.</p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Shield className="w-5 h-5 text-sage-300" />
              <span className="text-sm font-medium">{stats[0].value}/100 Security Score</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-300" />
              <span className="text-sm font-medium">{stats[1].value} Critical Issues</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security Score Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-xl border border-warm-grey shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Security Score</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-charcoal">{targetScore}</span>
                <span className="text-gray-400 text-lg">/100</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${stats[0].bg} ${stats[0].color}`}>
              <Shield className="w-6 h-6" />
            </div>
          </div>

          {/* Gauge Visualization */}
          <div className="relative w-full h-32 flex items-end justify-center mb-4">
            <svg className="w-full h-full" viewBox="0 0 200 100">
              {/* Background arc */}
              <path
                d="M 20 90 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Colored segments */}
              <path
                d="M 20 90 A 80 80 0 0 1 60 35"
                fill="none"
                stroke="#ef4444"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 60 35 A 80 80 0 0 1 100 20"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 100 20 A 80 80 0 0 1 140 35"
                fill="none"
                stroke="#eab308"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 140 35 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="#22c55e"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Needle */}
              <motion.line
                x1="100"
                y1="90"
                x2="100"
                y2="30"
                stroke="#1f2937"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ rotate: -90 }}
                animate={{ rotate: getGaugeRotation(securityScore) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ transformOrigin: '100px 90px' }}
              />
              <circle cx="100" cy="90" r="6" fill="#1f2937" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className={`font-medium px-3 py-1 rounded-full ${stats[0].change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {stats[0].change}
            </span>
            <span className="text-gray-500">{stats[0].timeframe}</span>
          </div>
        </motion.div>

        {/* Critical Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-xl border border-warm-grey shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Critical Issues</h3>
              <span className="text-4xl font-bold text-charcoal">{stats[1].value}</span>
            </div>
            <div className={`p-3 rounded-lg ${stats[1].bg} ${stats[1].color}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">SQL Injection</span>
              <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">CRITICAL</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">XSS Vulnerability</span>
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">HIGH</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className={`font-medium px-3 py-1 rounded-full ${stats[1].change.includes('-') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {stats[1].change}
            </span>
            <span className="text-gray-500">{stats[1].timeframe}</span>
          </div>
        </motion.div>
      </div>

      {/* Top 5 Vulnerabilities Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-warm-grey shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-warm-grey">
          <h2 className="text-xl font-bold text-charcoal">Top 5 Vulnerabilities</h2>
          <p className="text-sm text-gray-600 mt-1">Current security issues requiring attention</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-warm-grey">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vulnerability</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">OWASP Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topVulnerabilities.map((vuln, index) => (
                <motion.tr
                  key={vuln.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{vuln.vulnerability}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{vuln.project}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${vuln.severityColor}`}>
                      {vuln.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{vuln.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="View Details">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Assign">
                        <Users className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Mark Complete">
                        <CheckCircle className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl border border-warm-grey p-6 shadow-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-charcoal">Recent Activity</h2>
          <button className="text-sage-600 hover:text-sage-700 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between group cursor-pointer p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full bg-gray-50 ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${activity.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    activity.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {activity.status}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-sage-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top 5 Critical Issues with Action Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl border border-warm-grey shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-warm-grey bg-gradient-to-r from-red-50 to-orange-50">
          <h2 className="text-xl font-bold text-charcoal flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
            Top 5 Critical Issues & Action Plan
          </h2>
          <p className="text-sm text-gray-600 mt-1">Immediate actions required to improve security posture</p>
        </div>

        <div className="divide-y divide-gray-100">
          {criticalIssuesWithActions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.05 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-bold text-gray-400">#{item.id}</span>
                    <h3 className="text-base font-bold text-gray-900">{item.issue}</h3>
                    <span className={`px-2 py-1 text-xs font-bold rounded ${item.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                        item.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                      }`}>
                      {item.severity}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-sage-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700"><span className="font-semibold">Action Plan:</span> {item.actionPlan}</p>
                  </div>
                </div>
                <span className={`ml-4 px-3 py-1 text-xs font-bold rounded whitespace-nowrap ${item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {item.priority} Priority
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 border-t border-warm-grey">
          <Link
            to="/app/action-plan"
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-charcoal text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
          >
            <span>View Full Action Plan</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;