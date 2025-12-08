import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth, googleProvider } from "../lib/firebase.js";
import apiClient from "../api/client.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hit backend /auth/me with the token to make sure everything is wired
  const checkBackendAuth = async () => {
    try {
      const res = await apiClient.get("/auth/me");
      console.log("Backend current user:", res.data);
    } catch (err) {
      console.error("Backend auth error:", err);
      // we don't block the login on this for now, just log it
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      await checkBackendAuth();

      setLoading(false);
      navigate("/planner", { replace: true });
    } catch (err) {
      console.error("Failed to sign in with Google:", err);
      setError("Failed to sign in with Google. Please try again.");
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      await checkBackendAuth();

      setLoading(false);
      navigate("/planner", { replace: true });
    } catch (err) {
      console.error("Failed to sign in with email/password:", err);
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Enter your email first to reset password.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      alert("Password reset email sent.");
    } catch (err) {
      console.error("Failed to send reset email:", err);
      setError("Could not send password reset email.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center mb-2">Sign in</h1>

        {error && (
          <p className="mb-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        {loading && (
          <div className="mb-2">
            <LoadingSpinner />
          </div>
        )}

        {/* Email/password form */}
        <form onSubmit={handleEmailSignIn} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            Sign in with email
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full border border-gray-300 bg-white py-2 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
        >
          Continue with Google
        </button>

        <button
          type="button"
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full text-xs text-indigo-600 hover:underline mt-1"
        >
          Forgot your password?
        </button>
      </div>
    </div>
  );
}