import React from "react";
import Registration from "../components/Registration";

export default function RegisterPage() {
  const handleRegistration = (userData) => {
    console.log("✅ New user registered:", userData);
    // TODO: Add backend or Firebase logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Registration onRegister={handleRegistration} />
    </div>
  );
}

