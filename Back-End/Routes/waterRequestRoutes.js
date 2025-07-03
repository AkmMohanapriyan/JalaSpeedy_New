
import express from 'express';
import { createWaterRequest, getMyWaterRequests } from '../Controllers/waterRequestController.js';
import { protect } from '../Middlewares/authMiddleware.js';

const router = express.Router();

// Create new request
router.post('/', protect, createWaterRequest);

// Get user's requests
router.get('/my', protect, getMyWaterRequests);

export default router;
