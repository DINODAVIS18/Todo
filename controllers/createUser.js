import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "Name must be a non-empty string." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    if (!Number.isInteger(age) || age < 0) {
      return res.status(400).json({ message: "Age must be an integer >= 0." });
    }

    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json({ message: "User created successfully.", user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email must be unique." });
    } else {
      res.status(500).json({ message: "Server error.", error: error.message });
    }
  }
};
