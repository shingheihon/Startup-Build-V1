import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Server, Shield, ExternalLink, AlertTriangle, Eye } from 'lucide-react';

const ShodanExposure = () => {
  const exposureData = {
    ip: '104.21.55.2',
    org: 'Cloudflare, Inc.',
    isp: 'Cloudflare, Inc.',
    country: 'United States',
    city: 'San Francisco',
    os: 'Linux 5.x',
    lastUpdate: '2023-10-24T10:30:00Z',
    ports: [80, 443, 8080, 8443],
    vulns: ['CVE-2019-11043', 'CVE-2018-15473']
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Shodan Exposure</h1>
          <p className="text-gray-600 mt-2">Publicly available information about your infrastructure.</p>
        </div>
        <a
          href={`https://www.shodan.io/host/${exposureData.ip}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Shodan.io
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-warm-grey p-6 lg:col-span-2 shadow-sm"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <Server className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-charcoal">{exposureData.ip}</h2>
                <p className="text-gray-500">{exposureData.org}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase mb-1">Online</span>
              <span className="text-xs text-gray-400">Last updated: {new Date(exposureData.lastUpdate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Location</p>
                  <p className="text-gray-900 font-medium">{exposureData.city}, {exposureData.country}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">ISP</p>
                  <p className="text-gray-900 font-medium">{exposureData.isp}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <Server className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Operating System</p>
                  <p className="text-gray-900 font-medium">{exposureData.os}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Open Ports</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {exposureData.ports.map(port => (
                      <span key={port} className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs font-mono text-gray-600">
                        {port}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-charcoal rounded-xl p-6 text-white flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center" />
          <div className="relative z-10">
            <Globe className="w-12 h-12 text-sage-400 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Global Visibility</h3>
            <p className="text-gray-400 text-sm mb-6">This asset is visible from 142 countries.</p>
            <button className="px-4 py-2 bg-sage-500 hover:bg-sage-600 text-white rounded-lg font-bold text-sm transition-colors">
              View Access Map
            </button>
          </div>
        </motion.div>
      </div>

      {/* Vulnerabilities Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-warm-grey p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-charcoal flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Known Vulnerabilities (CVEs)
          </h2>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
            {exposureData.vulns.length} Detected
          </span>
        </div>

        <div className="space-y-4">
          {exposureData.vulns.map((cve, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-orange-100 bg-orange-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 font-mono">{cve}</h3>
                  <p className="text-sm text-gray-600 mt-1">Potential remote code execution vulnerability detected in service banner.</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-orange-200 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors shadow-sm">
                View Details
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ShodanExposure;
