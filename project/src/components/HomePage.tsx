import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Camera, Home, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      await signOut();
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Sign Out Button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className={`absolute text-pink-300/30 animate-pulse`}
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                fontSize: `${1 + i * 0.2}rem`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <div className="mb-8 animate-fade-in">
            <Sparkles className="w-16 h-16 text-pink-400 mx-auto mb-4 animate-spin-slow" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-6">
              My Beautiful Love
            </h1>
          </div>

          {/* Romantic Poem */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-200 mb-12 animate-slide-up">
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-700">
              <p className="text-xl md:text-2xl leading-relaxed mb-6 italic">
                "In every sunrise, I see your smile,<br />
                In every sunset, your love so worthwhile.<br />
                Our memories dance like stars above,<br />
                Each moment together, a gift of love."
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                "Your laughter is music, your touch is grace,<br />
                In your loving arms, I've found my place.<br />
                Together we'll build dreams yet to come,<br />
                Two hearts as one, never to be undone."
              </p>

              <p className="text-lg md:text-xl leading-relaxed text-pink-600 font-medium">
                "This space is ours, our love to keep,<br />
                Memories treasured, promises deep.<br />
                Forever and always, through joy and through tears,<br />
                I'll love you, my darling, through all of our years."
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              to="/gallery"
              className="group bg-gradient-to-r from-pink-500 to-purple-500 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Camera className="w-12 h-12 mx-auto mb-4 group-hover:animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Our Precious Memories</h3>
              <p className="text-pink-100">
                Relive our beautiful moments together, organized by the sweetest themes and inside jokes we share
              </p>
            </Link>

            <Link
              to="/dreams"
              className="group bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Home className="w-12 h-12 mx-auto mb-4 group-hover:animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Our Future Dreams</h3>
              <p className="text-purple-100">
                Plan our adventures, dream destinations, and all the beautiful moments we'll create together
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;