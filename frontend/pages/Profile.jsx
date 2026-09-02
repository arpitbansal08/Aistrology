import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Profile = ({ setIsLoggedIn }) => {
  // Demo User Data
  const navigate=useNavigate();
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture: "", // Leave empty to show default icon
  };

  // Demo Subscription Data
  const subscriptions = [
    {
      id: 1,
      plan: "Premium",
      expiryDate: "2025-12-31",
      active: true,
    },
  ];

  // Demo Chat History
  const chatHistory = [
    { message: "What is my daily horoscope?", timestamp: "2025-03-17 10:30 AM" },
    { message: "Tell me about my career prospects.", timestamp: "2025-03-16 4:15 PM" },
    { message: "What is my lucky number today?", timestamp: "2025-03-15 9:00 AM" },
  ];

  // Logout function (only updates UI state)
  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-red-300 rounded-lg shadow-lg m-10">
      {/* User Info Section */}
      <div className="flex items-center gap-4">
        {user.profilePicture ? (
          <img src={user.profilePicture} alt="Profile" className="w-16 h-16 rounded-full" />
        ) : (
          <FaUserCircle className="text-4xl text-gray-500" />
        )}
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Subscription</h3>
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div key={sub.id} className="mt-2 p-4 border rounded-lg">
              <p>
                <strong>Plan:</strong> {sub.plan}
              </p>
              <p>
                <strong>Expires on:</strong> {new Date(sub.expiryDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {sub.active ? "Active ✅" : "Expired ❌"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No active subscriptions.</p>
        )}
      </div>

      {/* Chat History Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Chat History</h3>
        {chatHistory.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {chatHistory.map((chat, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded-lg">
                <p className="text-gray-800">{chat.message}</p>
                <p className="text-sm text-gray-500">{chat.timestamp}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No chat history found.</p>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        <MdLogout /> Logout
      </button>
    </div>
  );
};

export default Profile;
