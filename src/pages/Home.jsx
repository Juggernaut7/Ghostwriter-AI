import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { PenTool, EyeOff, Download, Quote, Edit, Settings, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import PremiumBanner from '../components/PremiumBanner';
import animationData from '../assets/hero-lottie.json'
import logo from "../assets/logo.jpg"
import Header from "../components/Header"

const Home = () => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-[#0F0A14] text-[#C7F9CC] font-[Inter]">
         <Header />
              
      {/* Hero Section */}
      <motion.section
        className="flex flex-col md:flex-row items-center justify-between min-h-screen px-4 sm:px-8 md:px-12 py-12 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="flex-1 max-w-lg text-center md:text-left" variants={cardVariants}>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            variants={cardVariants}
          >
            GhostWriter AI
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-8 max-w-md mx-auto md:mx-0"
            variants={cardVariants}
          >
            Unleash your creativity with AI-powered writing. Craft blogs, tweets, or essays effortlessly in a distraction-free environment.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={cardVariants}
          >
            <Link to="/playground">
              <Button className="bg-[#5D3FD3] hover:bg-[#4B32A8] text-[#C7F9CC] font-semibold py-2 px-6 rounded-lg transition-colors text-sm sm:text-base">
                Try for Free
              </Button>
            </Link>
            <Link to="/playground">
              <Button className="border-[#5D3FD3] text-[#C7F9CC] hover:bg-[#5D3FD3]/20 font-semibold py-2 px-6 rounded-lg transition-colors text-sm sm:text-base">
                Sign Up
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex-1 w-full max-w-md"
          variants={cardVariants}
        >
          <Lottie options={lottieOptions} height="100%" width="100%" />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 px-4 sm:px-8 bg-[#1A1324]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8"
          variants={cardVariants}
        >
          Why GhostWriter AI?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <motion.div
            className="p-6 bg-[#0F0A14] border border-[#5D3FD3]/20 rounded-lg hover:bg-[#5D3FD3]/10 transition-colors"
            variants={cardVariants}
          >
            <PenTool className="w-8 h-8 text-[#5D3FD3] mb-3 mx-auto" />
            <h3 className="text-lg font-semibold mb-2 text-center">Smart Writing</h3>
            <p className="text-sm text-gray-300 text-center">Generate blogs, tweets, or captions with AI tailored to your tone and style.</p>
          </motion.div>
          <motion.div
            className="p-6 bg-[#0F0A14] border border-[#5D3FD3]/20 rounded-lg hover:bg-[#5D3FD3]/10 transition-colors"
            variants={cardVariants}
          >
            <EyeOff className="w-8 h-8 text-[#5D3FD3] mb-3 mx-auto" />
            <h3 className="text-lg font-semibold mb-2 text-center">Distraction-Free</h3>
            <p className="text-sm text-gray-300 text-center">A clean, minimal editor to focus on your words, not the clutter.</p>
          </motion.div>
          <motion.div
            className="p-6 bg-[#0F0A14] border border-[#5D3FD3]/20 rounded-lg hover:bg-[#5D3FD3]/10 transition-colors"
            variants={cardVariants}
          >
            <Download className="w-8 h-8 text-[#5D3FD3] mb-3 mx-auto" />
            <h3 className="text-lg font-semibold mb-2 text-center">Flexible Exports</h3>
            <p className="text-sm text-gray-300 text-center">Copy, save, or export your work as text or markdown with ease.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16 px-4 sm:px-8 bg-[#0F0A14]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8"
          variants={cardVariants}
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <motion.div
            className="p-6 bg-[#0F0A14] border border-[#5D3FD3]/20 rounded-lg hover:bg-[#5D3FD3]/10 transition-colors"
            variants={cardVariants}
          >
            <Quote className="w-6 h-6 text-[#5D3FD3] mb-3 mx-auto" />
            <p className="text-sm text-gray-300 text-center mb-4">"GhostWriter AI transformed my content creation process. It's fast and intuitive!"</p>
            <p className="text-sm font-semibold text-center">— Alex, Content Creator</p>
          </motion.div>
          <motion.div
            className="p-6 bg-[#0F0A14] border border-[#5D3FD3]/20 rounded-lg hover:bg-[#5D3FD3]/10 transition-colors"
            variants={cardVariants}
          >
            <Quote className="w-6 h-6 text-[#5D3FD3] mb-3 mx-auto" />
            <p className="text-sm text-gray-300 text-center mb-4">"The distraction-free editor is a game-changer for my writing focus."</p>
            <p className="text-sm font-semibold text-center">— Sarah, Blogger</p>
          </motion.div>
          <motion.div
            className="p-6 bg-[#0F0A14] border border-[#5D3FD3]/20 rounded-lg hover:bg-[#5D3FD3]/10 transition-colors"
            variants={cardVariants}
          >
            <Quote className="w-6 h-6 text-[#5D3FD3] mb-3 mx-auto" />
            <p className="text-sm text-gray-300 text-center mb-4">"Exporting my work as markdown is so seamless. Highly recommend!"</p>
            <p className="text-sm font-semibold text-center">— Mike, Technical Writer</p>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="py-16 px-4 sm:px-8 bg-[#1A1324]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8"
          variants={cardVariants}
        >
          How GhostWriter AI Works
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <motion.div
            className="p-6 bg-[#0F0A14] border border-[#5D3FD3]/20 rounded-lg hover:bg-[#5D3FD3]/10 transition-colors"
            variants={cardVariants}
          >
            <Edit className="w-8 h-8 text-[#5D3FD3] mb-3 mx-auto" />
            <h3 className="text-lg font-semibold mb-2 text-center">1. Enter Your Prompt</h3>
            <p className="text-sm text-gray-300 text-center">Type your idea or topic to kickstart the writing process.</p>
          </motion.div>
          <motion.div
            className="p-6 bg-[#0F0A14] border border-[#5D3FD3]/20 rounded-lg hover:bg-[#5D3FD3]/10 transition-colors"
            variants={cardVariants}
          >
            <Settings className="w-8 h-8 text-[#5D3FD3] mb-3 mx-auto" />
            <h3 className="text-lg font-semibold mb-2 text-center">2. Customize Your Output</h3>
            <p className="text-sm text-gray-300 text-center">Choose tone, format, and length to tailor the AI's response.</p>
          </motion.div>
          <motion.div
            className="p-6 bg-[#0F0A14] border border-[#5D3FD3]/20 rounded-lg hover:bg-[#5D3FD3]/10 transition-colors"
            variants={cardVariants}
          >
            <Sparkles className="w-8 h-8 text-[#5D3FD3] mb-3 mx-auto" />
            <h3 className="text-lg font-semibold mb-2 text-center">3. Generate & Edit</h3>
            <p className="text-sm text-gray-300 text-center">Get AI-generated text and refine it in our clean editor.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-4 sm:px-8 bg-[#5D3FD3]/10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-4"
          variants={cardVariants}
        >
          Ready to Write Smarter?
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl text-center mb-8 max-w-2xl mx-auto"
          variants={cardVariants}
        >
          Join thousands of creators using GhostWriter AI to craft compelling content effortlessly.
        </motion.p>
        <motion.div
          className="flex justify-center"
          variants={cardVariants}
        >
          <Link to="/playground">
            <Button className="bg-[#5D3FD3] hover:bg-[#4B32A8] text-[#C7F9CC] font-semibold py-3 px-8 rounded-lg transition-colors text-base sm:text-lg">
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Premium Banner */}
      <PremiumBanner />

      {/* Footer */}
      <motion.footer
        className="py-8 px-4 sm:px-8 text-center text-gray-300"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.img
          src={logo}
          alt="GhostWriter AI Logo"
          className="h-12 sm:h-16 mx-auto mb-4"
          variants={cardVariants}
        />
        <p>© 2025 GhostWriter AI. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default Home;