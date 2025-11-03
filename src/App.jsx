import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ REQUIRED IMPORT

// Common Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardLayout from "./components/DashboardLayout"; // assuming you have this file

// 🌍 Public Pages
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Choose from "./pages/Choose";
import Testimonials from "./pages/Testimonials";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import ListItem from "./pages/ListItem";

// 👤 Renter Pages
import RenterDashboard from "./pages/renter/RenterDashboard";
import MyBookings from "./pages/renter/MyBookings";
import Chat from "./pages/renter/Chat";
import PaymentHistory from "./pages/renter/PaymentHistory";
import Reviews from "./pages/renter/Reviews";

// 🏠 Owner Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import MyListings from "./pages/owner/MyListings";
import BookingRequests from "./pages/owner/BookingRequests";
import AddNewItem from "./pages/owner/AddNewItem";
import TransactionHistory from "./pages/owner/TransactionHistory";

// 🛠️ Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Listings from "./pages/admin/Listings";
import Transactions from "./pages/admin/Transactions";
import BookingRequestsAdmin from "./pages/admin/BookingRequestsAdmin";
import Categories from "./pages/admin/Categories";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import Announcements from "./pages/admin/Announcements";
import HowItWorks from "./components/HowItWorks";

function App() {
  return (
    <Router>
      <Routes>

        {/* 🌍 Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main className="flex-grow">
                <LandingPage />
              </main>
              <Footer />
            </>
          }
        />

        {/* 📄 Extra Public Pages */}
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        <Route path="/why-choose-us" element={<><Navbar /><Choose /><Footer /></>} />
        <Route path="/testimonials" element={<><Navbar /><Testimonials /><Footer /></>} />
        <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
        <Route path="/terms" element={<><Navbar /><Terms /><Footer /></>} />
        <Route path="/disclaimer" element={<><Navbar /><Disclaimer /><Footer /></>} />
        <Route path="/list-item" element={<><Navbar /><ListItem /><Footer /></>} />

        {/* 🚪 Auth Pages */}
      
        <Route path="/register" element={<><Navbar /><RegisterPage /><Footer /></>} />

        {/* 👤 Renter Dashboard */}
        <Route path="/renter" element={<DashboardLayout role="renter" />}>
          <Route path="dashboard" element={<RenterDashboard />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="chat" element={<Chat />} />
          <Route path="payments" element={<PaymentHistory />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        {/* 🏠 Owner Dashboard */}
        <Route path="/owner" element={<DashboardLayout role="owner" />}>
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="requests" element={<BookingRequests />} />
          <Route path="add" element={<AddNewItem />} />
          <Route path="transactions" element={<TransactionHistory />} />
        </Route>

        {/* 🛠️ Admin Dashboard */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
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

export default App;
