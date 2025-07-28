import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import Input from './ui/Input';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const AuthModal = ({ closeModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isLogin ? login : signup;
    const result = action(email, password);
    if (result.success) {
      toast.success(isLogin ? 'Logged in successfully!' : 'Signed up successfully!');
      closeModal();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#0F0A14] p-6 rounded-lg border border-[#5D3FD3]/20 w-full max-w-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-xl font-semibold text-[#C7F9CC] mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <Button
            type="submit"
            className="w-full bg-[#5D3FD3] hover:bg-[#4B32A8] text-[#C7F9CC]"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <p className="text-sm text-gray-300 mt-4 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="text-[#5D3FD3] hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
        <Button
          variant="outline"
          className="w-full mt-4 text-[#C7F9CC] border-[#5D3FD3] hover:bg-[#5D3FD3]/20"
          onClick={closeModal}
        >
          Close
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;