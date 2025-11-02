import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  MessageSquare,
  CreditCard,
  Star,
  LogOut,
  BarChart2,
  PlusCircle,
  FileText,
} from "lucide-react";

export default function DashboardLayout({ role = "renter" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = {
    renter: [
      { name: "Dashboard", path: "/renter/dashboard", icon: Home },
      { name: "My Bookings", path: "/renter/bookings", icon: User },
      { name: "Chat", path: "/renter/chat", icon: MessageSquare },
      { name: "Payments", path: "/renter/payments", icon: CreditCard },
      { name: "Reviews", path: "/renter/reviews", icon: Star },
    ],
    owner: [
      { name: "Dashboard", path: "/owner/dashboard", icon: Home },
      { name: "My Listings", path: "/owner/listings", icon: User },
      { name: "Bookings", path: "/owner/requests", icon: MessageSquare },
      { name: "Add New Item", path: "/owner/add", icon: Star },
      { name: "Transactions", path: "/owner/transactions", icon: CreditCard },
    ],
    admin: [
      { name: "Dashboard", path: "/admin/dashboard", icon: Home },
      { name: "Users", path: "/admin/users", icon: User },
      { name: "Listings", path: "/admin/listings", icon: Home },
      { name: "Transactions", path: "/admin/transactions", icon: BarChart2 },
      { name: "Booking Requests", path: "/admin/bookings", icon: MessageSquare },
      { name: "Categories", path: "/admin/categories", icon: PlusCircle },
      { name: "Reports", path: "/admin/reports", icon: FileText },
      { name: "Settings", path: "/admin/settings", icon: User },
      { name: "Announcements", path: "/admin/announcements", icon: MessageSquare },
    ],
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-[#299F93] mb-4">EasyRent</h2>
          <nav className="flex-1 overflow-y-auto space-y-2">
            {menus[role].map(({ name, path, icon: Icon }) => {
              const isActive = location.pathname.startsWith(path);
              return (
                <Link
                  key={name}
                  to={path}
                  className={`flex items-center gap-3 py-2 px-3 rounded-md transition ${
                    isActive
                      ? "bg-[#299F93] text-white"
                      : "hover:bg-[#e8f5f3] text-gray-800"
                  }`}
                >
                  <Icon size={18} />
                  {name}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium mt-4"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}


