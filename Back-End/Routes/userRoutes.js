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


const router = express.Router();

router.post('/register', registerUser); 
router.post('/login', loginUser);       

router.get('/me', protect, getProfile);

router.get("/only-users", protect, adminOnly, getRegularUsers);
router.get('/suppliers', protect, supplierOrAdmin, getAllSuppliers);

router.get('/:id', protect, supplierOrAdmin, getUserById);  
router.get('/', protect, supplierOrAdmin, getAllUsers);     
router.put('/:id', protect, adminOnly, updateUserById);     
router.delete('/:id', protect, adminOnly, deleteUserById);  
export default router;
