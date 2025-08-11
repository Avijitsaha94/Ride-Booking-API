"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const driver_route_1 = __importDefault(require("../modules/driver/driver.route"));
const ride_route_1 = __importDefault(require("../modules/ride/ride.route"));
const router = express_1.default.Router();
router.use('/auth', auth_route_1.default);
router.use('/users', user_route_1.default);
router.use('/drivers', driver_route_1.default);
router.use('/rides', ride_route_1.default);
exports.default = router;
