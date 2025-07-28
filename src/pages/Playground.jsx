import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import SidebarControls from '../components/SidebarControls';
import Editor from '../components/Editor';
import AuthModal from '../components/AuthModal';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';

const Playground = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#0F0A14] text-[#C7F9CC] font-[Inter]">
      <Header toggleSidebar={toggleSidebar} openAuthModal={() => setIsAuthModalOpen(true)} />
      <div className="flex pt-16">
        <SidebarControls isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <motion.main
          className="flex-1 p-4 sm:p-8 md:ml-64 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Editor />
        </motion.main>
      </div>
      {isAuthModalOpen && !isAuthenticated && (
        <AuthModal closeModal={() => setIsAuthModalOpen(false)} />
      )}
    </div>
  );
};

export default Playground;