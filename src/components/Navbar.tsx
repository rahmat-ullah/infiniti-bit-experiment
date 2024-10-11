import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navAnimation = useSpring({
    height: isScrolled ? 60 : 80,
    background: isScrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
    boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
  });

  const logoAnimation = useSpring({
    transform: isScrolled ? 'scale(0.8)' : 'scale(1)',
  });

  return (
    <animated.nav
      style={navAnimation}
      className="fixed w-full top-0 left-0 z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        <animated.div style={logoAnimation} className="flex items-center">
          <Menu className="text-blue-600 h-8 w-8 mr-2" />
          <span className="text-xl font-bold text-blue-600">TechInnovate</span>
        </animated.div>
        
        <div className="hidden md:flex space-x-6">
          {['Home', 'About Us', 'Services', 'Projects', 'Solutions', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 flex items-center">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </button>
        </div>
        
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md">
          {['Home', 'About Us', 'Services', 'Projects', 'Solutions', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full text-left bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors duration-300 flex items-center">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </button>
        </div>
      )}
    </animated.nav>
  );
};

export default Navbar;