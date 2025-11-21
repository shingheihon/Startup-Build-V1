import React from 'react';
    import { motion } from 'framer-motion';
    import { Bot, Zap, Shield, Smartphone, Globe, Code } from 'lucide-react';

    const FeaturesSection = () => {
      const features = [
        {
          icon: Bot,
          title: 'AI-Powered Development',
          description: 'Advanced AI algorithms analyze your requirements and generate optimized code automatically.',
          gradient: 'from-cyan-500 to-blue-600'
        },
        {
          icon: Zap,
          title: 'Lightning Fast Deployment',
          description: 'Deploy your applications to production in minutes, not weeks, with our automated pipeline.',
          gradient: 'from-yellow-500 to-orange-600'
        },
        {
          icon: Shield,
          title: 'Enterprise Security',
          description: 'Built-in security best practices and compliance standards for enterprise-grade applications.',
          gradient: 'from-green-500 to-emerald-600'
        },
        {
          icon: Smartphone,
          title: 'Mobile-First Design',
          description: 'Responsive designs that work perfectly across all devices and screen sizes.',
          gradient: 'from-purple-500 to-pink-600'
        },
        {
          icon: Globe,
          title: 'Global CDN',
          description: 'Worldwide content delivery network ensures fast loading times for users everywhere.',
          gradient: 'from-blue-500 to-indigo-600'
        },
        {
          icon: Code,
          title: 'Clean Code Generation',
          description: 'AI generates maintainable, well-documented code following industry best practices.',
          gradient: 'from-red-500 to-rose-600'
        }
      ];

      return (
        <section className="py-20 bg-gradient-to-b from-zinc-900 to-zinc-800 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6"
              >
                <Bot className="w-4 h-4 text-cyan-500" />
                <span className="text-cyan-500 text-sm font-medium">AI-Powered Features</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Revolutionary Development
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                  Experience
                </span>
              </h2>

              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Harness the power of artificial intelligence to build, deploy, and scale your applications 
                with unprecedented speed and efficiency.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="relative bg-zinc-800/50 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-8 h-full overflow-hidden transition-all duration-500 group-hover:border-cyan-500/40">
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 relative`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-500 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Hover Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-700/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Neural Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.1), transparent 70%)'
                      }}
                    />

                    {/* Scanning Line */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  {/* Floating Particles */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-500/30 rounded-full blur-sm opacity-0 group-hover:opacity-100"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-16"
            >
              <motion.button
                className="relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-700 text-white rounded-lg font-semibold text-lg overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Explore All Features</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      );
    };

    export default FeaturesSection;