"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const driver_controller_1 = require("./driver.controller");
const router = express_1.default.Router();
router.patch('/me/status', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('driver'), driver_controller_1.updateAvailability);
router.get('/me/earnings', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('driver'), driver_controller_1.getEarnings);
exports.default = router;
