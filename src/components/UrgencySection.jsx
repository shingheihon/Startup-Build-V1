import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ShieldAlert, Lock, Users, TrendingUp, AlertTriangle, FileWarning } from 'lucide-react';

const Counter = ({ value, prefix = '', suffix = '', decimals = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, value, motionValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                // Use toFixed for decimals, or Math.floor for whole numbers
                const displayValue = decimals > 0
                    ? latest.toFixed(decimals)
                    : Math.floor(latest).toLocaleString();
                ref.current.textContent = prefix + displayValue + suffix;
            }
        });
    }, [springValue, prefix, suffix, decimals]);

    return <span ref={ref} />;
};

const UrgencySection = () => {
    return (
        <section className="py-24 bg-transparent text-white overflow-hidden relative z-10">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                {/* Removed red blur */}
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sage-500 rounded-full blur-3xl mix-blend-screen opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                        The Cost of Doing Nothing.
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        If you don't secure your business, you're part of a trillion-dollar problem.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    {/* Card 1: Global Cybercrime Cost - Full Width Banner (Top Priority) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-12 bg-gradient-to-r from-red-900/50 to-gray-900 border border-red-500/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
                    >
                        <div className="absolute -right-12 -top-12 p-8 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                            <AlertTriangle className="w-80 h-80 text-red-500" />
                        </div>
                        <div className="relative z-10 w-full">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                <h3 className="text-red-400 font-medium tracking-wider uppercase text-sm">Global Impact</h3>
                            </div>
                            <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
                                <Counter value={10.5} prefix="$" suffix=" Trillion" decimals={1} />
                            </div>
                            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                                Every year, cybercrime is expected to rack up $10.5 trillion in damages worldwide, and SMEs are some of the hardest hit. <span className="text-white font-bold">Don't let yourself become a statistic.</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 2: SMBs Affected Globally */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/30 transition-colors"
                    >
                        <div className="absolute -right-8 -top-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ShieldAlert className="w-48 h-48 text-purple-500" />
                        </div>
                        <h3 className="text-purple-400 text-lg font-medium mb-2 uppercase tracking-wider">SMEs Affected Annually</h3>
                        <div className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                            <Counter value={160} suffix="M" />
                        </div>
                        <p className="text-gray-300 max-w-md relative z-10">
                            Over <span className="text-white font-bold">160 million</span> small businesses worldwide are affected by cyberattacks each year.
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-sm text-gray-400">
                                Based on government-reported SME breach rates (UK, EU, AU, SG) applied to global SME counts (World Bank / OECD).
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3: Average SME Breach Cost */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-red-500/30 transition-colors"
                    >
                        <div className="absolute -right-8 -top-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp className="w-48 h-48 text-red-500" />
                        </div>
                        <h3 className="text-red-400 text-lg font-medium mb-2 uppercase tracking-wider">Average Cost per Breach</h3>
                        <div className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                            <Counter value={180} prefix="$" suffix="k" />
                        </div>
                        <p className="text-gray-300 max-w-md relative z-10">
                            For small businesses, the average cost per incident ranges from <span className="text-white font-bold">$120k–$180k</span>.
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-sm text-gray-400">
                                Costs include lost business, downtime, regulatory fines, reputation damage, recovery & remediation. (IBM Security, 2025)
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default UrgencySection;
