import Subscription from '../Models/Subscription.js';

export const createSubscription = async (req, res) => {
  try {
    const { plan, paymentDetails } = req.body;

    if (!plan || !paymentDetails || !paymentDetails.cardHolder || !paymentDetails.cardNumber) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newSubscription = new Subscription({
      user: req.user.id,
      plan,
      paymentDetails
    });

    await newSubscription.save();

    res.status(201).json({ message: 'Subscription created successfully', subscription: newSubscription });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id });

    if (!subscription) {
      return res.status(404).json({ message: 'No subscription found' });
    }

    res.status(200).json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
