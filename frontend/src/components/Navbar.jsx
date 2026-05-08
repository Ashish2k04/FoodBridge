import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu, X, Leaf } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium">Home</Link>
      <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium">About</Link>
      <Link to="/available-foods" className="text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium">Find Food</Link>
      <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium">Contact</Link>
      
      {user ? (
        <>
          {user.role === 'Donor' && (
            <Link to="/donate" className="text-gray-700 dark:text-gray-300 hover:text-primary transition font-medium">Donate Food</Link>
          )}
          <div className="relative inline-block">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary font-medium focus:outline-none"
            >
              <User size={20} />
              <span>{user.name}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-md shadow-lg py-1 z-10 border border-gray-100 dark:border-gray-700">
                <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col md:flex-row gap-3">
          <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary font-medium py-2">Login</Link>
          <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-dark transition text-center font-medium shadow-md shadow-primary/30">Sign Up</Link>
        </div>
      )}
    </>
  );

  return (
    <nav className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Leaf className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">FoodBridge</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-300">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-800 pb-4 pt-2 px-4 shadow-lg flex flex-col gap-4">
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
