import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { value: '500+', label: 'Companies Protected', suffix: '' },
    { value: '99.9', label: 'Uptime Guarantee', suffix: '%' },
    { value: '2M+', label: 'Threats Blocked', suffix: '' },
    { value: '<5', label: 'Minutes to Deploy', suffix: 'min' },
];

const AnimatedStats = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: index * 0.1,
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 100,
                    }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                        className="relative"
                    >
                        {/* Glowing background */}
                        <div className="absolute inset-0 bg-sage-400 blur-3xl opacity-20 rounded-full" />

                        {/* Number */}
                        <div className="relative text-5xl md:text-6xl font-bold text-white mb-2">
                            {stat.value}
                            {stat.suffix && <span className="text-3xl">{stat.suffix}</span>}
                        </div>
                    </motion.div>

                    {/* Label */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                        className="text-gray-300 font-medium"
                    >
                        {stat.label}
                    </motion.div>

                    {/* Animated underline */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
                        className="h-1 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full mx-auto mt-4"
                        style={{ maxWidth: '80px' }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default AnimatedStats;
