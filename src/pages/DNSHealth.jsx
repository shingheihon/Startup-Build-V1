import React from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle, AlertTriangle, Activity, RefreshCw, ArrowRight } from 'lucide-react';

const DNSHealth = () => {
  const records = [
    { type: 'A', value: '104.21.55.2', ttl: '300', status: 'ok' },
    { type: 'AAAA', value: '2606:4700:3033::6815:3702', ttl: '300', status: 'ok' },
    { type: 'MX', value: 'mail.startup.com', ttl: '3600', status: 'warning' },
    { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', ttl: '3600', status: 'ok' },
    { type: 'CNAME', value: 'startup.com', ttl: '300', status: 'ok' },
    { type: 'NS', value: 'ns1.digitalocean.com', ttl: '86400', status: 'ok' },
    { type: 'SOA', value: 'ns1.digitalocean.com', ttl: '3600', status: 'ok' },
    { type: 'DMARC', value: 'v=DMARC1; p=none;', ttl: '3600', status: 'error' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">DNS Health</h1>
          <p className="text-gray-600 mt-2">Global propagation status and record validation.</p>
        </div>
        <button className="flex items-center px-4 py-2 rounded-lg bg-charcoal text-white hover:bg-gray-800 font-medium transition-colors shadow-lg">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Records
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Health Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-warm-grey p-6 flex flex-col items-center justify-center text-center shadow-sm"
        >
          <h3 className="text-gray-500 font-medium mb-4">DNS Health Score</h3>
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="#f3f4f6" strokeWidth="8" fill="transparent" />
              <circle cx="64" cy="64" r="56" stroke="#EAB308" strokeWidth="8" fill="transparent" strokeDasharray={351} strokeDashoffset={351 - (351 * 85) / 100} className="transition-all duration-1000 ease-out" />
            </svg>
            <span className="absolute text-3xl font-bold text-charcoal">85</span>
          </div>
          <p className="text-sm text-gray-600">Good configuration, but DMARC needs attention.</p>
        </motion.div>

        {/* Propagation Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-warm-grey p-6 col-span-2 shadow-sm"
        >
          <h3 className="text-lg font-bold text-charcoal mb-4">Global Propagation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['US-East', 'EU-West', 'Asia-Pacific', 'SA-East'].map((region, idx) => (
              <div key={region} className="flex items-center space-x-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{region}</p>
                  <p className="text-xs text-gray-500">~{20 + idx * 15}ms</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start space-x-3">
            <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-900 text-sm">Propagation Complete</h4>
              <p className="text-sm text-blue-700 mt-1">Your DNS records have successfully propagated to all major global nameservers.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl border border-warm-grey overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-charcoal">DNS Records</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {records.map((record, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4 min-w-[150px]">
                <span className="font-mono font-bold text-charcoal bg-gray-100 px-3 py-1 rounded text-sm w-16 text-center">
                  {record.type}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase ${record.status === 'ok' ? 'bg-green-100 text-green-700' :
                    record.status === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                  {record.status}
                </span>
              </div>

              <div className="flex-1 font-mono text-sm text-gray-600 break-all">
                {record.value}
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>TTL: {record.ttl}s</span>
                {record.status !== 'ok' && (
                  <button className="text-sage-600 hover:text-sage-700 font-medium flex items-center">
                    Fix Issue <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DNSHealth;
