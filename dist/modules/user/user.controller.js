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
exports.suspendDriver = exports.approveDriver = exports.unblockUser = exports.blockUser = exports.getAllUsers = exports.getProfile = void 0;
const user_model_1 = require("../user/user.model");
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_model_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        next(error);
    }
});
exports.getProfile = getProfile;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find().select('-password');
        res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const blockUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_model_1.User.findByIdAndUpdate(userId, { blocked: true }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User blocked successfully', data: user });
    }
    catch (error) {
        next(error);
    }
});
exports.blockUser = blockUser;
const unblockUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_model_1.User.findByIdAndUpdate(userId, { blocked: false }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User unblocked successfully', data: user });
    }
    catch (error) {
        next(error);
    }
});
exports.unblockUser = unblockUser;
const approveDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.params.id;
        const driver = yield user_model_1.User.findOneAndUpdate({ _id: driverId, role: 'driver' }, { approved: true }, { new: true });
        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver not found' });
        }
        res.status(200).json({ success: true, message: 'Driver approved successfully', data: driver });
    }
    catch (error) {
        next(error);
    }
});
exports.approveDriver = approveDriver;
const suspendDriver = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverId = req.params.id;
        const driver = yield user_model_1.User.findOneAndUpdate({ _id: driverId, role: 'driver' }, { approved: false }, { new: true });
        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver not found' });
        }
        res.status(200).json({ success: true, message: 'Driver suspended successfully', data: driver });
    }
    catch (error) {
        next(error);
    }
});
exports.suspendDriver = suspendDriver;
