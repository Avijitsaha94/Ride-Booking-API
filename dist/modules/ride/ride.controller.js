"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelRide = exports.getMyRides = exports.updateRideStatus = exports.requestRide = void 0;
const ride_model_1 = require("./ride.model");
const user_model_1 = require("../user/user.model");
const requestRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const riderId = req.user.id;
    const { pickup, destination } = req.body;
    try {
        const ride = yield ride_model_1.Ride.create({ riderId, pickup, destination, 'timestamps.requestedAt': new Date() });
        res.status(201).json({ message: 'Ride requested', ride });
    }
    catch (error) {
        res.status(400).json({ message: 'Ride request failed', error });
    }
});
exports.requestRide = requestRide;
const updateRideStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rideId = req.params.id;
    const { status } = req.body;
    const driverId = req.user.id;
    try {
        const ride = yield ride_model_1.Ride.findById(rideId);
        if (!ride)
            return res.status(404).json({ message: 'Ride not found' });
        if (status === 'accepted')
            ride.timestamps.acceptedAt = new Date();
        if (status === 'picked_up')
            ride.timestamps.pickedUpAt = new Date();
        if (status === 'completed') {
            ride.timestamps.completedAt = new Date();
            yield user_model_1.User.findByIdAndUpdate(driverId, { $inc: { 'driverDetails.totalEarnings': 100 } });
        }
        ride.status = status;
        if (!ride.driverId && status === 'accepted')
            ride.driverId = driverId;
        yield ride.save();
        res.status(200).json({ message: 'Ride status updated', ride });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to update ride status', error });
    }
});
exports.updateRideStatus = updateRideStatus;
const getMyRides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const role = req.user.role;
    try {
        const rides = yield ride_model_1.Ride.find(role === 'rider' ? { riderId: userId } : { driverId: userId });
        res.status(200).json({ rides });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch rides', error });
    }
});
exports.getMyRides = getMyRides;
const cancelRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rideId = req.params.id;
    const userId = req.user.id;
    try {
        const ride = yield ride_model_1.Ride.findOne({ _id: rideId, riderId: userId });
        if (!ride)
            return res.status(404).json({ message: 'Ride not found' });
        if (ride.status !== 'requested')
            return res.status(400).json({ message: 'Cannot cancel after accepted' });
        ride.status = 'cancelled';
        yield ride.save();
        res.status(200).json({ message: 'Ride cancelled', ride });
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to cancel ride', error });
    }
});
exports.cancelRide = cancelRide;
