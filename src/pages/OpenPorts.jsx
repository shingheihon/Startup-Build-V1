import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Shield, AlertTriangle, CheckCircle, Info, ArrowRight } from 'lucide-react';

const OpenPorts = () => {
  const ports = [
    { port: 80, service: 'HTTP', protocol: 'TCP', state: 'Open', version: 'nginx 1.18.0', risk: 'Low', banner: 'HTTP/1.1 200 OK' },
    { port: 443, service: 'HTTPS', protocol: 'TCP', state: 'Open', version: 'nginx 1.18.0', risk: 'Low', banner: 'HTTP/1.1 200 OK' },
    { port: 22, service: 'SSH', protocol: 'TCP', state: 'Open', version: 'OpenSSH 8.2p1', risk: 'High', banner: 'SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5' },
    { port: 3306, service: 'MySQL', protocol: 'TCP', state: 'Filtered', version: 'MySQL 8.0.26', risk: 'Medium', banner: 'N/A' },
    { port: 8080, service: 'HTTP-Proxy', protocol: 'TCP', state: 'Open', version: 'Apache Tomcat/9.0', risk: 'Medium', banner: 'HTTP/1.1 403 Forbidden' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Open Ports</h1>
          <p className="text-gray-600 mt-2">External attack surface analysis and service detection.</p>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
            High Risk
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
            Medium Risk
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
            Low Risk
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ports.map((port, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-warm-grey p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${port.risk === 'High' ? 'bg-red-50 text-red-600' :
                    port.risk === 'Medium' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-xl font-bold text-charcoal font-mono">{port.port}/{port.protocol}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${port.state === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {port.state}
                    </span>
                  </div>
                  <p className="text-lg font-medium text-gray-800 mb-1">{port.service}</p>
                  <p className="text-sm text-gray-500 font-mono">{port.version}</p>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${port.risk === 'High' ? 'bg-red-100 text-red-700' :
                    port.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                  {port.risk} Risk
                </span>
                {port.risk !== 'Low' && (
                  <button className="text-sage-600 hover:text-sage-700 text-sm font-medium flex items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    How to fix <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-start space-x-2">
                <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Service Banner</p>
                  <code className="text-sm font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded block w-full overflow-x-auto">
                    {port.banner}
                  </code>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start space-x-4">
        <Shield className="w-6 h-6 text-blue-600 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-blue-900">Firewall Recommendation</h3>
          <p className="text-blue-700 mt-1 mb-4">
            We detected 2 high-risk ports open to the public internet. It is recommended to restrict access to these ports using a firewall or VPN.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
            Generate Firewall Rules
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenPorts;
