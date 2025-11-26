// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";

// Firebase
import app, { db } from "./firebase";



/* Components */
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import ScrollToHash from "./components/ScrollToHash.jsx";
// Note: Login is handled via modal elsewhere — do not import Login page here

/* Pages */
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Choose from "./pages/Choose";
import Testimonials from "./pages/Testimonials";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import ListItem from "./pages/ListItem";

/* Renter Pages */
import RenterDashboard from "./pages/renter/RenterDashboard.jsx";
import MyBookings from "./pages/renter/MyBookings.jsx";
import Chat from "./pages/renter/Chat.jsx";
import PaymentHistory from "./pages/renter/PaymentHistory.jsx";
import Reviews from "./pages/renter/Reviews.jsx";
/* NEW RENTER PAGES */
import Favorites from "./pages/renter/Favorites.jsx";

import Notifications from "./pages/renter/Notifications.jsx";
import Profile from "./pages/renter/Profile.jsx";
import Settings from "./pages/renter/Settings.jsx";

/* Owner Pages */
import OwnerDashboard from "./pages/owner/OwnerDashboard.jsx";
import MyListings from "./pages/owner/MyListings.jsx";
import BookingRequests from "./pages/owner/BookingRequests.jsx";
import AddNewItem from "./pages/owner/AddNewItem.jsx";
import TransactionHistory from "./pages/owner/TransactionHistory.jsx";

/* Admin Pages */
import Dashboard from "./pages/admin/Dashboard.jsx";
import Users from "./pages/admin/Users.jsx";
import Listings from "./pages/admin/Listings.jsx";
import Bookings from "./pages/admin/Bookings.jsx"; // admin bookings page
import Reports from "./pages/admin/Reports.jsx";

/* Public layout wrapper */
function PublicShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

/* Simple 404 page */
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Page not found</h2>
        <p className="text-gray-600 mb-4">We couldn't find the page you're looking for.</p>
        <a href="/" className="text-[#299F93] font-semibold">Return to home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToHash />

      <Routes>
        {/* Public pages */}
        <Route element={<PublicShell />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/why-choose-us" element={<Choose />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/list-item" element={<ListItem />} />

          {/* Register route */}
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Renter routes (uses DashboardLayout with role="renter") */}
        <Route path="/renter" element={<DashboardLayout role="renter" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<RenterDashboard />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="chat" element={<Chat />} />
          <Route path="payments" element={<PaymentHistory />} />
          <Route path="reviews" element={<Reviews />} />

          {/* New renter pages */}
          <Route path="favorites" element={<Favorites />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Owner Dashboard */}
          {/* Owner Dashboard */}
          <Route path="/owner" element={<DashboardLayout role="owner" />}>
            <Route index element={<OwnerDashboard />} />
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="listings" element={<MyListings />} />
            <Route path="requests" element={<BookingRequests />} />
            <Route path="add" element={<AddNewItem />} />
            <Route path="transactions" element={<TransactionHistory />} />
          </Route>

        {/* Admin Dashboard */}
          {/* Admin Dashboard */}
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="listings" element={<Listings />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="bookings" element={<BookingRequestsAdmin />} />
            <Route path="categories" element={<Categories />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="announcements" element={<Announcements />} />
          </Route>
        </Routes>
      </Router>
   
  );
}
