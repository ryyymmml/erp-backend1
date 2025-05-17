const User = require('../models/User');

   // Register a new user
   exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Use the provided role if valid, otherwise default to 'admin'
    const userRole = role || 'admin';

    const user = new User({ email, password, role: userRole });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', role: userRole });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

   // Get all users
   exports.getUsers = async (req, res) => {
     try {
       const users = await User.find().select('-password');
       res.json({ success: true, data: users });
     } catch (err) {
       res.status(500).json({ error: 'Server error', details: err.message });
     }
   };