import User from "../models/User.js";

export const readUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};