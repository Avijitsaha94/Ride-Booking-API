import express from 'express';
import { protect, restrictTo } from '../../middlewares/auth.middleware';
import { updateAvailability, getEarnings } from './driver.controller';

const router = express.Router();

router.patch('/me/status', protect, restrictTo('driver'), updateAvailability);
router.get('/me/earnings', protect, restrictTo('driver'), getEarnings);

export default router;