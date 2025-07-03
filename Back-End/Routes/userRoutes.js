import express from 'express';
import {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getRegularUsers,
  getAllSuppliers,
  getProfile
} from '../Controllers/userController.js';
import { protect, adminOnly, supplierOrAdmin } from '../Middlewares/authMiddleware.js';
// import { getRegularUsers } from '../Controllers/userController.js';


const router = express.Router();

router.post('/register', registerUser); // Publi
router.post('/login', loginUser);       // Public

router.get('/me', protect, getProfile);

router.get("/only-users", protect, adminOnly, getRegularUsers);
router.get('/suppliers', protect, supplierOrAdmin, getAllSuppliers);

router.get('/:id', protect, supplierOrAdmin, getUserById);  // Supplier/Admin
router.get('/', protect, supplierOrAdmin, getAllUsers);     // Supplier/Admin
router.put('/:id', protect, adminOnly, updateUserById);     // Admin only
router.delete('/:id', protect, adminOnly, deleteUserById);  // Admin only

export default router;
