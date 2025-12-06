import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MealsPage from "./pages/MealsPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem("favoriteMealIds");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("favoriteMealIds", JSON.stringify(Array.from(favoriteIds)));
  }, [favoriteIds]);

  const toggleFavorite = (id) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MealsPage from './pages/meals/MealsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/meals" replace />} />
          <Route
            path="/meals"
            element={<MealsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/favorites"
            element={<FavoritesPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route path="/" element={<Navigate to="/meals" />} />
          <Route path="/meals" element={<MealsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
export default App;

