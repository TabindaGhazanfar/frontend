import React from "react";
import Login from "../components/Login";

export default function LoginPage() {
  const handleLogin = (credentials) => {
    console.log("User logged in with:", credentials);
    // TODO: Add backend or Firebase login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <Login onLogin={handleLogin} />
    </div>
  );
}
