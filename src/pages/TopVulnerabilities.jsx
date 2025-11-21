import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, ArrowRight, Shield, Server, Lock, Globe, Activity } from 'lucide-react';
import WhatIfSimulator from '../components/WhatIfSimulator';

const TopVulnerabilities = () => {
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [selectedVuln, setSelectedVuln] = useState(null);

  const vulnerabilities = [
    {
      id: 1,
      title: 'Heartbleed (CVE-2014-0160)',
      severity: 'critical',
      asset: 'api.startup.com',
      description: 'OpenSSL vulnerability allowing memory leak of private keys.',
      icon: Lock
    },
    {
      id: 2,
      title: 'SQL Injection',
      severity: 'critical',
      asset: 'startup.com/login',
      description: 'Unsanitized input allows execution of arbitrary SQL commands.',
      icon: Server
    },
    {
      id: 3,
      title: 'Cross-Site Scripting (XSS)',
      severity: 'high',
      asset: 'startup.com/contact',
      description: 'Reflected XSS vulnerability in contact form.',
      icon: Globe
    },
    {
      id: 4,
      title: 'Weak SSH Credentials',
      severity: 'high',
      asset: '104.21.55.2',
      description: 'Default root password detected on SSH service.',
      icon: Shield
    },
    {
      id: 5,
      title: 'Outdated PHP Version',
      severity: 'medium',
      asset: 'blog.startup.com',
      description: 'Running PHP 7.2 which is end-of-life.',
      icon: Server
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

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

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Top 5 Vulnerabilities</h1>
          <p className="text-gray-600 mt-2">Prioritized list of the most critical security risks found.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {vulnerabilities.map((vuln, index) => (
          <motion.div
            key={vuln.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-warm-grey p-6 hover:shadow-lg transition-all group relative overflow-hidden"
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${vuln.severity === 'critical' ? 'bg-red-500' :
                vuln.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
              }`} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${vuln.severity === 'critical' ? 'bg-red-50 text-red-600' :
                    vuln.severity === 'high' ? 'bg-orange-50 text-orange-600' : 'bg-yellow-50 text-yellow-600'
                  }`}>
                  <vuln.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-lg font-bold text-charcoal">{vuln.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{vuln.description}</p>
                  <div className="flex items-center text-sm text-gray-500 font-mono bg-gray-50 inline-block px-2 py-1 rounded">
                    <AlertOctagon className="w-3 h-3 mr-1.5" />
                    {vuln.asset}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => openSimulator(vuln)}
                  className="flex items-center px-4 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Simulate Impact
                </button>
                <button className="flex items-center px-6 py-3 rounded-lg bg-charcoal text-white hover:bg-gray-800 transition-all shadow-md group-hover:translate-x-1">
                  Fix Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopVulnerabilities;
