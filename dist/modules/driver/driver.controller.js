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
exports.getEarnings = exports.updateAvailability = void 0;
const user_model_1 = require("../user/user.model");
const updateAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).json({ message: 'Unauthorized' });
    const driverId = req.user.id;
    const { online } = req.body;
    try {
        const driver = yield user_model_1.User.findByIdAndUpdate(driverId, { 'driverDetails.online': online }, { new: true });
        if (!driver)
            return res.status(404).json({ message: 'Driver not found' });
        res.status(200).json({ message: 'Availability updated', driver });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating availability', error });
    }
});
exports.updateAvailability = updateAvailability;
const getEarnings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req.user)
        return res.status(401).json({ message: 'Unauthorized' });
    const driverId = req.user.id;
    try {
        const driver = yield user_model_1.User.findById(driverId);
        if (!driver)
            return res.status(404).json({ message: 'Driver not found' });
        // Optional chaining used to avoid error if driverDetails is undefined
        const earnings = (_b = (_a = driver.driverDetails) === null || _a === void 0 ? void 0 : _a.totalEarnings) !== null && _b !== void 0 ? _b : 0;
        res.status(200).json({ earnings });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch earnings', error });
    }
});
exports.getEarnings = getEarnings;
