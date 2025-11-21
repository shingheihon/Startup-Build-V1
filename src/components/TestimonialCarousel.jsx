import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'CTO at TechCorp',
        image: '👩‍💼',
        quote: 'This platform reduced our security assessment time from weeks to hours. Absolutely game-changing.',
        rating: 5,
    },
    {
        name: 'Michael Rodriguez',
        role: 'Security Lead at DataFlow',
        image: '👨‍💻',
        quote: 'The AI-driven recommendations are spot-on. We\'ve prevented 3 major breaches this quarter alone.',
        rating: 5,
    },
    {
        name: 'Emily Watson',
        role: 'Founder at CloudStart',
        image: '👩‍🚀',
        quote: 'Finally, a security tool that speaks our language. No more technical jargon, just clear actions.',
        rating: 5,
    },
];

const TestimonialCarousel = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="relative"
                >
                    {/* Card */}
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        {/* Quote mark */}
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center text-white text-3xl font-serif">
                            "
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 + i * 0.1, duration: 0.4 }}
                                >
                                    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quote */}
                        <p className="text-gray-700 mb-6 leading-relaxed italic">
                            {testimonial.quote}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center text-2xl">
                                {testimonial.image}
                            </div>
                            <div>
                                <div className="font-bold text-charcoal">{testimonial.name}</div>
                                <div className="text-sm text-gray-500">{testimonial.role}</div>
                            </div>
                            <CheckCircle className="w-5 h-5 text-sage-500 ml-auto" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default TestimonialCarousel;
