// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Firebase
import app, { db } from "./firebase";



// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardLayout from "./components/DashboardLayout";
import ScrollToHash from "./components/ScrollToHash";

// Pages
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
import CategoryListings from "./pages/new/CategoryListings";
import PopularListings from "./components/PopularListings";
import ListingDetail from "./components/ListingDetail";

// ⭐ NEW: Registration Page you provided
import RegistrationPage from "./components/RegistrationPage";

// Renter Pages
import RenterDashboard from "./pages/renter/RenterDashboard";
import MyBookings from "./pages/renter/MyBookings";
import Chat from "./pages/renter/Chat";
import PaymentHistory from "./pages/renter/PaymentHistory";
import Reviews from "./pages/renter/Reviews";

// Owner Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import MyListings from "./pages/owner/MyListings";
import BookingRequests from "./pages/owner/BookingRequests";
import AddNewItem from "./pages/owner/AddNewItem";
import TransactionHistory from "./pages/owner/TransactionHistory";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Listings from "./pages/admin/Listings";
import Transactions from "./pages/admin/Transactions";
import BookingRequestsAdmin from "./pages/admin/BookingRequestsAdmin";
import Categories from "./pages/admin/Categories";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import Announcements from "./pages/admin/Announcements";

// Public Layout Wrapper
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

export default function App() {
  return (
    
      <Router>
        <ScrollToHash />
        <Routes>
          {/* Public Pages */}
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

            {/* ⭐ Registration Page */}
            <Route path="/register" element={<RegistrationPage />} />

            {/* Listings */}
            <Route path="/listings" element={<PopularListings />} />
            <Route path="/listing/:id" element={<ListingDetail />} />

            {/* Category */}
            <Route path="/category/:categoryName" element={<CategoryListings />} />
          </Route>

          {/* Renter Dashboard */}
          <Route path="/renter" element={<DashboardLayout role="renter" />}>
            <Route index element={<RenterDashboard />} />
            <Route path="dashboard" element={<RenterDashboard />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="chat" element={<Chat />} />
            <Route path="payments" element={<PaymentHistory />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>

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
