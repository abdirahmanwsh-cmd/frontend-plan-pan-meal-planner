import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import PlannerPage from "./pages/PlannerPage";
import MealsPage from "./pages/MealsPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user, loading } = useAuth();

  // While Firebase is resolving auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* Show navbar only when logged in */}
      {user && <Navbar />}

      <div className="main-screen bg-gradient-to-br from-purple-600 to-pink-600 min-h-screen">
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route
            path="/login"
            element={user ? <Navigate to="/planner" replace /> : <LoginPage />}
          />

          {/* PROTECTED ROUTES */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <PlannerPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/planner"
            element={
              <ProtectedRoute>
                <PlannerPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/meals"
            element={
              <ProtectedRoute>
                <MealsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shopping"
            element={
              <ProtectedRoute>
                <ShoppingListPage />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/planner" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
