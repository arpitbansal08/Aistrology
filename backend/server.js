import axios from "axios";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import openai from "./ai.js";
import { Chat } from "./models/chat.js";
import { User } from "./models/user.js";
import { connectDB } from "./utils/features.js";
import cookieParser from "cookie-parser";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const ROXY_API_KEY = process.env.ROXY_API_KEY;

const app = express();
const server = http.createServer(app);
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
connectDB(MONGO_URI);
console.log("MONGO_URI", MONGO_URI);
// Parse JSON bodies for this app
app.use(express.json());
// Enable CORS

app.use(cors());
const cookieOptions = {
  httpOnly: true,
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "Lax",
  secure: false,
};
// Create a WebSocket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update with your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(cookieParser());
// 🔹 Signup API
app.post("/register", async (req, res) => {
  try {
    // console.log("hello");
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// 🔹 Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .cookie("userToken", token, cookieOptions)
      .json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});
// 🔹 Middleware for Protected Routes
const authenticate = (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    // console.log("verified", verified);
    req.user = verified.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

app.post("/start-chat", authenticate, async (req, res) => {
  try {
    const { dob, time, name, place } = req.body;
    const userId = req.user;
    console.log("userId", userId);
    // Close any existing session for the user
    await Chat.updateMany(
      { userId, status: "active" },
      { status: "completed" }
    );
    console.log(req.body);
    const astrologyData = await axios.post(
      "https://roxyapi.com/api/v1/data/astro/astrology/birth-chart",
      { name, birthdate: dob, time_of_birth: time },
      { headers: { "x-api-key": ROXY_API_KEY } }
    );
    console.log(astrologyData.data);
    // Create a new session
    const newSession = new Chat({
      userId,
      dob,
      time,
      place,
      chatHistory: [],
      astroData: astrologyData.data,
    });
    await newSession.save();

    res.json({ message: "Chat session started!", sessionId: newSession._id });
  } catch (error) {
    res.status(500).json({ error: "Error starting chat session" });
  }
});

// Middleware to authenticate WebSocket users
io.use((socket, next) => {
  try {
    console.log("helllllllll*************");
    cookieParser()(socket.request, socket.request.res, (err) => {
      const token = socket.request.cookies.userToken; // Extract JWT from cookies

      if (!token) {
        return next(new Error("Authentication error: No token provided"));
      }

      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId; // Attach userId to the socket object
      next(); // Proceed to the connection
    });
  } catch (error) {
    next(new Error("Authentication error: Invalid token"));
  }
});

// Handle WebSocket connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.userId}`);

  // socket.join(socket.userId);
  // Retrieve active chat session for this user
  socket.on("initChat", async () => {
    try {
      const session = await Chat.findOne({
        userId: socket.userId,
        status: "active",
      });

      if (!session) {
        socket.emit("error", "No active session found.");
        return;
      }
      console.log("sessionds", session.id);
      socket.join(socket.userId); // User joins their own chat session
      socket.emit("chatHistory", session.chatHistory);
    } catch (error) {
      console.error("Error initializing chat:", error);
      socket.emit("error", "Error initializing chat.");
    }
  });

  // Handle chat messages
  socket.on("chatMessage", async (message) => {
    try {
      const session = await Chat.findOne({
        userId: socket.userId,
        status: "active",
      });

      if (!session) {
        socket.emit("error", "No active chat session.");
        return;
      }

      // Save user message in chat history
      console.log("message", message);
      session.chatHistory.push({ sender: "user", message });
      await session.save();

      // Get AI Response
      const aiResponse = await getAIResponse({
        userMessage: message,
        sessionId: session.id,
      });

      // Save AI response in chat history
      session.chatHistory.push({ sender: "ai", message: aiResponse });
      await session.save();

      // Emit AI response back to the user
      socket.emit("chatMessage", {
        sender: "ai",
        message: aiResponse,
      });
      console.log("Sent AI Response:", aiResponse);
    } catch (error) {
      console.error("Error processing chat message:", error);
      socket.emit("error", "Error processing message.");
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`User ${socket.userId} disconnected.`);
  });
});

// THIS NEEDS TO BE HANDELED BY SOCKET.IO
// app.post("/send-message", authenticate, async (req, res) => {
//   try {
//     const { userId, sender, message } = req.body;
//     // session ==> chat
//     // Find the active session
//     const session = await Chat.findById(userId);
//     if (!session || session.status !== "active") {
//       return res.status(400).json({ error: "No active session found" });
//     }

//     // Add message to chat history
//     session.chatHistory.push({ sender, message });
//     getAIResponse({ message, userId })
//       .then((aiResponse) => {
//         session.chatHistory.push({ sender: "ai", message: aiResponse });
//       })
//       .catch((error) => {
//         console.error("Error with OpenAI:", error);
//         session.chatHistory.push({
//           sender: "ai",
//           message: "Sorry, I couldn't process that.",
//         });
//       });
//     await session.save();

//     res.json({ message: "Message stored!", chatHistory: session.chatHistory });
//   } catch (error) {
//     res.status(500).json({ error: "Error storing message" });
//   }
// });

const getAIResponse = async ({ userMessage, sessionId }) => {
  try {
    const session = await Chat.findById(sessionId);

    console.log("sessionGETAIRESPONSE", session);
    const responsePrompt = `User's birth details:\n- Date: ${
      session.dob
    }\n- Time: ${session.time}\n- Place: ${
      session.place
    }\n\nAstrology Data from RoxyAPI:\n${JSON.stringify(
      session.astroData
    )}\n\nUser's Question: ${userMessage}\n\nProvide a detailed astrology-based response.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "developer",
          content: "You are a knowledgeable astrologer providing insights.",
        },
        { role: "user", content: responsePrompt },
      ],
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error with OpenAI:", error);
    return "Sorry, I couldn't process that.";
  }
};

app.get("/", authenticate, (req, res) => {
  res.send("Server is running");
  console.log(req.user);
});

// Test astrology API route
app.get("/news", async (req, res) => {
  const response = await axios(
    "https://roxyapi.com/api/v1/data/astro/astrology/zodiac/signs",
    {
      headers: { "x-api-key": ROXY_API_KEY },
    }
  );
  res.json(response.data);
  console.log(response.data);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
