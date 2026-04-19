import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
