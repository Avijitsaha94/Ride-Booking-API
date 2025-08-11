import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './modules/auth/auth.route';
import userRoutes from './modules/user/user.route';
import driverRoutes from './modules/driver/driver.route';
import rideRoutes from './modules/ride/ride.route';

import { globalErrorHandler } from './middlewares/globalErrorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/drivers', driverRoutes);
app.use('/api/v1/rides', rideRoutes);

app.use(globalErrorHandler);

export default app;
