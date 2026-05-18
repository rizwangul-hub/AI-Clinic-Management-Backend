import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../modules/user.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role, subscriptionPlan } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(409).json({
        message: "User already exists",
        forword: false,
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashpassword,
      role, // added
      subscriptionPlan, // added
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      forword: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "35h",
      },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      forword: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
export const GoogleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // Fetch user info from Google using the access token
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    const { email, name } = await response.json();

    let user = await User.findOne({ email });
    if (!user) {
      // Generate a random secure password for Google users
      const randomPassword =
        Math.random().toString(36).slice(-10) +
        Math.random().toString(36).slice(-10);
      const hashpassword = await bcrypt.hash(randomPassword, 10);

      user = new User({
        name,
        email,
        password: hashpassword,
        role: "Patient", // default role
        subscriptionPlan: "Free",
      });
      await user.save();
    }

    
    const jwtToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "35h",
      },
    );

    res.status(200).json({
      message: "Google login successful",
      token: jwtToken,
      forword: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
