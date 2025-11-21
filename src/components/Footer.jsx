import React from 'react';
    import { motion } from 'framer-motion';
    import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

    const Footer = () => {
      const footerSections = [
        {
          title: 'Quick Links',
          links: [
            { name: 'Home', href: '/' },
            { name: 'Features', href: '/features' },
            { name: 'Pricing', href: '/pricing' },
            { name: 'About', href: '/about' }
          ]
        },
        {
          title: 'Features',
          links: [
            { name: 'AI Development', href: '#' },
            { name: 'Auto Deployment', href: '#' },
            { name: 'Real-time Collaboration', href: '#' },
            { name: 'Version Control', href: '#' }
          ]
        },
        {
          title: 'Company',
          links: [
            { name: 'About Us', href: '/about' },
            { name: 'Contact', href: '/about#contact' },
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' }
          ]
        }
      ];

      const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Mail, href: '#', label: 'Email' }
      ];

      return (
        <footer className="bg-zinc-900 border-t border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <motion.div 
                  className="flex items-center space-x-2 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <Zap className="w-8 h-8 text-cyan-500" />
                    <div className="absolute inset-0 w-8 h-8 bg-cyan-500/20 rounded-full blur-md animate-pulse" />
                  </div>
                  <span className="text-xl font-bold text-white">AI<span className="text-cyan-500">Dev</span></span>
                </motion.div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Revolutionizing web and mobile app development with AI-powered automation and cutting-edge technology.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="relative p-2 text-slate-300 hover:text-cyan-500 transition-colors duration-300 group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                      <div className="absolute inset-0 bg-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Footer Sections */}
              {footerSections.map((section, sectionIndex) => (
                <div key={section.title}>
                  <motion.h3 
                    className="text-white font-semibold mb-4 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.1 }}
                  >
                    {section.title}
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-700" />
                  </motion.h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li 
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                      >
                        <a
                          href={link.href}
                          className="text-slate-300 hover:text-cyan-500 transition-colors duration-300 relative group"
                        >
                          {link.name}
                          <div className="absolute inset-0 bg-cyan-500/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-2 -my-1" />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter Section */}
            <motion.div 
              className="mt-12 pt-8 border-t border-cyan-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
                  <p className="text-slate-300">Get the latest AI development insights and updates.</p>
                </div>
                <div className="flex w-full md:w-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 md:w-64 px-4 py-2 bg-zinc-800 border border-cyan-500/30 rounded-l-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                  <motion.button
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 text-white rounded-r-lg font-medium hover:from-blue-700 hover:to-cyan-500 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Bottom Bar */}
            <motion.div 
              className="mt-8 pt-8 border-t border-cyan-500/20 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-slate-400 text-sm">
                © 2025 AIDev. All rights reserved.
              </p>
              <p className="text-slate-400 text-sm">
                Built with ❤️ by <a rel="nofollow" target="_blank" href="https://meku.dev" className="text-cyan-500 hover:text-cyan-400 transition-colors duration-300">Meku.dev</a>
              </p>
            </motion.div>
          </div>
        </footer>
      );
    };

    export default Footer;