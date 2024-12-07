import {Request, Response, NextFunction} from 'express';
import {RATE_LIMIT, WINDOW_SIZE} from "./rateLimitMiddlewaresConst";


const requestCounts: Map<string, { count: number; timestamp: number }> = new Map();

export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip;
    if (!ip) return

    const currentTime = Date.now();
    const requestData = requestCounts.get(ip);
    if (requestData) {
        if (currentTime - requestData.timestamp > WINDOW_SIZE) {
            requestCounts.set(ip, {count: 1, timestamp: currentTime});
        } else {
            if (requestData.count >= RATE_LIMIT) {
                res.status(429).json({
                    error: "Too many requests. Please try again later."
                });
            } else {
                requestData.count += 1;
            }
        }
    } else {
        requestCounts.set(ip, {count: 1, timestamp: currentTime});
    }
    next();
};