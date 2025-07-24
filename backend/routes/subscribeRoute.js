import express from 'express';
import Subscribe from '../models/subscribeModel.js';

const router = express.Router();

// POST - Save email
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    // Simple validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    // Check for existing email
    const existing = await Subscribe.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    
    const newSub = new Subscribe({ email });
    await newSub.save();
    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; // ES module export
