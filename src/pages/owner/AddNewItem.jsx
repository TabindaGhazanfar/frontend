import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Tag,
  MapPin,
  DollarSign,
  FileText,
  ClipboardList,
} from "lucide-react";

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
    itemImage: null,
  });

  const [previewItem, setPreviewItem] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    if (e.target.value === "Other") {
      setFormData({ ...formData, category: "", customCategory: true });
    } else {
      setFormData({
        ...formData,
        category: e.target.value,
        customCategory: false,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, itemImage: file });
    setPreviewItem(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.itemImage)
      return alert("Please upload an image of the item.");

    if (formData.price < 500)
      return alert("Price must be at least PKR 500 to ensure fair rental value.");

    if (formData.ownerTerms.trim().length < 20)
      return alert("Please add clear rental conditions (minimum 20 characters).");

    alert(`✅ Item "${formData.title}" submitted for admin review.`);

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
      itemImage: null,
    });
    setPreviewItem(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f0fdf4] to-[#fffaf0] p-6 md:p-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#C47C5E] mb-2">
          Add New Listing 🧾
        </h1>
        <p className="text-gray-600">
          Add item details and your personal rental conditions below.
        </p>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto"
      >
        {/* Item Title */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Item Title
          </label>
          <div className="flex items-center border rounded-md px-3 py-3">
            <Tag size={20} className="text-gray-500 mr-2" />
            <input
              type="text"
              name="title"
              placeholder="e.g. Canon DSLR Camera"
              value={formData.title}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Category & Condition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              required
              className="w-full border rounded-md px-3 py-3 outline-none bg-gray-50 focus:ring-2 focus:ring-[#C47C5E]"
            >
              <option value="">Select category</option>
              <option value="Car">Car</option>
              <option value="Camera">Camera</option>
              <option value="Dress">Dress</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Event Equipment">Event Equipment</option>
              <option value="Other">Other (Type manually)</option>
            </select>

            {/* Show manual input if “Other” selected */}
            {formData.customCategory && (
              <motion.input
                type="text"
                placeholder="Enter your custom category name"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full mt-3 border px-3 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#C47C5E]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                required
              />
            )}
          </div>

          {/* Condition */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Condition
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-3 outline-none bg-gray-50 focus:ring-2 focus:ring-[#C47C5E]"
            >
              <option value="">Select condition</option>
              <option>New</option>
              <option>Like New</option>
              <option>Used</option>
            </select>
          </div>
        </div>

        {/* Rent Type & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Rent Type
            </label>
            <select
              name="rentType"
              value={formData.rentType}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-3 outline-none bg-gray-50 focus:ring-2 focus:ring-[#C47C5E]"
            >
              <option value="">Select rent type</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price (PKR)
            </label>
            <div className="flex items-center border rounded-md px-3 py-3">
              <DollarSign size={20} className="text-gray-500 mr-2" />
              <input
                type="number"
                name="price"
                placeholder="e.g. 2500"
                value={formData.price}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Location
          </label>
          <div className="flex items-center border rounded-md px-3 py-3">
            <MapPin size={20} className="text-gray-500 mr-2" />
            <input
              type="text"
              name="location"
              placeholder="e.g. Lahore, Pakistan"
              value={formData.location}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <div className="flex items-start border rounded-md px-3 py-3">
            <FileText size={20} className="text-gray-500 mr-2 mt-1" />
            <textarea
              name="description"
              rows="4"
              placeholder="Describe your item (brand, features, etc.)"
              value={formData.description}
              onChange={handleChange}
              className="w-full outline-none resize-none"
              required
            ></textarea>
          </div>
        </div>

        {/* Owner’s Rental Conditions */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
            <ClipboardList size={20} className="text-[#C47C5E]" />
            Rental Conditions
          </label>
          <textarea
            name="ownerTerms"
            rows="4"
            placeholder="Example: Renter must return the car with a full tank. Any damage will be charged. Deposit of PKR 5,000 is required."
            value={formData.ownerTerms}
            onChange={handleChange}
            className="w-full border rounded-md p-3 outline-none resize-none focus:ring-2 focus:ring-[#C47C5E]"
            required
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            Add specific rules renters must follow when using your item.
          </p>
        </div>

        {/* Image Upload */}
        <div className="mb-8 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#C47C5E] transition">
          <Upload size={32} className="text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-3">
            Upload an image of the item for verification
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="upload"
          />
          <label
            htmlFor="upload"
            className="cursor-pointer text-[#C47C5E] font-semibold hover:underline"
          >
            Browse Files
          </label>

          {/* Image Preview */}
          {previewItem && (
            <motion.img
              src={previewItem}
              alt="Item Preview"
              className="mt-4 rounded-lg w-full h-56 object-cover shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-[#C47C5E] hover:bg-[#a96850] text-white py-3 rounded-md font-semibold transition"
        >
          Submit for Review
        </motion.button>
      </motion.form>
    </section>
  );
}

