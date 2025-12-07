import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

// Adjust these if your routes are different
const navItems = [
  { name: "Planner", path: "/planner" },
  { name: "Meals", path: "/meals" },
  { name: "Shopping", path: "/shopping" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 🔑 Single source of truth for logout
  const handleLogout = async () => {
    try {
      await signOut(auth);                // Firebase: end session
      localStorage.removeItem("token");   // remove API token
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / brand */}
        <div className="flex items-center gap-2">
          <Link to="/planner" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              PlanPan
            </h1>
            <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
              Meal planning reimagined
            </p>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* New meal button (keep your styling idea) */}
          <Link
            to="/meals"
            className="hidden sm:inline-flex ml-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full text-sm font-medium hover:from-purple-700 hover:to-pink-600 transition shadow-sm"
          >
            + New Meal
          </Link>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Logout button (desktop) */}
          <button
            type="button"
            onClick={handleLogout}
            className="ml-2 px-3 py-2 rounded-full text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 dark:text-red-300 dark:border-red-800 dark:hover:bg-red-900/40"
          >
            Logout
          </button>
        </div>

        {/* Right side (mobile) */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-full p-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <span className="block w-5 h-[2px] bg-current mb-[3px]" />
            <span className="block w-5 h-[2px] bg-current mb-[3px]" />
            <span className="block w-5 h-[2px] bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pb-3 pt-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Logout button (mobile) */}
          <button
            type="button"
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left block px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/40"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}