import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserMessage from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserMessage.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist!" });
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!correctPassword) {
      return res.status(404).json({ message: "Incorrect Credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  console.log("we are heres");
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await UserMessage.findOne({ email });
    if (existingUser) {
      return res.status(400).json("This email is already registered.");
    }
    if (password !== confirmPassword) {
      return res.status(400).json("The passwords do not match.");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const result = await UserMessage.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    return res.status(200).json({ result, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};
