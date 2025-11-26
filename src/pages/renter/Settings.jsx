import React, { useState } from "react";

export default function Settings() {
  const [passwords, setPasswords] = useState({ current: "", newpw: "", confirm: "" });

  const changePassword = () => {
    if (passwords.newpw !== passwords.confirm) {
      alert("New password and confirm do not match.");
      return;
    }
    // TODO: call API
    alert("Password changed (mock)");
    setPasswords({ current: "", newpw: "", confirm: "" });
  };

  return (
    <section className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow max-w-xl">
        <h3 className="font-semibold mb-2">Change Password</h3>
        <div className="space-y-3">
          <input type="password" placeholder="Current password" value={passwords.current} onChange={e=>setPasswords({...passwords,current:e.target.value})} className="w-full border p-2 rounded" />
          <input type="password" placeholder="New password" value={passwords.newpw} onChange={e=>setPasswords({...passwords,newpw:e.target.value})} className="w-full border p-2 rounded" />
          <input type="password" placeholder="Confirm new password" value={passwords.confirm} onChange={e=>setPasswords({...passwords,confirm:e.target.value})} className="w-full border p-2 rounded" />
        </div>
        <div className="mt-4">
          <button onClick={changePassword} className="px-4 py-2 bg-[#299F93] text-white rounded">Update Password</button>
        </div>
      </div>
    </section>
  );
}
