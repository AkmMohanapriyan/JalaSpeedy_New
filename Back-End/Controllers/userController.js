
import User from '../Models/User.js';
import generateToken from '../Utils/generateToken.js';
import asyncHandler from 'express-async-handler';

// POST /api/users/register
export const registerUser = async (req, res) => {
  const { username, email, role, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ username, email, role, password });

  if (user) {
    res.status(201).json({
      message: "User registered successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// POST /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email
      },
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// GET /api/users/:id
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) res.json(user);
  else res.status(404).json({ message: 'User not found' });
};

// GET /api/users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// PUT /api/users/:id
export const updateUserById = async (req, res) => {
  const { username, email, role } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;
    const updated = await user.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// DELETE /api/users/:id
export const deleteUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Get All Users (role = user)
export const getRegularUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.json(users);
});

// Get All Suppliers (role = suppliers)
export const getAllSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await User.find({ role: 'supplier' }).select('-password');
  res.json(suppliers);
});


export const getProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  res.status(200).json(req.user);
};
