import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, MessageSquare, Shield, Clock, FileText, Bell, Slack } from 'lucide-react';

// --- Sub-Components for Animations ---

const ExpertCard = () => {
    return (
        <div className="bg-gray-50 rounded-2xl p-8 h-full flex flex-col justify-between overflow-hidden relative group hover:shadow-lg transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-sage-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animation Area */}
            <div className="h-48 flex items-center justify-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl p-4 flex items-center space-x-4 max-w-xs"
                >
                    <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-sage-600" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">AI Analyst • Just now</div>
                        <div className="text-sm text-charcoal font-medium">Vulnerability assessment complete. No critical issues found.</div>
                    </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 right-10 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"
                >
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                </motion.div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 mt-6">
                <h3 className="text-2xl font-bold text-charcoal mb-3">Your dedicated security expert</h3>
                <p className="text-gray-600 leading-relaxed">
                    An AI-driven security analyst that works 24/7, identifying vulnerabilities, prioritizing risks, and suggesting fixes before you even know there's a problem.
                </p>
            </div>
        </div>
    );
};

const BackgroundCard = () => {
    return (
        <div className="bg-gray-50 rounded-2xl p-8 h-full flex flex-col justify-between overflow-hidden relative group hover:shadow-lg transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-sage-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animation Area */}
            <div className="h-48 flex items-center justify-center relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm font-semibold text-charcoal">System Active</span>
                        </div>
                        <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Network Scan</span>
                                <span>Running...</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: ["0%", "100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="h-full bg-sage-500 rounded-full"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Policy Update</span>
                                <span>Queued</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="w-0 h-full bg-sage-300 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 mt-6">
                <h3 className="text-2xl font-bold text-charcoal mb-3">Security that runs in the background</h3>
                <p className="text-gray-600 leading-relaxed">
                    Automated evidence collection, continuous monitoring, and real-time updates keep your infrastructure secure without interrupting your workflow.
                </p>
            </div>
        </div>
    );
};

const RevenueCard = () => {
    return (
        <div className="bg-gray-50 rounded-2xl p-8 h-full flex flex-col justify-between overflow-hidden relative group hover:shadow-lg transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-sage-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animation Area */}
            <div className="h-48 flex items-center justify-center relative z-10">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs overflow-hidden border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Certifications
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[
                            { name: 'SOC 2 Type II', status: 'Ready' },
                            { name: 'ISO 27001', status: 'Ready' },
                            { name: 'GDPR', status: 'Ready' }
                        ].map((cert, i) => (
                            <motion.div
                                key={cert.name}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="px-4 py-3 flex items-center justify-between hover:bg-sage-50 transition-colors cursor-pointer group/item"
                            >
                                <div className="flex items-center space-x-3">
                                    <FileText className="w-4 h-4 text-sage-500" />
                                    <span className="text-sm font-medium text-charcoal">{cert.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{cert.status}</span>
                                    <Download className="w-4 h-4 text-gray-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 mt-6">
                <h3 className="text-2xl font-bold text-charcoal mb-3">Leverage compliance for growth</h3>
                <p className="text-gray-600 leading-relaxed">
                    Instantly generate audit-ready reports and trust badges. Show customers and prospects you're trustworthy and accelerate your sales cycles.
                </p>
            </div>
        </div>
    );
};

const SlackCard = () => {
    return (
        <div className="bg-gray-50 rounded-2xl p-8 h-full flex flex-col justify-between overflow-hidden relative group hover:shadow-lg transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-sage-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animation Area */}
            <div className="h-48 flex items-center justify-center relative z-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-white rounded-2xl shadow-xl p-4 max-w-xs w-full"
                >
                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                            <Slack className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-charcoal text-sm">Startup Bot</span>
                                <span className="text-xs text-gray-400">APP 9:41 AM</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                                <span className="text-blue-500">@security-team</span> New critical vulnerability detected in production-api.
                            </p>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors">
                                    Fix it
                                </button>
                                <button className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-medium rounded hover:bg-gray-50 transition-colors">
                                    View details
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 mt-6">
                <h3 className="text-2xl font-bold text-charcoal mb-3">Get stuff done on Slack</h3>
                <p className="text-gray-600 leading-relaxed">
                    Receive instant alerts, approve workflows, and talk directly with your AI security officer - all without leaving Slack.
                </p>
            </div>
        </div>
    );
};

// --- Main Component ---

const EverythingYouNeed = () => {
    return (
        <section className="relative z-20 py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-charcoal mb-6">
                        Put security on autopilot
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Run your entire security program with a blend of expert AI support and automation.
                        We handle the work behind the scenes while you focus on building.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <ExpertCard />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <BackgroundCard />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <RevenueCard />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <SlackCard />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EverythingYouNeed;
