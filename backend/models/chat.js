import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dob: { type: String, required: true },
  time: { type: String, required: true },
  place: { type: String, required: true },
  chatHistory: [
    {
      sender: { type: String, enum: ["user", "ai"], required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "completed"], default: "active" },
  astroData: { type: Object },
});

export const Chat = mongoose.model("chat", ChatSchema);

