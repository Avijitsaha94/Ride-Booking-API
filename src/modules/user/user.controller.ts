import { Request, Response, NextFunction } from 'express';
import {User} from '../user/user.model';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, { blocked: true }, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User blocked successfully', data: user });
  } catch (error) {
    next(error);
  }
};

export const unblockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, { blocked: false }, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User unblocked successfully', data: user });
  } catch (error) {
    next(error);
  }
};

export const approveDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const driverId = req.params.id;
    const driver = await User.findOneAndUpdate(
      { _id: driverId, role: 'driver' },
      { approved: true },
      { new: true }
    );
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    res.status(200).json({ success: true, message: 'Driver approved successfully', data: driver });
  } catch (error) {
    next(error);
  }
};

export const suspendDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const driverId = req.params.id;
    const driver = await User.findOneAndUpdate(
      { _id: driverId, role: 'driver' },
      { approved: false },
      { new: true }
    );
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    res.status(200).json({ success: true, message: 'Driver suspended successfully', data: driver });
  } catch (error) {
    next(error);
  }
};
