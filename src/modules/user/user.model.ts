import mongoose, { Schema, Document, Types } from 'mongoose';

export interface DriverDetails {
  approved: boolean;
  online: boolean;
  vehicleInfo: string;
  totalEarnings: number;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'rider' | 'driver';
  status: 'active' | 'blocked';
  driverDetails?: DriverDetails;
}

const driverDetailsSchema = new Schema<DriverDetails>({
  approved: { type: Boolean, default: false },
  online: { type: Boolean, default: false },
  vehicleInfo: { type: String, default: '' },
  totalEarnings: { type: Number, default: 0 },
}, { _id: false });

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'rider', 'driver'],
    default: 'rider',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  driverDetails: {
    type: driverDetailsSchema,
    required: function () {
      return this.role === 'driver';
    },
    default: undefined,
  },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
