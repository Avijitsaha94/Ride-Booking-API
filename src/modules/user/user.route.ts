import { Router } from 'express';
import { getProfile, getAllUsers, blockUser, unblockUser, approveDriver, suspendDriver } from './user.controller';
import { protect, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

// Get logged-in user's profile
router.get('/me', protect, getProfile);

// Admin only routes
router.get('/', protect, restrictTo('admin'), getAllUsers);
router.patch('/block/:id', protect, restrictTo('admin'), blockUser);
router.patch('/unblock/:id', protect, restrictTo('admin'), unblockUser);
router.patch('/approve-driver/:id', protect, restrictTo('admin'), approveDriver);
router.patch('/suspend-driver/:id', protect, restrictTo('admin'), suspendDriver);

export default router;
