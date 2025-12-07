// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MealsPage from "./pages/MealsPage";
import PlannerPage from "./pages/PlannerPage";
import ShoppingListPage from "./pages/ShoppingListPage";

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/planner" replace />} />
            <Route path="/meals" element={<MealsPage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/shopping" element={<ShoppingListPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}