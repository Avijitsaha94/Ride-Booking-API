import express from 'express';

import authRoutes from '../modules/auth/auth.route';
import userRoutes from '../modules/user/user.route';
import driverRoutes from '../modules/driver/driver.route';
import rideRoutes from '../modules/ride/ride.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/drivers', driverRoutes);
router.use('/rides', rideRoutes);

export default router;
