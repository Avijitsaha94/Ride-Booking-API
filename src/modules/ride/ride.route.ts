import express from 'express';
import { protect, restrictTo } from '../../middlewares/auth.middleware';
import { requestRide, updateRideStatus, getMyRides, cancelRide } from './ride.controller';

const router = express.Router();

router.post('/request', protect, restrictTo('rider'), requestRide);
router.patch('/:id/status', protect, restrictTo('driver'), updateRideStatus);
router.get('/me', protect, getMyRides);
router.patch('/:id/cancel', protect, restrictTo('rider'), cancelRide);

export default router;
