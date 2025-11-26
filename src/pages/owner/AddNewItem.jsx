import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Tag,
  MapPin,
  DollarSign,
  FileText,
  ClipboardList,
  Trash2
} from "lucide-react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

// Cloudinary direct upload
async function uploadToCloudinary(file) {
  const CLOUD_NAME = "dxull8mr5";       // Your Cloudinary cloud name
  const UPLOAD_PRESET = "rentapp_uploads"; // Your upload preset

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(url, { method: "POST", body: fd });
  const data = await res.json();
  return data.secure_url;
}

export default function AddNewItem() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    customCategory: false,
    description: "",
    price: "",
    location: "",
    condition: "",
    rentType: "",
    ownerTerms: "",
  });

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]); // {file, preview}

  const defaultCategories = [
    "Cars","Houses","Cameras","Dresses","Laptops","Construction Machinery",
    "Shoes & Heels","Trucks","Bicycles","Electric Scooters","Drones"
  ];

  const conditions = ["New","Used","Excellent","Fair"];
  const rentTypes = ["Daily","Weekly","Monthly"];

  const exceptions = {
    Dress: "Dresses",
    Camera: "Cameras",
    Car: "Cars",
    Truck: "Trucks",
    Bicycle: "Bicycles",
    Scooter: "Electric Scooters",
    Drone: "Drones",
  };

  const normalizeCategory = (cat) => {
    if (!cat) return "";
    cat = cat.trim();
    return exceptions[cat] || (cat.toLowerCase().endsWith("s") ? cat : cat + "s");
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCategoryChange = (e) => {
    if (e.target.value === "Other") {
      setFormData({ ...formData, category: "", customCategory: true });
    } else {
      setFormData({ ...formData, category: e.target.value, customCategory: false });
    }
  };

  // IMAGE HANDLING
  const handleImagePick = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages((prev) => [...prev, ...mapped]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 3)
      return alert("Please upload at least 3 images.");
    if (formData.price < 500)
      return alert("Price must be at least PKR 500.");
    if (formData.ownerTerms.trim().length < 20)
      return alert("Rental conditions must be at least 20 characters.");

    try {
      setLoading(true);

      // Upload images to Cloudinary
      const uploaded = [];
      for (let i = 0; i < images.length; i++) {
        const url = await uploadToCloudinary(images[i].file);
        uploaded.push({
          url,
          caption: "",
          isCover: i === 0,
          order: i
        });
      }

      const categoryToSave = normalizeCategory(formData.category);

      // Save item in Firestore
      await addDoc(collection(db, "items"), {
        name: formData.title,
        category: categoryToSave,
        description: formData.description,
        price: Number(formData.price),
        location: formData.location,
        condition: formData.condition,
        rentType: formData.rentType,
        terms: formData.ownerTerms,
        availability: true,
        ownerId: "user123", // Replace with auth.currentUser.uid if using Firebase Auth
        images: uploaded,
        createdAt: serverTimestamp(),
      });

      // Save custom category if not in defaults
      if (!defaultCategories.includes(categoryToSave)) {
        const categoryRef = collection(db, "categories");
        const q = query(categoryRef, where("name", "==", categoryToSave));
        const existing = await getDocs(q);
        if (existing.empty) {
          await addDoc(categoryRef, { name: categoryToSave, createdAt: serverTimestamp() });
        }
      }

      alert(`✅ Item "${formData.title}" submitted for admin review.`);

      // Reset form
      setFormData({
        title: "",
        category: "",
        customCategory: false,
        description: "",
        price: "",
        location: "",
        condition: "",
        rentType: "",
        ownerTerms: "",
      });
      setImages([]);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to submit item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 md:p-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl p-8 max-w-3xl mx-auto"
      >
        {/* Title */}
        <label className="font-semibold">Item Title</label>
        <div className="flex items-center border rounded-md px-3 py-3 mb-5">
          <Tag size={20} className="text-gray-500 mr-2" />
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. DSLR Camera"
            className="w-full outline-none"
            required
          />
        </div>

        {/* Category */}
        <label className="font-semibold">Category</label>
        <div className="flex items-center border rounded-md px-3 py-3 mb-5">
          <ClipboardList size={20} className="text-gray-500 mr-2" />
          {!formData.customCategory ? (
            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full outline-none bg-transparent"
              required
            >
              <option value="">Select Category</option>
              {defaultCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="Other">Other</option>
            </select>
          ) : (
            <input
              type="text"
              placeholder="Enter category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          )}
        </div>

        {/* Condition */}
        <label className="font-semibold">Condition</label>
        <div className="flex items-center border rounded-md px-3 py-3 mb-5">
          <FileText size={20} className="text-gray-500 mr-2" />
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full outline-none bg-transparent"
            required
          >
            <option value="">Select Condition</option>
            {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Price */}
        <label className="font-semibold">Price (PKR)</label>
        <div className="flex items-center border rounded-md px-3 py-3 mb-5">
          <DollarSign size={20} className="text-gray-500 mr-2" />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 2000"
            className="w-full outline-none"
            required
          />
        </div>

        {/* Location */}
        <label className="font-semibold">Location</label>
        <div className="flex items-center border rounded-md px-3 py-3 mb-5">
          <MapPin size={20} className="text-gray-500 mr-2" />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Karachi, Pakistan"
            className="w-full outline-none"
            required
          />
        </div>

        {/* Rent Type */}
        <label className="font-semibold">Rent Type</label>
        <div className="flex items-center border rounded-md px-3 py-3 mb-5">
          <select
            name="rentType"
            value={formData.rentType}
            onChange={handleChange}
            className="w-full outline-none bg-transparent"
            required
          >
            <option value="">Select Rent Type</option>
            {rentTypes.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
{/* Description */}
<label className="font-semibold">Item Description</label>
<textarea
  name="description"
  value={formData.description}
  onChange={handleChange}
  placeholder="Describe your item..."
  className="w-full border rounded-md p-3 mb-5 outline-none"
  required
/>

        {/* Owner Terms */}
        <label className="font-semibold">Rental Conditions / Terms</label>
        <textarea
          name="ownerTerms"
          value={formData.ownerTerms}
          onChange={handleChange}
          placeholder="Describe rental terms..."
          className="w-full border rounded-md p-3 mb-5 outline-none"
          required
        />

        {/* IMAGE UPLOAD */}
        <label className="font-semibold">Upload Images (min 3)</label>
        <div className="border rounded-md p-4 mb-5">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagePick}
          />
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {images.map((img, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden">
                  <img
                    src={img.preview}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#C47C5E] text-white py-3 rounded-lg mt-4"
        >
          {loading ? "Submitting..." : "Submit for Review"}
        </button>
      </motion.form>
    </section>
  );
}

