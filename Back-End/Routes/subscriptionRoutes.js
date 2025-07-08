import express from 'express';
import { createSubscription, getUserSubscription } from '../Controllers/subscriptionController.js';
import {authMiddleware , protect} from '../Middlewares/authMiddleware.js';
import Subscription from '../Models/Subscription.js';

const router = express.Router();

// router.post('/', authMiddleware, createSubscription);
router.get('/me', authMiddleware, getUserSubscription);

router.post('/', protect, async (req, res) => {
  try {
    const { plan, paymentDetails } = req.body;

    const newSubscription = await Subscription.create({
      user: req.user._id,
      plan,
      paymentDetails,
      status: 'Pending'
    });

    res.status(201).json({ message: 'Subscription created', subscription: newSubscription });
  } catch (err) {
    console.error('Error saving subscription:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
