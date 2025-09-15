import React from 'react';
import { 
  Menu, 
  Bell, 
  Search,
  Sun,
  Moon,
  User
} from 'lucide-react';

const Header = ({ 
  isCollapsed, 
  onToggleSidebar, 
  theme, 
  onToggleTheme 
}) => {
  return (
    <header className={`
      bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6
      transition-all duration-300
      ${isCollapsed ? 'ml-20' : 'ml-64'}
      lg:ml-0
    `}>
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <User className="w-8 h-8 text-gray-400" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

