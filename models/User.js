import mongoose from "mongoose";
import bcrypt from "bcrypt";
const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },password: {
      type: String,
      required: true
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
schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
      return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login
schema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
export const User = mongoose.model("User", schema);
