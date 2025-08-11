"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Get logged-in user's profile
router.get('/me', auth_middleware_1.protect, user_controller_1.getProfile);
// Admin only routes
router.get('/', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), user_controller_1.getAllUsers);
router.patch('/block/:id', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), user_controller_1.blockUser);
router.patch('/unblock/:id', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), user_controller_1.unblockUser);
router.patch('/approve-driver/:id', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), user_controller_1.approveDriver);
router.patch('/suspend-driver/:id', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), user_controller_1.suspendDriver);
exports.default = router;
