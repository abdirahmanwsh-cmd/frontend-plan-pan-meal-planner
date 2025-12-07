// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import apiClient from "../api/client";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const checkBackendAuth = async () => {
  try {
    const res = await apiClient.get("/auth/me");
    console.log("Backend current user:", res.data);
  } catch (err) {
    console.error("Backend auth error:", err);
  }
};

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      localStorage.setItem("token", idToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      await checkBackendAuth();
    } catch (err) {
      console.error(err);
      setError("Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await result.user.getIdToken();
      localStorage.setItem("token", idToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setError("Please enter your email to reset password.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome to fitplate</h1>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        {user ? (
          <div className="text-center text-green-600 font-medium">
            Logged in as {user.displayName || user.email}
          </div>
        ) : (
          <>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className={`w-full py-3 mb-6 flex justify-center items-center gap-2 text-white rounded-lg transition-colors ${
                loading
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
           
             <img src="/google.png" alt="Google" className="w-5 h-5" />
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>

            <form className="flex flex-col gap-4" onSubmit={handleEmailSignIn}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors ${
                  loading ? "bg-red-300 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-right mt-2">
              <button
                onClick={handleForgotPassword}
                className="text-red-500 hover:underline"
              >
                Forgot password?
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;








