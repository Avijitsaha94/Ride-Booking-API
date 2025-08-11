"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const ride_controller_1 = require("./ride.controller");
const router = express_1.default.Router();
router.post('/request', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('rider'), ride_controller_1.requestRide);
router.patch('/:id/status', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('driver'), ride_controller_1.updateRideStatus);
router.get('/me', auth_middleware_1.protect, ride_controller_1.getMyRides);
router.patch('/:id/cancel', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('rider'), ride_controller_1.cancelRide);
exports.default = router;
