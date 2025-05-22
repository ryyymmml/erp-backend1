const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your secret or use env variable

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
const token = jwt.sign(
  { id: user._id, role: user.role , userName : user.name },
  JWT_SECRET,
  { expiresIn: '1d' }
);
    res.json({ token , role: user.role , userId: user._id, userName : user.name });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
