import React, { useState } from 'react';
import { Menu, X, Home, Search, PlusCircle, User, LogOut, Bookmark, Settings } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  user: UserType | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'landing', icon: Home },
    { name: 'Search', id: 'search', icon: Search },
    { name: 'Post Listing', id: 'create', icon: PlusCircle },
  ];

  const handleNav = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="bg-uc-red text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => handleNav('landing')}>
            <Home className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl tracking-tight">SubletUC</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-red-800 text-white'
                      : 'text-white hover:bg-red-700'
                  }`}
                >
                  <item.icon size={16} className="mr-1.5" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* User Profile / Auth */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                 <button onClick={() => handleNav('saved')} className="p-2 rounded-full hover:bg-red-700 transition-colors" title="Saved Listings">
                    <Bookmark size={20} />
                 </button>
                 <div className="relative group">
                    <button className="flex items-center space-x-2 text-sm focus:outline-none">
                        <img 
                            src={user.profilePicture || "https://picsum.photos/200"} 
                            alt="Profile" 
                            className="h-8 w-8 rounded-full border-2 border-white"
                        />
                        <span className="font-medium">{user.firstName}</span>
                    </button>
                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-uc-dark opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                        <button onClick={() => handleNav('profile')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center">
                            <User size={14} className="mr-2"/> Profile
                        </button>
                        <button onClick={() => handleNav('settings')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center">
                            <Settings size={14} className="mr-2"/> Settings
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600 flex items-center">
                            <LogOut size={14} className="mr-2"/> Sign out
                        </button>
                    </div>
                 </div>
              </div>
            ) : (
              <button
                onClick={() => handleNav('auth')}
                className="bg-white text-uc-red hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-red-700 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-red-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex w-full items-center px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id
                    ? 'bg-red-900 text-white'
                    : 'text-gray-100 hover:bg-red-700'
                }`}
              >
                <item.icon size={18} className="mr-2" />
                {item.name}
              </button>
            ))}
            
            <div className="border-t border-red-700 my-2 pt-2">
                {user ? (
                    <>
                        <button onClick={() => handleNav('saved')} className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-red-700">
                             <Bookmark size={18} className="mr-2"/> Saved Listings
                        </button>
                        <button onClick={() => handleNav('profile')} className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-red-700">
                             <User size={18} className="mr-2"/> Profile
                        </button>
                         <button onClick={() => handleNav('settings')} className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-red-700">
                             <Settings size={18} className="mr-2"/> Settings
                        </button>
                        <button onClick={onLogout} className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-red-200 hover:bg-red-700">
                             <LogOut size={18} className="mr-2"/> Sign Out
                        </button>
                    </>
                ) : (
                    <button onClick={() => handleNav('auth')} className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-white bg-uc-purple hover:bg-purple-800">
                        Sign In / Register
                    </button>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;