import { registerUserModel, getUserInfo } from "../models/authModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a user account
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Call the stored procedure with the hashed password
    await registerUserModel(username, email, hashedPassword);
    res.json({ success: true });
  } catch (error) {
    console.log("Error registering user:", error);
    res.status(500).json({ error: "Database error." });
  }
};

// Log a user in
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userInfo = await getUserInfo(username);

    if (!userInfo || userInfo.length === 0) {
      return res.status(404).json({ message: "Username not found" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, userInfo[0].password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: userInfo[0].id, username: userInfo[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set the JWT token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json(userInfo);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Authenticate the user by their token
const authenticateUser = (req, res) => {
  res.json({ user: req.user });
};

// Log the user out
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.json({ message: "Logged out" });
};

export { registerUser, loginUser, authenticateUser, logoutUser };
