"use client"; // Yeh file client component hai

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Hook yahaan istemal hoga
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const ResetPasswordClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook ab safe hai
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenVerified, setTokenVerified] = useState(false);

  // 1. URL se token nikalein
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      verifyToken(tokenFromUrl);
    } else {
      setError("Invalid or missing token.");
    }
  }, [searchParams]);

  // 2. Token ko verify karein
  const verifyToken = async (tokenToVerify: string) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/verify-forgot-password-token", {
        token: tokenToVerify,
      });
      setTokenVerified(true);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Token verification failed.");
      setTokenVerified(false);
    } finally {
      setLoading(false);
    }
  };

  // 3. Password reset submit karein
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("No token found.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("/api/auth/reset-password", {
        token,
        newPassword: password,
      });

      toast.success(response.data.message || "Password reset successfully!");
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password.");
      toast.error(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // UI based on state
  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-2">Verifying...</p>
      </div>
    );
  }

  if (error && !tokenVerified) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading || !tokenVerified}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordClient;
