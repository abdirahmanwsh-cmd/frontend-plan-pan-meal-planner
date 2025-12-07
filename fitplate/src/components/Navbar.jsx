// Navbar.jsx
import React, { useState } from "react"; 
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with icon */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Plan Pan</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Meal planning reimagined</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
            {[
              { name: 'Planner', path: '/planner', icon: '📅' },
              { name: 'Meals', path: '/meals', icon: '🍽️' },
              { name: 'Shopping', path: '/shopping', icon: '🛒' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="flex items-center px-5 py-2.5 rounded-full font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm transition-all"
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <button className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all">
              <span className="mr-2">+</span> New Meal
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <span className="sr-only">Menu</span>
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['Planner', 'Meals', 'Shopping'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}