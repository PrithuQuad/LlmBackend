import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  role: {
    type: String,
    default: "user", // Default role is user
    enum: ["user", "admin"], // Can be either user or admin
  },    
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);
