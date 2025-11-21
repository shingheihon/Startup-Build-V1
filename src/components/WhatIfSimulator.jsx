import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, DollarSign, Users, Activity, X, ArrowRight, ShieldAlert } from 'lucide-react';

const WhatIfSimulator = ({ isOpen, onClose, vulnerability }) => {
    const [step, setStep] = useState(0);

    if (!isOpen || !vulnerability) return null;

    const scenarios = {
        'critical': {
            steps: [
                { title: 'Exploitation', description: 'Attacker uses automated tools to exploit the vulnerability.', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-100' },
                { title: 'Access Gained', description: 'Unauthorized admin access to the database obtained.', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-100' },
                { title: 'Data Exfiltration', description: 'Customer data (emails, passwords) is stolen.', icon: Users, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                { title: 'Business Impact', description: 'Estimated $50,000 loss in fines and reputation damage.', icon: DollarSign, color: 'text-red-600', bg: 'bg-red-100' }
            ]
        },
        'high': {
            steps: [
                { title: 'Initial Breach', description: 'Attacker gains low-level entry via exposed service.', icon: ShieldAlert, color: 'text-orange-600', bg: 'bg-orange-100' },
                { title: 'Lateral Movement', description: 'Attacker scans internal network for sensitive assets.', icon: Activity, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                { title: 'Service Disruption', description: 'Critical services taken offline for 4 hours.', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-100' },
                { title: 'Operational Loss', description: 'Estimated $15,000 in lost productivity and sales.', icon: DollarSign, color: 'text-red-600', bg: 'bg-red-100' }
            ]
        },
        'medium': {
            steps: [
                { title: 'Reconnaissance', description: 'Attacker identifies outdated software version.', icon: ShieldAlert, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                { title: 'Targeted Phishing', description: 'Employees targeted based on exposed info.', icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' },
                { title: 'Potential Breach', description: 'Risk of credential theft increases by 40%.', icon: Activity, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                { title: 'Remediation Cost', description: 'Estimated $5,000 for emergency patching and audit.', icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-100' }
            ]
        }
    };

    const scenario = scenarios[vulnerability.severity] || scenarios['medium'];

    const nextStep = () => {
        if (step < scenario.steps.length - 1) {
            setStep(step + 1);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <div>
                            <h2 className="text-2xl font-bold text-charcoal flex items-center">
                                <Activity className="w-6 h-6 mr-2 text-red-500" />
                                What-If Scenario Simulator
                            </h2>
                            <p className="text-gray-600 mt-1">Simulating impact for: <span className="font-semibold">{vulnerability.title}</span></p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    {/* Simulation Area */}
                    <div className="p-8">
                        <div className="space-y-8">
                            {scenario.steps.map((s, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{
                                        opacity: index <= step ? 1 : 0.3,
                                        x: 0,
                                        scale: index === step ? 1.02 : 1
                                    }}
                                    className={`flex items-center p-4 rounded-xl border-2 transition-all ${index === step ? 'border-sage-500 bg-sage-50 shadow-md' : 'border-gray-100 bg-white'
                                        }`}
                                >
                                    <div className={`p-3 rounded-full ${s.bg} ${s.color} mr-4`}>
                                        <s.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-bold text-lg ${index === step ? 'text-charcoal' : 'text-gray-500'}`}>{s.title}</h3>
                                        <p className={`text-sm ${index === step ? 'text-gray-700' : 'text-gray-400'}`}>{s.description}</p>
                                    </div>
                                    {index < scenario.steps.length - 1 && (
                                        <ArrowRight className={`w-5 h-5 mx-2 ${index < step ? 'text-sage-500' : 'text-gray-300'}`} />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end space-x-4">
                            {step < scenario.steps.length - 1 ? (
                                <button
                                    onClick={nextStep}
                                    className="px-6 py-3 bg-charcoal text-white rounded-lg font-medium hover:bg-gray-800 transition-all flex items-center"
                                >
                                    Simulate Next Step <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            ) : (
                                <button
                                    onClick={onClose} // In a real app, this might go to a "Fix" page
                                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all shadow-lg animate-pulse"
                                >
                                    Prevent This Now - Fix Vulnerability
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default WhatIfSimulator;
