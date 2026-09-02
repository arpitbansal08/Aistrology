import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react"; // Import icons
import Cookies from "js-cookie";
import Button from "../ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function
  const handleLogout = async () => {
    await axios.get("http://localhost:3000/logout", {
      withCredentials: true,
    });
    Cookies.remove("userToken"); // Remove token from cookies
    setIsLoggedIn(false); // Update state
    navigate("/"); // Redirect to home page
  };
  useEffect(() => {
    setIsProfileOpen(false);
  }, [isLoggedIn]);
  return (
    <header className="w-full bg-stone-900 shadow-md px-6 md:px-10 py-3 flex justify-between items-center border border-white/10">
      <Link
        to="/"
        className="text-xl md:text-2xl font-semibold text-gray-300 hover:text-gray-500"
      >
        <span className="hidden sm:inline">AIstrology</span>
        <span className="sm:hidden">AIstrology</span>
      </Link>

      {/* Mobile Menu Toggle */}
      <Button
        className="block md:hidden text-black"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        {isLoggedIn ? (
          <div className="relative">
            {/* Profile Image */}
            <Button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 px-1 py-1"
            >
              <img
                src="https://cdn.pixabay.com/photo/2013/07/13/10/14/man-156837_1280.png" // Replace with actual profile image
                alt="Profile"
                className="w-full h-full object-contain"
              />
            </Button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <User size={18} /> Profile
                </Link>
                <Button
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut size={18} /> Logout
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-gray-300 hover:text-gray-500">
              Login
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-14 right-6 bg-white w-40 rounded-lg shadow-lg border border-gray-200 md:hidden">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <User size={18} /> Profile
              </Link>
              <Button
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut size={18} /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
