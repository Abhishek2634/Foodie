import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with initial loyalty points and welcome achievement
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      loyaltyPoints: 500,
      totalPointsEarned: 500,
      achievements: [{
        id: 'welcome',
        name: 'Welcome to Foodie!',
        unlockedAt: new Date()
      }]
    });

    // Generate JWT
    const token = generateToken(user._id);

    // Set JWT in secure, HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email,
        loyaltyPoints: user.loyaltyPoints,
        totalPointsEarned: user.totalPointsEarned,
        achievements: user.achievements,
        rewardHistory: user.rewardHistory
      },
      token: token,
      message: 'Registration successful! Welcome bonus: 500 loyalty points added! 🎉',
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Set JWT in secure, HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email,
        loyaltyPoints: user.loyaltyPoints || 0,
        totalPointsEarned: user.totalPointsEarned || 0,
        achievements: user.achievements || [],
        rewardHistory: user.rewardHistory || []
      },
      token: token,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const logoutUser = async (req, res) => {
  // Clear the JWT cookie
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out successfully' });
};