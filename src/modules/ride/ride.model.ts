import mongoose, { Schema, Document } from 'mongoose';

interface RideTimestamps {
  requestedAt?: Date;
  acceptedAt?: Date;
  pickedUpAt?: Date;
  completedAt?: Date;
}

export interface IRide extends Document {
  riderId: mongoose.Types.ObjectId;
  driverId?: mongoose.Types.ObjectId;
  pickup: string;
  destination: string;
  status: 'requested' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'cancelled';
  timestamps: RideTimestamps;
}

const rideSchema = new Schema<IRide>({
  riderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: Schema.Types.ObjectId, ref: 'User' },
  pickup: { type: String, required: true },
  destination: { type: String, required: true },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'picked_up', 'in_transit', 'completed', 'cancelled'],
    default: 'requested',
  },
  timestamps: {
    requestedAt: { type: Date },
    acceptedAt: { type: Date },
    pickedUpAt: { type: Date },
    completedAt: { type: Date },
  },
}, { timestamps: true });

export const Ride = mongoose.model<IRide>('Ride', rideSchema);
