import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

// Simple in-memory user storage for testing (replace with DB later)
let users = [];

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback-secret", { expiresIn: '7d' });
};

// Test registration endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    console.log('📝 Registration attempt:', { name, email, passwordLength: password?.length });

    // Validate required fields
    if (!name || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists (in memory)
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user (in memory)
    const newUser = {
      _id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    users.push(newUser);
    console.log('✅ User created successfully:', email);

    // Generate JWT
    const token = generateToken(newUser._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return success
    res.status(201).json({
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
      token: token,
      message: 'Registration successful',
    });

  } catch (error) {
    console.error('💥 Registration error:', error);
    res.status(500).json({ 
      message: 'Server error during registration',
      error: error.message 
    });
  }
});

// Test login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('📝 Login attempt:', { email });

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user (in memory)
    const user = users.find(u => u.email === email);
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log('✅ Login successful:', email);

    res.json({
      user: { _id: user._id, name: user.name, email: user.email },
      token: token,
      message: 'Login successful',
    });

  } catch (error) {
    console.error('💥 Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: error.message 
    });
  }
});

// Test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Test Auth Server is working!',
    users: users.length,
    timestamp: new Date().toISOString()
  });
});

// Get all users (for testing)
app.get('/api/users', (req, res) => {
  res.json({ 
    users: users.map(u => ({ id: u._id, name: u.name, email: u.email })),
    count: users.length 
  });
});

app.listen(port, () => {
  console.log(`🧪 Test server running on port ${port}`);
  console.log(`📍 Test at: http://localhost:${port}`);
  console.log(`👥 Register at: http://localhost:${port}/api/auth/register`);
});