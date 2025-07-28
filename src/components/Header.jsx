import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import Button from './ui/Button';
import WritingContext  from '../contexts/WritingContext';
import { AuthContext } from '../contexts/AuthContext';
import logo from "../assets/logo.jpg";
const Header = ({ openAuthModal }) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0F0A14] border-b border-[#5D3FD3]/20 flex items-center justify-between px-4 sm:px-8 z-50">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="GhostWriter AI Logo"
          className="h-10 sm:h-12"
        />
      </div>
      <nav className="hidden sm:flex items-center gap-6">
        <Link to="/" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm sm:text-base font-[Inter] transition-colors">Home</Link>
        <Link to="/playground" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm sm:text-base font-[Inter] transition-colors">Playground</Link>
        <Link to="/features" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm sm:text-base font-[Inter] transition-colors">Features</Link>
        <Link to="/testimonials" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm sm:text-base font-[Inter] transition-colors">Testimonials</Link>
        <Link to="/pricing" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm sm:text-base font-[Inter] transition-colors">Pricing</Link>
        <Link to="/blog" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm sm:text-base font-[Inter] transition-colors">Blog</Link>
      </nav>
      <div className="flex items-center gap-3 sm:gap-4">
        <Button
          variant="outline"
          className="text-[#C7F9CC] border-[#5D3FD3] hover:bg-[#5D3FD3]/20 text-sm sm:text-base"
          onClick={openAuthModal}
        >
          {isAuthenticated ? (
            <>
              <User className="w-4 h-4 mr-2" />
              {user?.email || 'Logout'}
            </>
          ) : 'Login / Sign Up'}
        </Button>
        {isAuthenticated && (
          <Button
            variant="outline"
            className="text-[#C7F9CC] border-[#5D3FD3] hover:bg-[#5D3FD3]/20 text-sm sm:text-base"
            onClick={logout}
          >
            Logout
          </Button>
        )}
        <button
          className="sm:hidden p-2"
          onClick={toggleNav}
          aria-label="Toggle Navigation"
        >
          <Menu className="w-6 h-6 text-[#C7F9CC]" />
        </button>
      </div>
      {isNavOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleNav}></div>
      )}
      {isNavOpen && (
        <nav className="fixed top-16 right-4 w-48 bg-[#0F0A14] border border-[#5D3FD3]/20 rounded-lg p-4 flex flex-col gap-2 z-50">
          <Link to="/" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm font-[Inter] transition-colors" onClick={toggleNav}>Home</Link>
          <Link to="/playground" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm font-[Inter] transition-colors" onClick={toggleNav}>Playground</Link>
          <Link to="/features" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm font-[Inter] transition-colors" onClick={toggleNav}>Features</Link>
          <Link to="/testimonials" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm font-[Inter] transition-colors" onClick={toggleNav}>Testimonials</Link>
          <Link to="/pricing" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm font-[Inter] transition-colors" onClick={toggleNav}>Pricing</Link>
          <Link to="/blog" className="text-[#5D3FD3] hover:text-[#C7F9CC] text-sm font-[Inter] transition-colors" onClick={toggleNav}>Blog</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;