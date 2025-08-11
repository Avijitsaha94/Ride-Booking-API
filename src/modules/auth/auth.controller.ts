import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { signToken } from '../../utils/jwt';
import { User } from '../user/user.model';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData: any = {
      name,
      email,
      password: hashedPassword,
      role,
      status: 'active',
    };

    if (role === 'driver') {
      userData.driverDetails = {
        approved: false,
        online: false,
        vehicleInfo: '',
        totalEarnings: 0,
      };
    }

    const user = await User.create(userData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.status === 'blocked') {
      return res.status(403).json({ success: false, message: 'User is blocked' });
    }

    if (user.role === 'driver' && !user.driverDetails?.approved) {
      return res.status(403).json({ success: false, message: 'Driver approval pending' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    
    const token = signToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};
