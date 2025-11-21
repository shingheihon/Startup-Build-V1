import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Share2, Download, ChevronDown, ChevronUp, ArrowRight, Activity, Eye } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import WhatIfSimulator from '../components/WhatIfSimulator';

const ScanResults = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [selectedVuln, setSelectedVuln] = useState(null);

  const scanData = {
    target: 'startup.com',
    date: 'Oct 24, 2023',
    duration: '14m 32s',
    score: 72,
    grade: 'C+',
    findings: {
      critical: 2,
      high: 5,
      medium: 8,
      low: 12
    }
  };

  const findings = [
    {
      id: 1,
      severity: 'critical',
      title: 'SQL Injection Vulnerability',
      location: '/api/login',
      description: 'Unsanitized input in the login API allows attackers to execute arbitrary SQL commands.',
      remediation: 'Use parameterized queries or prepared statements.'
    },
    {
      id: 2,
      severity: 'high',
      title: 'Outdated SSL/TLS Protocol',
      location: '443/tcp',
      description: 'Server supports TLS 1.0 which is deprecated and vulnerable to attacks.',
      remediation: 'Disable TLS 1.0/1.1 and enforce TLS 1.2 or higher.'
    },
    {
      id: 3,
      severity: 'medium',
      title: 'Missing HTTP Security Headers',
      location: 'Global',
      description: 'X-Frame-Options and Content-Security-Policy headers are missing.',
      remediation: 'Configure web server to send appropriate security headers.'
    },
  ];

  const data = [
    { name: 'Critical', value: scanData.findings.critical, color: '#EF4444' },
    { name: 'High', value: scanData.findings.high, color: '#F97316' },
    { name: 'Medium', value: scanData.findings.medium, color: '#EAB308' },
    { name: 'Low', value: scanData.findings.low, color: '#3B82F6' },
  ];

  const openSimulator = (vuln) => {
    setSelectedVuln(vuln);
    setSimulatorOpen(true);
  };

  return (
    <div className="space-y-8 relative">
      <WhatIfSimulator
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
        vulnerability={selectedVuln}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Scan Results</h1>
          <p className="text-gray-600 mt-2">Assessment for <span className="font-mono font-bold text-gray-800">{scanData.target}</span> completed on {scanData.date}.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium transition-colors">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
          <button className="flex items-center px-4 py-2 rounded-lg bg-charcoal text-white hover:bg-gray-800 font-medium transition-colors shadow-lg">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('summary')}
          className={`pb-4 text-lg font-medium transition-colors relative ${activeTab === 'summary' ? 'text-charcoal' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Executive Summary
          {activeTab === 'summary' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal" />}
        </button>
        <button
          onClick={() => setActiveTab('technical')}
          className={`pb-4 text-lg font-medium transition-colors relative ${activeTab === 'technical' ? 'text-charcoal' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Technical Details
          {activeTab === 'technical' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal" />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'summary' ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Score Card */}
            <div className="bg-white rounded-xl border border-warm-grey p-6 flex flex-col items-center justify-center text-center shadow-sm">
              <h3 className="text-gray-500 font-medium mb-4">Security Score</h3>
              <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
                  <circle cx="80" cy="80" r="70" stroke={scanData.score > 80 ? '#10B981' : scanData.score > 60 ? '#EAB308' : '#EF4444'} strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * scanData.score) / 100} className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-charcoal">{scanData.score}</span>
                  <span className={`text-lg font-bold ${scanData.score > 80 ? 'text-green-500' : scanData.score > 60 ? 'text-yellow-500' : 'text-red-500'}`}>{scanData.grade}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Your security posture is <span className="font-bold">Average</span>. Immediate attention required for critical issues.</p>
            </div>

            {/* Action Items Card */}
            <div className="bg-white rounded-xl border border-warm-grey p-6 col-span-2 shadow-sm">
              <h3 className="text-lg font-bold text-charcoal mb-4">Top Priority Actions</h3>
              <div className="space-y-4">
                {findings.filter(f => f.severity === 'critical' || f.severity === 'high').map((finding, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-red-50 border border-red-100">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900">{finding.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">Risk: High impact on business continuity.</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openSimulator(finding)}
                        className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded border border-red-200 hover:bg-red-50 transition-colors flex items-center"
                      >
                        <Activity className="w-3 h-3 mr-1.5" />
                        Simulate Impact
                      </button>
                      <button className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors flex items-center shadow-md">
                        Fix Now <ArrowRight className="w-3 h-3 ml-1.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution Chart */}
            <div className="bg-white rounded-xl border border-warm-grey p-6 col-span-3 md:col-span-1 shadow-sm">
              <h3 className="text-lg font-bold text-charcoal mb-4">Risk Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {data.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-bold text-charcoal">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Wins */}
            <div className="bg-white rounded-xl border border-warm-grey p-6 col-span-3 md:col-span-2 shadow-sm">
              <h3 className="text-lg font-bold text-charcoal mb-4">Quick Wins (Low Effort, High Impact)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-sage-300 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-sage-600">Network</span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-sage-500 transition-colors" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Close Unused Ports</h4>
                  <p className="text-sm text-gray-500">Port 8080 is open but not serving traffic.</p>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 hover:border-sage-300 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-sage-600">Web</span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-sage-500 transition-colors" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Enable HSTS</h4>
                  <p className="text-sm text-gray-500">Force secure connections for all users.</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="technical"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {findings.map((finding, index) => (
              <motion.div
                key={finding.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-warm-grey p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${finding.severity === 'critical' ? 'bg-red-100 text-red-700' :
                          finding.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                            finding.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                        {finding.severity}
                      </span>
                      <h3 className="text-lg font-bold text-charcoal">{finding.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{finding.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200">
                        {finding.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 min-w-[140px]">
                    <button
                      onClick={() => openSimulator(finding)}
                      className="w-full py-2 px-4 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center text-sm"
                    >
                      <Activity className="w-3 h-3 mr-2" />
                      Simulate
                    </button>
                    <button className="w-full py-2 px-4 rounded-lg bg-charcoal text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center text-sm shadow-md">
                      View Details
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 -mx-6 -mb-6 p-4 rounded-b-xl flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-bold text-gray-900 block mb-1">Recommended Fix</span>
                    <p className="text-sm text-gray-600">{finding.remediation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScanResults;
