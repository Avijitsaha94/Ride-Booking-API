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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../utils/jwt");
const user_model_1 = require("../user/user.model");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const existingUser = yield user_model_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const userData = {
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
        const user = yield user_model_1.User.create(userData);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        if (user.status === 'blocked') {
            return res.status(403).json({ success: false, message: 'User is blocked' });
        }
        if (user.role === 'driver' && !((_a = user.driverDetails) === null || _a === void 0 ? void 0 : _a.approved)) {
            return res.status(403).json({ success: false, message: 'Driver approval pending' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const token = (0, jwt_1.signToken)(user._id.toString(), user.role);
        res.status(200).json({
            success: true,
            token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
