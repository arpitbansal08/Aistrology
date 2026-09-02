import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "../components/ui/Button";
import { Dialog, DialogContent } from "../components/ui/Dialog";
import Input from "../components/ui/Input";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Backend URL

const googleLogin = () => {
  window.open(`${API_BASE_URL}/auth/google`, "_self"); // Open in the same tab for better UX
};

function Login({
  isOpen = true,
  onClose = () => {},
  setIsLoggedIn,
  isSignupMode,
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    setIsLogin(!isSignupMode);
  }, [isSignupMode]);
  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const endpoint = isLogin ? "/login" : "/register"; // API route based on mode
      const payload = isLogin ? { email, password } : { name, email, password };
      const res = await axios.post(`${API_BASE_URL}${endpoint}`, payload, {
        withCredentials: true, // Ensures JWT token is stored in cookies
      });

      setLoading(false);
      setIsLoggedIn(true); // Update App state to reflect login
      onClose(); // Close modal on success
      navigate("/"); // Redirect to home page after login
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <Dialog open={Boolean(isOpen)} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>
        <p className="text-gray-500 mb-4">
          {isLogin ? "Welcome back!" : "Create your account"}
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-4">
          {!isLogin && (
            <Input
              type="text"
              placeholder="Full Name"
              className="w-full text-gray-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border bg-stone-100 text-gray-900 px-4 py-2 rounded-md"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border bg-stone-100 text-gray-900 px-4 py-2 rounded-md"
          />

          <Button
            className="w-full bg-stone-600 text-white hover:bg-stone-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </Button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative text-sm text-gray-500 bg-white px-2">OR</div>
        </div>

        <Button
          className="flex w-full items-center gap-2 border bg-gray-100 text-gray-900 px-4 py-2 rounded-md"
          onClick={googleLogin}
        >
          <FcGoogle className="text-xl" /> Sign in with Google
        </Button>

        <p className="mt-4 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-stone-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
