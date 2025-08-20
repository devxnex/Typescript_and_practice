import { useState, useEffect } from "react";

// Check authentication status
export const isAuthenticated = () => {
  return localStorage.getItem("authToken") === "true";
};

// Login function
export const login = () => {
  localStorage.setItem("authToken", "true");
  // Trigger a page reload to update the auth context
  window.location.reload();
};

// Sign-out function
export const signOut = () => {
  localStorage.removeItem("authToken");
  // Trigger a page reload to update the auth context
  window.location.reload();
};

// Custom Hook
export const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: isAuthenticated(),
  });

  // Update auth state when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthState({
        isAuthenticated: isAuthenticated(),
      });
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    login,
    signOut,
  };
};

export type AuthContext = ReturnType<typeof useAuth>;

// Export the hook for use in components
