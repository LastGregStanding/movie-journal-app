import { registerUserModel, getUserInfo } from "../models/authModel.mjs";
import bcrypt from "bcrypt";

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

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userInfo = await getUserInfo(username);
    console.log("User Info:", userInfo);

    if (!userInfo || userInfo.length === 0) {
      return res.status(404).json({ message: "Username not found" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, userInfo[0].password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.json(userInfo);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { registerUser, loginUser };
