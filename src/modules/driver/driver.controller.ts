import { Request, Response } from 'express';
import { User } from '../user/user.model';

export const updateAvailability = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const driverId = req.user.id;
  const { online } = req.body;

  try {
    const driver = await User.findByIdAndUpdate(
      driverId,
      { 'driverDetails.online': online },
      { new: true }
    );

    if (!driver) return res.status(404).json({ message: 'Driver not found' });

    res.status(200).json({ message: 'Availability updated', driver });
  } catch (error) {
    res.status(500).json({ message: 'Error updating availability', error });
  }
};

export const getEarnings = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const driverId = req.user.id;

  try {
    const driver = await User.findById(driverId);

    if (!driver) return res.status(404).json({ message: 'Driver not found' });

    // Optional chaining used to avoid error if driverDetails is undefined
    const earnings = driver.driverDetails?.totalEarnings ?? 0;

    res.status(200).json({ earnings });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch earnings', error });
  }
};
