
import asyncHandler from 'express-async-handler';
import WaterRequest from '../Models/waterRequestModel.js';

// POST /api/requests
export const createWaterRequest = asyncHandler(async (req, res) => {
  const { purpose, amount, location, dateNeeded } = req.body;

  if (!purpose || !amount || !location || !dateNeeded) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const newRequest = await WaterRequest.create({
    user: req.user._id,
    purpose,
    amount,
    location,
    dateNeeded,
  });

  res.status(201).json(newRequest);
});

// GET /api/requests/my
export const getMyWaterRequests = asyncHandler(async (req, res) => {
  const requests = await WaterRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(requests);
});

