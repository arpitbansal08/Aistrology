import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true }, // Only for Google users
  username: { type: String, unique: true, sparse: true }, // Optional for Google users
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Only for manual sign-ups
});

export const User = mongoose.model("User", UserSchema);
