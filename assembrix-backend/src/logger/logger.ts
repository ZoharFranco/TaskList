import {NextFunction, Request, Response} from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('--- Request Details ---');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Query Parameters:', req.query);
    console.log('Route Parameters:', req.params);

    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`Status: ${res.statusCode} - Duration: ${duration}ms`);
        console.log('--- Request End ---');
    });

    next();
};