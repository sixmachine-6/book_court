import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    navigate("/");
  }

  return (
    <nav className="flex justify-between items-center px-6 py-5 border-b border-[#1f2937] bg-[#0b0f14]">
      {" "}
      {/* 🔥 LOGO + TITLE */}
      <div
        onClick={() => navigate("/courts")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src="/favicon.svg" alt="logo" className="w-7 h-7 object-contain" />
        <h1 className="font-bold tracking-widest text-lg text-white">
          BOOK MY COURT
        </h1>
      </div>
      {/* 🔥 ACTIONS */}
      <div className="flex items-center gap-6 text-sm">
        {/* My Bookings */}
        <button
          onClick={() => navigate("/my-bookings")}
          className="text-green-400 hover:text-green-300 transition"
        >
          My Bookings
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-indigo-400 hover:text-indigo-300 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
