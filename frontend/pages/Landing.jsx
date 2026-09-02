import { motion } from "framer-motion";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React, { useEffect, useRef, useState } from "react";
import bgImage from "../src/assets/landing_bg.jpeg";
import TextareaAutosize from "react-textarea-autosize";
import Login from "./Login"; // Import Login modal
import { Dialog, DialogContent } from "../components/ui/Dialog"; // Import Dialog components
import BirthDetailsForm from "./BirthDetailsForm"; // Import BirthDetailsForm component
import axios from "axios";
const Landing = ({ isLoggedIn, setIsLoggedIn }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleBirthDetailsSubmit = async (details) => {
    console.log("Received details:", details);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.type === "form"
          ? {
              text: `DOB: ${details.dob}, Time: ${details.time}, Place: ${details.place.label}`,
              sender: "user",
            }
          : msg
      )
    );

    // Send details to backend (Replace with actual API call)

    console.log("Sending to backend:", details);

    try {
      const res = await axios.post(
        "http://localhost:3000/start-chat",
        details,
        {
          withCredentials: true,
        }
      );
      console.log("Response from backend:", res);
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thank you! Now you can ask astrology-related questions.",
          sender: "ai",
        },
      ]);
    }, 1000);
  };
  const handleSend = () => {
    if (!isLoggedIn && messages.length >= 5) {
      setIsDialogOpen(true); // Open dialog after 5 messages
      return;
    }
    if (!isLoggedIn && messages.length === 1) {
      // Show a form get user details such as DOB, TIME OF BIRTH, PLACE OF BIRTH
      // Save the details in the database
      // Send the details to the backend
      // Get the response from the backend
      // Show the response to the user
    }
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }]);
      if (messages.length === 0) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              text: "Hello, I am AIstrology. I need some details to provide you with accurate predictions. Please provide your Date of Birth, Time of Birth, and Place of Birth.",
              sender: "ai",
            },
            {
              type: "form", // Special message type
              sender: "ai",
            },
          ]);
          // Show a form get user details such as DOB, TIME OF BIRTH, PLACE OF BIRTH
        }, 1000);
      } else {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { text: "AI response to: " + message, sender: "ai" },
          ]);
        }, 1000);
      }
      setMessage("");
      setHasSentMessage(true);
      setShowLogo(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex flex-col items-start w-full h-[92vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {showLogo && (
        <motion.div
          className="absolute text-white text-4xl font-black italic top-1/3 left-1/2 transform -translate-x-1/2"
          animate={hasSentMessage ? { opacity: 0 } : { opacity: 1 }}
        >
          Ask to Your AIstrologer Now!
        </motion.div>
      )}

      {/* Chat Message Container */}
      <div className="absolute bottom-35 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[600px] max-h-[60vh] overflow-y-auto scrollbar-transparent flex flex-col">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 m-2 max-w-xs text-white rounded-lg shadow-md break-words ${
              msg.sender === "user"
                ? "self-end bg-gray-700"
                : "self-start bg-blue-500"
            }`}
          >
            {msg.type === "form" ? (
              <BirthDetailsForm onSubmit={handleBirthDetailsSubmit} />
            ) : (
              msg.text
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[600px]"
        animate={hasSentMessage ? { bottom: "6%" } : { bottom: "50%" }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-4xl bg-[#787878]/50 shadow-md w-full max-w-[800px] overflow-hidden">
          <TextareaAutosize
            ref={textareaRef}
            placeholder="Message AIstrology..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white/90 placeholder-white/50 text-xl 
            focus:outline-none resize-none w-full min-h-[40px] max-h-[200px] overflow-y-auto"
            maxRows={6}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
            }}
          />
          <button
            onClick={handleSend}
            className="p-2 transition duration-200 ease-in-out hover:bg-white/10 active:scale-90 rounded-2xl hover:scale-105"
          >
            <ArrowUpwardIcon className="bg-black rounded-2xl scale-130" />
          </button>
        </div>
      </motion.div>

      {/* 🚨 Login/Signup Required Dialog 🚨 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#2f2f2f] text-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center">
          <h2 className="text-xl font-bold">Thanks for trying AIstrology</h2>
          <p className="text-gray-400 mt-2 mb-6">
            Log in or sign up to continue chatting with AIstrology.
          </p>

          <div className="flex flex-col gap-3">
            <button
              className="w-full px-4 py-2 bg-white text-black font-medium rounded-2xl hover:bg-gray-300"
              onClick={() => {
                setIsSignupMode(false); // Open Login Mode
                setIsLoginModalOpen(true);
                setIsDialogOpen(false);
              }}
            >
              Log in
            </button>

            <button
              className="w-full px-4 py-2 bg-[#2f2f2f] border border-white/10 text-white font-medium rounded-2xl hover:bg-gray-600"
              onClick={() => {
                setIsSignupMode(true); // Open Signup Mode
                setIsLoginModalOpen(true);
                setIsDialogOpen(false);
              }}
            >
              Sign up for free
            </button>
          </div>

          <p
            className="mt-4 text-sm text-gray-400 underline cursor-pointer hover:text-gray-300"
            onClick={() => setIsDialogOpen(false)}
          >
            Stay logged out
          </p>
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <Login
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          setIsLoggedIn={setIsLoggedIn}
          isSignupMode={isSignupMode} // Pass the mode to Login Component
        />
      )}
    </div>
  );
};

export default Landing;
