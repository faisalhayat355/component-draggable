import React, { useEffect, useState } from 'react';
import {
  Globe,
  Home,
  MonitorSmartphone,
  Smartphone,
  Undo2,
  Redo2,
  Moon,
  Sun,
} from 'lucide-react';

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  // Check localStorage or system preference on load
  useEffect(() => {
    const root = document.documentElement;

    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (stored === 'dark' || (!stored && prefersDark)) {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    const newTheme = isDark ? 'light' : 'dark';

    root.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300">
      
      {/* LEFT: Store name + Live badge */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors">Dawn</span>
        <span className="flex items-center text-xs text-green-800 bg-green-100 px-2 py-0.5 rounded-full dark:text-green-400 dark:bg-green-900 transition-all">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
          Live
        </span>
      </div>

      {/* CENTER: Dropdown-like buttons */}
      <div className="flex items-center space-x-6 text-sm text-gray-700 dark:text-gray-300 transition-colors">
        <div className="cursor-pointer flex items-center space-x-1 hover:text-black dark:hover:text-white transition-colors">
          <Globe className="w-4 h-4" />
          <span>Default</span>
        </div>

        <div className="cursor-pointer flex items-center space-x-1 hover:text-black dark:hover:text-white transition-colors">
          <Home className="w-4 h-4" />
          <span>Home page</span>
        </div>
      </div>

      {/* RIGHT: Icons + Save + Dark Toggle */}
      <div className="flex items-center space-x-4">
        <MonitorSmartphone className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />
        <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />
        <Undo2 className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />
        <Redo2 className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />

        <button
          className="bg-gray-200 text-gray-500 text-sm px-3 py-1 rounded cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 transition-colors"
          disabled
        >
          Save
        </button>

        {/* Dark Mode Toggle Button */}
        <div
          onClick={toggleDarkMode}
          className="cursor-pointer p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          title="Toggle Dark Mode"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
