"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    console.error('Global Error:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json(Object.assign({ success: false, message }, (process.env.NODE_ENV === 'development' && { stack: err.stack })));
};
exports.globalErrorHandler = globalErrorHandler;
