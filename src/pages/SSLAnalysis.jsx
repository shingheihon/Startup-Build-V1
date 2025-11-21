import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, AlertTriangle, CheckCircle, Calendar, Server, ArrowRight } from 'lucide-react';

const SSLAnalysis = () => {
  const certificateInfo = {
    commonName: 'startup.com',
    issuer: "Let's Encrypt R3",
    validFrom: '2023-09-01',
    validTo: '2023-12-01',
    daysRemaining: 38,
    algorithm: 'SHA-256 with RSA Encryption',
    serialNumber: '04:72:38:49:28:19:48:29:10:38:47:28'
  };

  const protocols = [
    { name: 'TLS 1.3', status: 'Enabled', secure: true },
    { name: 'TLS 1.2', status: 'Enabled', secure: true },
    { name: 'TLS 1.1', status: 'Disabled', secure: true },
    { name: 'TLS 1.0', status: 'Disabled', secure: true },
    { name: 'SSL 3.0', status: 'Disabled', secure: true },
  ];

  const ciphers = [
    { name: 'TLS_AES_128_GCM_SHA256', strength: 'Strong', bit: 128 },
    { name: 'TLS_AES_256_GCM_SHA384', strength: 'Strong', bit: 256 },
    { name: 'TLS_CHACHA20_POLY1305_SHA256', strength: 'Strong', bit: 256 },
    { name: 'ECDHE-RSA-AES128-GCM-SHA256', strength: 'Strong', bit: 128 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">SSL/TLS Analysis</h1>
          <p className="text-gray-600 mt-2">Certificate validity and protocol configuration.</p>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-green-700 font-bold text-sm">A+ Grade</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Certificate Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-warm-grey p-6 lg:col-span-2 shadow-sm"
        >
          <h2 className="text-lg font-bold text-charcoal mb-6 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-sage-600" />
            Certificate Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Common Name</p>
                <p className="text-lg font-mono font-bold text-charcoal">{certificateInfo.commonName}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Issuer</p>
                <p className="text-lg font-medium text-charcoal">{certificateInfo.issuer}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Validity Period</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-charcoal">{certificateInfo.validFrom}</p>
                    <p className="text-xs text-gray-400">Issued</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300" />
                  <div className="text-right">
                    <p className="text-sm font-medium text-charcoal">{certificateInfo.validTo}</p>
                    <p className="text-xs text-gray-400">Expires</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 uppercase tracking-wider font-bold mb-1">Status</p>
                  <p className="text-lg font-bold text-green-700">Valid</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-700">{certificateInfo.daysRemaining}</p>
                  <p className="text-xs text-green-600">Days Remaining</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Signature Algorithm</p>
              <p className="text-sm font-mono text-gray-700">{certificateInfo.algorithm}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Serial Number</p>
              <p className="text-sm font-mono text-gray-700 break-all">{certificateInfo.serialNumber}</p>
            </div>
          </div>
        </motion.div>

        {/* Protocol Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-warm-grey p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-charcoal mb-6 flex items-center">
            <Server className="w-5 h-5 mr-2 text-sage-600" />
            Protocol Support
          </h2>
          <div className="space-y-3">
            {protocols.map((proto, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-700">{proto.name}</span>
                {proto.status === 'Enabled' ? (
                  <span className="flex items-center text-green-600 text-sm font-bold">
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    Enabled
                  </span>
                ) : (
                  <span className="flex items-center text-gray-400 text-sm">
                    Disabled
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              <span className="font-bold">Configuration Tip:</span> Ensure TLS 1.2 and 1.3 are the only enabled protocols for maximum security and compatibility.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Cipher Suites */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-warm-grey p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-charcoal mb-6">Supported Cipher Suites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ciphers.map((cipher, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-gray-100 hover:border-sage-200 hover:bg-gray-50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700 uppercase">
                  {cipher.strength}
                </span>
                <span className="text-xs font-mono text-gray-500">{cipher.bit}-bit</span>
              </div>
              <p className="font-mono text-sm text-gray-700 break-all">{cipher.name}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SSLAnalysis;
