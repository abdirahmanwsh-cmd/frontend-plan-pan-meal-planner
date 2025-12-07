// ThemeToggle.jsx
import { useState, useEffect } from "react"; 

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative w-14 h-7 bg-gray-200 dark:bg-gray-800 rounded-full p-1 transition-colors"
      aria-label="Toggle theme"
    >
      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
        dark ? 'translate-x-7 bg-gradient-to-r from-purple-500 to-purple-500' : 'translate-x-0'
      }`}>
        {dark ? (
          <span className="absolute inset-0 flex items-center justify-center text-xs">🌙</span>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs">☀️</span>
        )}
      </div>
    </button>
  );
}