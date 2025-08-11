import { Request, Response } from 'express';
import { Ride } from './ride.model';
import { User } from '../user/user.model';

export const requestRide = async (req: Request, res: Response) => {
  const riderId = (req.user as any).id;
  const { pickup, destination } = req.body;
  try {
    const ride = await Ride.create({ riderId, pickup, destination, 'timestamps.requestedAt': new Date() });
    res.status(201).json({ message: 'Ride requested', ride });
  } catch (error) {
    res.status(400).json({ message: 'Ride request failed', error });
  }
};

export const updateRideStatus = async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const { status } = req.body;
  const driverId = (req.user as any).id;
  try {
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (status === 'accepted') ride.timestamps.acceptedAt = new Date();
    if (status === 'picked_up') ride.timestamps.pickedUpAt = new Date();
    if (status === 'completed') {
      ride.timestamps.completedAt = new Date();
      await User.findByIdAndUpdate(driverId, { $inc: { 'driverDetails.totalEarnings': 100 } });
    }

    ride.status = status;
    if (!ride.driverId && status === 'accepted') ride.driverId = driverId;

    await ride.save();
    res.status(200).json({ message: 'Ride status updated', ride });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update ride status', error });
  }
};

export const getMyRides = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const role = (req.user as any).role;
  try {
    const rides = await Ride.find(role === 'rider' ? { riderId: userId } : { driverId: userId });
    res.status(200).json({ rides });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rides', error });
  }
};

export const cancelRide = async (req: Request, res: Response) => {
  const rideId = req.params.id;
  const userId = (req.user as any).id;
  try {
    const ride = await Ride.findOne({ _id: rideId, riderId: userId });
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    if (ride.status !== 'requested') return res.status(400).json({ message: 'Cannot cancel after accepted' });
    ride.status = 'cancelled';
    await ride.save();
    res.status(200).json({ message: 'Ride cancelled', ride });
  } catch (error) {
    res.status(400).json({ message: 'Failed to cancel ride', error });
  }
};
