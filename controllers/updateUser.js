import User from "../models/User.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (name && (typeof name !== "string" || name.trim() === "")) {
      return res.status(400).json({ message: "Name must be a non-empty string." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    if (age !== undefined && (!Number.isInteger(age) || age < 0)) {
      return res.status(400).json({ message: "Age must be an integer >= 0." });
    }

    const user = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
