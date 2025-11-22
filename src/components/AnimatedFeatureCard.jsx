import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedFeatureCard = ({ feature, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group"
        >
            {/* Animated border gradient */}
            <motion.div
                animate={{
                    rotate: isHovered ? 360 : 0,
                }}
                transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: isHovered ? Infinity : 0,
                }}
                className="absolute -inset-0.5 bg-gradient-to-r from-sage-400 via-sage-500 to-sage-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"
            />

            {/* Card content */}
            <div className="relative bg-white rounded-2xl p-8 h-full">
                {/* Icon container with 3D effect */}
                <motion.div
                    animate={{
                        rotateY: isHovered ? 180 : 0,
                        scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-sage-400 to-sage-600 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title with slide animation */}
                <motion.h3
                    animate={{
                        x: isHovered ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold text-charcoal mb-3"
                >
                    {feature.title}
                </motion.h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                </p>

                {/* Animated bottom accent */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                    className="h-1 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full"
                />

                {/* Floating particles effect */}
                {isHovered && (
                    <>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    y: -50,
                                    x: (i - 1) * 20,
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                                className="absolute bottom-4 left-1/2 w-2 h-2 bg-sage-400 rounded-full"
                            />
                        ))}
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default AnimatedFeatureCard;
