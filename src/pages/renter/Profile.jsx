import React, { useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Tabinda",
    email: "tabinda@example.com",
    phone: "+92 300 1234567",
    address: "Gujrat, Punjab, Pakistan",
    cnic: "42301-1234567-1",
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  const save = () => {
    // TODO: call API to save
    setProfile(form);
    setEditing(false);
    alert("Profile saved (mock)");
  };

  return (
    <section className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        {!editing ? (
          <>
            <div className="space-y-2">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Address:</strong> {profile.address}</p>
              <p><strong>CNIC:</strong> {profile.cnic}</p>
            </div>
            <div className="mt-4">
              <button onClick={() => { setForm(profile); setEditing(true); }} className="px-4 py-2 bg-[#299F93] text-white rounded">Edit</button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border p-2 rounded" />
              <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="border p-2 rounded" />
              <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="border p-2 rounded" />
              <input value={form.cnic} onChange={e=>setForm({...form,cnic:e.target.value})} className="border p-2 rounded" />
              <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className="border p-2 rounded col-span-2" />
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={save} className="px-4 py-2 bg-[#299F93] text-white rounded">Save</button>
              <button onClick={()=>setEditing(false)} className="px-4 py-2 border rounded">Cancel</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
