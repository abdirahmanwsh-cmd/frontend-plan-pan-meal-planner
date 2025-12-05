import { useState } from "react";
import { Menu, X, UtensilsCrossed, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <UtensilsCrossed className="w-8 h-8 text-cyan-500 mr-2" />
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Meal Planner
            </Link>
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex items-center space-x-6 ml-8">
            <Link
              to="/meals"
              className="text-gray-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition"
            >
              Meals
            </Link>
            <Link
              to="/favorites"
              className="text-gray-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition"
            >
              Favorites
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-slate-800">
          <Link
            to="/meals"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400"
          >
            Meals
          </Link>
          <Link
            to="/favorites"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400"
          >
            Favorites
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
