const express = require('express');
const router = express.Router();
const User = require('../Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/signup', async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.name)
  {
    return res.status(400).json({ success: false, msg: 'Please include name, username, and password to signup.' });
  }

  try
  {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser)
    {
      return res.status(409).json({ success: false, message: 'A user with that username already exists.' });
    }
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    });
    await user.save();
    res.status(201).json({ success: true, msg: 'Successfully created new user.' });

  }
  catch (err)
  {
    console.error("Error in signup:", err);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
});
router.post('/signin', async (req, res) =>
{
  try
  {
    const user = await User.findOne({ username: req.body.username }).select("+password");
    if (!user)
    {
      console.log("Authentication failed: User not found.");
      return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch)
    {
      console.log("Authentication failed: Incorrect password.");
      return res.status(401).json({ success: false, msg: 'Authentication failed. Incorrect password.' });
    }

    console.log(" Password matched, generating token...");
    const userToken = { id: user._id, username: user.username };
    const token = jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token: 'JWT ' + token });
  }
  catch (err)
  {
    console.error("Error in signin:", err);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
});

module.exports = router;
