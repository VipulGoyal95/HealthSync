import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Video, Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-8 w-8" />
            <span className="text-xl font-bold">HealthMonitor</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-200 transition duration-300">
              Dashboard
            </Link>
            <Link to="/video-consultation" className="hover:text-blue-200 transition duration-300">
              Video Consultation
            </Link>
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition duration-300">
              Emergency Call
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              to="/" 
              className="block hover:bg-blue-700 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/video-consultation" 
              className="block hover:bg-blue-700 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <span>Video Consultation</span>
              </div>
            </Link>
            <button className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition duration-300">
              Emergency Call
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;