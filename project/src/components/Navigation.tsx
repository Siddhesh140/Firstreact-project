import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Heart, Home } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/gallery"
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              isActive('/gallery')
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                : 'text-pink-600 hover:bg-pink-100 hover:scale-105'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span className="font-medium">Our Memories</span>
          </Link>

          <Link
            to="/"
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              isActive('/')
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                : 'text-pink-600 hover:bg-pink-100 hover:scale-105'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/dreams"
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              isActive('/dreams')
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                : 'text-pink-600 hover:bg-pink-100 hover:scale-105'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Our Dreams</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;