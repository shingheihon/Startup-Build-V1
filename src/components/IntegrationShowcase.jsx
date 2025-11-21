import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { Code, Cloud, Shield, Zap } from 'lucide-react';

const integrations = [
    { name: 'AWS', icon: Cloud, color: 'from-orange-400 to-orange-600' },
    { name: 'Azure', icon: Cloud, color: 'from-blue-400 to-blue-600' },
    { name: 'Google Cloud', icon: Cloud, color: 'from-red-400 to-red-600' },
    { name: 'GitHub', icon: Code, color: 'from-gray-600 to-gray-800' },
    { name: 'Slack', icon: Zap, color: 'from-purple-400 to-purple-600' },
    { name: 'Microsoft 365', icon: Shield, color: 'from-blue-500 to-blue-700' },
];

const IntegrationShowcase = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((integration, index) => (
                <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <SpotlightCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center`}>
                            <integration.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm font-semibold text-charcoal">{integration.name}</div>
                    </SpotlightCard>
                </motion.div>
            ))}
        </div>
    );
};

export default IntegrationShowcase;
